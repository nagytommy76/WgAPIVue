<template>
    <div class="tooltip">
            <slot name="main"></slot>            
        <div class="tooltip-text">
            <span>{{ text }}</span>
            <slot name="optional"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Tooltip',
    props:{
        text: {
            type: String,
            required: false
        },
    },
}
</script>