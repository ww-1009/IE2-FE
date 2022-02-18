<template>
  <el-container class="home-container">
    <el-header>
      <span>纳斯达克知识图谱</span>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <el-menu-item index="/entity">
            <i class="el-icon-share"></i>
            <span slot="title">实体关系图</span>
          </el-menu-item>
           <el-menu-item index="/type">
            <i class="el-icon-orange"></i>
            <span slot="title">类型图</span>
          </el-menu-item>
          <el-menu-item index="/porperty">
            <i class="el-icon-orange"></i>
            <span slot="title">属性图</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 主窗口 -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- <el-footer style="height: 30px"></el-footer> -->
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import Graph from "@/components/Graph";
export default {
  components: { Graph },
  data() {
    return {
      // 是否折叠
      isCollapse: false,
       // 被激活的链接地址
      activePath: '/entity',
    };
  },
  created() {
    this.activePath = window.sessionStorage.getItem('activePath')
  },

  methods: {
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
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

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>