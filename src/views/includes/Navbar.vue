<template>
    <nav>
        <div class="navbar-brand">
            <h1>Wargaming API Test</h1>
        </div>
        <div class="right">
            <ul class="navbar-nav">
                <li class="nav-item"><router-link to="/">Players</router-link></li>
                <li class="nav-item"><router-link to="/clans">Clans</router-link></li>
                <li class="nav-item"><router-link to="/vehicles">Vehicles</router-link></li>
                <li v-if="!userLoggedIn" class="nav-item"><router-link to="/login">LogIn</router-link></li>
                <li  v-if="userLoggedIn" class="nav-item"><a class="disabled">{{nickName}}</a></li>
                <li  v-if="userLoggedIn" class="nav-item"><a href="#" @click.prevent="logOut">Logout</a></li>
            </ul>  
        </div>
             
    </nav>
</template>
<script>
// import localSt from '../../helpers/localST'
export default {
    name: 'Navbar',
    computed: {
        userLoggedIn(){            
            return this.$store.getters.getUserLoggedIn
        },
        nickName(){
            return this.$store.getters.getNickName
        }
    },
    methods: {
        logOut(){
            // localSt.removeTokenLocalStroage('vuex')
            this.$store.dispatch('setUserLoggedIn', false)
            this.$router.push({ path: '/' })
        }
    }
}
</script>