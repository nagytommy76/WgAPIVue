<template>
    <div class="tech-tree-item">
        <div class="tech-tree-item-head">
            <h3>{{ tankName }}</h3>
            <img v-bind:src="image">
        </div>
        <div class="tech-tree-item-footer">
            <p>Credits: {{ priceCredits }}</p>
            <p>Research: {{ reserachExp }}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TechTreeItem',
    props: {
        tankName: String,
        image: String,
        priceCredits:{
            type: Number,
            required: false
        },
        reserachExp: {
            type: Number,
            required: false
        }
    }
}
</script>