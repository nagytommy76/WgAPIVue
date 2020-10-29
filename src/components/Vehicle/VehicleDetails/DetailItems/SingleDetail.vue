<template>
    <div class="specification-item">
        <span class="specification-description">{{ descriptionName }}</span>
        <span class="specification-result">{{ specResult }} {{unitName}}</span>
    </div>
</template>
<script>
export default {
    props:{
        descriptionName: String,
        specResult: String,
        unitName: String
    },
}
</script>