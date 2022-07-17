<script setup lang="ts">
import {VideoInfo} from "../types";
import {getPlayInfo} from "../api/api";
import {useRoute, useRouter} from "vue-router";

const props = defineProps<{
  videoInfo: VideoInfo
}>()

const router = useRouter()

function resolution(def: number): string {
  if (def == 4) {
    return '1080P'
  } else if (def == 3) {
    return '720P'
  }
  return ''
}

const route = useRoute()

function playVideo() {

  getPlayInfo(props.videoInfo.vodid).then(data => {
    if (route.path == '/player') {
      router.replace({
        path: '/player',
        query: {url: data.httpurl, vid: props.videoInfo.vodid}
      })
    } else {
      router.push({
        path: '/player',
        query: {url: data.httpurl, vid: props.videoInfo.vodid}
      })
    }
  })

}

</script>

<template>
  <div class="container" @click="playVideo">
    <!--    //https://www.w3school.com.cn/i/eg_tulip.jpg-->
    <img class="cover-img" :src="videoInfo.coverpic" alt="img">
    <span class="tos dur">{{ videoInfo.duration }}</span>
    <span v-if="resolution(videoInfo.definition)!==''" class="tos quality " :class="resolution(videoInfo.definition)==='1080P'?'hq':''">{{ resolution(videoInfo.definition) }}</span>
    <span v-if="videoInfo.isvip==='1'" class=" tos vip-box"><i>vip</i></span>
    <p class="des">{{ videoInfo.title}}</p>
  </div>
</template>

<style scoped lang="scss">
.container {
  position: relative;
  width: 11rem;
  height: 8.9rem;
  border-radius: .4rem 0.4rem 0.3rem 0.3rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .cover-img {
    flex-shrink: 0;
    width: 100%;
    height: 6.8rem;
  }

  .tos {
    color: white;
    font-size: 0.7rem;
    position: absolute;
    background-color: rgba(216, 222, 229, 0.98);
    padding: .04rem .6rem;
    border-radius: .6rem 0 .6rem;
  }

  .vip-box {
    border-bottom: 0.1rem;
    border-bottom-style: dot-dot-dash;
    top: 0;
    right: 0;
    width: .1rem;
    height: .1rem;
    padding: 1rem 1rem;
    border-radius: 0;
    background-image: linear-gradient(135deg,#ffa8a8,#fcff00);
    clip-path: polygon(0 0, 100% 0, 100% 100%);

    & > i {
      top: 0.09rem;
      transform: rotate(45deg);
      padding-left: 0.07rem;
      position: absolute;
    }
  }

  .dur {
    bottom: 2.3rem;
    right: .3rem;
    background-color: rgba(115, 113, 112, 0.38);
  }

  .quality {
    border-radius: .3rem 0 .6rem;
    background: linear-gradient(135deg,#17ead9,#6078ea);
    &.hq{
      background: linear-gradient(135deg,#7117ea,#ea6060)
    }
  }


  .des {
    height: 2.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-align: start;
    font-size: 0.8rem;
    line-height: 120%;
    padding: 0.2rem;
  }
}
</style>
