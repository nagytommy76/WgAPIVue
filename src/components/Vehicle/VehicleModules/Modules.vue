<template>
    <div class="modules-table">
        <div class="modules-table-row">
            <ModuleType 
                v-for="(engine, index) in modules.engines" :key="index"
                :modules="engine"
            />
        </div>
        <div class="modules-table-row">
            <ModuleType 
                v-for="(gun, index) in modules.guns" :key="index"
                :modules="gun"
            />
        </div>
        <div class="modules-table-row">
            <ModuleType 
                v-for="(radio,index) in modules.radios" :key="index"
                :modules="radio"
            />
        </div>
        <div class="modules-table-row">
            <ModuleType 
                v-for="(suspension,index) in modules.suspensions" :key="index"
                :modules="suspension"
            />
        </div>
        <div class="modules-table-row">
            <ModuleType 
                v-for="(turret, index) in modules.turrets" :key="index"
                :modules="turret"
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
    props:{
        modules: Object,
    },
}
</script>