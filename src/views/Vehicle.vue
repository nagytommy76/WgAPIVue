<template>
    <div class="vehicle container">
        <section class="vehicleSearch">
            <div class="card card-dark">
            <h1 class="card-title">Searching Vehicles</h1>
            <h5><sup>*</sup> Please select a nation and a type</h5>
            <div class="card-form">
                <div class="form-group">
                    <label for="tank_nation">
                        Vehicle Nation </label>
                        <select v-model="selectedNation" class="form-control" name="tank_nation" id="tank_nation">
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
                    <select class="form-control" v-model="selectedType" name="tank_type" id="tank_type">
                        <option value="">None</option>
                        <option value="heavyTank">Heavy Tank</option>
                        <option value="mediumTank">Medium Tank</option>
                        <option value="lightTank">Light Tank</option>
                        <option value="AT-SPG">Tank Destroyer</option>
                        <option value="SPG">Artilery (SPG)</option>
                    </select>
                    <label for="tier">Vehicle Tier (1-10)</label>
                    <input v-model="selectedTier" class="form-control" type="number" name="tier" id="tier" min="1" max="10">
                    <div class="form-control">
                        <div class="btn btn-primary" @click="getVehicles()" v-if="selectedNation != '' && selectedType != ''">Search</div>
                    </div>
                </div>
            </div>
            </div>
        </section>
        <VehicleList
            v-if="showVehicleList"
            :allVehicles="allVehicles"
            :vehicles="vehicles"
            :playersVehicleStat="playersVehicleStat"
        />
    </div>
</template>
<script>
import Vehicle from '../WGClass/Tankopedia/Vehicle'
import VehicleList from '../components/Vehicle/VehicleList'

import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
    name: 'Vehicle',
    data() {
        return {
            selectedNation: '',
            tempNation: '',
            selectedType: '',
            selectedTier: '',
            vehicles: {},
            allVehicles: {},
            showVehicleList: false,

            playersVehicleStat: {},
        }
    },
    components:{
        VehicleList,
    },
    computed:{
        ...mapGetters({
            account_id: 'getAccountId'
        })
    },
    methods:{
        async getVehicles(){
            // Lekérem a keresett tankokat
            await Vehicle.getAllVehicles('eu', this.selectedNation, this.selectedTier, this.selectedType)
            .then(filteredVehicles => {
                this.vehicles = filteredVehicles.data.data              
            })

            // Felesleges többször lekérni, az összes tankot. Nation és Type alapján az összes
            // Le kell kérni az adott nemzethez tartozó össze stankot mert a techTree-nél lehet, hogy heavy után pl TD jön
            if (Object.keys(this.allVehicles).length === 0 || this.tempNation != this.selectedNation) {
                await Vehicle.getAllVehicles('eu', this.selectedNation)
                .then(all => {
                    this.allVehicles = all.data.data                    
                    this.tempNation = this.selectedNation
                })
            }  
            
            if(this.account_id != null){
                await axios.get(`https://api.worldoftanks.eu/wot/tanks/stats/?application_id=1ebc47797ed02032c3c5489cbba60f6c&account_id=${this.account_id}&tank_id=${this.createVehicleIdsArray()}&fields=all,max_xp,in_garage,max_frags,mark_of_mastery,tank_id`).then(playerStat =>{
                    // Ha nincs error és van statisztika a tankokkal
                    if (playerStat.data.status !== 'error' && playerStat.data.data[this.account_id] !== null) {
                        this.getInfo(playerStat.data.data[this.account_id])                    
                    }
                })
            }
            this.showVehicleList = true 
        },
        // Az elemek key a tank_id legyen
        getInfo(playerStat){
            this.playersVehicleStat = {}
            playerStat.forEach((item) =>{
                this.playersVehicleStat[item.tank_id] = item
            })
        },
        // Az összes talált tank id-jét visszaküldöm
        createVehicleIdsArray(){
            let stringIDs = []
            for (const key in this.vehicles) {
                stringIDs.push(key)
            }
            return stringIDs
        },
    }
}
</script>