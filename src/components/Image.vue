<template>
  <div>
    <div class="block">
      <span class="demonstration"></span>
      <el-image :src="img" :fit="fit">
        <div slot="placeholder" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
    </div>
    <div>
      <div :index="item[0]" :key="item[0]" v-for="item in newstop">
        <el-link
        style="margin-top:10px"
          type="info"
          :href="item[1]"
          target="_blank"
          >{{item[0]}}</el-link
        >
        <br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "https://fyb-1.cdn.bcebos.com/hotboard_img/0badca2b33fd794f319e38475e77cbe5?x-bce-process=image/resize,m_fill,w_256,h_170",
    };
  },
  computed: {
    newstop: {
      get() {
        return this.$store.state.newstop;
      },
      set(val) {
        this.$store.commit("changeNewsTop", val);
      },
    },
    img: {
      get() {
        return this.$store.state.img;
      },
      set(val) {
        this.$store.commit("changeImg", val);
      },
    },
  },
  methods: {},
};
</script>
