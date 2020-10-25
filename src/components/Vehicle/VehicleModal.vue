<template>
    <div class="modal-background">
        <div class="modal">
            <span @click="$emit('close')" class="close-modal"><i class="fas fa-times"></i>BEZÁRÁS</span>
            <div class="modal-head">
                <h1>FEJ</h1>
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