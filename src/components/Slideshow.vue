<script setup lang="ts">
import {Slide} from "../types";
import {computed, reactive, ref, triggerRef} from "vue";

const props = defineProps<{
  slides: Array<Slide>
}>()

const num = ref(5)

const buffer=computed<Slide[]>({
  get:()=>{
    console.log(2)
    return props.slides.slice(0,5)
  },
  set:()=>{
    console.log(1)
  }
})

setInterval(() => {
  num.value = (num.value+1)%props.slides.length
  buffer.value.shift()
  buffer.value.push(props.slides[num.value])
  console.log(buffer.value)
  triggerRef(buffer);
}, 3000)


</script>
//    :style="{backgroundImage:`url(${item.pic})`}"
<template>
  <div class="slider-box">
    <div class="panel" :class="index===2?'active':''"

         v-for="(item,index) in buffer" :key="item.spid">
      <h3>{{ item.title }}</h3>
    </div>
  </div>
</template>

<style scoped lang="scss">
.slider-box {
  height: 10rem;
  display: flex;

  & > .panel {
    margin: 0 0.3rem;
    //color: #fff;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    flex: 0.5;
    border-radius: 0.7rem;
    border: 1px solid red;
    position: relative;
    transition: all 2s ease-in;

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

</style>
