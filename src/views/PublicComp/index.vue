<template>
  <div class="publicComp">
    <transition name="globalAnima" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'PublicComp',
  data() {
    return {}
  },
  props: {},
  components: {},
  methods: {}
}
</script>

<style lang="less" scoped>
.publicComp {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
