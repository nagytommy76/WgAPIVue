export default class BaseUrlClass{
    static getAppId(){
        return '1ebc47797ed02032c3c5489cbba60f6c'
    }
    static getPlayerUrl(server = 'eu', method_block, method_name, search_field = '', account_id = '', access_token= ''){
        return `https://api.worldoftanks.${server}/wot/${method_block}/${method_name}/?application_id=${this.getAppId()}&search=${search_field}&account_id=${account_id}&access_token=${access_token}`;
    }

    static getAuthUrl(server = 'eu', method = 'login'){
        return `https://api.worldoftanks.${server}/wot/auth/${method}/?application_id=${this.getAppId()}&redirect_uri=http://localhost:8080/login`;
    }

    static getVehicleUrl(server = 'eu', method_name, fields = '', nation = '', tier = '', type = ''){
        return `https://api.worldoftanks.${server}/wot/encyclopedia/${method_name}/?application_id=${this.getAppId()}&fields=${fields}&nation=${nation}&tier=${tier}&type=${type}`
    }


}