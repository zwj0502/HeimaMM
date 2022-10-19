<template>
  <div class="container">
  <el-card>
    <!-- <el-row>
  <el-col :span="16"><el-form  class="demo-form-inline">
  <el-form-item>
    <el-input  placeholder="根据名称搜索"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button >清空</el-button>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" >查询</el-button>
  </el-form-item>
</el-form></el-col>
  <el-col :span="8"><el-button type="primary" @click="dialogFormVisibleBtn">新建</el-button></el-col>
</el-row> -->
<!-- <el-alert
    :title="title"
    type="info"
    :closable="false"
    show-icon>
  </el-alert> -->
  <el-form :inline="true" class="demo-form-inline">
  <el-form-item >
    <el-input v-model="fromDate.keyword"  placeholder="根据用户名称搜索"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button @click="fromDate.keyword = ''">清空</el-button>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
  <el-button  icon="el-icon-edit"  style="float:right" type="success" @click="dialogFormVisibleBtn">新增权限组</el-button>
</el-form>
<el-alert
    :title="title"
    type="info"
    :closable="false"
    show-icon>
  </el-alert>
    <template>
  <el-table
    ref="multipleTable"
    :data="permissions"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="150">
    </el-table-column>
    <el-table-column
      prop="title"
      label="用户名"
      width="500">
    </el-table-column>
    <el-table-column
    prop="create_date"
      label="日期"
      width="500">

    </el-table-column>
    <el-table-column
      label="操作"
      >
      <template slot-scope="{row}">
        <el-button plain type="primary" icon="el-icon-edit" circle @click="editorBtn(row)" ></el-button>
        <el-button plain type="danger" icon="el-icon-delete" circle  @click="deleteBtn(row)" ></el-button>
        <!-- <el-button type="primary" icon="el-icon-edit" circle @click="editorBtn(row)" ></el-button> -->
      </template>
    </el-table-column>
  </el-table>
  <!-- <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div> -->
</template>
<pagetool
v-loading="loading"
style="float:right;margin: 20px;"
 class="page"
 :total.sync="count"
 :paginationPagesize.sync="fromDate.pagesize"
 :paginationPage.sync="fromDate.page"
 @pageChange="pageChange"
 @pageSizeChange="pageSizeChange"
 />
  </el-card>
  <permissionsAdd @saveId="saveId" ref="permissionsAdd" :id="id" :visible.sync="visible" @newDataes="permissionslist" ></permissionsAdd>
  </div>
</template>

<script>
import { permissionslist, remove } from '@/api/base/permissions'
import permissionsAdd from '../components/permissions-add.vue'
import pagetool from '../components/page-tool.vue'

export default {
  name: 'permissionslist',
  components: { permissionsAdd, pagetool },
  data () {
    return {
      fromDate: {
        page: 1,
        pagesize: 10,
        keyword: ''
      },
      count: '',
      permissions: [],
      visible: false,
      id: '',
      loading: false
    }
  },

  created () {
    this.permissionslist()
  },
  methods: {
    saveId () {
      this.id = ''
    },
    async permissionslist () {
      const { data } = await permissionslist(this.fromDate)
      console.log(data)
      this.count = data.counts

      this.permissions = data.list
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    dialogFormVisibleBtn () {
      this.visible = true
    },
    editorBtn (row) {
      this.visible = true
      console.log(row)
      this.id = row.id
      // this.$refs.permissionsAdd.formBase = { ...row }
      // permissions
      // console.log(this.$refs.permissionsAdd.hanldeEditForm())
      // const rows = this.$refs.permissionsAdd.treeCheckedNodes
      // console.log(rows)
    },
    async deleteBtn (row) {
      // this.$confirm('此操作将永久删除该权限,是否继续?', '提示', {
      //   type: 'warning',
      //   center: true
      // }).then(() => {
      //   remove(row)
      //   console.log(1)
      //   this.permissionslist()
      //   this.$message.success('删除成功!')
      // })
      await remove(row)
      this.$message.success('删除成功!')
      // if (this.permissions.length === 0) {
      //   this.pageChange()
      // }
      this.permissionslist()
      // console.log(this.permissions.length)

      // this.permissions.length === 0 ? this.pageChange(this.fromDate) : this.permissionslist()
    },
    async onSubmit () {
      // const res = await permissionslist(this.fromDate)
      // console.log(res)
      const date = []
      this.permissions.forEach(item => {
        if (item.title === this.fromDate.keyword) {
          console.log(item)
          date.push(item)
          // this.page = '1'
        } else if (this.fromDate.keyword === '') {
          this.permissionslist()
        }
      })
      // console.log(date)
      this.permissions = date
    },
    async pageChange (node) {
      this.fromDate.page = node
      this.loading = true
      const { data } = await permissionslist(this.fromDate)
      // console.log(data)
      this.permissions = data.list
      this.loading = false

      // this.page = data.page
      // this.count = data.counts
      // this.pagesize = data.pagesize
      // console.log(node)
    },
    async pageSizeChange (node) {
      this.fromDate.pagesize = node
      const { data } = await permissionslist(this.fromDate)
      console.log(data)
      this.permissions = data.list
    }
  },
  computed: {
    title () {
      return '共' + this.count + '条数据'
    }
  }
  // watch: {
  //   async permissions () {
  //     console.log(this.permissions.length)
  //     if (this.permissions.length === 0) {
  //       this.page = this.page--
  //       const res = await permissionslist(this.fromDate)
  //       // const res = permissionslist(this.fromDate)
  //       console.log(res)
  //       // this.pageChange(this.fromDate)
  //     }
  //   }
  // }
}
</script>

<style scoped lang='less'>
.container{
  padding: 20px;
}
</style>
