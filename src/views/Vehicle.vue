<template>
    <div class="vehicle container">
        <section class="vehicleSearch">
            <div class="card card-dark">
            <h1 class="card-title">Searching Vehicles</h1>
            <div class="card-form">
                <div class="form-group">
                    <label for="tank_nation">
                        Vehicle Nation </label>
                        <select @change="getVehicles" v-model="selectedNation" class="form-control" name="tank_nation" id="tank_nation">
                            <option value="">None</option>
                            <option value="ussr">USSR</option>
                            <option value="usa">USA</option>
                            <option value="germany">Germany</option>
                            <option value="uk">UK</option>
                            <option value="france">France</option>
                            <option value="japan">Japan</option>
                            <option value="italy">Italy</option>
                            <option value="sweden">Sweden</option>
                            <option value="poland">Poland</option>
                            <option value="czech">Czechoslovakia</option>
                            <option value="china">China</option>
                        </select>
                    <label for="tank_name">Vehicle Type</label>
                    <select @change="getVehicles" class="form-control" v-model="selectedType" name="tank_type" id="tank_type">
                        <option value="">None</option>
                        <option value="heavyTank">Heavy Tank</option>
                        <option value="mediumTank">Medium Tank</option>
                        <option value="lightTank">Light Tank</option>
                        <option value="AT-SPG">Tank Destroyer</option>
                        <option value="SPG">Artilery (SPG)</option>
                    </select>

                    <label for="tier">Vehicle Tier (1-10)</label>
                    <input @change="getVehicles" v-model="selectedTier" class="form-control" type="number" name="tier" id="tier" min="1" max="10">
                </div>
            </div>
            </div>
        </section>
        <VehicleData
            v-if="showVehicleList"
            :vehicles="vehicles"
            :allVehicles="allVehicles"
        />
    </div>
</template>
<script>
import Vehicle from '../WGClass/Tankopedia/Vehicle'

import VehicleData from '../components/Vehicle/VehicleData'
export default {
    name: 'Vehicle',
    data() {
        return {
            selectedNation: '',
            tempNation: '',
            selectedType: '',
            selectedTier: 0,
            vehicles: [],
            allVehicles: {},
            showVehicleList: false,
        }
    },
    components:{
        VehicleData,
    },
    methods:{
        async getVehicles(){
            // Felesleges többször lekérni
            if (Object.keys(this.allVehicles).length === 0 || this.tempNation != this.selectedNation) {
                await Vehicle.getAllVehicles('eu', this.selectedNation, '', '')
                .then(all => {
                    this.allVehicles = all.data.data                    
                    this.tempNation = this.selectedNation
                })
            }                 
            // Lekérem az összes tankot az adott nemzetből
            await Vehicle.getAllVehicles('eu', this.selectedNation, this.selectedTier, this.selectedType)
            .then(filteredVehicles => {
                this.vehicles = filteredVehicles.data.data
                this.showVehicleList = true
            })
        },
    }
}
</script>