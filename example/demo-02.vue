<template>
  <div class="section">
    <h1>单独引入directive方式</h1>
    <section v-chimee-player2:player="{ source, plugin }"></section>
  </div>
</template>
<script>
import VueChimeePlayer from '../src/directive'

export default {
  name: 'demo02',
  directives: { ChimeePlayer2: VueChimeePlayer },
  data() {
    return {
      player: null,
      plugin: [
        {
          name: 'chimeeControl',
          children: {
            progressBar: { layout: 'top' },
            volume: { layout: 'vertical' }
          }
        }
      ],
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
