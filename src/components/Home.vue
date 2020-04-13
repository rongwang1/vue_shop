<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/柠檬.png" alt="logo" width="53px" height="55px" />
        <span>后台管理系统</span>
      </div>
      <el-button @click="Loginout">退出登录</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside :width="isCollapse ? '64px':'200px'">
        <div  class="toggleMenu"  @click="toggleCollapse">|||</div>
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409BFF"
         :unique-opened="true"  :collapse="isCollapse" :collapse-transition="false" :router="true" :default-active="this.$route.path">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id+''"  v-for="item in menulist" :key="item.id">
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+subItem.path"  v-for="subItem in item.children" :key="subItem.id">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右边区域内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      menulist: [],
      iconsObj: {
        125: 'iconfont iconyonghuming',
        103: 'iconfont iconlifangtilitiduomiantifangkuai2',
        101: 'iconfont iconshangpin',
        102: 'iconfont iconicon-test',
        145: 'iconfont iconshujutongji'
      },
      isCollapse: false
    }
  },
  created () {
    this.getMenuList()
  },
  methods: {
    Loginout () {
      window.sessionStorage.clear()
      this.$router.push('/Login')
    },
    // 获取所有的菜单
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) this.$message.console.error(res.meta.msg)
      this.menulist = res.data
      console.log(res)
    },
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>
<style lang="less" scoped>
   .home-container {
      height:100%;
   }
   .el-header {
       background-color: #373D41;
       display: flex;
       justify-content: space-between; //项目位于各行之间留有空白的容器内
       padding-left: 4px;
       align-items: center;//居中对齐弹性布局中div
       color: #ffffff;
       font-size: 20px;
       div{
         display: flex;
         align-items: center;
         span{
             margin-left:15px;
         }
       }
   }
   .el-aside {
       background-color: #333744;
       .el-menu {
         border-right: none;
       }
   }
   .el-main {
       background-color: #eaedf1;
   }
   .iconfont {
     margin-right: 10px;
   }
   .toggleMenu {
    background-color: #aaaaaa;
    color: #ffffff;
    font-size: 20px;
    text-align: center;
    line-height: 24px;
    letter-spacing: 2px;
    cursor:pointer
   }
</style>
