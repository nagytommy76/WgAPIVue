<template>
    <div class="crew-skills">
        <div class="crew-skills-item" v-for="(member,index) in crew" :key="index">
            <!-- <h3>{{ member.roles[member.member_id] }}</h3> -->
            <div class="tooltip">
                <img :src="this.getCrewImages(index+1)" alt="Crew Member">
                <div class="tooltip-text">
                    <p v-for="(roles, roleIndex) in member.roles" :key="roleIndex">
                        {{roles}}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Crew Members',
    props: {
        crew: Object,
        crewNation: String,
    },
    created(){
        this.getCrewImages(1)
    },
    methods:{
        // Le kell kérnem a bejövő crew-ból a crew qualifications-t
        // Majd loop-pal a crew skills-en, hogy legyen icon stb, ezt majd transition-nel felugró ablak.
        // egy kattintással előjön egy valami és abban a crew qualifications jelenik meg
        getCrewImages(iteration){
            return `https://eu-wotp.wgcdn.co/static/5.73.0_022301/wotp_static/img/tankopedia_new/frontend/scss/tankopedia-detail/img/crew/${this.crewNation}-face-${iteration}.png`
        }
    },
}
</script>