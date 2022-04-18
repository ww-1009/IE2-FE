<template>
  <div>
    <el-breadcrumb style="margin-bottom: 0px" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/type' }"
        >类型关系图</el-breadcrumb-item
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
          <Mysearch></Mysearch>
          <!-- <el-divider></el-divider> -->
          <div
            style="width: 100%; height: 640px; float: left; "
            ref="graph"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0)"
          >
            <el-empty description="暂无图谱" :image-size="200" style="margin-top:70px"></el-empty>
          </div>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card style="height: 800px"> 
          <Myimage></Myimage>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import Myimage from "@/components/Image";
import Mysearch from "@/components/Search";
const { mapMutations, mapState, mapGetters, mapActions } =
  createNamespacedHelpers("mystrategy");

function myAerlt(val) {
       var obj = JSON.parse(val);
        console.log(obj)
    }
window.myAerlt = myAerlt;
export default {
  components: { Myimage,Mysearch },
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
created() {
  
},
  mounted() {
    this.path="类型关系图"
     if(this.name!=''){
      this.upDatecharts()
    }    
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
    name: {
      get() {
        return this.$store.state.name;
      },
      set(val) {
        this.$store.commit("changeName", val);
      },
    },
    hasSearched:{
      get() {
        return this.$store.state.hasSearched;
      },
      set(val) {
        this.$store.commit("changeSearched", val);
      },
    },
    typeNode:{
      get() {
        return this.$store.state.typeNode;
      },
      set(val) {
        this.$store.commit("changeTypeNode", val);
      },
    },
    typeLinks:{
      get() {
        return this.$store.state.typeLinks;
      },
      set(val) {
        this.$store.commit("changeTypeLinks", val);
      },
    },
    typeMap: {
      get() {
        return this.$store.state.typeMap;
      },
      set(val) {
        this.$store.commit("changeTypeMap", val);
      },
    },
    statu: {
      get() {
        return this.$store.state.statu;
      },
      set(val) {
        this.$store.commit("changeStatu", val);
      },
    },
    path: {
      get() {
        return this.$store.state.path;
      },
      set(val) {
        this.$store.commit("changePath", val);
      },
    },
    first: {
      get() {
        return this.$store.state.first;
      },
      set(val) {
        this.$store.commit("changeFirst", val);
      },
    },
    
  },
  methods: {
    
    searchagain(item) {
      this.inputStr = item;
      this.statu=!this.statu;
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
      let that = this;
      var data = this.typeNode;
      var links = this.typeLinks;
      var option = {
        // title: {
        //   text: that.inputStr+"类型图",
        // },
        tooltip: {
          triggerOn: 'click',//点击才会出现提示框
          enterable: true,//鼠标可以进入提示框
          formatter: function (params, ticket, callback) {//回调函数
            // var str="1234"
            var str="所含实体节点：<br>"+that.typeMap[params.data["id"]]
            // var str="1<br>2<br>3<br>"
            //  var str = appendPath(graph.nodes[params.dataIndex].id);
            //  document.getElementById("div1").innerHTML = str;

             return str;
         }
        },
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
            legendHoverLink:true,
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
                name: "一级实体",
                itemStyle: {
                  normal: {
                    color: "#4592FF",
                  },
                },
              },
              {
                name: "二级实体",
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
              repulsion: 800,
              gravity:0.03,
              edgeLength: [70, 100],
              layoutAnimation:true
            },
            edgeSymbolSize: [4, 50],
            edgeLabel: {
              normal: {
                show: false,
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
                curveness: 0.2,
                color: "#262626",
              },
            },
          },
        ],
      };
      this.Mychart.setOption(option);
      this.first=true;
      this.loading = false;
      //配置点击事件
      // this.Mychart.on("click", function (params) {
      //   if (params.dataType == "node") {
      //     that.inputStr = params.name;
      //     // console.log(that.MinputStr);
      //     that.gettypeData();
      //   }
      // });
    },
  },
  watch: {
    typeNode(n, o) {
      if (n != []) {
        this.upDatecharts();
        let index=this.hasSearched.indexOf(this.name)
        if(index!=-1){
          
          this.hasSearched.splice(index, this.hasSearched.length-index);
        }
        if(this.hasSearched.length==6)
          this.hasSearched.shift();
        this.hasSearched.push(this.name);
        // 
        
      }
    },
  },
  
};
</script>
   