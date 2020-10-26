import BaseUrlClass from './BaseUrlClass';

export default class Player extends BaseUrlClass{ 
    static async getPlayerId(server, playerNick){
        let url = this.getPlayerUrl(server, 'account', 'list', playerNick)
        let response = await fetch(url, {
            method: 'GET'
        })
        return await response.json();
    }

    static async getPlayerData(server, account_id, access_token = ''){
        let response = await fetch(
        this.getPlayerUrl(server, 'account', 'info', '', account_id, access_token), 
        {
            method: 'GET'
        })
        return await response.json();
    }
}