<script setup lang="ts">
import {Slide} from "../types";
import { ref } from "vue";
import {useRouter} from "vue-router";

const props = defineProps<{
  slides: Array<Slide>
}>()


const activeIndex = ref(0)

let cos = 2

setInterval(() => {
  activeIndex.value=(activeIndex.value+1)%props.slides.length
}, 3000)

const router = useRouter()
function toSpecial(spid:number){
  router.push({
    path:'/special',
    query:{spid:spid}
  })
}

</script>
//    :style="{backgroundImage:`url(${item.pic})`}"
<template>
  <div class="slider-box">
    <div @click="toSpecial(item.spid)" class="panel" :class="index===activeIndex?'active':''"
         :style="[{backgroundImage:`url(${item.pic})`},index<activeIndex+2&&index>activeIndex-2?{display: 'block'}:{}]"
         v-for="(item,index) in slides" :key="item.title">
      <h3>{{ index }}</h3>
    </div>
  </div>
</template>

<style scoped lang="scss">
.slider-box {
  width: 80vw;
  height: 10rem;
  display: flex;
  margin: 0 auto;

  & > .panel {
    margin: 0 0.3rem;
    //color: #fff;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    flex: 1;
    border-radius: 0.7rem;
    position: relative;
    transition: all 0.6s ease-in;

    > h3 {
      font-size: 1rem;
      position: absolute;
      bottom: 0.2rem;
      left: 0.1rem;
      margin: 0;
      opacity: 0;
    }
  }

  .panel.active {
    flex: 5;

    h3 {
      opacity: 1;
      transition: opacity 0.3s ease-in 0.4s;
    }
  }
}
@media (max-width: 480px) {
  .slider-box {
    width: 100vw;
  }


  .panel{
    background-color: #646cff;
    display: none;
  }
}

</style>
