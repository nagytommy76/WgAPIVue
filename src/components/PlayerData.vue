<template>
    <div v-for="(account,index) in player.data" :key="index">
        <div class="personal-info">
            <h1>Personal Info</h1>
            <h1 class="nickname">Player's Nickname: {{account.nickname}}</h1>
            <h2>Last battle time: {{this.timestampConvert(account.last_battle_time)}}</h2>
            <h2>Account created at: {{this.timestampConvert(account.created_at)}}</h2>
        </div>
        <div class="battle-statics">
            <p>Battles: {{account.statistics.all.battles}}</p>
            <p>Vehicles destroyed: {{account.statistics.all.frags}}</p>
            <p>Max XP: {{account.statistics.all.max_xp}}</p>
            <p>Max damage: {{account.statistics.all.max_damage}}</p>
            <p>Win ration: {{(account.statistics.all.wins / account.statistics.all.battles *100)}} %</p>
        </div>
        

    </div>
</template>
<script>
import timestampConvert from '../helpers/convertTimestamp'
export default {
    props:{
        player: Object,
    },
    methods: {
        timestampConvert,
    }
}
</script>