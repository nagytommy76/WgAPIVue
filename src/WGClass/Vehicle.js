import BaseUrlClass from './BaseUrlClass';
import axios from 'axios'

export default class Vehicle extends BaseUrlClass{
    static async getAllVehicles(server = 'eu', nation, incomingTier, type, displayFields = ''){
        const tier = incomingTier === 0 ? '' : incomingTier
        const url = this.getVehicleUrl(server, 'vehicles', displayFields, nation, tier, type);
        return await axios.get(url)
    }
}