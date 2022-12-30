<template>
	<div class="container">
		<div class="pattern" />
		<div class="intro">
			<div class="avatar"></div>
			<h3>Redcurry</h3>
			<h4>By Currynomics Foundation</h4>
			<p>Redcurry is a digital note, a token pegged to the net asset value of commercial real-estate. A supplement
				money to fiat based currencies.</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Intro',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pattern {
  height: 231px;
  width: 100%;
  left: 0px;
  top: 0px;
  border-radius: 0px;
  opacity: 0.5;
  background: url("../assets/pattern.png") no-repeat;
  background-size: cover;
}

.avatar {
  height: 133px;
  width: 133px;
  left: 48px;
  top: 177px;
  background: url("../assets/icon_rect.png") no-repeat;
  background-size: cover;
}

.intro {
  padding-left: 2em;
  position: absolute;
  top: 275px;
  text-align: left;
}

h3 {
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 31px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  /* Body text */

  color: #444343;
}

h4 {
  margin-top: 0;;

  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  /* or 150% */


  /* Body text - light grey */

  color: #787676;
}
</style>
