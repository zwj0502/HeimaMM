<template>
  <div class="container">
    <el-dialog
      title="题目审核"
      :visible="questionCheckShow"
      @close="handleClose"
    >
      <el-form ref="form" :model="formData">
        <!-- 单选框 -->
        <el-form-item>
          <el-radio-group v-model="formData.chkState">
            <el-radio :label="1">通过</el-radio>
            <el-radio :label="2">拒绝</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <!-- 审核意见文本框 -->
          <el-input
            v-model="formData.chkRemarks"
            type="textarea"
            placeholder="请输入审核意见"
          ></el-input>
        </el-form-item>
        <!-- 确定和取消的按钮 -->
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" @click="confirm">确认</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { choiceCheck } from '../../api/hmmm/questions'
export default {
  props: {
    questionCheckShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      formData: {
        chkState: 1,
        // 审核意见
        chkRemarks: '',
        id: null
      }
    }
  },
  methods: {
    // 关闭执行的操作
    handleClose () {
      // 表单校验的重置
      this.$refs.form.resetFields()
      // 表格数据重置
      this.formData = {
        chkState: 1,
        // 审核意见
        chkRemarks: '',
        id: null
      }
      this.$emit('update:questionCheckShow', false)
    },
    // 表单提交签的验证
    async confirm () {
      // 文本框未输入内容，弹出警示
      if (this.formData.chkRemarks.length === 0) {
        this.$message.warning('请输入审核意见')
        return false
      }
      try {
        // 前面验证通过，后面正常发请求
        // console.log('111')
        await choiceCheck(this.formData)
        this.$message.success('审核完成')
        // 调用父级中的刷新方法
        this.$emit('getQuestionList')
        this.handleClose()
      } catch (error) {
        this.$message.error('刷新重试')
      }
    }
  }
}
</script>

<style scoped lang='less'>
::v-deep .el-dialog {
  width: 400px;
  height: 300px;

  .el-textarea__inner {
    margin-top: 10px;
    margin-bottom: 20px;
  }
}
</style>
