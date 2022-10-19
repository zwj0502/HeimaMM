<template>
  <div class='container'>
  <el-dialog
  :title="title"
  :visible="dialogVisible"
  width="50%"
  @close="onClose"
  >
  <el-form  label-width="100px" :data="roleForm">
  <el-form-item label="所属学科">
      <el-select v-model="roleForm.subjectID" placeholder="请选择">
    <el-option
      v-for="item in selectList"
      :key="item.id"
      :label="item.subjectName"
      :value="item.id"
      >
    </el-option>
  </el-select>
  </el-form-item>
<el-form-item label="目录名称" >
  <el-input v-model="roleForm.tagName"></el-input>
</el-form-item>
  </el-form >
  <span slot="footer" class="dialog-footer">
    <el-button @click="onClose">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </span>
</el-dialog></div>
</template>

<script>
import { list } from '@/api/hmmm/subjects'
import { add, update } from '@/api/hmmm/tags'

export default {
  data () {
    return {
      roleForm: {
        id: '',
        subjectID: '',
        tagName: ''
      },
      selectList: []

    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.onrosoFrom()
  },
  computed: {
    title () {
      return this.roleForm.id ? '修改标签' : '新增标签'
    }
  },
  methods: {
    async onrosoFrom () {
      const { data } = await list()
      this.selectList = data.items
    },
    onClose () {
      this.$emit('update:dialogVisible', false)
    },
    async submit () {
      if (this.roleForm.id) {
        await update(this.roleForm)
        this.$emit('refList')
        this.onClose()
      } else {
        await add(this.roleForm)
        this.$emit('refList')
        this.onClose()
      }
    }
  }
}
</script>

<style scoped lang='less'></style>
