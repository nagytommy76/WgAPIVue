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
                    <!-- <div class="tech-tree-vehicle"> -->
                        <div class="tech-tree-item">
                            <div class="tech-tree-item-head">
                                <h3>{{ previousVehicleData.tank_name }}</h3>
                                <img v-bind:src="previousVehicleData.big_icon">
                            </div>
                            <div class="tech-tree-item-footer">
                                <p>Credits: {{ previousVehicleData.price_credits }}</p>
                                <p>Research: {{ previousVehicleData.research_experience }}</p>
                            </div>
                        </div> <!-- -->
                        <div class="tech-tree-item">
                            <div class="tech-tree-item-head">
                                <h3>{{ vehicle.name }}</h3>
                                <img v-bind:src="vehicle.images.big_icon">
                            </div>
                            <div class="tech-tree-item-footer">
                                <p>Credits: {{ vehicle.price_credit == null ? 0 : vehicle.price_credit }}</p>
                                <!-- <p>experience: {{ Object.values(vehicle.prices_xp)[0] }}</p> -->
                            </div>
                        </div> <!-- -->
                        <div class="tech-tree-item">
                            <div class="tech-tree-item-head">
                                <h3>{{ nextVehicleData.tank_name }}</h3>
                                <img v-bind:src="nextVehicleData.big_icon">
                            </div>
                            <div class="tech-tree-item-footer">
                                <p>Credits: {{ nextVehicleData.price_credits }}</p>
                                <p>Research: {{ nextVehicleData.research_experience }}</p>
                            </div>
                        </div> <!-- -->
                    <!-- </div> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vehicle from '../../WGClass/Tankopedia/Vehicle'
import VehicleDetails from './VehicleDetails/Details'
import VehicleModules from './VehicleModules/Modules' 

export default {
    name: 'Vehicle Modal',
    components:{
        VehicleDetails,
        VehicleModules,
    },
    props:{
        vehicle: Object,
    },
    data() {
        return {
            nextVehicleData: {
                tank_id: '',
                tank_name: '',
                research_experience: 0,
                big_icon: '',
                price_credits: 0,
            },
            previousVehicleData: {
                tank_id: '',
                tank_name: '',
                research_experience: 0,
                big_icon: '',
                price_credits: 0,
            },
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
            if (this.vehicle.next_tanks === null && this.vehicle.prices_xp === null) {
                // Ebben az esetben se előtte se utána tank, (az mind1, hogy ajándék vagy prém) tehát nem is kell megjeleníteni a footert
                
            }else{
                // ha előtte és utána is van tank
                nextTankId = Object.keys(this.vehicle.next_tanks)[0]
                let nextTankResearchXp = Object.values(this.vehicle.next_tanks)[0]
                previousTankId = Object.keys(this.vehicle.prices_xp)[0]
                await Vehicle.getAllVehicles('eu','','','','name,images,price_credit,tank_id,next_tanks,prices_xp',`${nextTankId},${previousTankId}`)
                .then(result => {
                    this.nextVehicleData.tank_id = nextTankId
                    this.nextVehicleData.tank_name = result.data.data[nextTankId].name
                    this.nextVehicleData.big_icon = result.data.data[nextTankId].images.big_icon
                    this.nextVehicleData.price_credits = result.data.data[nextTankId].price_credit
                    this.nextVehicleData.research_experience = nextTankResearchXp
                    // console.log(result.data.data[previousTankId])
                    // Ha tier 1-es a tank akkor nincs prices_xp...
                    if (result.data.data[previousTankId].prices_xp != null) {
                        let previousTankResearchXp = Object.values(result.data.data[previousTankId].prices_xp)[0]
                        this.previousVehicleData.research_experience = previousTankResearchXp
                    }
                    this.previousVehicleData.tank_id = previousTankId
                    this.previousVehicleData.tank_name = result.data.data[previousTankId].name
                    this.previousVehicleData.big_icon = result.data.data[previousTankId].images.big_icon
                    this.previousVehicleData.price_credits = result.data.data[previousTankId].price_credit
                        
                })
            }
            if (this.vehicle.next_tanks === null && this.vehicle.prices_xp !== null) {
                // Nincs kövi tank, de van előző, tehát T10es
                previousTankId = Object.keys(this.vehicle.prices_xp)[0]
                await Vehicle.getAllVehicles('eu','','','','name,images,price_credit,tank_id,next_tanks,prices_xp',`${previousTankId}`)
                .then(result => {
                    let previousTankResearchXp = Object.values(result.data.data[previousTankId].prices_xp)[0]

                    this.previousVehicleData.tank_id = previousTankId
                    this.previousVehicleData.tank_name = result.data.data[previousTankId].name
                    this.previousVehicleData.big_icon = result.data.data[previousTankId].images.big_icon
                    this.previousVehicleData.price_credits = result.data.data[previousTankId].price_credit
                    this.previousVehicleData.research_experience = previousTankResearchXp
                })
            }
            if (this.vehicle.next_tanks !== null && this.vehicle.prices_xp === null) {
                // előző tank nincs de van kövi. Pl Tier 2-es
                console.log('tier 2-ben vagyunk')
                await Vehicle.getAllVehicles('eu','','','','name,images,price_credit,tank_id,next_tanks,prices_xp',`${nextTankId}`)
                .then(result => {
                    let nextTankResearchXp = Object.values(this.vehicle.next_tanks)[0]
                    this.nextVehicleData.tank_id = nextTankId
                    this.nextVehicleData.tank_name = result.data.data[nextTankId].name
                    this.nextVehicleData.big_icon = result.data.data[nextTankId].images.big_icon
                    this.nextVehicleData.price_credits = result.data.data[nextTankId].price_credit
                    this.nextVehicleData.research_experience = nextTankResearchXp
                })
            }
        },
        // A következő tank a next tanks, ennek a kulcsa a kövi tank id, a value pedig az XP
        // Az előző tank id-je a prices_xp key-je, az xp pedig a value
        async semmi(){
            let nextTankId = ''
            let nextTankResearchXp = 0
            // Refaktorálás szükséges!!!!!!!!!!!!!!!
            // Ugyan ezt megoldani, csak a Tier 1-es tankoknál, ott nincs previous tank!!!!!!!!!!!!!!
            if(this.vehicle.next_tanks != null){
                nextTankId = Object.keys(this.vehicle.next_tanks)[0]
                nextTankResearchXp = Object.values(this.vehicle.next_tanks)[0]
            }

            let previousTankId = ''
            if(this.vehicle.prices_xp != null){
                previousTankId = Object.keys(this.vehicle.prices_xp)[0]
            }
            // 
            await Vehicle.getAllVehicles('eu','','','','name,images,price_credit,tank_id,next_tanks,prices_xp',`${nextTankId},${previousTankId}`)
            .then(result => {
                // console.log(result.data)
                if(this.vehicle.next_tanks != null){
                this.nextVehicleData.tank_id = nextTankId
                this.nextVehicleData.tank_name = result.data.data[nextTankId].name
                this.nextVehicleData.big_icon = result.data.data[nextTankId].images.big_icon
                this.nextVehicleData.price_credits = result.data.data[nextTankId].price_credit
                this.nextVehicleData.research_experience = nextTankResearchXp
                }

                if(this.vehicle.prices_xp != null){
                    
                
                let previousTankResearchXp = Object.values(result.data.data[previousTankId].prices_xp)[0]

                this.previousVehicleData.tank_id = previousTankId
                this.previousVehicleData.tank_name = result.data.data[previousTankId].name
                this.previousVehicleData.big_icon = result.data.data[previousTankId].images.big_icon
                this.previousVehicleData.price_credits = result.data.data[previousTankId].price_credit
                this.previousVehicleData.research_experience = previousTankResearchXp
                }
            })
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
        }
    },
        
}
</script>