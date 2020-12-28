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
                    this.$emit('selected-engineid', module_id)
                    this.$emit('get-tank-characteristics' ,module_id, moduleType, vehicleModuleCategory)
                    break
                case 'vehicleGun':
                    this.$emit('selected-gunid', module_id)                       
                    this.$emit('get-tank-characteristics' ,module_id, moduleType, vehicleModuleCategory)                   
                    break
                case 'vehicleRadio' :
                    this.$emit('selected-radioid', module_id)
                    this.$emit('get-tank-characteristics' ,module_id, moduleType, vehicleModuleCategory)
                    break
                case 'vehicleChassis' :
                    this.$emit('selected-suspensionid', module_id)
                    this.$emit('get-tank-characteristics' ,module_id, moduleType, vehicleModuleCategory)
                    break
                case 'vehicleTurret' :
                    this.$emit('selected-turretid', module_id)
                    this.$emit('get-tank-characteristics' ,module_id, moduleType, vehicleModuleCategory)                      
                    break
            }
        }
    },
    props:{
        modules: Object,
    },
}
</script>