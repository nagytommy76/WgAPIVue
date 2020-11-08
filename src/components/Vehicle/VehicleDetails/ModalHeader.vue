<template>
    <div class="modal-head">
        <div class="vehicle-head">
            <img v-bind:src="image" class="vehicle-head-image">
            <h1 class="vehicle-head-name">
                {{ vehicleName }} |
                Tier {{ vehicleTier}} |
                {{ vehicleNation }} |
                {{ vehicleType }}                    
            </h1>
        </div>
    </div>
</template>
<script>
import Vehicle from '../../../WGClass/Tankopedia/Vehicle'
export default {
    name: 'ModalHeader',
    props:{
        image: String,
        vehicleName: String,
        vehicleTier: Number,
        Nation: String,
        Type: String
    },
    data() {
        return {
            vehicleType: '',
            vehicleNation: '',
        }
    },
    created() {
        this.getTankTypeAndNation()
    },
    methods: {
        async getTankTypeAndNation(){
            await Vehicle.getTankopediaInformation('eu', 'vehicle_nations,vehicle_types')
            .then(result => {
                this.vehicleType = result.data.data.vehicle_types[this.Type]
                this.vehicleNation = result.data.data.vehicle_nations[this.Nation]
            })
        },
    },
}
</script>