<template>
  <div class="section">
    <h1>全局directive方式</h1>
    <section v-chimee-player:player="{ source }"></section>
  </div>
</template>
<script>
export default {
  name: 'demo01',
  data() {
    return {
      player: null,
      source: [
        {
          src: 'http://chimee.org/vod/1.mp4',
          resolution: 360
        }
      ]
    }
  }
}
</script>
