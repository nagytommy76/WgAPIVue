<template>
<div class="container centered">
<div class="card card-dark">
    <h1 class="card-title">Log In</h1>
    <div class="card-form">
        <ServerSelector />  
        <input @click.prevent="userLogin" type="submit" value="Login" class="btn btn-primary">              
    </div>
</div>
</div>
    
</template>
<script>
import ServerSelector from '../../components/ServerSelector'
// import Auth from '../../WGClass/Auth'
export default {
    name: 'Login',
    components: {
        ServerSelector,
    },
    data() {
        return {
            server: 'eu'
        }
    },
    methods: {
        userLogin(){
            console.log('belépé')
            // console.log(Auth.userLogIn())
            // this.$router.push()
            // Auth.userLogIn()
            // .then(login =>{
            //     login
            // }).catch(error => console.log(error))
        }
    }
}
</script>