import BaseUrlClass from '../BaseUrlClass';
import axios from 'axios'

export default class Vehicle extends BaseUrlClass{
    static async getAllVehicles(server = 'eu', nation, incomingTier, type, displayFields = '', tank_id = ''){
        const tier = incomingTier === 0 ? '' : incomingTier
        const url = this.getVehicleUrl(server, 'vehicles', displayFields, nation, tier, type, tank_id);
        return axios.get(url)
    }

    static async getTankopediaInformation(server = 'eu', fields = ''){
        const url = this.getVehicleUrl(server, 'info', fields)
        return axios.get(url);
    }

    // engine_id = '', gun_id = '', radio_id = '', suspension_id = '', turret_id = ''
    static async getVehicleCharacteristics(tank_id, selectedVehicleModulesId = {}){
        const url = this.getVehicleCharacteristicsUrl('vehicleprofile',tank_id, selectedVehicleModulesId)
        return axios.get(url)
    }

    static async getVehicleModules(module_id){
        const url = this.getVehicleModule(module_id)
        return axios.get(url)
    }   
}