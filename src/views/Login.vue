<template>
	<div class="container">
		<div class="painting"></div>
		<div class="login-container">
			<form @submit.prevent="login">
				<h3>Login</h3>
				<label>
					<input v-model="email" type="email" name="email" placeholder="Email" required
						class="user-input email-extra" value />
				</label>
				<label>
					<input v-model="password" type="password" name="password" placeholder="Password" required
						class="user-input" value />
				</label>

				<button @click="login()" name="button" :disabled="loadingLogin" class="red-button" :class={loading:loadingLogin}>Login</button>
				<div class="err-msg">{{ message }}</div>
				
			</form>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			email: '',
			password: '',
			loadingLogin: false,
			message: ""
		}
	},
	methods: {
		login() {
			this.loadingLogin = true
			this.message = ""
			this.$store
				.dispatch('pLogin', {
					email: this.email, password: this.password
				})
				.then(() => {
					this.$router.push({ name: 'Profile' })
				})
				.catch((err) => {
					this.message = "Login failed"
					console.log(err)
				})
				.finally(() => {
					this.loadingLogin = false
				})
		},
	},
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
@import '../assets/styles/index.css';

*,
*::before,
*::after {
	box-sizing: border-box;
	font-family: 'Poppins, Inter', sans-serif;
	outline: none;
}

body {
	margin: 0;
	color: #333;
	background-color: #fff;
	min-height: 100%;
}

form,
label {
	display: flex;
	flex-flow: column;
	text-align: center;
}

.error {
	color: #ac3633;
	margin: 1rem 0 0;
}

/* .container {
	max-width: 42rem;
	margin: 0 auto;
	padding: 2rem 1.25rem;
	overflow: auto;
} */


.container {
	width: 100%;
	display: flex;
	flex-direction: row;
	padding: 2em;
	justify-content: flex-start;
}

.login-container {
	width: 30em;
	padding: 10%;
}

.painting {
	height: 813px;
	width: 50%;
	left: 57px;
	top: 0px;
	border-radius: 0px;
	background: url("../assets/painting.png") no-repeat;
	background-size: contain;
}
</style>
