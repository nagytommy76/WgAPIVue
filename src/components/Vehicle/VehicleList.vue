<template>
    <section class="vehicle-data">
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
                <ListItem 
                    v-for="vehicle in vehicles" :key="vehicle.tank_id"  
                    @click="openVehicleModal(vehicle.tank_id, $event)"
                    :contourIcon="vehicle.images.contour_icon"
                    :vehicleName="vehicle.name"
                    :VehicleTier="vehicle.tier"
                    :profileHp="vehicle.default_profile.hp"
                    :gunAimTime="vehicle.default_profile.gun.aim_time"
                    :gunDispersion="vehicle.default_profile.gun.dispersion"
                    :weight="vehicle.default_profile.weight"
                    :playerStatWithVehicle="playersVehicleStat[vehicle.tank_id]"
                />                 
            </div>
        </div>
        <transition name="fade" appear>
            <div class="fade-in" v-if="showVehicleModal" @click="showVehicleModal = false"></div>
        </transition>
        <transition name="modal" appear>
            <VehicleModal 
                v-if="showVehicleModal"
                @close="showVehicleModal = false"
                :allVehicles="allVehicles"
                :vehicleId="selectedVehicleId"
            />
        </transition>
    </section>
</template>
<script>
import VehicleModal from './VehicleModal'
import ListItem from './VehicleModalComponents/VehicleListItem'
export default {
    name: 'Vehicle List',
    props: {
        vehicles: Object,
        allVehicles: Object,
        playersVehicleStat: Object,
    },
    components:{
        VehicleModal,
        ListItem,
    },
    data() {
        return {
            showVehicleModal : false,
            selectedVehicle: this.vehicles.data,
            selectedVehicleId: 0,
        }
    },
    methods: {
        openVehicleModal(vehicleID, event){
            this.selectedVehicleId = parseInt(vehicleID)
            if (event.target.parentElement.className != 'tooltip-text' && event.target.className !== 'tooltip-text') {
                this.showVehicleModal = true 
            }
        },
    },
}
</script>