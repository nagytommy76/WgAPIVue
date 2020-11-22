<template>
<div class="left">
    <div class="modules-table">
        <div class="modules-table-row">
            <ModuleType 
                v-for="(engine) in modules.engines" :key="engine.module_id"
                :modules="engine"
                @click="changeSelectedModules(engine.module_id, engine.type)"
            />
        </div>
        <div class="modules-table-row">
            <ModuleType 
                v-for="(gun) in modules.guns" :key="gun.module_id"
                :modules="gun"
                @click="changeSelectedModules(gun.module_id, gun.type)"
            />
        </div>
        <div class="modules-table-row">
            <ModuleType 
                v-for="(radio) in modules.radios" :key="radio.module_id"
                :modules="radio"
                @click="changeSelectedModules(radio.module_id, radio.type)"
            />
        </div>
        <div class="modules-table-row">
            <ModuleType 
                v-for="(suspension) in modules.suspensions" :key="suspension.module_id"
                :modules="suspension"
                @click="changeSelectedModules(suspension.module_id, suspension.type)"
            />
        </div>
        <div class="modules-table-row">
            <ModuleType 
                v-for="(turret) in modules.turrets" :key="turret.module_id"
                :modules="turret"
                @click="changeSelectedModules(turret.module_id, turret.type)"
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
    data() {
        return {
            selectedEngine: '',
        }
    },
    methods: {
        changeSelectedModules(module_id, moduleType){
            switch(moduleType){
                case 'vehicleEngine' : 
                    this.$parent.selectedVehicleModulesId.engine_id = module_id
                    this.$parent.getTankCharacteristics(module_id, moduleType)
                    break
                case 'vehicleGun':
                    this.$parent.selectedVehicleModulesId.gun_id = module_id
                    this.$parent.getTankCharacteristics(module_id, moduleType)
                    break
                case 'vehicleRadio' :
                    this.$parent.selectedVehicleModulesId.radio_id = module_id
                    this.$parent.getTankCharacteristics(module_id,moduleType)
                    break
                case 'vehicleChassis' :
                    this.$parent.selectedVehicleModulesId.suspension_id = module_id
                    this.$parent.getTankCharacteristics(module_id,moduleType)
                    break
                case 'vehicleTurret' :
                    this.$parent.selectedVehicleModulesId.turret_id = module_id
                    this.$parent.getTankCharacteristics(module_id,moduleType)
                    break
            }
        }
    },
    props:{
        modules: Object,
    },
}
</script>