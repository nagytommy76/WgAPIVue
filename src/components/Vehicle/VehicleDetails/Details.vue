<template>
    <div class="specification">
        <div class="specification-row">
            <FirepowerBlock 
                :Characteristics="Characteristics"
            />
            <MobilityBlock 
                :Characteristics="Characteristics"
            />
        </div>
        <div class="specification-row">
            <SurvivabilityBlock 
                :Characteristics="Characteristics"
            />
            <SpottingBlock 
                :Characteristics="Characteristics"
            />
        </div>
    </div>
</template>
<script>
import SurvivabilityBlock from './SurvivabilityBlock'
import SpottingBlock from './SpottingBlock'
import FirepowerBlock from './FirepowerBlock'
import MobilityBlock from './MobilityBlock'
// import Vehicle from '../../../WGClass/Tankopedia/Vehicle'

export default {
    components:{
        SurvivabilityBlock,
        SpottingBlock,
        FirepowerBlock,
        MobilityBlock,
    },
    props:{
        Characteristics: Object,
        
    },
}
</script>