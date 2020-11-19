<template>
    <div class="table-view-body-row modal-open">
        <div v-if="inGarage" class="tooltip">
        <div class="table-view-body-row-col full-size">
            <span class="vehicle-contour-icon">
                <img :src="contourIcon" />
            </span>
            <p class="vehicle-name">
                {{ vehicleName }}
            </p>
           <div class="tooltip-text">
                <h3>Battles: {{ playerStatWithVehicle.statistics.battles }}</h3>
                <h3>Wins: {{ playerStatWithVehicle.statistics.wins }}</h3>
                <h3>Win Ratio: {{ ((playerStatWithVehicle.statistics.wins / playerStatWithVehicle.statistics.battles) * 100).toFixed(2) }} %</h3>
                
                <button>TESZT</button>
            </div>
        </div>
        </div>
        <div v-else>
            <div class="table-view-body-row-col full-size">
            <span class="vehicle-contour-icon">
                <img :src="contourIcon" />
            </span>
            <p class="vehicle-name">
                {{ vehicleName }}
            </p>
        </div>
        </div>
        <div class="table-view-body-row-col flex-centered">
            {{ VehicleTier }}
        </div>
        <div class="table-view-body-row-col flex-centered">
            {{ profileHp }} HP
        </div>
        <div class="table-view-body-row-col flex-centered">
            {{ gunAimTime }} s
        </div>
        <div class="table-view-body-row-col flex-centered">
            {{ gunDispersion }}
        </div>
        <div class="table-view-body-row-col flex-centered">
            {{ weight }} T
        </div>
    </div>
</template>
<script>

export default {
    name: 'Vehicle List Item',
    props: {
        contourIcon: String,
        vehicleName: String,
        VehicleTier: Number,
        profileHp: Number,
        gunAimTime: Number,
        gunDispersion: Number,
        weight: Number,
        playerStatWithVehicle: Object,
    },
    data() {
        return {
            inGarage: false,
        }
    },
    mounted() {
        this.vehicleInGarage()
    },
    methods:{
        vehicleInGarage(){
            console.log(this.playerStatWithVehicle)
            if(this.playerStatWithVehicle !== undefined){
                this.inGarage = true
            }
        }
    },

}
</script>