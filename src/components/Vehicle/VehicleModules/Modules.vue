<template>
    <div class="modules-table">
        <div class="modules-table-row">
            <ModuleType 
                v-for="(engine, index) in modules.engines" :key="index"
                :modules="engine"
                @click="changeSelectedModules(engine.module_id, engine.type)"
            />
        </div>
        <div class="modules-table-row">
            <ModuleType 
                v-for="(gun, index) in modules.guns" :key="index"
                :modules="gun"
                @click="changeSelectedModules(gun.module_id, gun.type)"
            />
        </div>
        <div class="modules-table-row">
            <ModuleType 
                v-for="(radio,index) in modules.radios" :key="index"
                :modules="radio"
                @click="changeSelectedModules(radio.module_id, radio.type)"
            />
        </div>
        <div class="modules-table-row">
            <ModuleType 
                v-for="(suspension,index) in modules.suspensions" :key="index"
                :modules="suspension"
                @click="changeSelectedModules(suspension.module_id, suspension.type)"
            />
        </div>
        <div class="modules-table-row">
            <ModuleType 
                v-for="(turret, index) in modules.turrets" :key="index"
                :modules="turret"
                @click="changeSelectedModules(turret.module_id, turret.type)"
            />
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
                    this.$parent.getTankCharacteristics()
                    break
                case 'vehicleGun':
                    this.$parent.selectedVehicleModulesId.gun_id = module_id
                    this.$parent.getTankCharacteristics()
                    break
                case 'vehicleRadio' :
                    this.$parent.selectedVehicleModulesId.radio_id = module_id
                    this.$parent.getTankCharacteristics()
                    break
                case 'vehicleChassis' :
                    this.$parent.selectedVehicleModulesId.suspension_id = module_id
                    this.$parent.getTankCharacteristics()
                    break
                case 'vehicleTurret' :
                    this.$parent.selectedVehicleModulesId.turret_id = module_id
                    this.$parent.getTankCharacteristics()
                    break
            }
        }
    },
    props:{
        modules: Object,
    },
}
</script>