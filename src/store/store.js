import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import { UserService, AuthenticationError } from '@/services/user.service'
import { TokenService } from '@/services/storage.service'
import router from '@/router/index'
 
Vue.use(Vuex)

const state = {
    authenticating: false,
    accessToken: TokenService.getToken(),
    authenticationErrorCode: 0,
    authenticationError: '',
    loginStatus: false,
    loginData: null,
    coindesk: null,
    refreshTokenPromise: null
}

const actions = {
    async login({ commit }) {
        commit('loginRequest');

        const email = 'nsalas@yahoo.com'
        const password = 'password'
        try {
            const token = await UserService.login(email, password)
            commit('loginSuccess', token)
            router.push('/admin/coindesk')
            return true
        } catch (e) {
            if (e instanceof AuthenticationError) {
                commit('loginError', {errorCode: e.errorCode, errorMessage: e.message})
            }

            return false
        }
    }, 

    logout({ commit }) {
        UserService.logout()
        commit('logoutSuccess')
        router.push('/login')
    },

    refreshToken({ commit, state, dispatch }) {
        if(!state.refreshTokenPromise) {
            const p = UserService.refreshToken()
            commit('refreshTokenPromise', p)

            // Wait for the UserService.refreshToken() to resolve. On success set the token and clear promise
            // Clear the promise on error as well.
            p.then(response => {
                    if(response.status == 401) {
                        commit('refreshTokenPromise', null)
                        dispatch('logout')    
                    }
                    console.log(response)
                    commit('refreshTokenPromise', null)
                    commit('loginSuccess', response)
            }).catch((error) => {
                    commit('refreshTokenPromise', null)
            })
        }

        return state.refreshTokenPromise
    },

    getCoindesk(context) {
        axios.get('http://localhost:5000/currencies/', {
            headers : {
                Authorization : "Bearer " + state.loginData['access_token']
            }
        }).then(response => {
            console.log(response)
        }).catch(function (error) {
            console.log("This is ERROR" + error)
        })
    }
}

const mutations = {
    loginRequest(state) {
        state.authenticating = true;
        state.authenticationError = ''
        state.authenticationErrorCode = 0
    },
    loginSuccess(state, accessToken) {
        state.accessToken = accessToken
        state.authenticating = false;
    },
    setLoginStatus(state, status) {
        state.loginStatus = status
    },
    setLoginData(state, data) {
        state.loginData = data
    },
    logoutSuccess(state) {
        state.accessToken = ''
    },
    refreshTokenPromise(state, promise) {
        state.refreshTokenPromise = promise
    }
}

const getters = {
    getLoginStatus(state) {
        return state.loginStatus
    },
    getLoginData(state) {
        return state.loginData
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})