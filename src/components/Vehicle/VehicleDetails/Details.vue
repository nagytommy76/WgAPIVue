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
                        {{ Characteristics.armor.hull }} /
                        {{ Characteristics.armor.hull }} /
                        {{ Characteristics.armor.hull }} mm
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
import Vehicle from '../../../WGClass/Tankopedia/Vehicle'

export default {
    components:{
        SingleDetail,
    },
    props:{
        // Characteristics: Object,
        tank_id: String,
    },
    data() {
        return {
            Char: {}
        }
    },
    computed:{
        Characteristics: {
            get(){
                return this.Char;
            },
            set(value){
                this.Char = value;
            }
        }
    },
    mounted(){
        // this.getTankCharacteristics()
    },
    methods:{
        async getTankCharacteristics(){
            await Vehicle.getVehicleCharacteristics(this.tank_id)
            .then(characteristics => {
                this.Characteristics = characteristics.data.data[this.tank_id]
                console.log(characteristics)
            })
        },
    },
}
</script>