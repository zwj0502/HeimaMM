<template>
  <el-dialog
    title="题目预览"
    :visible="isTitleDialog"
    width="50%"
    @close="handleClose"
  >
    <el-row>
      <el-col :span="6"
        ><div class="grid-content bg-purple">【题型】：</div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple-light">【编号】：</div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple"></div>
        【难度】：</el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple-light"></div>
        【标签】：</el-col
      >
    </el-row>
    <el-row style="margin: 20px 0">
      <el-col :span="6"
        ><div class="grid-content bg-purple">【学科】：</div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple-light">【目录】：</div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple"></div>
        【方向】：</el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple-light"></div
      ></el-col>
    </el-row>
    <hr />
    <span>【题干】：</span>
    <div>选项：(以下选中的选项为正确答案)</div>
    <hr />
    <span style="margin-right: 10px">【参考答案】:</span
    ><span
      ><el-button type="danger" @click="preview">视频答案预览</el-button></span
    >
    <br />
    <video src="" controls="controls" class="video" v-show="isShow"></video>
    <hr />
    <span>【答案解析】：</span>
    <hr />
    <span>【题目解析】：</span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    isTitleDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:isTitleDialog', false)
    },
    preview () {
      this.isShow = true
    }
  }
}
</script>

<style lang="less" scoped>
.video {
  margin-top: 10px;
}
</style>
