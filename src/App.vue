<template>
  <div id="app">
    <transition name="globalAnima" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  },
  props: {},
  components: {},
  methods: {}
}
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
