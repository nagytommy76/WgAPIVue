<template>
<div class="container">
    <div class="card-container">
        <div class="card card-dark">
        <h1 class="card-title">Log In with Wargaming</h1>
        <div class="card-form"> 
            <div class="from-group">
                <a v-bind:href="url" class="btn btn-primary m-1">LogIn</a>  
            </div>      
        </div>
        </div>
    </div>

</div>
    
</template>
<script>
import BaseUrlClass from '../../WGClass/BaseUrlClass'
import { mapActions } from 'vuex'

export default {
    name: 'Login',
    computed:{
        url: () =>{
            return BaseUrlClass.getAuthUrl();
        }
    },
    mounted() {
    },
    created() {
        this.UserLogIn();
    },
    methods: {
        ...mapActions({
            setToken: 'setToken',
            setUserLoggedIn: 'setUserLoggedIn',
        }),
        UserLogIn(){
            const url = this.$router.currentRoute.value.query;
            if(Object.keys(url).length !== 0 && url.constructor == Object){
                const data = {
                    access_token: url.access_token,
                    account_id: url.account_id,
                    expires_at: parseInt(url.expires_at),
                    nickname: url.nickname,
                    status: url.status
                }
                this.setToken(data)
                this.setUserLoggedIn(true)
                this.$router.push({ path: '/' })
            }
        }
    }
}
</script>