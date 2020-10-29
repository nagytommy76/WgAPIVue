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
                <VehicleDetails 
                    :Characteristics="vehicleCharacteristics"
                />
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

export default {
    components:{
        VehicleDetails,
    },
    props:{
        vehicle: Object,
    },
    data() {
        return {
            vehicleType: '',
            vehicleNation: '',
            vehicleCharacteristics: '',
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
                console.log(characteristics)
            })
        },
        async getTankTypeAndNation(){
            await Vehicle.getTankopediaInformation('eu', 'vehicle_nations,vehicle_types')
            .then(result => {
                this.vehicleType = result.data.data.vehicle_types[this.vehicle.type]
                this.vehicleNation = result.data.data.vehicle_nations[this.vehicle.nation]
            })
        },
    },
        
}
</script>