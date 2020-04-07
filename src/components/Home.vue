<template>
  <div>
    <el-button @click="Loginout">退出登录</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    Loginout () {
      window.sessionStorage.clear()
      this.$router.push('/Login')
    }
  }
}
</script>
<style lang="less" scoped>
</style>
