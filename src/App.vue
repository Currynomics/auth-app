<template>
	<div id="app">
		<div class="footer-separator">

			<div id="nav">
				<router-link to="/">
					<div class="nav-logo hidden-mobile"></div>
				</router-link>

				<div class="nav-content">
					<a href="https://discord.gg/G4b2jrerb6" target="_blank">Help</a>
					<router-link v-if="this.$store.state.pUser" to="/profile">Profile</router-link>
					<router-link v-if="!this.$store.state.pUser" to="/join">Join</router-link>
					<router-link v-if="!userName" to="/login">Login</router-link>
					<!-- <router-link v-if="userName"><div @click="logOut">Logout</div></router-link> -->
					<button v-if="userName" type="button" class="red-button" @click="logOut" :disabled="loadingLogout"
						:class="{ loading: loadingLogout }">
						Logout
					</button>
				</div>

			</div>
			<router-view @emitNotification="openNotification" @emitLogout="logOut"/>

			<div class="notification-container">
				<div v-for="(item, index) in notifications" v-bind:key="index" class="notification" :class="{error: item.class=='error'}">
					<div class="notification-btn" @click="closeNotification(index)"><BIconXCircle/></div><span>{{item.message}}</span></div>

			</div>
		</div>

		<Footer />

	</div>
</template>
<script>
import Footer from "@/components/Footer.vue";

export default {
	data() {
		return {
			loadingLogout: false,
			notifications: []
		}
	},
	computed: {
		userName() {
			if (this.$store.state.pUser) return this.$store.state.pUser.user.firstName;
			return false
		}
	},
	components: {
		Footer
	},
	created() {
		this.loadingLogout = false
	},	
	methods: {
		async logOut() {
			this.loadingLogout = true
			this.$store.dispatch('pLogout')
			this.$store.dispatch('logout')
		},
		closeNotification(index){
			this.notifications.splice(index, 1);
		},
		openNotification(notification){
			this.notifications.push(notification)
		}
	},
}
</script>
<style>
@import './assets/styles/index.css';

.footer-separator {
	min-height: 100vh;
}

#app {
	font-family: Poppins, Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.nav-content {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	min-width: 350px;
}

#nav a {
	font-weight: bold;
	padding: 5px;
	text-decoration: none;
	color: #2c3e50;
}



#nav a.router-link-exact-active {
	color: #AC3633;
}

#nav>button {
	padding: 0.6rem 1rem;
	cursor: pointer;
	background: #fff;
	border: 1px solid #ccc;
	border-radius: 50px;
	width: 5rem;
	outline: none;
	transition: 0.3s;
	margin: 0 auto;
	font-size: 14px;
	font-weight: bold;
}

#nav>button:hover {
	background-color: #AC3633;
	color: white;
}
</style>
