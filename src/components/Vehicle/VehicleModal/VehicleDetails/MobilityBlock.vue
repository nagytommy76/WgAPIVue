<template>
    <div class="specification-block">
        <h2 class="specification-title">Mobility</h2>
        <SingleDetail 
            :descriptionName="'Engine Power'"
            :specResult="Characteristics.engine.power"
            :unitName="'Hp'"
        />
        <SingleDetail 
            :descriptionName="'Top Speed'"
            :specResult="Characteristics.speed_forward"
            :unitName="'Km/h'"
        />
        <SingleDetail 
            :descriptionName="'Backward Speed'"
            :specResult="Characteristics.speed_backward"
            :unitName="'Km/h'"
        />
        <SingleDetail 
            :descriptionName="'Tank Traverse Speed'"
            :specResult="Characteristics.suspension.traverse_speed"
            :unitName="'deg/s'"
        />
        <SingleDetail 
            :descriptionName="'Turret Traverse Speed'"
            :specResult="Characteristics.turret.traverse_speed"
            :unitName="'deg/s'"
        />
        <MultiDetails 
            :descriptionName="'Weight/Load Limit'"
            :firstSpec="weightInTonn"
            :secondSpec="weightLimitInTonn"
            :unitName="'t'"
        />
    </div>
</template>
<script>
import SingleDetail from './DetailItems/SingleDetail'
import MultiDetails from './DetailItems/MultiDetails'

export default {
    components:{
        SingleDetail,
        MultiDetails
    },
    props:{
        Characteristics: Object,
    },
    computed:{
        weightInTonn(){
            return parseFloat((this.Characteristics.weight / 1000).toFixed(2))
        },
        weightLimitInTonn(){
            return parseFloat((this.Characteristics.suspension.load_limit / 1000).toFixed(2))
        }
    },
}
</script>