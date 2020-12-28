<template>
    <div class="crew-qualification" v-for="(skill, index) in crewMemeberQualification" :key="index">
        <div class="crew-qualification-icon">
            <Tooltip v-bind:text="skill.description"> 
                <template v-slot:main>
                    <img :src="skill.image_url.big_icon" alt="Skill Icon">
                </template>
            </Tooltip>
        </div>
        <div class="crew-qualification-name">
            <span>{{skill.name}}</span>
        </div>
        
    </div>
</template>
<script>
export default {
    name: 'Crew Skills',
    props:{
        crewMemeberQualification: Object,
    },
}
</script>