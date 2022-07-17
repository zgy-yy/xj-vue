<script setup lang="ts">

import {useRoute} from "vue-router";
import {getSpecialDetail} from "../api/api";
import {reactive, ref} from "vue";
import {Actor, VideoInfo} from "../types";
import CarVideo from "../components/CarVideo.vue";

const route = useRoute()
const spid: number = route.query.spid as unknown as number
const actor = ref<Actor>({
  addtime: "",
  age: "",
  avatar: "",
  coverpic: "",
  cup: "",
  downnum: "",
  intro: "",
  itemcount: "",
  spid: "",
  spname: "",
  sptype: "",
  updatetime: "",
  upnum: ''
})
const vids = reactive<VideoInfo[]>([])

getSpecialDetail(spid).then(data => {
  actor.value = data.row
  vids.push(...data.vodrows)
})
</script>

<template>
  <div class="special-page">
    <div  class="cov-imag" :style="{backgroundImage:`url(${actor.coverpic})`}">
      <div class="gradient"></div>
    </div>
    <div class="title">
      <p>{{actor.spname}}</p>
      <p>{{actor.intro}}</p>
    </div>
    <div class="videos">
      <div class="vid" v-for="item in vids">
        <CarVideo :video-info="item"></CarVideo>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.special-page{
  position: relative;
  .title{
    text-align: start;
    color: white;
    position: absolute;
    top: 10rem;
    left: 1rem;
  }
}
.cov-imag{
  height: 13rem;
  width: 100%;
  background-size:cover;
  margin-bottom: 1rem;
  box-shadow:  0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-repeat: no-repeat;
  .gradient{
    height:100%;
    width: 100%;
    background-image: linear-gradient( rgba(98, 93, 93, 0.5), rgba(255, 255, 255,0), rgba(93, 84, 84,0.5));
  }
}
.videos {
  display: grid;
  grid-template-columns: repeat(auto-fill, 11rem);
  justify-content: center;
  grid-gap: .5rem;
}
</style>
