export default class BaseWgClass{
    static getAppId(){
        return '1ebc47797ed02032c3c5489cbba60f6c'
    }
    static getBasicUrl(server = 'eu', method_block, method_name, search_field = '', account_id = '', access_token= ''){
        return `https://api.worldoftanks.${server}/wot/${method_block}/${method_name}/?application_id=${this.getAppId()}&search=${search_field}&account_id=${account_id}&access_token=${access_token}`;
    }

    static getAuthUrl(server = 'eu', method = 'login'){
        return `https://api.worldoftanks.${server}/wot/auth/${method}/?application_id=${this.getAppId()}&redirect_uri=http://localhost:8080/login`;
    }
}