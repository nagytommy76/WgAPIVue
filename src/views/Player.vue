<template>
  <div class="home">
    <h1>Searching players...</h1>
    <div class="form-group">
      <label for="server">Server</label>
      <select v-model="server" class="form-control" name="server" id="server">
        <option value="eu" selected>EU</option>
        <option value="ru">RU</option>
        <option value="com">NA</option>
        <option value="asia">ASIA</option>
      </select>
    </div>
    <div class="form-group">
      <label for="player">Player nickname</label>
      <input @keyup="searchUserId" class="form-control" type="text" name="player" id="player">
    </div>
    <div class="form-group" v-show="status">
      <label for="nicnname">Nicknames: </label>
      <select class="form-control" name="nicname" id="nicname" @change="searchPlayerDetails">
        <option 
          v-bind:value="nick.account_id"
          v-for="(nick, index) in data" :key="index">
            {{nick.nickname}}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import Wg from '../helpers/Wg';
export default {
  name: 'Players',
  data() {
    return {
        server: 'eu',
        playerId: null,
        status: false,
        data: [],
    }
  },
  components: {

  },
  methods:{
    async searchUserId(event){
      Wg.getPlayerId(this.server, event.target.value)
      .then(response =>{
        console.log(response)
        if(response.status == 'ok'){
          this.status = true
          this.data = response.data
          if(response.data.length == 1){
            console.log('ide ha egy találat van')
          }
        }
      })
    },
    async searchPlayerDetails(event){
      Wg.getPlayerData(this.server, event.target.value)
      .then(result =>{
        console.log(result)
      })
      // let semmi = 'https://api.worldoftanks.eu/wot/account/info/?application_id=97f4b2c203d63f5db6fd508661fe5ba8&account_id=511400957'
      // const wg = new Wg(this.server, 'account', 'info', 'search', event.target.value);
    },
  }
}
</script>
