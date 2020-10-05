<template>
    <div class="private-info">
        <h1>Private informations</h1>
        <h3>Premium expires at: {{timestampConvert(privateData.premium_expires_at)}}</h3>
        <p>Credits: {{ privateData.credits }}</p>
        <p>Free experience: {{ privateData.free_xp }}</p>
        <p>Bonds: {{ privateData.bonds }}</p>
        <p>Gold: {{ privateData.gold }}</p>
        <p v-show="privateData.restrictions != null">Chat ban time until: {{timestampConvert(privateData.restrictions.chat_ban_time)}}</p>
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