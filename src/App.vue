<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import NavBar from "./components/NavBar.vue";

document.cookie = 'xxx_api_auth=6633396234303634653562616261303761646234396431303837383665363438'

</script>

<template>
      <router-view  v-slot="{Component}">
        <keep-alive>
          <component class="page" :is="Component"></component>
        </keep-alive>
      </router-view>
  <router-view :key="$route.fullPath" name="player"></router-view>
  <nav-bar class="nav-bar"></nav-bar>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*max-width: 1280px;*/
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.page{
  flex-shrink: 1;
}

.nav-bar{
  font-size: .6rem;
  color: white;
  z-index: 1;
  background: #556e93;
  position: sticky;
  bottom: 0;
}
@media screen and (max-width: 480px) {
  .nav-bar{
    background: #2c3e50;
    /*opacity: 0.5;*/
  }
}

</style>
