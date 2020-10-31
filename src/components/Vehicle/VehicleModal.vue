<template>
    <div class="modal-background">
        <div class="modal">
            <div class="modal-head">
                <div @click="$emit('close')" class="close-modal"><i class="fas fa-times"></i></div>
                <div class="vehicle-head">
                    <img v-bind:src="vehicle.images.big_icon" class="vehicle-head-image">
                    <h1 class="vehicle-head-name">{{ vehicle.name }} Tier {{ vehicle.tier}} {{ vehicleNation }} {{ vehicleType }}</h1>
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
                engines:{},
                guns:{},
                radios: {},
                suspensions: {},
                turrets: {},
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
                this.showModules = true
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
            await Vehicle.getVehicleModules(this.makeModuleStringToSend(this.vehicle.engines))
            .then(result => {
                this.vehicleModules.engines = result.data.data
            })
            await Vehicle.getVehicleModules(this.makeModuleStringToSend(this.vehicle.guns))
            .then(result => {
                this.vehicleModules.guns = result.data.data
            })
            await Vehicle.getVehicleModules(this.makeModuleStringToSend(this.vehicle.radios))
            .then(result => {
                this.vehicleModules.radios = result.data.data
            })
            await Vehicle.getVehicleModules(this.makeModuleStringToSend(this.vehicle.suspensions))
            .then(result => {
                this.vehicleModules.suspensions = result.data.data
            })
            await Vehicle.getVehicleModules(this.makeModuleStringToSend(this.vehicle.turrets))
            .then(result => {
                this.vehicleModules.turrets = result.data.data
            })
        },
        makeModuleStringToSend(module_ids = []){
            let resultString = '';
            module_ids.map((modules) =>{
                resultString += modules + ','
            })
            return resultString
        }
    },
        
}
</script>