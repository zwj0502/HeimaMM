<template>
  <div class="container">
    <el-card shadow="always">
      <el-row>
  <el-col :span="16"><el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item>
    <el-input v-model.trim="formInline.keyword" placeholder="根据名称搜索"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button @click="formInline.keyword = ''">清空</el-button>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="searchBtn">查询</el-button>
  </el-form-item>
</el-form></el-col>
  <!-- <el-col :span="8"><el-button type="primary" @click="visible = true">新建</el-button></el-col> -->
  <el-button  icon="el-icon-edit"  style="float:right" type="success" @click="visible = true">新增用户</el-button>
</el-row>
<el-alert
    :title="title"
    type="info"
    :closable="false"
    show-icon>
  </el-alert>
  <template>
  <el-table
    :data="userInfo"
    style="width: 100%">
    <el-table-column
      fixed
      type="index"
      label="序号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="150">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="联系电话"
      width="200">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名"
      width="200">
    </el-table-column>
    <el-table-column
      prop="permission_group_title"
      label="权限组名称"
      width="300">
    </el-table-column>
    <el-table-column
      prop="role"
      label="角色"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="150">
      <template slot-scope="{row}">
        <el-button plain type="primary" icon="el-icon-edit" circle @click="editorBtn(row)" ></el-button>
        <el-button plain type="danger" icon="el-icon-delete" circle  @click="deleteBtn(row)" ></el-button>
        <!-- <el-button type="primary" icon="el-icon-edit" circle @click="editorBtn(row)" ></el-button> -->
      </template>
    </el-table-column>
  </el-table>
</template>
<pagetool
style="float:right;margin: 20px;"
 :total.sync="count"
 :paginationPagesize.sync="formInline.pagesize"
 :paginationPage.sync="formInline.page"
 @pageChange="pageChange"
 @pageSizeChange="pageSizeChange"
 />
<userAdd ref="userAdd" :visible.sync="visible"  @newDataes="getuserInfo"></userAdd>
    </el-card>
  </div>
</template>
<script>
import { list, remove } from '@/api/base/users.js'
import pagetool from '../components/page-tool.vue'
import userAdd from '../components/user-add.vue'
export default {
  name: 'users',
  components: {
    pagetool, userAdd
  },
  data () {
    return {
      formInline: {
        page: 1,
        pagesize: 10,
        keyword: ''
      },
      count: 0,
      // page: 1,
      // pagesize: 10,
      userInfo: [],
      visible: false
    }
  },

  created () {
    this.getuserInfo()
  },

  methods: {
    async getuserInfo () {
      const { data } = await list(this.formInline)
      console.log(data)
      this.userInfo = data.list
      this.formInline.page = data.page
      this.count = data.counts
      this.formInline.pagesize = data.pagesize
    },
    editorBtn (row) {
      // eslint-disable-next-line camelcase
      const { avatar, email, id, permission_group_id, phone, role, username } = row
      const rows = { avatar, email, id, permission_group_id, phone, role, username }
      console.log(rows)
      this.visible = true
      this.$refs.userAdd.ruleForm = { ...rows }
    },
    // getpermissions () {
    //   this.
    // },
    // searchBtn () {
    //   const list = this.userInfo.forEach((item) => {
    //     if (item.username === this.formInline.username) {
    //       return item
    //     }
    //     console.log(list)
    //     // console.log(this.formInline.username)
    //   })
    // },
    async deleteBtn (row) {
      try {
        await remove(row)
        this.$message.success('删除成功')
        this.getuserInfo()
      } catch (error) {
        this.$message.error('删除失败')
      }
    },
    searchBtn () {
      this.userInfo = this.userInfo.filter(item => {
        if (item.username.includes(this.formInline.keyword)) {
          return item
        } else if (this.formInline.keyword === '') {
          console.log(1)
          this.getuserInfo()
        }
      })
    },
    async pageChange (node) {
      this.formInline.page = node
      const { data } = await list(this.formInline)
      // console.log(data)
      this.userInfo = data.list
      // this.page = data.page
      // this.count = data.counts
      // this.pagesize = data.pagesize
      // console.log(node)
    },
    async pageSizeChange (node) {
      this.formInline.pagesize = node
      const { data } = await list(this.formInline)
      console.log(data)
      this.userInfo = data.list
    }
  },
  computed: {
    title () {
      return '共' + this.count + '条数据'
    }
  }
}
</script>

<style scoped lang='less'>
.container{
  padding: 20px;
}
</style>
