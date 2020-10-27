<template>
    <div class="modal-background">
        <div class="modal">
            <div class="modal-head">
                <div @click="$emit('close')" class="close-modal"><i class="fas fa-times"></i></div>
                <div class="vehicle-head">
                    <img v-bind:src="vehicle.images.big_icon" class="vehicle-head-image">
                    <h1 class="vehicle-head-name">{{ vehicle.name }} {{ vehicleNations }} {{ vehicleTypes }}</h1>
                </div>
            </div>
            <div class="modal-body">
                <h1>TÖRZS</h1>
            </div>
            <div class="modal-footer">
                <h1>POTROH</h1>
            </div>
        </div>
    </div>
</template>
<script>
import Vehicle from '../../WGClass/Tankopedia/Vehicle'

export default {
    props:{
        vehicle: Object,
    },
    data() {
        return {
            vehicleType: '',
            vehicleNation: '',
        }
    },
    computed: {
        vehicleTypes: {
            get(){
                return this.vehicleType
            },
            set(value){
                this.vehicleType = value
            }
        },
        vehicleNations: {
            get(){
                return this.vehicleNation
            },
            set(value){
                this.vehicleNation = value
            }
        },
    },
    mounted(){
        this.getTanktypeAndNation()
    },
    methods:{
        async getTanktypeAndNation(){
            await Vehicle.getTankopediaInformation('eu', 'vehicle_nations,vehicle_types')
            .then(result => {
                console.log(result)
                this.vehicleTypes = result.data.data.vehicle_types[this.vehicle.type]
                this.vehicleNations = result.data.data.vehicle_nations[this.vehicle.nation]
            })
        }
    },
        
}
</script>