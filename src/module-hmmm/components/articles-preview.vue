<template>
  <div class="container">
    <el-dialog
      title="预览文章"
      :visible.sync="previewDialog"
      width="50%"
      :before-close="handleClose"
    >
      <h3>{{ row.title }}</h3>
      <span>{{ row.createTime | parseTime }}</span>
      <span style="margin: 0 10px">{{ row.username }}</span>
      <span class="el-icon-view"></span>
      <span style="margin-left: 6px">{{ row.visits }}</span>
      <div class="content" v-html="row.articleBody" style="width: 100%"></div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ArticlesPreview',
  props: {
    previewDialog: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:previewDialog', false)
    }
  }
}
</script>

<style scoped>
.content {
  margin-top: 10px;
  margin-right: 5px;
  padding: 10px;
  width: 100%;
  background-color: #f5f5f5;
  border-top: 1px dashed #cecece;
}
.content >>> img {
  width: 100%;
}
</style>
