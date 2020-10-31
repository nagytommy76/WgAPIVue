import BaseUrlClass from '../BaseUrlClass';
import axios from 'axios'

export default class Vehicle extends BaseUrlClass{
    static async getAllVehicles(server = 'eu', nation, incomingTier, type, displayFields = ''){
        const tier = incomingTier === 0 ? '' : incomingTier
        const url = this.getVehicleUrl(server, 'vehicles', displayFields, nation, tier, type);
        return axios.get(url)
    }

    static async getTankopediaInformation(server = 'eu', fields = ''){
        const url = this.getVehicleUrl(server, 'info', fields)
        return axios.get(url);
    }

    static async getVehicleCharacteristics(tank_id){
        const url = this.getVehicleCharacteristicsUrl('vehicleprofile', tank_id)
        return axios.get(url)
    }

    static async getVehicleModules(module_id){
        const url = this.getVehicleModule(module_id)
        return axios.get(url)
    }   
}