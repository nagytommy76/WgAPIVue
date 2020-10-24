import BaseWgClass from './BaseWgClass';
import axios from 'axios'

export default class Vehicle extends BaseWgClass{
    static async getAllVehicles(server = 'eu'){
        const url = this.getBasicUrl(server, 'encyclopedia', 'vehicles');
        return await axios.get(url)
    }
}