import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, BIcon, BIconArrowUp, BIconArrowDown, BIconXCircle } from 'bootstrap-vue'
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";
import {VAR} from './assets/constants/index'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.component('BIcon', BIcon)
Vue.component('BIconArrowUp', BIconArrowUp)
Vue.component('BIconArrowDown', BIconArrowDown)
Vue.component('BIconXCircle', BIconXCircle)

Sentry.init({
	Vue,
	dsn: VAR.SENTRY_DNS,
	integrations: [
	  new BrowserTracing({
		routingInstrumentation: Sentry.vueRouterInstrumentation(router),
		tracePropagationTargets: ["localhost", VAR.APP_DOMAIN, /^\//],
	  }),
	],
	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 1.0,
  });
  

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
