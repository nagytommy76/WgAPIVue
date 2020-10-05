<template>
  <main id="app">
    <Navbar />
      <router-view/>  
    <Footer />
  </main>
</template>
<script>
import Navbar from './views/includes/Navbar'
import Footer from './views/includes/Footer'
export default {
  components:{
    Navbar,
    Footer,
  },
  mounted(){
  },
  methods: {
  }
}
</script>
<style lang="scss">
  @import './sass/app.scss';
</style>
