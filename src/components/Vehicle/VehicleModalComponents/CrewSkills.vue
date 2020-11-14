<template>
    <div class="crew-qualification" v-for="(skill, index) in crewMemeberQualification" :key="index">
        <div class="crew-qualification-icon">
            <div class="tooltip">
                <img :src="skill.image_url.big_icon" alt="Skill Icon">            
                <div class="tooltip-text">
                    <p>{{ skill.description}}</p>
                </div>
            </div>
        </div>
        <div class="crew-qualification-name">
            <p>{{skill.name}}</p>
        </div>
        
    </div>
</template>
<script>
export default {
    name: 'Crew Skills',
    props:{
        crewMemeberQualification: Object,
    }
}
</script>