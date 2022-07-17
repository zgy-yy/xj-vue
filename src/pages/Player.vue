<script setup lang="ts">
import Player from 'xgplayer';
import {onMounted, reactive, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {getVideoComments, getVideoLike} from "../api/api";
import CarVideo from "../components/CarVideo.vue";
import {CommentsInfo, VideoInfo, VideoLike} from "../types";
import CommentCard from "../components/CommentCard.vue";
import {Logger} from "sass";

const route = useRoute()
const url: string = route.query.url as string
const vid: string = route.query.vid as string


const vidLikeList = reactive<VideoLike>({
  categories: {cateid: '0', catename: "", itemcount: 0},
  likerows: [],
  similarrows: [],
  vodrow: undefined
})

const comments = reactive<CommentsInfo>({pageinfo: {}, rows: []})

getVideoComments(vid, 0, 1).then(data => {
  // console.log(data.pageinfo)
  const pagesize = data.pageinfo.pagesize
  comments.pageinfo = data.pageinfo
  comments.rows.push(...data.rows)

  function getMoreComments(page: number) {
    if (page > pagesize) {
      return
    }
    getVideoComments(vid, 0, page).then(data => {
      comments.rows.push(...data.rows)
    })
    getMoreComments(++page)
  }
  getMoreComments(2)
})


getVideoLike(vid).then(data => {
  vidLikeList.categories = data.categories
  vidLikeList.likerows = data.likerows
  vidLikeList.similarrows = data.similarrows
  vidLikeList.vodrow = vidLikeList.vodrow as VideoInfo
})

//https://iv09.tongchengdwc.com/20220707/YRmGxWVT/index.m3u8
onMounted(() => {
  const player = new Player({
    id: 'wrapper',
    url: url,
    fitVideoSize: 'auto'
  })
})
const scrollRef = ref<HTMLElement>()


</script>

<template>
  <div class="page">
    <div class="cont">
      <div id="wrapper"></div>
    </div>
    <div class="others">
      <div class="likes">
        <car-video v-for="item in vidLikeList.likerows" :video-info="item"></car-video>
        <car-video v-for="item in vidLikeList.similarrows" :video-info="item"></car-video>
      </div>

      <div class="comment">
        <comment-card class="comment-itm" v-for="item in comments.rows" :comment="item"></comment-card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {

}

.cont {
  z-index: 99;
  margin: 0 auto;
  width: 50vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.others {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;

  .likes {
    display: grid;
    grid-template-columns: repeat(auto-fill, 11rem);
    grid-column-gap: 0.5rem;
    grid-row-gap: 0.2rem;
    justify-items: center;
    justify-content: center;
    align-items: center;
  }

  .comment {
    width: 80vw;
    margin: 0 auto;

    .comment-itm {
      margin: 0.7rem;
    }
  }
}

@media (max-width: 480px) {
  .cont {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 60vw;
  }
  .others {

  }
}
</style>
