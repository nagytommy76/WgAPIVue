<template>
    <div class="modules-item">
        <span class="modules-item-level">
            {{modules.tier}}
        </span>
        <span class="modules-item-selected" v-if="selected">
            <i class="fas fa-check"></i>
        </span>
        <div class="modules-item-image">
            <img v-bind:src="modules.image">
        </div>
        <p class="modules-item-description">
            {{modules.name}}
        </p>
    </div>
</template>
<script>
export default {
    name: 'ModuleType',
    props: {
        modules: Object,
    },
    computed: {
        selected(){
            return Object.values(this.$parent.$parent.selectedVehicleModulesId).find((item) =>{
                return item == this.modules.module_id
            }) ? true : false
        }
    },
}
</script>