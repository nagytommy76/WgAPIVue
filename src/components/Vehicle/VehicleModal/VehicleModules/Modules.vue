<template>
<div class="left">
    <div class="modules-table">
        <div class="modules-table-row">
            <ModuleType 
                v-for="engine in modules.engine" :key="engine.module_id"
                :modules="engine"
                @click="changeSelectedModules(engine.module_id, engine.type, 'engine')"
            />
        </div>
        <div class="modules-table-row">
            <ModuleType 
                v-for="gun in modules.gun" :key="gun.module_id"
                :modules="gun"
                @click="changeSelectedModules(gun.module_id, gun.type, 'gun')"
            />
        </div>
        <div class="modules-table-row">
            <ModuleType 
                v-for="radio in modules.radio" :key="radio.module_id"
                :modules="radio"
                @click="changeSelectedModules(radio.module_id, radio.type, 'radio')"
            />
        </div>
        <div class="modules-table-row">
            <ModuleType 
                v-for="suspension in modules.suspension" :key="suspension.module_id"
                :modules="suspension"
                @click="changeSelectedModules(suspension.module_id, suspension.type, 'suspension')"
            />
        </div>
        <div class="modules-table-row">
            <ModuleType 
                v-for="turret in modules.turret" :key="turret.module_id"
                :modules="turret"
                @click="changeSelectedModules(turret.module_id, turret.type, 'turret')"
            />
        </div>
    </div>
</div>
</template>
<script>
import ModuleType from './ModuleTypes/ModuleType'

export default {
    name: 'Modules Tree',
    components:{
        ModuleType,
    },
    methods: {
        changeSelectedModules(module_id, moduleType, vehicleModuleCategory = ''){
            switch(moduleType){
                case 'vehicleEngine' : 
                    this.$parent.selectedVehicleModulesId.engine_id = module_id
                    this.$parent.getTankCharacteristics(module_id, moduleType, vehicleModuleCategory)
                    break
                case 'vehicleGun':
                    this.$parent.selectedVehicleModulesId.gun_id = module_id                        
                    this.$parent.getTankCharacteristics(module_id, moduleType, vehicleModuleCategory)                    
                    break
                case 'vehicleRadio' :
                    this.$parent.selectedVehicleModulesId.radio_id = module_id
                    this.$parent.getTankCharacteristics(module_id,moduleType, vehicleModuleCategory)
                    break
                case 'vehicleChassis' :
                    this.$parent.selectedVehicleModulesId.suspension_id = module_id
                    this.$parent.getTankCharacteristics(module_id,moduleType, vehicleModuleCategory)
                    break
                case 'vehicleTurret' :
                    this.$parent.selectedVehicleModulesId.turret_id = module_id
                    this.$parent.getTankCharacteristics(module_id,moduleType, vehicleModuleCategory)                        
                    break
            }
        }
    },
    props:{
        modules: Object,
    },
}
</script>