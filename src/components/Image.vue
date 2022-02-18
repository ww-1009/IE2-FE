<template>
  <div class="block">
    <span class="demonstration"></span>
    <el-image :src="url" :fit="fit">
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
  </div>
</template>

<script>
export default {
    data(){
        return{
            url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.iot101.com%2Fuploadfile%2Fueditor%2Fimage%2F202202%2F1644544996f7f087.jpg&refer=http%3A%2F%2Fwww.iot101.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647768298&t=d18d1d4147be34e3a0a82167d2ac27ba"
        }
    }
}
    

</script>
