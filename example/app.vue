<template>
  <div id="app">
    <Demo01/>
    <Demo02/>
  </div>
</template>

<script>
import Demo01 from './demo-01'
import Demo02 from './demo-02'

export default {
  name: 'app',
  components: {
    Demo01,
    Demo02
  }
}
</script>
<style lang="scss">
body {
  margin: 0;
}
.section {
  position: relative;
  width: 80%;
  margin: 1rem auto;
  text-align: center;
}
</style>