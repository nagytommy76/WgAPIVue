<template>
    <div class="player-stat">
        <h2 class="player-stat-title">Player Stats</h2>
        <PlayerStatItem 
            :description="'Battles'"
            :result="playerStatWithVehicle.all.battles"
        />
        <PlayerStatItem 
            :description="'Wins'"
            :result="playerStatWithVehicle.all.wins"
        />
        <PlayerStatItem 
            :description="'Win Ratio'"
            :result="((playerStatWithVehicle.all.wins / playerStatWithVehicle.all.battles) * 100).toFixed(2)"
            :optional="'%'"
        />
        <PlayerStatItem 
            :description="'Avg Battle Xp'"
            :result="playerStatWithVehicle.all.battle_avg_xp"
        />
        <PlayerStatItem 
            :description="'Avg Dmg'"
            :result="(playerStatWithVehicle.all.damage_dealt / playerStatWithVehicle.all.battles).toFixed(0)"
        />
        <PlayerStatItem 
            :description="'Hits'"
            :result="playerStatWithVehicle.all.hits_percents"
            :optional="'%'"
        />
        <PlayerStatItem 
            :description="'Max Xp'"
            :result="playerStatWithVehicle.max_xp"
        />
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
        playerStatWithVehicle: Object,
    },
}
</script>