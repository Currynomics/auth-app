import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/About.vue'),
	},
	{
		path: '/profile',
		name: 'Profile',
		component: () =>
			import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/join',
		name: 'Join',
		component: () =>
			import(/* webpackChunkName: "login" */ '../views/Join.vue'),
	},
	{
		path: '/login',
		name: 'Login',
		component: () =>
			import(/* webpackChunkName: "login" */ '../views/Login.vue'),
	},
	{
		path: '/password',
		name: 'Password',
		component: () =>
			import('../views/Password.vue'),
	},
]

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes,
})

router.beforeEach((to, from, next) => {
	const loggedIn = localStorage.getItem('pUser')

	if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
		next('/')
	}
	next()
})

export default router
