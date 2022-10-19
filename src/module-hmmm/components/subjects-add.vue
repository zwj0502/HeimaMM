<template>
  <div class='container'>
  <el-dialog
  :title="title"
  :visible="dialogVisible"
  width="50%"
  @close="handleClose">
  <el-form  label-width="80px" :model="roleForm"   ref="roleDialogForm">
  <el-form-item label="学科名称">
    <el-input v-model="roleForm.subjectName"></el-input>
  </el-form-item>
  <el-form-item label="是否显示">
    <el-switch
  v-model="value"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
  </el-form-item>
  </el-form >
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="sumbit">确 定</el-button>
  </span>
</el-dialog></div>
</template>

<script>
import { add, update } from '@/api/hmmm/subjects'
export default {
  data () {
    return {
      value: true,
      roleForm: {
        id: '',
        subjectName: '',
        isFrontDisplay: 1
      }
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    title () {
      return this.roleForm.id ? '修改学科' : '新增学科'
    }

  },
  methods: {
    handleClose () {
      this.$emit('update:dialogVisible', false)
      this.$refs.roleDialogForm.resetFields()
      this.roleForm = {
        id: '',
        subjectName: '',
        isFrontDisplay: 1
      }
    },

    async sumbit () {
      if (this.roleForm.id) {
        await update(this.roleForm)
        this.$emit('refList')
        this.handleClose()
        this.$message.success('修改成功')
      } else {
        this.$refs.roleDialogForm.validate()
        await add(this.roleForm)
        this.$emit('refList')
        this.handleClose()
        this.$message.success('添加成功')
      }
    }
  }
}
</script>

<style scoped lang='less'></style>
