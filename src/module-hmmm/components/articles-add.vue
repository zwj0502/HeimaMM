<template>
  <div class="container">
    <el-dialog
      :title="title"
      :visible.sync="isAddDialog"
      width="50%"
      :before-close="handleClose"
    >
      <el-form :model="ruleForm" :rules="rules" label-width="100px">
        <el-form-item label="文章标题：" prop="title">
          <el-input
            v-model="ruleForm.title"
            placeholder="请输入文章标签"
          ></el-input>
        </el-form-item>
        <el-form-item label="文章内容：" prop="articleBody">
          <!-- <el-input v-model="ruleForm.content" type="textarea"></el-input> -->
          <Editor v-model="ruleForm.articleBody" />
        </el-form-item>
        <el-form-item label="视频地址：" prop="videoUrl">
          <el-input
            v-model="ruleForm.videoUrl"
            placeholder="请输入视频地址"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="mayBe">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Editor from '@/components/Editor'
import { add, update } from '@/api/hmmm/articles'
export default {
  name: 'articlesAdd',
  components: {
    Editor
  },
  data () {
    return {
      ruleForm: {
        title: '',
        articleBody: '',
        videoUrl: ''
      },
      rules: {
        title: [
          { required: true, message: '文章标题必填', trigger: 'blur' }
        ],
        articleBody: [
          { required: true, message: '文章内容必填', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    isAddDialog: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    title () {
      return this.ruleForm.id ? '修改文章' : '新增文章'
    }
  },
  methods: {
    handleClose () {
      this.ruleForm = {
        title: '',
        articleBody: '',
        videoUrl: ''
      }
      this.$emit('update:isAddDialog', false)
    },
    async mayBe () {
      this.ruleForm.id ? await update(this.ruleForm) : await add(this.ruleForm)
      this.ruleForm = {
        title: '',
        articleBody: '',
        videoUrl: ''
      }
      this.$parent.getList()
      this.$message.success('操作成功')
      this.$emit('update:isAddDialog', false)
    }
  }
}
</script>

<style scoped lang='less'></style>
