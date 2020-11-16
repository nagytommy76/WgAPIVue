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
    name: 'Tooltip',
    props:{
        text: String,
    },
}
</script>