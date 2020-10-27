import BaseUrlClass from '../BaseUrlClass';
import axios from 'axios'

export default class Vehicle extends BaseUrlClass{
    static async getAllVehicles(server = 'eu', nation, incomingTier, type, displayFields = ''){
        const tier = incomingTier === 0 ? '' : incomingTier
        const url = this.getVehicleUrl(server, 'vehicles', displayFields, nation, tier, type);
        return axios.get(url)
    }

    // https://api.worldoftanks.eu/wot/encyclopedia/info/?application_id=1ebc47797ed02032c3c5489cbba60f6c
    static async getTankopediaInformation(server = 'eu', fields = ''){
        const url = this.getVehicleUrl(server, 'info', fields)
        return axios.get(url);
    }
}