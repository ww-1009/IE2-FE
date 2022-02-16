<template>
  <div class="home">
    <el-container>
      <el-header>
        <span>纳斯达克知识图谱</span>
      </el-header>
      <!-- 页面主体区域 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <!-- 侧边栏菜单区域 -->
          <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse">
            <el-menu-item index="1" @click="naventity()">
              <i class="el-icon-share"></i>
              <span slot="title">实体关系图</span>
            </el-menu-item>
            <el-menu-item index="2" @click="navporperty()">
              <i class="el-icon-orange"></i>
              <span slot="title">属性图</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <!-- 主窗口 -->
          <el-main>
            <el-row class="demo-autocomplete">
              <el-col :span="6">
                <div class="sub-title"></div>
                <el-autocomplete
                  class="inline-input"
                  v-model="inputStr"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入内容"
                  :trigger-on-focus="false"
                  @select="handleSelect"
                  style="width: 300px"
                ></el-autocomplete>
              </el-col>
              <el-col :span="4">
                <el-select v-model="value" placeholder="请选择查询深度">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-button
                  type="primary"
                  icon="el-icon-search"
                  @click="queryNasdaq()"
                  >搜索</el-button
                >
              </el-col>
              <el-col :span="6">
              </el-col>
            </el-row>
            <div class="panel-body" style="margin-top: 20px">
              <Graph ref="chart" :inputStr="inputStr" :value="value" :type="type" @resinput="getinputStr"></Graph>
            </div>
          </el-main>
          <el-footer style="height: 30px"></el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Graph from "@/components/Graph";
export default {
  components: { Graph },
  data() {
    return {
      // 是否折叠
      isCollapse: false,
      isShow: false,
      baseURL: "http://192.168.1.8:8000/",
      possible_out: [],
      inputStr: "", //输入的查询条件
      type: 1,
      options: [
        {
          value: "1",
          label: "深度一",
        },
        {
          value: "2",
          label: "深度二",
        },
        {
          value: "3",
          label: "深度三",
        },
      ],
      value: "1",
    };
  },
  // provide: function () {
  //   return {
  //     getName: this.type,
  //   };
  // },

  methods: {
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    //查询框
    querySearch(queryString, cb) {
      this.queryindex();
      // console.log(this.possible_out);
      var possible_out = this.possible_out;
      var results = queryString
        ? possible_out.filter(this.createFilter(queryString))
        : possible_out;
      // 调用 callback 返回建议列表的数据
      // console.log(results);
      cb(results);
    },
    createFilter(queryString) {
      return (possible_out) => {
        return (
          possible_out.value
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    //实现信息模糊查询
    queryindex() {
      //使用Ajax请求--POST-->传递InputStr
      let that = this;
      //开始Ajax请求
      this.$http
        .post(that.baseURL + "nasdaq/index_7/", {
          inputstr: that.inputStr,
        })
        .then(function (res) {
          if (res.data.code === 1) {
            that.possible_out = res.data.data;
            // console.log(that.possible_out);
            //提示：
          } else {
            //失败的提示！
            that.$message.error(res.data.msg);
          }
        })
        .catch(function (err) {
          console.log(err);
          that.$message.error("获取后端查询结果出现异常!");
        });
    },
    //entity导航栏
    naventity() {
      this.type = 1;
      this.isShow = false;
      this.$refs.chart.upDatecharts(1)
    },
    //porperty导航栏
    navporperty() {
      this.type = 2;
      this.isShow = true;
      this.$refs.chart.upDatecharts(2)
    },
    //查询按钮
    queryNasdaq() {
      // if (this.type === 1) {
        this.$refs.chart.getEntityData();
      // } else {
        this.$refs.chart.getPorpertyData();
      // }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //获取自组件的inputStr
    getinputStr(data){
      this.inputStr=data
      // this.queryNasdaq()
    }
  },
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  font-size: 32px;
  text-align: left;
  height: 100%;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 100vh;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}
body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 100%;
}
</style>