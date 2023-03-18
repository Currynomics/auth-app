<template>
	<div class="profile">
		<!-- {{ pUser }} -->
		<h1>Welcome {{ name }}</h1>
		<div v-if="!userSecret && !secretCreated">
			<h3>
				Here are your secret words, shown only once.
				<pre>{{ secret }}</pre>
			</h3>
			<p>Write it on paper. Use these to sign future transactions.</p>

			<button @click="wroteDown()" name="button" :disabled="loading" class="red-button"
				:class="{ disabled: loading }">
				I wrote it down
			</button>


		</div>
		<div v-else-if="secretCreated || userSecret">
			<h3>{{ message }}</h3>
			<button @click="exitToAdmin()" class="red-button">
				Go To Admin
			</button>
			<p><small>You will be logged out</small></p>
		</div>


	</div>
</template>
<script>
import { mapState } from 'vuex'
import { getAdminBaseUrl } from '../assets/constants'
import { generateRandomWords } from '../services/auth/index'
import { setUserSecretWords } from '../services/user/index'
export default {
	computed: mapState({
		email: (state) => state.pUser.user.email,
		name: (state) => state.pUser.user.firstName,
		userSecret: (state) => state.pUser.user.userSecret,
	}),
	data() {
		return {
			secret: "",
			message: "",
			secretCreated: false,
			loading: false
		}
	},
	// computed: {
	// 	user(){
	// 		return this.$store.state.pUser;
	// 	}
	// },
	created() {
		this.secret = generateRandomWords(4)
	},
	methods: {
		async wroteDown() {
			this.loading = true
			const res = await setUserSecretWords(this.$store.state.pUser.token, this.secret)
			this.secret = ''
			if (res.code == 200) {
				this.$emit('emitNotification', { message: "Secret saved. You can log out.", class: "info" });
				this.message = 'Your secret words have been saved. You can now proceed to the Admin Dashboard.'
				this.secretCreated = true
			}
			else {
				console.log("fail | error:", res.message)
				this.$emit('emitNotification', { message: "Something is not right.", class: "error" });

				this.message = 'Something went wrong, please contact admin@redcurry.co'
			}
			this.loading = false
		},
		exitToAdmin() {
			const url = getAdminBaseUrl()
			window.open(url);
			this.$emit('emitLogout')
		}
	}
}
</script>
<style scoped>
h3 {
	margin: 20px 0 0;
}
</style>
