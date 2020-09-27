export default class WG{
    constructor(server, type, subType){
        this.application_id = '1ebc47797ed02032c3c5489cbba60f6c';
        this.server = server;
        this.type = type;
        this.subType = subType;
        
        this.url = `https://api.worldoftanks.${this.server}/wot/${type}/${subType}/?application_id=${this.application_id}`;
    }
}