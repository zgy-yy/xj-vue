<script setup lang="ts">
import {CommeItem} from "../types";

const props = defineProps<{comment:CommeItem}>()
</script>

<template>
  <div class="com-box">
    <div class="user">
      <img :src="comment.avatar_url" alt="avatar">
      <div class="user-ino">
        <p>{{comment.username}}</p>
        <p>{{comment.addtime}}</p>
      </div>
    </div>
    <div class="content">
      {{comment.content}}
    </div>
  </div>
</template>

<style scoped lang="scss">
.com-box{
  border-bottom: 0.1rem solid #2f2f2d;
  //width: 21rem;
  .user{
    display: flex;
    font-size: 0.7rem;
    img{
      width: 2rem;
      height: 2rem;
      margin-right: 0.3rem;
    }
  }
  .content{
    padding-left: 3rem;
    text-align: start;
  }
}
</style>
