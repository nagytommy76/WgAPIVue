<template>
    <div class="statics">
        <div class="personal-info">
            <h1>Personal Informations</h1>
            <h2 class="nickname">Player's Nickname: {{account.nickname}}</h2>
            <h2>Last battle: {{this.timestampConvert(account.last_battle_time)}}</h2>
            <h2>Account created: {{this.timestampConvert(account.created_at)}}</h2>
        </div>
        <div class="battle-statics">
            <p>Battles: {{account.statistics.all.battles}}</p>
            <p>Vehicles destroyed: {{account.statistics.all.frags}}</p>
            <p>Max XP: {{account.statistics.all.max_xp}}</p>
            <p>Max damage: {{account.statistics.all.max_damage}}</p> 
            <p>Win ratio: {{((account.statistics.all.wins / account.statistics.all.battles *100).toFixed(2))}} %</p>
            <p>Frags: {{account.statistics.all.frags}}</p>
            <!-- <p>Win ration: {{winRatio(account.statistics.all.wins, account.statistics.all.battles)}} %</p> -->
        </div>
        <div v-show="account.private != null">
            <PrivateData 
                :privateData="account.private"
                :timestampConvert="timestampConvert"
            />
        </div>
    </div>
</template>
<script>
import timestampConvert from '../../helpers/convertTimestamp'
import PrivateData from './PrivateData'
export default {
    name: "PlayerData",
    components:{
        PrivateData,
    },
    props:{
        account: Object,
    },
    methods: {
        timestampConvert,
    },
    computed:{
    }
}
</script>