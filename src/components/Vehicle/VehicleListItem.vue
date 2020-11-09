<template>
    <div class="table-view-body-row modal-open">
        <div class="table-view-body-row-col full-size">
            <span class="vehicle-contour-icon">
                <img :src="contourIcon" />
            </span>
            <p class="vehicle-name">
                {{ vehicleName }}
            </p>
        </div>
        <div class="table-view-body-row-col flex-centered">
            {{ VehicleTier }}
        </div>
        <div class="table-view-body-row-col flex-centered">
            {{ profileHp }} HP
        </div>
        <div class="table-view-body-row-col flex-centered">
            {{ gunAimTime }} s
        </div>
        <div class="table-view-body-row-col flex-centered">
            {{ gunDispersion }}
        </div>
        <div class="table-view-body-row-col flex-centered">
            {{ weight }} T
        </div>
    </div>
</template>
<script>
export default {
    name: 'Vehicle List Item',
    props: {
        contourIcon: String,
        vehicleName: String,
        VehicleTier: Number,
        profileHp: Number,
        gunAimTime: Number,
        gunDispersion: Number,
        weight: Number
    }
}
</script>