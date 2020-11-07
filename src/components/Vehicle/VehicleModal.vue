<template>
    <div class="modal-background">
        <div class="modal">
            <div class="modal-head">
                <div @click="$emit('close')" class="close-modal"><i class="fas fa-times"></i></div>
                <div class="vehicle-head">
                    <img v-bind:src="vehicle.images.big_icon" class="vehicle-head-image">
                    <h1 class="vehicle-head-name">
                        {{ vehicle.name }} |
                        Tier {{ vehicle.tier}} |
                        {{ vehicleNation }} |
                        {{ vehicleType }}                    
                    </h1>
                </div>
            </div>
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
                        @click="test(previousVehicleData.tank_id)"
                    />
                    <TechTreeItem 
                        v-if="showCurrentTechTree"
                        :tankName="vehicle.name"
                        :image="vehicle.images.big_icon"
                        :priceCredits="vehicle.price_credit == null ? 0 : vehicle.price_credit"
                        :reserachExp="vehicle.prices_xp == null ? 0 : Object.values(vehicle.prices_xp)[0]"
                        @click="test(vehicle.tank_id)"
                    />
                    <TechTreeItem 
                        v-if="showNextTechTree"
                        :tankName="nextVehicleData.tank_name"
                        :image="nextVehicleData.big_icon"
                        :priceCredits="nextVehicleData.price_credits"
                        :reserachExp="nextVehicleData.research_experience"
                        @click="test(nextVehicleData.tank_id)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vehicle from '../../WGClass/Tankopedia/Vehicle'
import VehicleDetails from './VehicleDetails/Details'
import VehicleModules from './VehicleModules/Modules' 

import TechTreeItem from './TechTree/TechTreeItem'

export default {
    name: 'Vehicle Modal',
    components:{
        VehicleDetails,
        VehicleModules,
        TechTreeItem,
    },
    props:{
        vehicle: Object,
    },
    computed: {
        vehicleList:{
            get(){
                return this.$parent
            }
        }
    },
    data() {
        return {
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
            vehicleType: '',
            vehicleNation: '',
            vehicleCharacteristics: {},
            vehicleModules: {
                engines:[],
                guns:[],
                radios: [],
                suspensions: [],
                turrets: [],
            },
            selectedVehicleModulesId: {
                engine_id: this.vehicle.default_profile.modules.engine_id,
                gun_id: this.vehicle.default_profile.modules.gun_id,
                radio_id: this.vehicle.default_profile.modules.radio_id,
                suspension_id: this.vehicle.default_profile.modules.suspension_id,
                // Megoldva: ha pl nincs turret akkor null lesz a turret_id és így nem tudja lekérni a vehicle characteristics-et
                turret_id: this.vehicle.default_profile.modules.turret_id == null ? '' : this.vehicle.default_profile.modules.turret_id
            },
            showCharacteristics: false,
            showModules: false,
        }
    },
    created(){
        this.getTankTypeAndNation()
        this.getTankCharacteristics()
        this.getVehicleModules()
        this.getNextVehicle()
    },
    methods:{
        async getTankCharacteristics(){
            await Vehicle.getVehicleCharacteristics(this.vehicle.tank_id, this.selectedVehicleModulesId)
            .then(characteristics => {
                // console.log(characteristics)
                // Hiba, ha nem a következő kompatibilis modul lesz kiválsztva a server 404 "invalid module ids" errort dob
                if(characteristics.data.status != 'error'){
                    this.vehicleCharacteristics = characteristics.data.data[this.vehicle.tank_id]
                    this.showCharacteristics = true
                }else{
                    // ide akkor lépünk be ha error van és a megelőző modult kell kiválasztani
                }
            })
        },
        async getTankTypeAndNation(){
            await Vehicle.getTankopediaInformation('eu', 'vehicle_nations,vehicle_types')
            .then(result => {
                this.vehicleType = result.data.data.vehicle_types[this.vehicle.type]
                this.vehicleNation = result.data.data.vehicle_nations[this.vehicle.nation]
            })
        },
        async getVehicleModules(){
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
                    // console.log('ha nincs utána de van előtte')
                    previousTankId = Object.keys(this.vehicle.prices_xp)[0]
                    await Vehicle.getAllVehicles('eu','','','','name,images,price_credit,tank_id,next_tanks,prices_xp',`${nextTankId},${previousTankId}`)
                    .then(result =>{
                        // this.previousVehicleData.tank_id = previousTankId
                        // this.previousVehicleData.tank_name = result.data.data[previousTankId].name
                        // this.previousVehicleData.big_icon = result.data.data[previousTankId].images.big_icon
                        // this.previousVehicleData.price_credits = result.data.data[previousTankId].price_credit
                        // if (result.data.data[previousTankId].prices_xp != null) {
                        //     this.previousVehicleData.research_experience = Object.values(result.data.data[previousTankId].prices_xp)[0]
                        // }
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
                    nextTankId = Object.keys(this.vehicle.next_tanks)[0]
                    let nextTankResearchXp = Object.values(this.vehicle.next_tanks)[0]

                    previousTankId = Object.keys(this.vehicle.prices_xp)[0]

                    await Vehicle.getAllVehicles('eu','','','','name,images,price_credit,tank_id,next_tanks,prices_xp',`${nextTankId},${previousTankId}`)
                    .then(result => {
                        this.fillTechTreeObjects(this.nextVehicleData, result, nextTankId, nextTankResearchXp)
                        // this.nextVehicleData.tank_id = nextTankId
                        // this.nextVehicleData.tank_name = result.data.data[nextTankId].name
                        // this.nextVehicleData.big_icon = result.data.data[nextTankId].images.big_icon
                        // this.nextVehicleData.price_credits = result.data.data[nextTankId].price_credit
                        // this.nextVehicleData.research_experience = nextTankResearchXp

                        // this.previousVehicleData.tank_id = previousTankId
                        // this.previousVehicleData.tank_name = result.data.data[previousTankId].name
                        // this.previousVehicleData.big_icon = result.data.data[previousTankId].images.big_icon
                        // this.previousVehicleData.price_credits = result.data.data[previousTankId].price_credit
                        // if (result.data.data[previousTankId].prices_xp != null) {
                        //     this.previousVehicleData.research_experience = Object.values(result.data.data[previousTankId].prices_xp)[0]
                        // }
                        let prevTankResearchExp = result.data.data[previousTankId].prices_xp === null ? 0 : Object.values(result.data.data[previousTankId].prices_xp)[0]
                        this.fillTechTreeObjects(this.previousVehicleData, result, previousTankId, prevTankResearchExp)

                        this.showPreviousTechTree = true
                        this.showCurrentTechTree = true
                        this.showNextTechTree = true
                    })
                }else{
                    // console.log('TIER 1')
                    let nextTankResearchXp = Object.values(this.vehicle.next_tanks)[0]
                    nextTankId = Object.keys(this.vehicle.next_tanks)[0]

                    await Vehicle.getAllVehicles('eu','','','','name,images,price_credit,tank_id,next_tanks,prices_xp',`${nextTankId},${previousTankId}`)
                    .then(result =>{
                        this.fillTechTreeObjects(this.nextVehicleData, result, nextTankId, nextTankResearchXp)

                        this.showCurrentTechTree = true
                        this.showNextTechTree = true
                    })
                }
            }

        },
        test(tankID){
            console.log(tankID)
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
    },
        
}
</script>