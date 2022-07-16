<script setup lang="ts">
import {Actor} from "../types";

const props = defineProps<{
  actor:Actor
}>()
</script>

<template>
  <div class="actor">
    <img :src="actor.coverpic"  alt="actor">
  </div>
</template>

<style scoped lang="scss">

</style>
