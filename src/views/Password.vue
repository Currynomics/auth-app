<template>
	<div class="container">
		<div class="painting hidden-mobile"></div>
		<div class="login">
			<form @submit.prevent="createPassword">
				<h3>Hi {{ name }}, create a password </h3>
				<label>
					<input v-model="passwordOne" type="password" name="password" placeholder="Password" required
						class="user-input" value />
				</label>
				<label>
					<input v-model="passwordTwo" type="password" name="password" placeholder="Password again" required
						class="user-input" value />
				</label>
				<div>
					<button @click="createPassword()" name="button" style="width: 100%;"
						:disabled="!passwordIsValid.valid || ctaButtonLoading" class="red-button"
						:class="{ disabled: !passwordIsValid.valid }">
						{{ ctaButtonTitle }}
					</button>

					<div class="psw-guide-container" v-if="!pswCreated && !linkExpired">
						<p><strong>Password must:</strong></p>
						<p class="psw-guide" :class="{ err: !passwordIsValid.length }">be at least 8 characters long</p>
						<p class="psw-guide" :class="{ err: !passwordIsValid.special }">include special character</p>
						<p class="psw-guide" :class="{ err: !passwordIsValid.digit }">include number</p>
						<p class="psw-guide" :class="{ err: !passwordIsValid.caps }">include capital character</p>
						<p class="psw-guide" :class="{ err: !passwordIsValid.low }">include lower case character</p>
						<p class="psw-guide" :class="{ err: !passwordIsValid.match }">match with re-type</p>
					</div>
					<div v-else-if="linkExpired">
						<p><a :href="requestNewLinkUrl" target="_blank">Request new link</a></p>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>
<script>
import { getAdminBaseUrl } from '../assets/constants';
import { createPassword } from '../services/auth/index'
import { validatePasswordStrength } from '../services/auth/index'
export default {
	data() {
		return {
			name: '',
			passwordOne: '',
			passwordTwo: '',
			ctaButtonLoading: false,
			pswError: '',
			pswCreated: false,
			linkExpired: false,
			requestNewLinkUrl: getAdminBaseUrl() + "admin/forgot"
		}
	},
	created() {
		this.name = this.$route.query.name;
	},
	computed: {
		ctaButtonTitle() {
			if (this.ctaButtonLoading) return "Loading...";
			else return "Create"
		},
		passwordIsValid() {
			return validatePasswordStrength(this.passwordOne, this.passwordTwo);
		},
	},
	methods: {
		testSuccess() {
			this.$emit('emitNotification', { message: "From password.vue", class: "info" });
			this.$router.push({ name: 'Login' })
		},
		async createPassword() {
			if (this.passwordIsValid && this.$route.query.token) {
				this.ctaButtonLoading = true
				const res = await createPassword(this.$route.query.token, this.passwordOne)
				if (res.code == 200) {
					this.passwordOne = ''
					this.passwordTwo = ''
					this.pswError = false
					this.pswCreated = true
					this.linkExpired = false
					this.$emit('emitNotification', { message: "Password created.", class: "info" })
					this.$router.push({ name: 'Login' })
				}else if(res.code == 410) {
					this.linkExpired = true
					this.$emit('emitNotification', { message: "Password link expired.", class: "error" })
					this.pswError = true
				}else {
					this.$emit('emitNotification', { message: "Password creation failed.", class: "error" })
					this.pswError = true
					this.linkExpired = false
				}
				this.ctaButtonLoading = false
			}
		},
	},

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap');
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

.submit {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	justify-content: space-between;
}

.submit>a {
	text-decoration: none;
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
	justify-content: flex-start;
}

.login {
	width: 30em;
	padding: 15% 1em 1em 2em;
}

.painting {
	height: 813px;
	width: 50%;
	left: 57px;
	top: 0px;
	border-radius: 0px;
	background: url("../assets/painting.png") no-repeat;
	background-size: contain;
	margin-left: 2em;
}

.psw-guide-container {
	text-align: left;
	width: 80%;
	margin: 0 auto;
}

.psw-guide {
	color: #1E5C4E;
	font-weight: bold;
}

.psw-guide.err {
	color: #AC3834;
	font-weight: 400;
}
</style>
