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

    static getType(vehicleModuleCategory){
        return `vehicle${vehicleModuleCategory.charAt(0).toUpperCase() + vehicleModuleCategory.slice(1)}`
    }

    static isDifferentModules(vehicleModules,vehicleModuleCategory){
        const type = this.getType(vehicleModuleCategory)
        for (const modules of Object.values(vehicleModules[vehicleModuleCategory])) {          
            if (modules.type !== type) {
               return true
            }
        }
        return false
    }

    static returnVehicleModulesByModuleID(module_id, vehicleModules){
        let result = [];
        for (const modules of Object.values(vehicleModules)) {
            const foundElement = modules.find((element) => element.module_id === module_id)
            if(foundElement !== undefined){
                result = foundElement
            }            
        }
        return result
    }

    // this.vehicleModules[vehicleModuleCategory]
    static returnVehicleModulesByFirstModuleFind(vehicleModules, vehicleModuleCategory){
        const type = this.getType(vehicleModuleCategory)
        const foundElements = vehicleModules.filter(element => element.type === type)
        return foundElements.length -1
    }


}