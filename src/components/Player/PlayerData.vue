<template>
    <div class="statics">
        <h1>Personal Informations</h1>
        <div class="personal-info">
            <h3 class="nickname">Player's Nickname: {{account.nickname}}</h3>
            <h3>Last battle: {{this.timestampConvert(account.last_battle_time)}}</h3>
            <h3>Account created: {{this.timestampConvert(account.created_at)}}</h3>
        </div>
        <div class="battle_statics">
            <div class="stat_item">
                <span class="stat_value">{{account.statistics.all.battles}}</span>
                <span class="stat_text">Battles</span>
            </div>

            <div class="stat_item">
                <span class="stat_value">{{account.statistics.all.frags}}</span>
                <span class="stat_text">Vehicles destroyed</span> 
            </div>

            <div class="stat_item">
                <span class="stat_value">{{account.statistics.all.max_xp}}</span>
                <span class="stat_text">Max XP</span>
            </div>

            <div class="stat_item">
                <span class="stat_value">{{account.statistics.all.max_damage}}</span>
                <span class="stat_text">Max damage</span>
            </div> 
            <div class="stat_item">
                <span class="stat_value">{{((account.statistics.all.wins / account.statistics.all.battles *100).toFixed(2))}} %</span>
                <span class="stat_text">Win ratio</span>
            </div>
            <div class="stat_item">
                <span class="stat_value">{{account.statistics.all.frags}}</span>
                <span class="stat_text">Frags</span>
            </div>
        </div>
        <div v-if="showPrivateData">
            <PrivateData 
                v-if="userLoggedIn"
                :privateData="account.private"
                :timestampConvert="timestampConvert"
            />
        </div>
    </div>
</template>
<script>
import timestampConvert from '../../helpers/convertTimestamp'
import PrivateData from './PrivateData'
import {mapGetters} from 'vuex';
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
        ...mapGetters({
            userLoggedIn: 'getUserLoggedIn',
            accountId: 'getAccountId',
        }),
        showPrivateData(){
            return this.userLoggedIn && this.account.account_id == this.accountId ? true : false
        }
    }
}
</script>