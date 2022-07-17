<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";

const nav = [
  {name: '首页', path: '/'},
  {name: '频道', path: '/chanel'},
  {name: '分类', path: '/cats'},
  {name: '我的', path: '/my'}
]
const curbar = ref('/')
const router = useRouter()
function toPage(path:string){
  router.push(path).then(()=>{
    curbar.value = path
  })
}
</script>

<template>
  <div class="nav-bar">
    <h3 @click="toPage(bar.path)" v-for="bar in nav" :key="bar.path" :class="{'active-bar':curbar===bar.path}">{{bar.name}}</h3>
  </div>
</template>

<style scoped lang="scss">
.nav-bar{
  display: flex;
  align-items: center;
 justify-content: space-around;
}
.active-bar{
  color: yellow;
}
</style>
