<template>
    <div class="player-stat-item">
        <span class="player-stat-item-description">{{ description }}</span>
        <span class="player-stat-item-result">{{ result }} <span>{{ optional }}</span></span>
    </div>
</template>
<script>
export default {
    name: 'Player Stat Item',
    props:{ 
        description: String,
        result: String,
        optional: {
            type: String,
            required: false
        },
    }
}
</script>