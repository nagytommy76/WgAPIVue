<template>
    <div class="table-view-body-row modal-open">
        <div class="tooltip">
        <div class="table-view-body-row-col full-size">
            <span class="vehicle-contour-icon">
                <img :src="contourIcon" />
            </span>
            <p class="vehicle-name">
                {{ vehicleName }}
            </p>
           <div class="tooltip-text">
                <span>semmi</span>
                <button @click="test()">TESZT</button>
            </div>
        </div>
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
    // Ide szeretnék egy tooltip-et ami a win rate-et jeleníti meg akkor, ha be vagyok lépve és a tank a garázsban van
    // ha nincs a garázsban nem jelenik meg
    // majd egy gomb megnyomásával megnyitok egy újabb modal-t ahová az adott tankkal elért achivementek kerülnek
    name: 'Vehicle List Item',
    props: {
        contourIcon: String,
        vehicleName: String,
        VehicleTier: Number,
        profileHp: Number,
        gunAimTime: Number,
        gunDispersion: Number,
        weight: Number
    },
    methods:{
        test(){
            console.log('cvsá')
        }
    }
}
</script>