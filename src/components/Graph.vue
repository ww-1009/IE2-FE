<template>
  <div>
    <div
      style="width: 100%; height: 500px; float: left"
      ref="graph"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0)"
    ></div>
    <!-- <el-tree
      style="float: left; background: #FFF;"
      :data="Treedata"
      show-checkbox
      node-key="id"
      ref="tree"
      highlight-current
      :props="defaultProps"
      v-show="this.Mtype === 2"
      
    >
    </el-tree> -->
    <!-- <div class="buttons"> -->
      <!-- <el-button
        @click="getCheckedNodes"
        v-show="this.Mtype === 2"
        type="primary"
        >实体图</el-button
      > -->
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      Mychart: null,
      Show: false,
      MinputStr: "",
      Mvalue: "1",
      Mtype: 1,
      entityNode: [],
      entityLinks: [],
      porpertyNode: [],
      porpertyLinks: [],
      Treedata: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      loading: false,
    };
  },
  props: {
    inputStr: {
      type: String,
    },
    value: {
      type: String,
    },
    type: {
      type: Number,
    },
  },
  mounted() {
    this.initechart();
  },
  methods: {
    //初始化图谱
    initechart() {
      this.Mychart = this.$echarts.init(this.$refs.graph);
      // console.log("porpertyinitecharts");
    },
    //更新图谱
    upDatecharts(type) {
      let that = this;
      if (type === 1) {
        var data = this.entityNode;
        var links = this.entityLinks;
      }
      if (type === 2) {
        var data = this.porpertyNode;
        var links = this.porpertyLinks;
      }
      var option = {
        title: {
          text: "",
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
      this.loading=false;
      //配置点击事件
      this.Mychart.on("click", function (params) {
        if (params.dataType == "node" && that.Mtype == 1) {
          that.MinputStr = params.name;
          // console.log(that.MinputStr);
          that.$emit("resinput", that.MinputStr);
          that.getEntityData();
          that.getPorpertyData();
        }
      });
    },
    //获取树状图key
    getCheckedNodes() {
      let inp = this.MinputStr;
      console.log(
        this.$refs.tree
          .getCheckedKeys()
          .concat(this.$refs.tree.getHalfCheckedKeys())
      );
      let key = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
      for (let i = 0; i < this.Treedata.length; i++) {
        if (this.Treedata[i]["id"] === key[0])
          for (let j = 0; j < this.Treedata[i]["children"].length; j++) {
            if (this.Treedata[i]["children"][j]["id"] === key[1])
              this.MinputStr = this.Treedata[i]["children"][j]["label"];
          }
      }
      if (inp === this.MinputStr) {
        for (let i = 0; i < this.Treedata.length; i++) {
          if (this.Treedata[i]["id"] === key[1])
            for (let j = 0; j < this.Treedata[i]["children"].length; j++) {
              if (this.Treedata[i]["children"][j]["id"] === key[0])
                this.MinputStr = this.Treedata[i]["children"][j]["label"];
            }
        }
      }
      this.$emit("resinput", this.MinputStr);
    },
    //获取entity图谱数据
    getEntityData() {
      //使用Ajax请求--POST-->传递InputStr
      this.loading=true;
      let that = this;
      //开始Ajax请求
      this.$http
        .post("nasdaq/entitydata/", {
          inputstr: that.MinputStr,
          depth: that.Mvalue,
        })
        .then(function (res) {
          if (res.data.code === 1) {
            that.entityNode = res.data.data[0];
            that.entityLinks = res.data.data[1];
            // console.log(that.entityNode);
            console.log(that.links);
            //提示：
          } else {
            //失败的提示！
            that.$message.error(res.data.msg);
          }
        })
        .catch(function (err) {
          console.log(err);
          that.$message.error("entity查询结果出现异常!");
        });
    },
    //获取porperty图谱数据
    getPorpertyData() {
      //使用Ajax请求--POST-->传递InputStr
      // this.loading=true;
      let that = this;
      //开始Ajax请求
      this.$http
        .post("nasdaq/porpertydata/", {
          inputstr: that.MinputStr,
        })
        .then(function (res) {
          if (res.data.code === 1) {
            that.porpertyNode = res.data.data[0];
            that.Treedata = res.data.data[1];
            that.Show = true;
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
    entityNode(n, o) {
      this.upDatecharts(this.Mtype);
    },
    // porpertyNode(n, o) {
    //   this.upDatecharts(this.Mtype);
    // },
    inputStr(n, o) {
      if (n != o) {
        this.MinputStr = n;
      }
    },
    value(n, o) {
      this.Mvalue = n;
    },
    type(n, o) {
      this.Mtype = n;
    },
  },
};
</script>