import { createStore } from 'vuex'
import accessToken from './modules/accessToken'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins: [
    createPersistedState({
      key: 'token',
    }),
  ],
  modules: {
    accessToken,
  }
})
