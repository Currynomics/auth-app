<template>
  <div class="home">
    <Intro></Intro>
    <div class="stats"></div>
  </div>
</template>

<script>
// @ is an alias to /src
 import Intro from "@/components/Intro.vue";

export default {
  name: "Home",
  components: {
    Intro
  }
};
</script>
<style>
#hero-logo {
  max-height: 50px;
}


</style>
