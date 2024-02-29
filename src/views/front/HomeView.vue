<template lang="pug">
video#fullScreenVideo(autoplay loop muted)
  source(:src="videoUrl" type="video/mp4")
</template>

<script setup>
import { computed } from 'vue'

const videoUrl = computed(() => new URL('@/assets/video.mp4', import.meta.url).href)

</script>

<style scoped lang="sass">
#fullScreenVideo
  width: 100vw
  height: 95vh
  object-fit: cover
</style>
