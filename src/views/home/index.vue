<template>
  <div class="home">
    <h2> platform </h2>
  </div>
</template>
<script>
export default {
  methods: {
    gotoRouter(routerName) {
      this.$router.push({ name: routerName })
    },
  },
}
</script>

<style lang="less">
@import '../../assets/less/mixins.less';
.home {
  margin: 20px 0 0 0;
  .setFlexPos(column, center, center);
  .tabs {
    margin: 80px 0 0 0;
  }
}
</style>
