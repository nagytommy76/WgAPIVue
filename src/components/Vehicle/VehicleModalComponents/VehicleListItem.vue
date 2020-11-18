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
                <h3>Battles: {{ playerStatWithVehicle[0].statistics.battles }}</h3>
                <h3>Wins: {{ playerStatWithVehicle[0].statistics.wins }}</h3>
                <h3>Win Ratio: {{ ((playerStatWithVehicle[0].statistics.wins / playerStatWithVehicle[0].statistics.battles) * 100).toFixed(2) }} %</h3>
                
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
// import axios from 'axios'
// import { mapGetters } from 'vuex'

export default {
    // Ide szeretnék egy tooltip-et ami a win rate-et jeleníti meg akkor, ha be vagyok lépve és a tank a garázsban van
    // ha nincs a garázsban nem jelenik meg
    // majd egy gomb megnyomásával megnyitok egy újabb modal-t ahová az adott tankkal elért achivementek kerülnek
    name: 'Vehicle List Item',
    props: {
        contourIcon: String,
        vehicleName: String,
        VehicleTier: Number,
        profileHp: Number,
        gunAimTime: Number,
        gunDispersion: Number,
        weight: Number,
        // vehicleID: Number,
        playerStatWithVehicle: Array,
    },
    data() {
        return {
            inGarage: false,
            // playerStatWithVehicle: [],
        }
    },
    // computed:{
    //     ...mapGetters({
    //         account_id: 'getAccountId'
    //     })
    // },
    mounted() {
        // this.loadPlayerStats()
        this.test()
    },
    methods:{
        test(){
            if(this.playerStatWithVehicle.length == 1){
                this.inGarage == true
            }
        }
        // async loadPlayerStats(){
        //     await axios.get(`https://api.worldoftanks.eu/wot/account/tanks/?application_id=1ebc47797ed02032c3c5489cbba60f6c&tank_id=${this.vehicleID}&account_id=${this.account_id}`)
        //     .then(stat =>{
        //         console.log(stat.data.data)
        //         if (stat.data.data[this.account_id].length == 1) {
        //             this.inGarage = true
        //             this.playerStatWithVehicle = stat.data.data[this.account_id]
        //         }
        //     })
        // },
    },

}
</script>