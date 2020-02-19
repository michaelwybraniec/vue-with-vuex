<template>
  <div id="app">
      <NavBar/>
      <router-view/>
  </div>
</template>

<script>
import HeaderBar from "@/components/header/header-bar";
import NavBar from "@/components/nav/nav-bar";
export default {
  name: "App",
  components: {
    HeaderBar,
    NavBar
  }
};
</script>

<style lang="scss">
@import './design/index.scss';
</style>
