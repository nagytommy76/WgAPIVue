<template>
    <div class="modal-background">
        <div class="modal">
            <div class="modal-head">
                <div @click="$emit('close')" class="close-modal"><i class="fas fa-times"></i></div>
                <div class="vehicle-head">
                    <img v-bind:src="vehicle.images.big_icon" class="vehicle-head-image">
                    <h1 class="vehicle-head-name">{{ vehicle.name }} {{ vehicle.nation }} {{ vehicle.type }}</h1>
                </div>
            </div>
            <div class="modal-body">
                <h1>TÖRZS</h1>
            </div>
            <div class="modal-footer">
                <h1>POTROH</h1>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        vehicle: Object,
    },
        
}
</script>