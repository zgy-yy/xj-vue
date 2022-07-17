<script setup lang="ts">
import {Actor} from "../types";
import {useRouter} from "vue-router";

const props = defineProps<{
  actor: Actor
}>()


const router = useRouter()

function toSpecPage(spid: string) {
  router.push({
    path: '/special',
    query: {spid: spid}
  })
}

</script>

<template>
  <div class="actor" @click="toSpecPage(actor.spid)">
    <div class="circle">
      <img :src="actor.avatar" alt="actor">
    </div>
    <span>{{ String.fromCharCode(64 + Number(actor.cup)) }}</span>
    <p>{{ actor.spname }}</p>
  </div>
</template>

<style scoped lang="scss">
.actor {
  margin: .1rem;
  width: 4rem;
  height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  .circle {
    background-image: linear-gradient(135deg, #7117ea, #ea6060);

    display: flex;
    align-items: center;
    justify-content: center;
    height: 3rem;
    width: 3rem;
    border-radius: 50%;

    & > img {
      width: 90%;
      height: 90%;
      box-sizing: border-box;
      border-radius: 50%;
    }
  }


  span {
    padding: 0;
    text-align: center;
    //line-height: 140%;
    border-radius: 50%;
    height: .8rem;
    width: .8rem;
    background-color: #fbc531;
    right: .1rem;
    bottom: 1rem;
    font-size: .7rem;
    position: absolute;
  }

  p {
    font-size: .7rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
