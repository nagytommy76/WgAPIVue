<template>
    <section class="vehicle-data">
        <div class="table-view">
            <TableHeader />
            <div class="table-view-body">
                <ListItem 
                    v-for="vehicle in vehicles" :key="vehicle.tank_id"  
                    @click="openVehicleModalOrPlayerStat(vehicle.tank_id, $event)"
                    :contourIcon="vehicle.images.contour_icon"
                    :vehicleName="vehicle.name"
                    :VehicleTier="vehicle.tier"
                    :profileHp="vehicle.default_profile.hp"
                    :gunAimTime="vehicle.default_profile.gun.aim_time"
                    :gunDispersion="vehicle.default_profile.gun.dispersion"
                    :weight="vehicle.default_profile.weight"
                    :playerStatWithVehicle="playersVehicleStat[vehicle.tank_id]"
                    :tankId="vehicle.tank_id"
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
import VehicleModal from './VehicleModal/VehicleModal'
import ListItem from './VehicleList/VehicleListItem'
import TableHeader from './VehicleList/VehicleTableHeader'

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
        TableHeader,
    },
    data() {
        return {
            showVehicleModal : false,
            // selectedVehicle: this.vehicles.data,
            selectedVehicleId: 0,
        }
    },
    methods: {
        openVehicleModalOrPlayerStat(vehicleID, event){
            this.selectedVehicleId = parseInt(vehicleID)
            if (!event.target.classList.value.includes('player-stat') && event.target.className !== 'btn btn-primary') {
                this.showVehicleModal = true 
            }
        },
    },
}
</script>