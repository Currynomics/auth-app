import Vue from 'vue'
import Vuex from 'vuex'
import { Magic } from 'magic-sdk'
import { login } from '../services/auth'

Vue.use(Vuex)

const m = new Magic(process.env.VUE_APP_MAGIC_KEY)

export default new Vuex.Store({
	state: {
		user: null,
		pUser: null
	},
	mutations: {
		SET_USER_DATA(state, userData) {
			state.user = userData
			localStorage.setItem('user', JSON.stringify(userData))
		},
		CLEAR_USER_DATA() {
			localStorage.removeItem('user')
			location.reload()
		},
		SET_P_USER_DATA(state, userData) {
			state.pUser = userData
			localStorage.setItem('pUser', JSON.stringify(userData))
		},
		CLEAR_P_USER_DATA() {
			localStorage.removeItem('pUser')
			location.reload()
		},
	},
	actions: {
		async login({ commit }, email) {
			await m.auth.loginWithMagicLink(email)
			const data = await m.user.getMetadata()
			commit('SET_USER_DATA', data)
		},
		async pLogin({ commit }, data) {
			const res = await login(data.email, data.password)
			if(res.code == 200) {
				commit('SET_P_USER_DATA', res.data)
				return res.data
			}else {
				throw Error(res.message)
			}
		},
		async pLogout({ commit }) {
			commit('CLEAR_P_USER_DATA')
		},
		async logout({ commit }) {
			await m.user.logout()
			commit('CLEAR_USER_DATA')
		},
	},
	modules: {},
})
