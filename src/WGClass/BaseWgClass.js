export default class BaseWgClass{
    static getAppId(){
        return '1ebc47797ed02032c3c5489cbba60f6c'
    }
    static getBasicUrl(server = 'eu', method_block, method_name, search_field = '', account_id = ''){
        return `https://api.worldoftanks.${server}/wot/${method_block}/${method_name}/?application_id=${this.getAppId()}&search=${search_field}&account_id=${account_id}`;
    }

    static getAuthUrl(server = 'eu'){
        return `https://api.worldoftanks.${server}/wot/auth/login/?application_id=${this.getAppId()}&redirect_uri=http://localhost:8080/login`;
    }
}