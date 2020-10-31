<template>
    <div class="specification-block">
        <h2 class="specification-title">Fire Power</h2>
        <MultiDetails 
            :descriptionName="'Damage'"
            :firstSpec="Characteristics.ammo[0].damage[1] "
            :secondSpec="Characteristics.ammo[1].damage[1]"
            :thirdSpec="Characteristics.ammo[2].damage[1]"
            :unitName="'mm'"
        />
        <MultiDetails 
            :descriptionName="'Armor Penetration'"
            :firstSpec="Characteristics.ammo[0].penetration[1] "
            :secondSpec="Characteristics.ammo[1].penetration[1]"
            :thirdSpec="Characteristics.ammo[2].penetration[1]"
            :unitName="'mm'"
        />
        <SingleDetail 
            :descriptionName="'Damage Per Minute'"
            :specResult="dmgPerMinute"
            :unitName="'Hp'"
        />
        <SingleDetail 
            :descriptionName="'Rate of Fire'"
            :specResult="Characteristics.gun.fire_rate"
            :unitName="'Rounds/min'"
        />
        <SingleDetail 
            :descriptionName="'Aim Time'"
            :specResult="Characteristics.gun.aim_time"
            :unitName="'s'"
        />
        <SingleDetail 
            :descriptionName="'Reload Time'"
            :specResult="Characteristics.gun.reload_time"
            :unitName="'s'"
        />
        <SingleDetail 
            :descriptionName="'Ammo Capacity'"
            :specResult="Characteristics.max_ammo"
            :unitName="'pcs'"
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
        dmgPerMinute(){
            return parseFloat((this.Characteristics.gun.fire_rate * this.Characteristics.ammo[0].damage[1]).toFixed(2))
        }
    },
}
</script>