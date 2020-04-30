<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 2.为Echarts准备一个具备大小(宽高) 的dom -->
      <div id="main" style="width: 750px; height:400px"></div>
    </el-card>
  </div>
</template>
<script>
// 1.导入  echarts
import echarts from 'echarts'

export default {
  data () {
    return {
      // 需要合并的数据
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  created () {
  },
  // 此时，页面上的元素，已经被渲染完毕了
  async mounted () {
    // 3.基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))
    // 请求视图所需数据
    const { data: res } = await this.$http.get('reports/type/1')
    if (res.meta.status !== 200) {
      this.$message.error('获取视图数据失败')
    }
    // 4.准备数组的配置项
    // ...为ES6展开运算符
    const result = { ...this.options, ...res.data }
    // const result = Object.assign(this.options, res.data)
    // 5.展示数据
    myChart.setOption(result)
  },
  methods: {

  }
}
</script>
<style lang="less"   scoped>
</style>
