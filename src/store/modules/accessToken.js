import localST from '../../helpers/localST'
export default{
    state: {
        Token: {
            accessToken: '',
            account_id: '',
            expires_at: 0,
            nickname: '',
        },
        userLoggedIn: false,
    },
    getters: {
        getAccessToken: state => state.Token.accessToken,
        getAccountId: state => state.Token.account_id,
        getExpiresAt: state => parseInt(state.Token.expires_at),
        getNickName: state => state.Token.nickname,
        getUserLoggedIn: state => state.userLoggedIn
    },
    mutations: {
        setTokenFromUrl(state, tokenObject){
            state.Token.accessToken = tokenObject.access_token
            state.Token.account_id = tokenObject.account_id
            state.Token.expires_at = tokenObject.expires_at
            state.Token.nickname = tokenObject.nickname
            if(tokenObject.status === 'ok'){
                state.userLoggedIn = true
            }
        },
        setLoggedIn(state, status = false){
            state.userLoggedIn = status
        }
    },
    actions: {
        setToken(state, tokenObject){
            state.commit('setTokenFromUrl', tokenObject)
            // localST.setTokenLocalStorage('token',tokenObject);
        },
        getAndSetToken(state){
            state.commit('setTokenFromUrl', localST.getTokenLocalStorage())
        },
        setUserLoggedIn(state, status){
            state.commit('setLoggedIn', status);
        }
    }
}