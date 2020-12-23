<template>
    <div class="private-info">
        <h1>Private informations</h1>
        <h3>Premium expires at: {{timestampConvert(privateData.premium_expires_at)}}</h3>
        <div class="battle_statics">
            <div class="stat_item">
                <span class="stat_value">{{ privateData.credits }}</span>
                <span class="stat_text">Credits</span>
            </div>

            <div class="stat_item">
                <span class="stat_value">{{ privateData.free_xp }}</span>
                <span class="stat_text">Free experience</span> 
            </div>

            <div class="stat_item">
                <span class="stat_value">{{ privateData.bonds }}</span>
                <span class="stat_text">Bonds</span>
            </div>

            <div class="stat_item">
                <span class="stat_value">{{ privateData.gold }}</span>
                <span class="stat_text">Gold</span>
            </div>  
        </div>
    </div>
</template>
<script>
export default {
    name: 'PrivateData',
    props:{
        privateData: Object,
        timestampConvert: Function,
    }
}
</script>