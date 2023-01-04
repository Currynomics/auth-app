import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, BIcon, BIconArrowUp, BIconArrowDown, BIconXCircle } from 'bootstrap-vue'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.component('BIcon', BIcon)
Vue.component('BIconArrowUp', BIconArrowUp)
Vue.component('BIconArrowDown', BIconArrowDown)
Vue.component('BIconXCircle', BIconXCircle)

new Vue({
	router,
	store,
	created() {
		const userString = localStorage.getItem('user')
		if (userString) {
			const userData = JSON.parse(userString)
			this.$store.commit('SET_USER_DATA', userData)
		}
	},
	render: (h) => h(App),
}).$mount('#app')
