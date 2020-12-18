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

    static testing(vehicleModules,vehicleModuleCategory){
        const type = `vehicle${vehicleModuleCategory.charAt(0).toUpperCase() + vehicleModuleCategory.slice(1)}`
        for (const modules of Object.values(vehicleModules[vehicleModuleCategory])) {          
            if (modules.type === type) {
                console.log(modules)
            }
        }
    }

    static returnVehicleModulesByModuleID(module_id, vehicleModules){
        let result = [];
        // console.log(module_id)
            for (const modules of Object.values(vehicleModules)) {
                if(modules.find((element) => element.module_id === module_id) !== undefined){
                    // console.log(modules)
                    result = modules.find((element) => element.module_id === module_id)
                }            
            }
            return result
    }

    // this.vehicleModules[vehicleModuleCategory]
    static returnVehicleModulesByFirstModuleFind(vehicleModules, vehicleModuleCategory){
        const type = `vehicle${vehicleModuleCategory.charAt(0).toUpperCase() + vehicleModuleCategory.slice(1)}`
        const foundElements = vehicleModules.filter(element => element.type === type)
        // console.log(foundElements.length -1)
        return foundElements.length -1
        // for (const [index, modules] of Object.entries(vehicleModules)) {
        //     if (modules.type == type) {
        //         // console.log(modules)
        //         return parseInt(index)
        //     }
        // }
    }


}