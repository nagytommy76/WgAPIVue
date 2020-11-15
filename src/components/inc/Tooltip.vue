<template>
    <div class="tooltip">
            <slot></slot>            
        <div class="tooltip-text">
            <span>{{ text }}</span>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        text: String
    },
    created() {
        console.log('?????????????????')
    },
    mounted() {
        console.log(this.$slots)
    },
}
</script>
