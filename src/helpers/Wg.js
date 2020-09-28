export default class WG{    
    getApplicationID(){
        return '1ebc47797ed02032c3c5489cbba60f6c';
    }

    static async getPlayerId(server, playerNick){
        let url = `https://api.worldoftanks.${server}/wot/account/list/?application_id=1ebc47797ed02032c3c5489cbba60f6c&search=${playerNick}`;
        console.log(url)
        let response = await fetch(url, {
            method: 'GET'
        })
        return await response.json();
    }

    static async getPlayerData(server, account_id){
        // https://api.worldoftanks.eu/wot/account/info/?application_id=97f4b2c203d63f5db6fd508661fe5ba8&account_id=511400957
        let url = `https://api.worldoftanks.${server}/wot/account/info/?application_id=97f4b2c203d63f5db6fd508661fe5ba8&account_id=${account_id}`
        let response = await fetch(url, {
            method: 'GET'
        })
        return await response.json();
    }
}