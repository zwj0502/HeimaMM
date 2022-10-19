<template>
  <div class="add-form">
    <el-dialog :title="title" :visible="visible" @close="handerclose">
      <el-form :model="ruleForm" ref="dataForm" label-width="100px">
  <!-- <el-form-item label="账号" prop="account">
    <el-input v-model="ruleForm.account"></el-input>
  </el-form-item> -->
  <el-form-item label="用户名" prop="username" :rules="[
      { required: true, message: '请输入用户名', trigger: 'blur' }
    ]">
    <el-input v-model="ruleForm.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password" :rules="[
      { required: true, message: '请输入密码', trigger: 'blur' }
    ]" >
    <el-input v-model="ruleForm.password"></el-input>
  </el-form-item>

  <el-form-item label="角色" prop="role" :rules="[
      { required: true, message: '请输入角色', trigger: 'blur' }
    ]">
    <el-input v-model="ruleForm.role"></el-input>
  </el-form-item>
  <el-form-item label="联系电话" prop="phone" :rules="[
      { required: true, message: '请输入联系电话', trigger: 'blur' }
    ]">
    <el-input v-model="ruleForm.phone"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email"  :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]">
    <el-input v-model="ruleForm.email"

    ></el-input>
  </el-form-item>
  <el-form-item label="权限组" prop="permission_group_id" :rules="[
      { required: true, message: '请输入角色', trigger: 'blur' }
    ]">
    <el-select v-model="ruleForm.permission_group_id" placeholder="权限组id" @focus="getselete">
      <el-option v-for="item in  PermissionGroupsList" :key="item.id" :label="item.title" :value="item.id"></el-option>
    </el-select>
  </el-form-item>
  </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { update, add } from '@/api/base/users'

import { permissionslist } from '@/api/base/permissions.js'

export default {
  name: 'usersAdd',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      ruleForm: {
        password: '',
        username: '',
        email: '',
        phone: '',
        permission_group_id: '',
        avatar: '',
        role: '',
        sex: ''
      },
      PermissionGroupsList: []
      // fileList: [],
      // importFileUrl: 'https://jsonplaceholder.typicode.com/posts/',
    }
  },
  computed: {
    title () {
      return this.ruleForm.id ? '编辑用户' : '新建用户'
    }
  },
  methods: {
    // 弹层显示
    // dialogFormV () {
    //   this.dialogFormVisible = true
    // },
    // 弹层隐藏
    handerclose () {
      // this.handleClose()
      this.$emit('update:visible', false)
      this.$refs.dataForm.resetFields()
      this.ruleForm = {
        password: '',
        username: '',
        email: '',
        phone: '',
        permission_group_id: '',
        avatar: '',
        sex: ''
      }
    },
    // 退出
    handleClose () {
      this.handerclose()
      // this.$emit('update:visible', false)
      // this.$refs.dataForm.validate()
    },
    // 表单提交
    async createData () {
      try {
        this.$refs.dataForm.validate()
        this.ruleForm.id ? await update(this.ruleForm) : await add(this.ruleForm)
        this.$message.success('成功')
        this.$emit('newDataes')
        this.handleClose()
      } catch (error) {
        this.$message.error('失败')
      }
    },
    async  getselete () {
      const { data } = await permissionslist(this.formBase)
      // console.log(data.list)
      this.PermissionGroupsList = data.list
    }
  },
  // 挂载结束

  mounted: function () {},
  // 创建完毕状态
  created () {},
  // 组件更新
  updated: function () {}
}
</script>
<style>
.el-form--label-left .el-form-item__label {
  text-align: right;
}
.el-form-item--medium {
  margin-bottom: 22px;
}
.el-dialog__footer {
  text-align: center
}
</style>
