<template>
  <main id="app">
    <Navbar />
      <router-view/>  
  </main>
</template>
<script>
import Navbar from './views/includes/Navbar'
export default {
  components:{
    Navbar,
  },
  mounted(){
    // this.loadUserFromLST();
  },
  methods: {
    loadUserFromLST(){
      if (!(Date.now() < this.$store.getters.getExpiresAt)) {
        // If expires_at larger than date.now
        this.$store.dispatch('getAndSetToken')
      }else{
        // Expired

      }
    }
  }
}
</script>
<style lang="scss">
  @import './sass/app.scss';
</style>
