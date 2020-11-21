<template>
    <div class="specification-block">
        <h2 class="specification-title">Survivability</h2>
            <SingleDetail 
                :descriptionName="'Hit Points'"
                :specResult="Characteristics.hp"
                :unitName="'Hp'"
            />
            <MultiDetails 
                :descriptionName="'Hull Armor'"
                :firstSpec="Characteristics.armor.hull.front "
                :secondSpec="Characteristics.armor.hull.sides"
                :thirdSpec="Characteristics.armor.hull.rear"
                :unitName="'mm'"
            />
            <MultiDetails 
                v-if="Characteristics.armor.turret != null"
                :descriptionName="'Turret Armor'"
                :firstSpec="Characteristics.armor.turret.front "
                :secondSpec="Characteristics.armor.turret.sides"
                :thirdSpec="Characteristics.armor.turret.rear"
                :unitName="'mm'"
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
    }
}
</script>