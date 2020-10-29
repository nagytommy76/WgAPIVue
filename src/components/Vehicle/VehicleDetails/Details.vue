<template>
    <div class="specification">
        <div class="specification-row">
            <div class="specification-block">
                <h2 class="specification-title">SURVIVABILITY</h2>
                <SingleDetail 
                    :descriptionName="'Hit Points'"
                    :specResult="Characteristics.hp"
                    :unitName="'Hp'"
                />
                <!-- <div class="specification-item">
                    <span class="specification-description">Hit Points:</span>
                    <span class="specification-result">{{ Characteristics.hp }} Hp</span>
                </div> -->
                <div class="specification-item">
                    <span class="specification-description">Hull Armor:</span>
                    <span class="specification-result">
                        {{ Characteristics.armor.hull.front }} /
                        {{ Characteristics.armor.hull.sides }} /
                        {{ Characteristics.armor.hull.rear }} mm
                    </span>
                </div>
                <!-- <div class="specification-item">
                    <span class="specification-description">Turret Armor:</span>
                    <span class="specification-result">
                        {{ Characteristics.armor.turret.front }} /
                        {{ Characteristics.armor.turret.sides }} /
                        {{ Characteristics.armor.turret.rear }} mm
                    </span>
                </div> -->
            </div>
        </div>
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
    },
    data() {
        return {
            
        }
    },
    computed:{

    },
}
</script>