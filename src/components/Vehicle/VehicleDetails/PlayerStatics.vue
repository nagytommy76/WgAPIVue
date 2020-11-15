<template>
    <div class="specification-block row">
        <h2 class="specification-title">Player Stats</h2>
        <div class="specification-item">
            <span class="specification-description">Wins</span>
            <span class="specification-result">
                55
            </span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Player Stat',
    props:{
        stat: Object,
    },
}
</script>