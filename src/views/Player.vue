<template>
<div class="player">
  <section class="playerSearch">
    <h1>Searching players...</h1>
    <ServerSelector />
    <div class="form-group">
      <label for="player">Player nickname</label>
      <input @keyup="searchAccountId" class="form-control" type="text" name="player" id="player">
    </div>
    <div class="form-group" v-show="isFound">
      <label for="nicnname">Nicknames: </label>
      <select class="form-control" name="nicname" id="nicname" @change="searchPlayerDetails">
        <option 
          v-bind:value="nick.account_id"
          v-for="(nick, index) in foundPlayers" :key="index">
            {{nick.nickname}}
        </option>
      </select>
    </div>
  </section>
  <section class="playerData" v-show="table">
    <PlayerData 
      :player="playerInfo"
    />
  </section>
</div>
</template>

<script>
import Wg from '../helpers/Wg';
import PlayerData from '../components/PlayerData'
import ServerSelector from '../components/ServerSelector'
export default {
  name: 'Player',
  data() {
    return {
        server: 'eu',
        // accountId: null,
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
    async searchAccountId(event){
      Wg.getPlayerId(this.server, event.target.value)
      .then(response =>{
        if(response.status == 'ok'){
          this.isFound = true
          this.foundPlayers = response.data
          if(response.meta.count == 1){
            this.getPlayerDetails(this.foundPlayers[0].account_id)
            this.table = true
          }
        }
      })
    },
    searchPlayerDetails(event){
      this.getPlayerDetails(event.target.value)
      this.table = true
    },
    getPlayerDetails(account_id){
      Wg.getPlayerData(this.server, account_id)
      .then(result =>{ this.playerInfo = result} )
      .catch(error => console.log(error))
    }

  }
}
</script>
