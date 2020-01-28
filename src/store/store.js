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

    refreshToken(context) {
        axios.get('http://localhost:5000/users/refresh', {
            headers : {
                Authorization : "Bearer " + state.loginData['refresh_token']
            }
        }).then(response => {
            console.log(response)
        }).catch(function (error) {
            console.log(error)
        })
    },

    getCoindesk(context) {
        axios.get('http://localhost:5000/currencies/', {
            headers : {
                Authorization : "Bearer " + state.loginData['access_token']
            }
        }).then(response => {
            console.log(response)
        }).catch(function (error) {
            console.log(error)
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