<script setup lang="ts">
import Aactor from '../components/Aactor.vue'
import {getChannels} from "../api/api";
import {reactive, Ref, ref} from "vue";
import {Actor} from "../types";
import CarVideo from "../components/CarVideo.vue";
import {usePageScrollAnima, usePageScrollBottomEvent, useScrollAnima} from "../hooks";
import {useRouter} from "vue-router";


const actors = reactive<Actor[]>([])
const rows = reactive<Actor[]>([])
let curPage = 1
let pageSize = 0
getChannels(curPage).then(data => {
  actors.push(...data.actorrows)
  rows.push(...data.rows)
  pageSize = data.pageinfo.pagesize
})

function updataRows() {
  curPage++
  if (curPage > pageSize)
    return
  getChannels(curPage).then(data => {
    rows.push(...data.rows)
  })
}

const page:Ref = ref<HTMLElement>()
usePageScrollBottomEvent(page,()=>{
  updataRows()
})

const boxs:Ref = ref<HTMLElement>()
usePageScrollAnima(page,boxs)

const router = useRouter()
function toSpecPage(spid:number){
  router.push({
    path:'/special',
    query:{spid:spid}
  })
}
</script>

<template>
  <div class="chanel-page" ref="page">
    <div class="actors">
      <aactor class="act" v-for="item in actors" :actor="item"/>
    </div>
    <div class="row" v-for="item in rows">
      <h3 class="title">
        <span>{{ item.spname }}</span>
        <span @click="toSpecPage(item.spid)">{{ item.itemcount }} 部 > </span>
      </h3>
      <div class="vids">
        <div ref="boxs" class="vid box" v-for="v in item.vodrows">
          <CarVideo :video-info="v"></CarVideo>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chanel-page {
  //height: 100vh;
  overflow-y: scroll;
}

.actors {
  width: 100%;
  display: flex;
  overflow-x: scroll;

  .act {
    margin: .3rem .5rem;
  }
}

.row {
  .title {
    text-align: start;

    span:first-child {
      margin: .3rem 4rem .3rem .3rem;
    }

    span:last-child {
      font-size: .3rem;
      font-weight: normal;
    }
  }

  .vids {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    .vid {
      margin: .2rem;
    }
  }
}

.box {
  transform: translateX(100%);
  transition: transform 0.4s ease;

  &:nth-of-type(even) {
    transform: translateX(-100%);
  }

  &.show {
    transform: translateX(0);
  }
}

@media screen and (max-width: 480px) {
  .row {
    .title {
      font-size: 1rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      span:last-child {
        font-weight: normal;
        font-size: .9rem;
      }
    }

    .vids {
      display: grid;
      grid-template-columns: auto auto;
      justify-content: center;
      grid-gap: .2rem;
    }
  }
}


</style>
