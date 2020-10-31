<template>
    <div class="specification-item">
        <span class="specification-description">{{descriptionName}}</span>
        <span class="specification-result">
            {{ firstSpec }} /
            {{ secondSpec }} /
            {{ thirdSpec }} {{unitName}}
        </span>
    </div>
</template>
<script>
export default {
    props:{
        descriptionName: String,
        firstSpec: String,
        secondSpec: String,
        thirdSpec:{
            required: false,
            type: String,
        },
        unitName: {
            required: false,
            type: String
        }
    },
}
</script>