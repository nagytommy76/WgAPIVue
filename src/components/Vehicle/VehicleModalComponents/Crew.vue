<template>
    <div class="crew-skills">
        <div class="crew-skills-item" v-for="(member,index) in crew" :key="index">
            <h3>{{ member.roles[member.member_id] }}</h3>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Crew Members',
    props: {
        crew: Object,
    },
    methods:{
        // Le kell kérnem a bejövő crew-ból a crew qualifications-t
        // Majd loop-pal a crew skills-en, hogy legyen icon stb, ezt majd transition-nel felugró ablak.

        // Innen tudok crew iconokat szerezni
        // https://eu-wotp.wgcdn.co/static/5.73.0_022301/wotp_static/img/tankopedia_new/frontend/scss/tankopedia-detail/img/crew/ussr-face-6.png

    },
}
</script>