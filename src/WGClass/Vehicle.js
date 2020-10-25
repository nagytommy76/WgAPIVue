import BaseWgClass from './BaseWgClass';
import axios from 'axios'

export default class Vehicle extends BaseWgClass{
    static async getAllVehicles(server = 'eu', nation, incomingTier, type){
        const tier = incomingTier === 0 ? '' : incomingTier
        const url = this.getVehicleUrl(server, 'vehicles', nation, tier, type);
        return await axios.get(url)
    }
}