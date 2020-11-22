<template>
    <div class="table-view-body-row modal-open">
        <ListTableCol v-if="inGarage" :className="'full-size'">
            <template v-slot:optional>
                <Tooltip>
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
                            :playerStatWithVehicle="playerStatWithVehicle" 
                        />
                    </template>
                </Tooltip>
            </template>
        </ListTableCol>
        <ListTableCol v-else :className="'full-size'">
            <template v-slot:optional>
                <span class="vehicle-contour-icon">
                <img :src="contourIcon" />
                </span>
                <p class="vehicle-name">
                    {{ vehicleName }}
                </p>
            </template>
        </ListTableCol>
        <ListTableCol 
            :data="VehicleTier"
        />
        <ListTableCol 
            :data="profileHp"
            :optional="'Hp'"
        />
        <ListTableCol 
            :data="gunAimTime"
            :optional="'s'"
        />
        <ListTableCol 
            :data="gunDispersion"
        />
        <ListTableCol 
            :data="weight"
            :optional="'Kg'"
        />
    </div>
</template>
<script>
import Tooltip from '../../inc/Tooltip'
import ListTableCol from './ListTableCol'
import PlayerStat from '../PlayersVehicles/PlayerStatics'

export default {
    name: 'Vehicle List Item',
    components:{
        Tooltip,
        PlayerStat,
        ListTableCol,
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
    computed:{
        inGarage(){
            return this.playerStatWithVehicle !== undefined ? true : false;
        },
    },
}
</script>