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

    static getVehicleCharacteristicsUrl(method_name, tank_id, engine_id = '', gun_id = '', radio_id = '', suspension_id = '', turret_id = ''){
        return `https://api.worldoftanks.eu/wot/encyclopedia/${method_name}/?application_id=${this.getAppId()}&tank_id=${tank_id}&engine_id=${engine_id}&gun_id=${gun_id}&radio_id=${radio_id}&suspension_id=${suspension_id}&turret_id=${turret_id}`
    }
    // https://api.worldoftanks.eu/wot/encyclopedia/modules/?application_id=1ebc47797ed02032c3c5489cbba60f6c&module_id=66068
    static getVehicleModule(module_id = ''){
        return `https://api.worldoftanks.eu/wot/encyclopedia/modules/?application_id=${this.getAppId()}&module_id=${module_id}`;
    }
}