<template>
    <div class="table-view-body-row modal-open">
        <div class="table-view-body-row-col full-size" v-if="inGarage">
        <Tooltip >
            <template v-slot:main>           
                <span class="vehicle-contour-icon">
                <img :src="contourIcon" />
                </span>
                <p class="vehicle-name">
                    {{ vehicleName }}
                </p>
            </template>
            <template v-slot:optional>
                <PlayerStat 
                    v-if="showStatTooltip"
                    :playerBaseStatWithVehicle="playerStatWithVehicle" 
                    :fullPlayerStat="fullStat"
                />
            </template>
        </Tooltip>
        </div>
        <div class="table-view-body-row-col full-size" v-else>
            <span class="vehicle-contour-icon">
                <img :src="contourIcon" />
            </span>
            <p class="vehicle-name">
                {{ vehicleName }}
            </p>
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
            {{ weight }} Kg
        </div>
    </div>
</template>
<script>
import Tooltip from '../../../inc/Tooltip'
import PlayerStat from '../../PlayersVehicles/PlayerStatics'

import Axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    name: 'Vehicle List Item',
    components:{
        Tooltip,
        PlayerStat,
    },
    props: {
        contourIcon: String,
        vehicleName: String,
        VehicleTier: Number,
        profileHp: Number,
        gunAimTime: Number,
        gunDispersion: Number,
        weight: Number,
        playerStatWithVehicle: Object,
        tankId: Number,
    },
    data() {
        return {
            showStatTooltip: false,
            fullStat: {},
        }
    },
    computed:{
        inGarage(){
            return this.playerStatWithVehicle !== undefined ? true : false;
        },
        ...mapGetters({
            account_id: 'getAccountId'
        })
    },
    mounted(){
        this.getFullStatics()
    },
    methods: {
        async getFullStatics(){
            console.log(this._uid)
            await Axios.get(`https://api.worldoftanks.eu/wot/tanks/stats/?application_id=1ebc47797ed02032c3c5489cbba60f6c&account_id=${this.account_id}&tank_id=${this.tankId}`).then(playerStat =>{
                console.log(playerStat)
                this.fullStat = playerStat.data.data[this.account_id]
                this.showStatTooltip = true
            })
        }
    },
}
</script>