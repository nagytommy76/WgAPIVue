export default class Player{
    static getModuleTypeName(module_type){
        let test = ''
        switch (module_type) {
            case 'vehicleTurret':
                test = 'turret'
                break
            case 'vehicleRadio':
                test = 'radio'
                break
            case 'vehicleGun':
                test = 'gun'
                break
            case 'vehicleEngine':
                test = 'engine'
                break
        }
        return test
    }

    static returnVehicleModulesByModuleID(module_id, vehicleModules){
        let result = [];
            for (const modules of Object.values(vehicleModules)) {
                if(modules.find((element) => element.module_id === module_id) !== undefined){
                    result = modules.find((element) => element.module_id === module_id)
                }            
            }
            return result
    }
}