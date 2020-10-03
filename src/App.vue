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
  created(){

  },
}
</script>
<style lang="scss">
  @import './sass/app.scss';
</style>
