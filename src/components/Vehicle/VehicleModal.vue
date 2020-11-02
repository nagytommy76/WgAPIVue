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
                <h1>POTROH</h1>
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

            showCharacteristics: false,
            showModules: false,
        }
    },
    created(){
        this.getTankTypeAndNation()
        this.getTankCharacteristics()
    },
    methods:{
        async getTankCharacteristics(){
            await Vehicle.getVehicleCharacteristics(this.vehicle.tank_id)
            .then(characteristics => {
                this.vehicleCharacteristics = characteristics.data.data[this.vehicle.tank_id]
                this.showCharacteristics = true
                this.getVehicleModules()
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
            let allVehicleModuleId = this.makeModuleStringToSend(this.vehicle.modules_tree);
            // await Vehicle.getVehicleModules(allVehicleModuleId)
            // .then(result => {
            //     this.fillVehicleModules()
            // })

            // await Vehicle.getVehicleModules(this.makeModuleStringToSend(this.vehicle.engines))
            // .then(result => {
            //     this.fillVehicleModules(this.vehicleModules.engines, result.data.data, this.vehicle.default_profile.modules.engine_id)                 
            // })
            // await Vehicle.getVehicleModules(this.makeModuleStringToSend(this.vehicle.guns))
            // .then(result => {
            //     this.fillVehicleModules(this.vehicleModules.guns, result.data.data, this.vehicle.default_profile.modules.gun_id)
            // })
            // await Vehicle.getVehicleModules(this.makeModuleStringToSend(this.vehicle.radios))
            // .then(result => {
            //     this.fillVehicleModules(this.vehicleModules.radios, result.data.data, this.vehicle.default_profile.modules.radio_id)
            // })
            // await Vehicle.getVehicleModules(this.makeModuleStringToSend(this.vehicle.suspensions))
            // .then(result => {
            //     this.fillVehicleModules(this.vehicleModules.suspensions, result.data.data, this.vehicle.default_profile.modules.suspension_id)
            // })
            // if(this.vehicle.turrets.length > 0){            
            //     await Vehicle.getVehicleModules(this.makeModuleStringToSend(this.vehicle.turrets))
            //     .then(result => {
            //         this.fillVehicleModules(this.vehicleModules.turrets, result.data.data, this.vehicle.default_profile.modules.turret_id)
            //     })
            // }
            await Vehicle.getVehicleModules(allVehicleModuleId)
            .then(result => {
                this.fillVehicleModules(this.vehicleModules.engines, result.data.data, this.vehicle.default_profile.modules.engine_id)                 
            })
            await Vehicle.getVehicleModules(allVehicleModuleId)
            .then(result => {
                this.fillVehicleModules(this.vehicleModules.guns, result.data.data, this.vehicle.default_profile.modules.gun_id)
            })
            await Vehicle.getVehicleModules(allVehicleModuleId)
            .then(result => {
                this.fillVehicleModules(this.vehicleModules.radios, result.data.data, this.vehicle.default_profile.modules.radio_id)
            })
            await Vehicle.getVehicleModules(allVehicleModuleId)
            .then(result => {
                this.fillVehicleModules(this.vehicleModules.suspensions, result.data.data, this.vehicle.default_profile.modules.suspension_id)
            })
            if(this.vehicle.turrets.length > 0){            
                await Vehicle.getVehicleModules(allVehicleModuleId)
                .then(result => {
                    this.fillVehicleModules(this.vehicleModules.turrets, result.data.data, this.vehicle.default_profile.modules.turret_id)
                })
            }
            this.showModules = true
        },
        makeModuleStringToSend(module_ids = {}){
            let resultString = '';
            for (const key in module_ids) {
               resultString += key + ','
            }
            return resultString
        },
        // makeModuleStringToSend(module_ids = []){
        //     let resultString = '';
        //     module_ids.map((modules) =>{
        //         resultString += modules + ','
        //     })
        //     return resultString
        // },
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