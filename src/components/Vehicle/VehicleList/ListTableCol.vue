<template>
    <div :class="`table-view-body-row-col ${className}`">
        <span>{{ data }} {{ optional }}</span>
        <slot name="optional"></slot>
    </div>
</template>
<script>
export default {
    name: 'Table Column',
    props:{
        className: {
            required: false,
            default: 'flex-centered',
            type: String,
        },
        optional:{
            type: String,
            required: false,
        },
        data:{
            type: String,
            required: false
        },
            
    },
}
</script>