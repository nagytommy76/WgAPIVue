<template>
<div class="player">
  <section class="playerSearch">
    <div class="card card-dark">
      <h1 class="card-title">Searching players</h1>
      <div class="card-form">
        <ServerSelector />
        <div class="form-group">
          <label for="player">Player nickname</label>
          <input @keyup="searchAccountId" class="form-control" type="text" name="player" id="player">
        </div>
        <div class="form-group" v-show="isFound">
          <label for="nickname">Nicknames: </label>
          <select class="form-control" name="nickname" id="nickname" @change="searchPlayerDetails">
            <option 
              v-bind:value="nick.account_id"
              v-for="(nick, index) in foundPlayers" :key="index">
                {{nick.nickname}}
            </option>
          </select>
        </div>
      </div>
    </div>
  </section>
  <section class="playerData" v-if="table">
    <PlayerData 
      :account="playerInfo"
    />
  </section>
</div>
</template>

<script>
import Player from '../WGClass/Player';
import PlayerData from '../components/Player/PlayerData'
import ServerSelector from '../components/ServerSelector'
export default {
  name: 'Player',
  data() {
    return {
        server: 'eu',
        playerInfo: {},
        isFound: false,
        table: false,
        foundPlayers: [],
    }
  },
  components: {
    PlayerData,
    ServerSelector
  },
  methods:{
    searchAccountId(event){
      Player.getPlayerId(this.server, event.target.value)
      .then(response =>{
        if(response.status == 'ok'){
          this.isFound = true
          this.foundPlayers = response.data
          if(response.meta.count == 1){
            // this.getPlayerDetails(this.foundPlayers[0].account_id)
            Player.getPlayerData(this.server, this.foundPlayers[0].account_id, this.$store.getters.getAccessToken)
            .then(result =>{
              this.playerInfo = result.data[this.foundPlayers[0].account_id]
              this.table = true
            })
            
          }
        }
      })
    },
    searchPlayerDetails(event){
      Player.getPlayerData(this.server, event.target.value)
      .then(result =>{
        this.playerInfo = result.data[event.target.value]
        this.table = true
      })
      
    },
    async getPlayerDetails(account_id){
      await Player.getPlayerData(this.server, account_id)
      .then(result => result.data[account_id] )
      .catch(error => console.log(error))
    }

  }
}
</script>
