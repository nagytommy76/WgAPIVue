<template>
    <section class="vehicle-data">
        <!-- <h1 class="main-title">Tank Adatok</h1> -->
        <div class="table-view">
            <div class="table-view-header">
                <div class="table-view-header-row full-size">Vehicle Name</div>
                <div class="table-view-header-row flex-centered">Vehicle Tier</div>
                <div class="table-view-header-row flex-centered">Hit Points</div>
                <div class="table-view-header-row flex-centered">Aim Time</div>
                <div class="table-view-header-row flex-centered">Dispersion</div>
                <div class="table-view-header-row flex-centered">Weight</div>
            </div>
            <div class="table-view-body">
                <div class="table-view-body-row modal-open" v-for="(vehicle, index) in vehicles.data" :key="index"  @click="test(index)">
                    <div class="table-view-body-row-col full-size">
                        <span class="vehicle-contour-icon">
                            <img :src="vehicle.images.contour_icon" />
                        </span>
                        <p class="vehicle-name">
                            {{ vehicle.name }}
                        </p>
                    </div>
                    <div class="table-view-body-row-col flex-centered">
                        {{ vehicle.tier }}
                    </div>
                    <div class="table-view-body-row-col flex-centered">
                        {{ vehicle.default_profile.hp }} HP
                    </div>
                    <div class="table-view-body-row-col flex-centered">
                        {{ vehicle.default_profile.gun.aim_time }} s
                    </div>
                    <div class="table-view-body-row-col flex-centered">
                        {{ vehicle.default_profile.gun.dispersion }}
                    </div>
                    <div class="table-view-body-row-col flex-centered">
                        {{ vehicle.default_profile.weight }} T
                    </div>
                </div>
            </div>
        </div>

        <transition name="fade" appear>
            <div class="fade-in" v-if="showVehicleModal" @click="showVehicleModal = false"></div>
        </transition>
        <transition name="modal" appear>
            <VehicleModal 
            :vehicle="selectedVehicle" @close="showVehicleModal = false" v-if="showVehicleModal" 
            />
        </transition>
    </section>
</template>
<script>
import VehicleModal from './VehicleModal'

export default {
    props: {
        vehicles: Object,
    },
    components:{
        VehicleModal,
    },
    computed:{
    },
    data() {
        return {
            showVehicleModal : false,
            selectedVehicle: {},
            vehicleCharacteristics: {}
        }
    },
    methods: {
        async test(vehicleID){
            this.selectedVehicle = this.vehicles.data[vehicleID]
            this.showVehicleModal = true
        },
    },
}
</script>