<script lang="ts" setup>
import SearchBar from "../components/SearchBar.vue";
import {getHomeRecommendList, getLikeRows} from "../api/api";
import Slideshow from "../components/Slideshow.vue";
import {nextTick, onMounted, onUpdated, reactive, Ref, ref} from "vue";
import {Slide, VideoInfo} from "../types";
import CarVideo from "../components/CarVideo.vue";
import {usePageScrollAnima, useScrollAnima} from "../hooks";

interface VideoRow {
  selfie: VideoInfo[]
  anime: VideoInfo[]
  scriptures: VideoInfo[]
  subtitles: VideoInfo[]
  topLine: VideoInfo[]
  hot: VideoInfo[]
  news: VideoInfo[]
  guess: VideoInfo[]
  outflow: VideoInfo[]
}

const slides = ref<Slide[]>([])
const rows = reactive<VideoRow>({
  topLine: [],
  guess: [],
  hot: [],
  news: [],
  outflow: [],
  scriptures: [],
  selfie: [],
  subtitles: [],
  anime: []
})

const boxes: Ref = ref<HTMLElement[]>()

getHomeRecommendList().then(data => {
  rows.selfie = data.a_vodrows
  rows.anime = data.b_vodrows
  rows.scriptures = data.c_vodrows
  rows.subtitles = data.d_vodrows
  rows.topLine = data.dayrows
  rows.hot = data.hotrows
  rows.news = data.latestrows
  rows.guess = data.likerows
  rows.outflow = data.tagvodrows
  slides.value = data.v2sliderows.filter(item => {
    return item.spid !== undefined
  })
})

function getMoreLide(name: string) {
  if (name === 'guess') {
    getLikeRows().then(data => {
      rows.guess.push(...data)
    })
  }
}

const scrollpage: Ref = ref<HTMLElement>()
usePageScrollAnima(scrollpage, boxes)
</script>

<template>
  <div class="index-page" ref="scrollpage">
<!--    <search-bar></search-bar>-->
    <slideshow :slides="slides"></slideshow>
    <div class="cats">
      <div v-for="(cat,catName) in rows" :key="catName">
        <h3 class="cat-title" @click="getMoreLide(catName)">{{ catName }}</h3>
        <div class="cards">
          <transition-group name="list">
            <div ref="boxes" class="box" v-for="(video,indx) in cat" :key="indx">
              <car-video class="card" :video-info="video"/>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.index-page {
  overflow-y: scroll;
}

.cats {
  //width: 100vw;
  //overflow-x: hidden;
  .cat-title {
    //opacity: 0;
    color: white;
    background: #2c3e50;
    z-index: 1;
    position: sticky;
    top: 0;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, 11rem);
    justify-content: center;
    grid-gap: 0.8rem;


    .card {
    }
  }
}

.box {
  transform: translateY(2em);
  transition: transform 0.4s ease;

  //&:nth-of-type(even) {
  //  transform: translateY(-100%);
  //}

  &.show {
    transform: translateY(0);
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>