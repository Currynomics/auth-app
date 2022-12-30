<template>
	<div class="profile">
		<!-- {{ pUser }} -->
		<h1>Welcome {{ name }}</h1>
		<div v-if="!userSecret && !secretCreated">
			<h3>
				Here are your secret words, shown only once.
				<pre>{{secret}}</pre>
			</h3>
			<button @click="wroteDown()" name="button" class="red-button">
				I wrote them down.
			</button>
		</div>
		<div v-else-if="secretCreated">
			<h3>{{ message }}</h3>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex'
import {generateRandomWords} from '../services/auth/index'
import {setUserSecretWords} from '../services/user/index'
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
			secretCreated: false
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
		async wroteDown(){
			console.log("wrote down called")
			this.setting = true
			const res = await setUserSecretWords(this.$store.state.pUser.token, this.secret)
			this.secret = ''
			if(res.code == 200){
				console.log("all good")
				this.message = 'Your secret words have been saved. You can now log out.'
				this.secretCreated=true
			} 
			else {
				console.log("fail | error:", res.message)
				this.message = 'Something went wrong, please contact admin@redcurry.co'
			}
		}
	}
}
</script>
<style scoped>
h3 {
	margin: 20px 0 0;
}
</style>
