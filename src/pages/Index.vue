<script lang="ts" setup>
import SearchBar from "../components/SearchBar.vue";
import {getHomeRecommendList} from "../api/api";
import Slideshow from "../components/Slideshow.vue";
import {reactive, ref} from "vue";
import {Slide} from "../types";

const slides =ref<Slide[]>([])

getHomeRecommendList().then(data=> {
  console.log(data.v2sliderows)
  slides.value = data.v2sliderows
})
</script>

<template>
  <search-bar></search-bar>
  <Slideshow :slides="slides"></Slideshow>
</template>

<style scoped lang="scss">

</style>