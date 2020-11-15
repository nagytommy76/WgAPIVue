<template>
    <div class="crew-qualification" v-for="(skill, index) in crewMemeberQualification" :key="index">
        <div class="crew-qualification-icon">
            <div class="tooltip">
                <img :src="skill.image_url.big_icon" alt="Skill Icon">            
                <div class="tooltip-text">
                    <span>{{ skill.description}}</span>
                </div>
            </div>
            <!-- <Tooltip :text="skill.description"> 
                <template>
                    <img :src="skill.image_url.big_icon" alt="Skill Icon">                                 
                </template>
            </Tooltip> -->
        </div>
        <div class="crew-qualification-name">
            <span>{{skill.name}}</span>
        </div>
        
    </div>
</template>
<script>
// import Tooltip from '../../inc/Tooltip'
export default {
    name: 'Crew Skills',
    props:{
        crewMemeberQualification: Object,
    },
    component:{
        // Tooltip,
    }
}
</script>