<template>
	<div class="container">
		<div class="painting"></div>
		<div class="login">
			<form @submit.prevent="login">
				<h3>Become Early Member</h3>
				<label>
					<input v-model="email" type="email" name="email" placeholder="Email" required
						class="email-input email-extra" value />
				</label>
				<div class="submit">
					<button type="submit" name="button">
						Join
					</button>
				</div>
			</form>
		</div>
	</div>
</template>
<script>
import { SDKError, RPCError, ExtensionError } from 'magic-sdk'

export default {
	data() {
		return {
			email: '',
		}
	},
	methods: {
		login() {
			this.$store
				.dispatch('login', {
					email: this.email,
				})
				.then(() => {
					this.$router.push({ name: 'Profile' })
				})
				.catch((err) => {
					if (err instanceof SDKError) {
						console.log(err)
					}
					if (err instanceof RPCError) {
						console.log(err)
					}
					if (err instanceof ExtensionError) {
						console.log(err)
					}
				})
		},
	},
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap');

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

.email-input {
	padding: 10px;
	margin: 1rem auto;
	border: 1px solid #ccc;
	border-radius: 50px;
	outline: none;
	transition: 0.5s;
	width: 80%;
}

.email-input:focus {
	border: 1px solid #ac3633;
}

.submit {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	justify-content: space-between;
}

.submit>a {
	text-decoration: none;
}

.submit>button {
	padding: 0.6rem 1rem;
	cursor: pointer;
	background: #fff;
	border: 1px solid #ccc;
	border-radius: 20px;
	width: 80%;
	outline: none;
	transition: 0.3s;
	margin: 0 auto;
	font-size: 16px;
	background-color: #ac3633;
	color: #ffffff;
	font-weight: bold;
}

.submit>button:hover {
	border-color: #ffffff;
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


.container{
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 2em;
    justify-content: flex-start;
}

.login {
	width: 30em;
    padding-top: 15%;
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
