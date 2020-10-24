<template>
    <div class="vehicle container">
        <section class="vehicleSearch">
            <div class="card card-dark">
            <h1 class="card-title">Searching Vehicles</h1>
            <div class="card-form">
                <div class="form-group">
                    <label for="tank_name">Vehicle Name</label>
                    <input class="form-control" type="text" name="tank_name" id="tank_name">
                    <label for="tier">Vehicle Tier</label>
                    <input class="form-control" type="number" name="tier" id="tier" min="1" max="10">
                </div>
            </div>
            </div>
        </section>
    </div>
</template>
<script>
import Vehicle from '../WGClass/Vehicle'
export default {
    data() {
        return {
            server: 'eu',
            vehicles: {},
        }
    },
    mounted(){
        this.test()
    },
    methods:{
        test(){
            Vehicle.getAllVehicles().then(result => console.log(result))
        }
    }
}
</script>