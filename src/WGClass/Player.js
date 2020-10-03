import BaseWgClass from './BaseWgClass';

export default class Player extends BaseWgClass{ 
    static async getPlayerId(server, playerNick){
        let url = this.getBasicUrl(server, 'account', 'list', playerNick)
        let response = await fetch(url, {
            method: 'GET'
        })
        return await response.json();
    }

    static async getPlayerData(server, account_id){
        let response = await fetch(
        this.getBasicUrl(server, 'account', 'info', '', account_id), 
        {
            method: 'GET'
        })
        return await response.json();
    }
}