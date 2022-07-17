<script setup lang="ts">
import {getCats} from "../api/api";
import {reactive, Ref, ref} from "vue";
import {Cat, VideoInfo} from "../types";
import CarVideo from "../components/CarVideo.vue";
import {usePageScrollAnima, usePageScrollBottomEvent} from "../hooks";

const cats = reactive<Cat>({
  action: "",
  areas: [{areaid: 0, areaname: '全部', sortnum: 0}],
  categories: [{cateid: 0, parentid: '0', uuid: '', catename: '全部'}],
  definitions: [{keyid: 0, value: '全部'}],
  durations: [{keyid: 0, value: '全部'}],
  freetypes: [{keyid: 0, value: '全部'}],
  langvoices: [{keyid: 0, value: '全部'}],
  mosaics: [{keyid: 0, value: '全部'}],
  now: 1657782614,
  orders: [{keyid: 0, value: '全部'}],
  pageinfo: {},
  params: {
    areaid: 0,
    cateid: 0,
    definition: 0,
    duration: 0,
    freetype: 0,
    langvoice: 0,
    mosaic: 0,
    orderby: 0,
    page: 0,
    yearid: 0
  },
  sample_params: "",
  vodrows: [],
  years: [{yearid: 0, yearname: '全部', sortnum: '0'}]
})
const vidrows = reactive<VideoInfo[]>([])
getCats(0, 0, 0, 0, 0, 0, 0, 0, 0, 1).then(data => {
  cats.areas.push(...data.areas)
  cats.categories.push(...data.categories)
  cats.definitions.push(...data.definitions)
  cats.durations.push(...data.durations)
  cats.freetypes.push(...data.freetypes)
  cats.langvoices.push(...data.langvoices)
  cats.mosaics.push(...data.mosaics)
  cats.orders.push(...data.orders)
  cats.years.push(...data.years)
  cats.pageinfo = data.pageinfo
  cats.params = data.params
  cats.sample_params = data.sample_params
  vidrows.push(...data.vodrows)
})

const parmArr = reactive<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 1])

/// "$cateid:0-$areaid:0-$yearid:0-$definition:0-$duration:0-$freetype:0-$mosaic:0-$langvoice:0-$orderby:0-$page:1"
function reFresh(index: number, id: number) {
  parmArr[9] = 1
  parmArr[index] = id
  getCats(...parmArr).then(data => {
    console.log(data)
    vidrows.length = 0
    vidrows.push(...data.vodrows)
  })
}

function getMore() {
  parmArr[9] = parmArr[9]+1
  getCats(...parmArr).then(data=>{
    vidrows.push(...data.vodrows)
  })
}

const scroll: Ref = ref<HTMLElement>()
usePageScrollBottomEvent(scroll, () => {
  getMore()
})

const boxs:Ref = ref<HTMLElement[]>()
usePageScrollAnima(scroll,boxs)
function toTop(){
  console.log(1)
  scroll.value.scrollTop =0
}

</script>

<template>
  <div class="category" ref="scroll">
    <p class="nav cat">
      <span :class="item.cateid===parmArr[0]?'select':''" @click="reFresh(0,item.cateid)"
            v-for="item in cats.categories">{{ item.catename }}</span>
    </p>
    <p class=" nav area">
      <span :class="item.areaid===parmArr[1]?'select':''" @click="reFresh(1,item.areaid)"
            v-for="item in cats.areas">{{ item.areaname }}</span>
    </p>
    <p class="nav lang">
      <span :class="item.keyid===parmArr[7]?'select':''" @click="reFresh(7,item.keyid)" v-for="item in cats.langvoices">{{
          item.value
        }}</span>
    </p>
    <p class="nav year">
      <span :class="item.yearid===parmArr[2]?'select':''" @click="reFresh(2,item.yearid)"
            v-for="item in cats.years">{{ item.yearname }}</span>
    </p>
    <p class="nav masic">
      <span :class="item.keyid===parmArr[6]?'select':''" @click="reFresh(6,item.keyid)"
            v-for="item in cats.mosaics">{{ item.value }}</span>
    </p>
    <p class="nav defin">
      <span :class="item.keyid===parmArr[3]?'select':''" @click="reFresh(3,item.keyid)"
            v-for="item in cats.definitions">{{ item.value }}</span>
    </p>
    <p class="nav free">
      <span :class="item.keyid===parmArr[5]?'select':''" @click="reFresh(5,item.keyid)" v-for="item in cats.freetypes">{{
          item.value
        }}</span>
    </p>
    <p class="nav dur">
      <span :class="item.keyid===parmArr[4]?'select':''" @click="reFresh(4,item.keyid)" v-for="item in cats.durations">{{
          item.value
        }}</span>
    </p>
    <p class="nav order">
      <span :class="item.keyid===parmArr[8]?'select':''" @click="reFresh(8,item.keyid)"
            v-for="item in cats.orders">{{ item.value }}</span>
    </p>

    <div class="top" @click="toTop">👆</div>
    <div class="videos">
      <div  ref="boxs" class="box" v-for="item in vidrows" >
        <CarVideo :video-info="item"></CarVideo>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.category {
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  height: 100%;

  p {
    flex-shrink: 0;
  }
}

.nav {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;

  & > span {
    margin: .1rem .2rem;
    flex-shrink: 0;
  }
}
.top{
  position: fixed;
  bottom: 4rem;
  right: 3rem;
  font-size: 1.6rem;
  border-radius: 50%;
  background: rgba(87, 71, 71, 0.58);
  text-align: center;
  z-index: 1;
}


//.box {
//  transform: translateY(-2rem);
//  transition: transform 0.4s ease;
//
//  &.show {
//    transform: translateY(0);
//  }
//}

.videos {
  flex-shrink: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, 11rem);
  grid-gap: .3rem;
  justify-content: center;
}

.select {
  color: salmon;
}
</style>
