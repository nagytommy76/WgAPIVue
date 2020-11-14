<template>
    <div class="crew-skills">
        <div class="crew-skills-item" v-for="(member,index) in crew" :key="index">
            <h3>{{ member.roles[member.member_id] }}</h3>
            <div class="crew-tooltip">
                <img class="crew-image" :src="this.getCrewImages(index+1)" alt="Crew Member">
                <div class="crew-tooltip-text">
                    <p v-for="(roles, roleIndex) in member.roles" :key="roleIndex">
                        {{roles}}
                    </p>
                    <CrewSkills 
                        :crewMemeberQualification="crewQualifications[member.member_id]"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CrewSkills from './CrewSkills'
import axios from 'axios'

export default {
    name: 'Crew Members',
    props: {
        crew: Object,
        crewNation: String,
    },
    components:{
        CrewSkills,
    },
    data() {
        return {
            crewQualifications: {
                commander: {},
                gunner: {},
                driver: {},
                radioman: {},
                loader: {},
            },
        }
    },
    created() {
        this.getCrewQualifications()
    },
    methods:{
        // Le kell kérnem a bejövő crew-ból a crew qualifications-t
        // Majd loop-pal a crew skills-en, hogy legyen icon stb, ezt majd transition-nel felugró ablak.
        // egy kattintással előjön egy valami és abban a crew qualifications jelenik meg
        getCrewImages(iteration){
            return `https://eu-wotp.wgcdn.co/static/5.73.0_022301/wotp_static/img/tankopedia_new/frontend/scss/tankopedia-detail/img/crew/${this.crewNation}-face-${iteration}.png`
        },
        async getCrewQualifications(){
            for (const key of Object.keys(this.crewQualifications)) {
                await axios.get(`https://api.worldoftanks.eu/wot/encyclopedia/crewskills/?application_id=1ebc47797ed02032c3c5489cbba60f6c&role=${key}`)
                .then(skills => {
                    this.crewQualifications[key] = skills.data.data
                })
            }
        },
    },
}
</script>