<template>
    <div class="modal-background">
        <div class="modal">
            <div @click="$emit('close')" class="close-modal"><i class="fas fa-times"></i></div>
            <ModalHeader 
                :image="vehicle.images.big_icon"
                :vehicleName="vehicle.name"
                :vehicleTier="vehicle.tier"
                :Nation="vehicle.nation"
                :Type="vehicle.type"
            />
            <div class="modal-body">
                <div class="left">
                    <VehicleModules 
                        v-if="showModules"
                        :modules="vehicleModules"
                    />
                </div>
                <div class="right">
                    <VehicleDetails 
                        v-if="showCharacteristics"
                        :Characteristics="vehicleCharacteristics"
                    />
                </div>
            </div>
            <div class="modal-footer">
                <div class="tech-tree-row">
                    <TechTreeItem 
                        v-if="showPreviousTechTree"
                        :tankName="previousVehicleData.tank_name"
                        :image="previousVehicleData.big_icon"
                        :priceCredits="previousVehicleData.price_credits"
                        :reserachExp="previousVehicleData.research_experience"
                        @click="getTankInfoTechTree(previousVehicleData.tank_id)"
                    />
                    <TechTreeItem 
                        v-if="showCurrentTechTree"
                        :tankName="vehicle.name"
                        :image="vehicle.images.big_icon"
                        :priceCredits="vehicle.price_credit == null ? 0 : vehicle.price_credit"
                        :reserachExp="vehicle.prices_xp == null ? 0 : Object.values(vehicle.prices_xp)[0]"
                        @click="getTankInfoTechTree(vehicle.tank_id)"
                    />
                    <TechTreeItem 
                        v-if="showNextTechTree"
                        :tankName="nextVehicleData.tank_name"
                        :image="nextVehicleData.big_icon"
                        :priceCredits="nextVehicleData.price_credits"
                        :reserachExp="nextVehicleData.research_experience"
                        @click="getTankInfoTechTree(nextVehicleData.tank_id)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import axios from 'axios'
import Vehicle from '../../WGClass/Tankopedia/Vehicle'
import VehicleDetails from './VehicleDetails/Details'
import VehicleModules from './VehicleModules/Modules' 

import ModalHeader from './VehicleDetails/ModalHeader'
import TechTreeItem from './TechTree/TechTreeItem'
// Átjön az összes jármű, és itt választom ki, hogy melyik id-jű jelenjen meg
export default {
    name: 'Vehicle Modal',
    components:{
        VehicleDetails,
        VehicleModules,
        TechTreeItem,
        ModalHeader,
    },
    props:{
        // vehicle: Object,
        // selectedNation: String,
        vehicleId: Number,
        allVehicles: Object,
    },
    computed: {
        vehicle:{
            get(){
                return this.allVehicles[this.selectedVehicleId]
            },
            set(tankId){
                this.selectedVehicleId = tankId
            }
        },
    },
    data() {
        return {
            selectedVehicleId: this.vehicleId,
            allVehicle : {},
            nextVehicleData: {
                tank_id: 0,
                tank_name: '',
                research_experience: 0,
                big_icon: '',
                price_credits: 0,
            },
            previousVehicleData: {
                tank_id: 0,
                tank_name: '',
                research_experience: 0,
                big_icon: '',
                price_credits: 0,
            },
            showPreviousTechTree: false,
            showCurrentTechTree: false,
            showNextTechTree: false,
            vehicleCharacteristics: {},
            vehicleModules: {
                engines:[],
                guns:[],
                radios: [],
                suspensions: [],
                turrets: [],
            },
            selectedVehicleModulesId: {
                engine_id: 0,
                gun_id: 0,
                radio_id: 0,
                suspension_id: 0,
                 turret_id: 0
            },
            showCharacteristics: false,
            showModules: false,
        }
    },
    created(){
        this.getVehicleModules()
        this.fillSelectedModulesId()
        this.getNextVehicle()
        this.getTankCharacteristics()
    },
    methods:{
        fillSelectedModulesId(){
            this.selectedVehicleModulesId.engine_id = this.vehicle.default_profile.modules.engine_id
            this.selectedVehicleModulesId.radio_id = this.vehicle.default_profile.modules.radio_id
            this.selectedVehicleModulesId.gun_id = this.vehicle.default_profile.modules.gun_id
            this.selectedVehicleModulesId.suspension_id = this.vehicle.default_profile.modules.suspension_id
            // Megoldva: ha pl nincs turret akkor null lesz a turret_id és így nem tudja lekérni a vehicle characteristics-et
            this.selectedVehicleModulesId.turret_id = this.vehicle.default_profile.modules.turret_id == null ? '' : this.vehicle.default_profile.modules.turret_id
        },
        async getTankCharacteristics(){
            await Vehicle.getVehicleCharacteristics(this.vehicle.tank_id, this.selectedVehicleModulesId)
            .then(characteristics => {
                // Hiba, ha nem a következő kompatibilis modul lesz kiválsztva a server 404 "invalid module ids" errort dob
                if(characteristics.data.status != 'error'){
                    this.vehicleCharacteristics = characteristics.data.data[this.vehicle.tank_id]
                    this.showCharacteristics = true
                }else{
                    // ide akkor lépünk be ha error van és a megelőző modult kell kiválasztani
                }
            })
        },
        async getVehicleModules(setArrayDefault = false){
            if(setArrayDefault){
                this.setModuleArrayToDefault()
            }
            await Vehicle.getVehicleModules(this.makeModuleStringToSend(this.vehicle.modules_tree))
            .then(result => {
                this.fillVehicleModules(this.vehicleModules.engines, result.data.data, this.vehicle.default_profile.modules.engine_id)
                this.fillVehicleModules(this.vehicleModules.guns, result.data.data, this.vehicle.default_profile.modules.gun_id) 
                this.fillVehicleModules(this.vehicleModules.radios, result.data.data, this.vehicle.default_profile.modules.radio_id)
                this.fillVehicleModules(this.vehicleModules.suspensions, result.data.data, this.vehicle.default_profile.modules.suspension_id)
                if(this.vehicle.turrets.length > 0){ 
                    this.fillVehicleModules(this.vehicleModules.turrets, result.data.data, this.vehicle.default_profile.modules.turret_id)
                }
            })
            this.showModules = true
        },
        async getNextVehicle(){
            let nextTankId = '';
            let previousTankId = ''
            // if (this.vehicle === undefined) {
            //     // Ha undefined a tankok akkor, lekérem az egy országhoz tartozó összes tankot (pl ussr) mert ha pl
            //     // lekérek ussr heavy tankokat és a tech treen van egy td az nincs benne az előzőleg lekért tankokban!
            //     // Esetleges megoldás: 
            //     // Ha megnyitom ezt a modalt akkor lekérem az összes egy nemzethez tartozó tankot, így elvileg megoldva!!!!
            //     // await Vehicle.getAllVehicles('eu', this.selectedNation, 0, '', '', this.selectedVehicleId)
            //     // .then(result => {

            //     // })
            //     await axios.get(`https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=1ebc47797ed02032c3c5489cbba60f6c&nation=${this.selectedNation}`)
            //     .then(result =>{
            //         this.vehicle = result.data.data
            //     })
            // }
            // Ha nincs utána tank, tehát pl T9-es
            if (this.vehicle.next_tanks === null) {
                if(this.vehicle.prices_xp !== null){
                    // ha nincs utána de van előtte T9
                    previousTankId = this.getObjectKeysInInteger(this.vehicle.prices_xp)
                    await Vehicle.getAllVehicles('eu','','','','name,images,price_credit,tank_id,next_tanks,prices_xp',`${nextTankId},${previousTankId}`)
                    .then(result =>{
                        let prevTankResearchExp = result.data.data[previousTankId].prices_xp === null ? 0 : Object.values(result.data.data[previousTankId].prices_xp)[0]
                        this.fillTechTreeObjects(this.previousVehicleData, result, previousTankId, prevTankResearchExp)

                        this.showCurrentTechTree = true
                        this.showPreviousTechTree = true
                    })
                }
            }else{
                // Ha van kövi tank
                if (this.vehicle.prices_xp !== null) {
                    // console.log('Ha van kövi tank és van előző')
                    nextTankId = this.getObjectKeysInInteger(this.vehicle.next_tanks)
                    let nextTankResearchXp = this.getObjectKeysInInteger(this.vehicle.next_tanks, false)

                    previousTankId = this.getObjectKeysInInteger(this.vehicle.prices_xp)

                    await Vehicle.getAllVehicles('eu','','','','name,images,price_credit,tank_id,next_tanks,prices_xp',`${nextTankId},${previousTankId}`)
                    .then(result => {
                        this.fillTechTreeObjects(this.nextVehicleData, result, nextTankId, nextTankResearchXp)

                        let prevTankResearchExp = result.data.data[previousTankId].prices_xp === null ? 0 : this.getObjectKeysInInteger(result.data.data[previousTankId].prices_xp, false)
                        this.fillTechTreeObjects(this.previousVehicleData, result, previousTankId, prevTankResearchExp)

                        this.showPreviousTechTree = true
                        this.showCurrentTechTree = true
                        this.showNextTechTree = true
                    })
                }else{
                    let nextTankResearchXp = this.getObjectKeysInInteger(this.vehicle.next_tanks, false)
                    nextTankId = this.getObjectKeysInInteger(this.vehicle.next_tanks)

                    await Vehicle.getAllVehicles('eu','','','','name,images,price_credit,tank_id,next_tanks,prices_xp',`${nextTankId},${previousTankId}`)
                    .then(result =>{
                        this.fillTechTreeObjects(this.nextVehicleData, result, nextTankId, nextTankResearchXp)

                        this.showCurrentTechTree = true
                        this.showNextTechTree = true
                    })
                }
            }

        },
        getTankInfoTechTree(tankID){
            this.vehicle = tankID
            // if (this.vehicle === undefined) {
            this.fillSelectedModulesId()
            this.getVehicleModules(true)
            this.getNextVehicle()
            this.getTankCharacteristics()
        },
        makeModuleStringToSend(module_ids = {}){
            let resultString = '';
            for (const key in module_ids) {
               resultString += key + ','
            }
            return resultString
        },
        fillVehicleModules(moduleTypeArray, resultData, defaultModuleId){
            // push-olom az első modult a vehicleModules.module-ba.
            moduleTypeArray.push(resultData[defaultModuleId])
            let currentVehicleModule = this.vehicle.modules_tree[resultData[defaultModuleId].module_id];
            // Ha a jelenlegi járműnek a lekért modul_id-nek a next module-ja nem null, tehát ha van következő modul...
            if(currentVehicleModule.next_modules != null){
                let nextModuleId = currentVehicleModule.next_modules[0];
                // Amíg van k9vetkező modul, push-olom sorrendbe a vehicleModules-ba
                // Sorrend hogy jön ki: A modules_tree-ben fel van építve a soron következő modul id-je, ez alapján rakom bele
                // Az a baj, hogy pl a Conqueror-nál a turret ágon van egy gun... A lényeg, hogy típus függetlenül menjen a dolog
                while(nextModuleId != null){
                    moduleTypeArray.push(resultData[nextModuleId]) 
                    // console.log(nextModuleId)         
                    if (this.vehicle.modules_tree[nextModuleId] != undefined && this.vehicle.modules_tree[nextModuleId].next_modules != null){ 
                        // console.log(this.vehicle.modules_tree[nextModuleId])                      
                        // nextModuleId = this.vehicle.modules_tree[resultData[nextModuleId].module_id].next_modules[0]
                        nextModuleId = this.vehicle.modules_tree[nextModuleId].next_modules[0]
                    }else{
                        nextModuleId = null
                    }
                } 
            }
        },
        fillTechTreeObjects(vehicleData, resultData, tankID, ResearchXp = 0){
            let tankResult = resultData.data.data[tankID]
            vehicleData.tank_id = tankID
            vehicleData.tank_name = tankResult.name
            vehicleData.big_icon = tankResult.images.big_icon
            vehicleData.price_credits = tankResult.price_credit
            vehicleData.research_experience = ResearchXp
        },
        getObjectKeysInInteger(vehicleId, keys = true){
            return parseInt(keys ? Object.keys(vehicleId)[0] : Object.values(vehicleId)[0])           
        },
        setModuleArrayToDefault(){
            this.vehicleModules.engines = []
            this.vehicleModules.guns = []
            this.vehicleModules.radios = []
            this.vehicleModules.suspensions = []
            this.vehicleModules.turrets = []
        }
    },
        
}
</script>