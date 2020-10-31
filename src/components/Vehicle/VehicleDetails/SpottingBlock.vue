<template>
    <div class="specification-block">
        <h2 class="specification-title">Spotting</h2>
        <SingleDetail 
            :descriptionName="'View Range'"
            :specResult="Characteristics.turret.view_range"
            :unitName="'m'"
        />
        <SingleDetail 
            :descriptionName="'Signal Range'"
            :specResult="Characteristics.radio.signal_range"
            :unitName="'m'"
        />
    </div>
</template>
<script>
import SingleDetail from './DetailItems/SingleDetail'

export default {
    components:{
        SingleDetail,
    },
    props:{
        Characteristics: Object,
    }
}
</script>