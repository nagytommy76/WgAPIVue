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
                :Crew="vehicle.crew"
            />
            <div class="modal-body">
                <VehicleModules 
                    v-if="showModules"
                    :modules="vehicleModules"
                />
                <VehicleDetails 
                    v-if="showCharacteristics"
                    :Characteristics="vehicleCharacteristics"
                />
                <CrewSkills 
                    :crew="vehicle.crew"
                    :crewNation="vehicle.nation"
                />
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
import Vehicle from '../../../WGClass/Tankopedia/Vehicle'
import VehicleDetails from './VehicleDetails/Details'
import VehicleModules from './VehicleModules/Modules' 

import ModalHeader from './VehicleModalComponents/ModalHeader'
import CrewSkills from './VehicleModalComponents/Crew'
import TechTreeItem from './TechTree/TechTreeItem'
import Axios from 'axios'
export default {
    name: 'Vehicle Modal',
    components:{
        VehicleDetails,
        VehicleModules,
        TechTreeItem,
        ModalHeader,
        CrewSkills,
    },
    props:{
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
        // Ezek az alap (STOCK) modulok
        fillSelectedModulesId(){
            this.selectedVehicleModulesId.engine_id = this.vehicle.default_profile.modules.engine_id
            this.selectedVehicleModulesId.radio_id = this.vehicle.default_profile.modules.radio_id
            this.selectedVehicleModulesId.gun_id = this.vehicle.default_profile.modules.gun_id
            this.selectedVehicleModulesId.suspension_id = this.vehicle.default_profile.modules.suspension_id
            // Megoldva: ha pl nincs turret akkor null lesz a turret_id és így nem tudja lekérni a vehicle characteristics-et
            this.selectedVehicleModulesId.turret_id = this.vehicle.default_profile.modules.turret_id == null ? '' : this.vehicle.default_profile.modules.turret_id
        },
        async getTankCharacteristics(module_id = '', module_type = ''){
            const characteristics = await this.returnVehicleCharacteristics().then(characteristic => {
                return characteristic.data
            })
            if(characteristics.status != 'error'){
                this.vehicleCharacteristics = characteristics.data[this.vehicle.tank_id]
                this.showCharacteristics = true
            }else{
                // ide akkor lépünk be ha error van és a megelőző modult kell kiválasztani
                // MEGOLDANI: Ha hibát dob az előző modult is ki kell választani, illetve ha túlterhelés van.

                // 2 eset lehet: 
                // 1. Ki kéne számolni, hogy az adott modult elbírja-e a lánc, ha nem fel kell rakni 
               await Axios.get(`https://api.worldoftanks.eu/wot/encyclopedia/modules/?application_id=1ebc47797ed02032c3c5489cbba60f6c&module_id=${module_id}&type=${module_type}&fields=weight`)
                .then(result => {
                    const weight = ((this.vehicleCharacteristics.weight - this.vehicleCharacteristics[this.getTest(module_type)].weight) + result.data.data[module_id].weight)

                    // nehezebb a modul mint a lánc teherbírása
                    if(weight > this.vehicleCharacteristics.suspension.load_limit){
                        this.selectedVehicleModulesId.suspension_id = this.vehicleModules.suspensions[1].module_id
                        this.returnVehicleCharacteristics().then(withSuspension => {
                            if(withSuspension.status != 'error'){
                                // console.log(withSuspension.data.data[this.vehicleId])
                                this.vehicleCharacteristics = withSuspension.data.data[this.vehicleId]
                            }
                        })
                    }
                    // megvan, hogy a súly a gond
                })
                // 2. Van olyan eset amikor az előző modult kell feltenni. PL.: előbb egy turrret-et kell felrakni, aztán gun
            }
        },
        async returnVehicleCharacteristics(){
            return await Vehicle.getVehicleCharacteristics(this.vehicle.tank_id, this.selectedVehicleModulesId)
        },
        getTest(module_type){
            let test = ''
            switch (module_type) {
                case 'vehicleTurret':
                    test = 'turret'
                    break
                case 'vehicleRadio':
                    test = 'radio'
                    break
                case 'vehicleGun':
                    test = 'gun'
                    break
                case 'vehicleEngine':
                    test = 'engine'
                    break
            }
            return test
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