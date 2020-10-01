export default class Player{ 
    static async getPlayerId(server, playerNick){
        let url = `https://api.worldoftanks.${server}/wot/account/list/?application_id=1ebc47797ed02032c3c5489cbba60f6c&search=${playerNick}`;
        let response = await fetch(url, {
            method: 'GET'
        })
        return await response.json();
    }

    static async getPlayerData(server, account_id){
        let url = `https://api.worldoftanks.${server}/wot/account/info/?application_id=97f4b2c203d63f5db6fd508661fe5ba8&account_id=${account_id}`
        let response = await fetch(url, {
            method: 'GET'
        })
        return await response.json();
    }
}