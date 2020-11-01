<template>
    <div class="modules-table">
        <div class="modules-table-row">
            <div class="modules-item" v-for="(engine, index) in modules.engines" :key="index">
                <span class="modules-item-level">
                    {{engine.tier}}
                </span>
                <div class="modules-item-image">
                    <img v-bind:src="engine.image">
                </div>
                <p class="modules-item-description">
                    {{engine.name}}
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Modules Tree',
    data() {
        return {
            selectedEngine: '',
        }
    },
    props:{
        modules: Object,
    },
    mounted(){
        this.test()
    },
    methods:{
        test(){
            // for (const [key, modules] of Object.entries(this.modulesTree)) {
            //     console.log(key)
            //     console.log(modules.is_default);
            // }
        },
        test2(){
            
        },
    },
    // Végigmegyek a module tree-n, és azt megjelenítem a modules-al majd...
    // egy adott elemnél megnézem van-e next modules, ha van akkor arra megyek tovább
}
</script>