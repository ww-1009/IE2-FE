<template>
  <div>
    <el-breadcrumb style="margin-bottom: 0px" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/porperty' }"
        >属性图</el-breadcrumb-item
      >
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          :index="item"
          v-for="item in hasSearched"
          :key="item"
          @click.native="searchagain(item)"
          >{{ item }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </el-breadcrumb>
    <el-row>
      <el-col :span="17">
        <el-card style="width: 97%">
          <el-row>
            <el-col :span="10">
              <div class="sub-title"></div>
              <el-autocomplete
                class="inline-input"
                v-model="inputStr"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                :trigger-on-focus="false"
                @select="handleSelect"
                style="width: 300px"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="queryNasdaq()"
                ></el-button>
              </el-autocomplete>
            </el-col>
            <el-col :span="14">
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
          </el-row>
          <el-divider></el-divider>
          <div
            style="width: 100%; height: 470px; float: left;"
            ref="graph"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0)"
          >
            <el-empty description="暂无图谱" :image-size="200"></el-empty>
          </div>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card style="height: 580px"> 
          <Myimage></Myimage>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Myimage from "@/components/Image";
export default {
  components: { Myimage },
  data() {
    return {
      Mychart: null,
      possible_out: [],
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
      
      loading: false,
    };
  },
  mounted() {
    if(this.porpertyNode.length!=0||this.entityNode.length!=0){
      this.upDatecharts()
    }
    // console.log(this.entityNode.length)
  },
  computed: {
    inputStr: {
      get() {
        return this.$store.state.inputStr;
      },
      set(val) {
        this.$store.commit("changeInputStr", val);
      },
    },
    value: {
      get() {
        return this.$store.state.value;
      },
      set(val) {
        this.$store.commit("changeValue", val);
      },
    },
    hasSearched: {
      get() {
        return this.$store.state.hasSearched;
      },
      set(val) {
        this.$store.commit("changeSearched", val);
      },
    },
    porpertyNode: {
      get() {
        return this.$store.state.porpertyNode;
      },
      set(val) {
        this.$store.commit("changePorpertyNode", val);
      },
    },
    porpertyLinks: {
      get() {
        return this.$store.state.porpertyLinks;
      },
      set(val) {
        this.$store.commit("changePorpertyLinks", val);
      },
    },
     entityNode:{
      get() {
        return this.$store.state.entityNode;
      },
      set(val) {
        this.$store.commit("changeEntityNode", val);
      },
    },
  },
  methods: {
    searchagain(item) {
      this.inputStr = item;
      this.queryNasdaq();
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
        .post("nasdaq/index_7/", {
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

    //查询按钮
    queryNasdaq() {
      this.getPorpertyData();
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //初始化图谱
    initechart() {
      this.Mychart = this.$echarts.init(this.$refs.graph);
      // console.log("porpertyinitecharts");
    },
    //更新图谱
    upDatecharts() {
      this.initechart();
      var data = this.porpertyNode;
      var links = this.porpertyLinks;
      var option = {
        title: {
          text: this.inputStr+"属性图",
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        label: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 12,
            },
          },
        },
        legend: {
          x: "center",
          show: false,
        },
        series: [
          {
            type: "graph",
            layout: "force",
            symbolSize: 42,
            focusNodeAdjacency: true,
            roam: true,
            edgeSymbol: ["none", "arrow"],
            categories: [
              {
                name: "查询实体",
                itemStyle: {
                  normal: {
                    color: "#009800",
                  },
                },
              },
              {
                name: "instance",
                itemStyle: {
                  normal: {
                    color: "#4592FF",
                  },
                },
              },
              {
                name: "class",
                itemStyle: {
                  normal: {
                    color: "#C71585",
                  },
                },
              },
              {
                name: "class",
                itemStyle: {
                  normal: {
                    color: "#C72585",
                  },
                },
              },
            ],
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 10,
                },
              },
            },
            force: {
              repulsion: 500,
            },
            edgeSymbolSize: [4, 50],
            edgeLabel: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 10,
                },
                formatter: "{c}",
              },
            },
            data: data,
            links: links,
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 1.3,
                curveness: 0,
                color: "#262626",
              },
            },
          },
        ],
      };
      this.Mychart.setOption(option);
      this.loading = false;
    },

    //获取porperty图谱数据
    getPorpertyData() {
      //使用Ajax请求--POST-->传递InputStr
      // this.loading=true;
      let that = this;
      //开始Ajax请求
      this.$http
        .post("nasdaq/porpertydata/", {
          inputstr: that.inputStr,
        })
        .then(function (res) {
          if (res.data.code === 1) {
            that.porpertyNode = res.data.data[0];
            that.Treedata = res.data.data[1];
            // console.log(that.Treedata);
            // that.links = res.data.data[1];
            //提示：
          } else {
            //失败的提示！
            that.$message.error(res.data.msg);
          }
        })
        .catch(function (err) {
          console.log(err);
          that.$message.error("porperty查询结果出现异常！");
        });
    },
  },
  watch: {
    porpertyNode(n, o) {
      this.upDatecharts();
    },
  },
};
</script>