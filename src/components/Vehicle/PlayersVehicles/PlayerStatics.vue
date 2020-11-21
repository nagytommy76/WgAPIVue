<template>
    <div class="player-stat">
        <h2 class="player-stat-title">Player Stats</h2>
        <PlayerStatItem 
            :description="'Battles'"
            :result="playerBaseStatWithVehicle.statistics.battles"
        />
        <PlayerStatItem 
            :description="'Wins'"
            :result="playerBaseStatWithVehicle.statistics.wins"
        />
        <PlayerStatItem 
            :description="'Win Ratio'"
            :result="((playerBaseStatWithVehicle.statistics.wins / playerBaseStatWithVehicle.statistics.battles) * 100).toFixed(2)"
            :optional="'%'"
        />
        <PlayerStatItem 
            :description="'Avg Battle Xp'"
            :result="fullPlayerStat[0].all.battle_avg_xp"
        />
        <PlayerStatItem 
            :description="'Avg Dmg'"
            :result="(fullPlayerStat[0].all.damage_dealt / fullPlayerStat[0].all.battles).toFixed(0)"
        />
    <!-- Ide jönnek a további statok -->
    </div>
</template>
<script>
import PlayerStatItem from './PlayerStatComponents/PlayerStatItem'
export default {
    name: 'Player Stat',
    components:{
        PlayerStatItem,
    },
    props:{
        playerBaseStatWithVehicle: Object,
        fullPlayerStat: Object,
    },
}
</script>