<template>
    <div class="modules-item">
        <span class="modules-item-level">
            {{modules.tier}}
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
    }
}
</script>