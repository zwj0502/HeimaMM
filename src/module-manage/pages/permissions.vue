<template>
  <div class="container">
  <el-card>
    <el-row>
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
</el-row>
<!-- <el-alert
    :title="title"
    type="info"
    :closable="false"
    show-icon>
  </el-alert> -->
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
        <el-button type="primary" icon="el-icon-edit" circle @click="editorBtn(row)" ></el-button>
        <el-button type="danger" icon="el-icon-delete" circle  @click="deleteBtn(row)" ></el-button>
        <!-- <el-button type="primary" icon="el-icon-edit" circle @click="editorBtn(row)" ></el-button> -->
      </template>
    </el-table-column>
  </el-table>
  <!-- <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div> -->
</template>
  </el-card>
  <permissionsAdd @saveId="saveId" ref="permissionsAdd" :id="id" :visible.sync="visible" @newDataes="permissionslist" ></permissionsAdd>
  </div>
</template>

<script>
import { permissionslist } from '@/api/base/permissions'
import permissionsAdd from '../components/permissions-add.vue'
export default {
  components: { permissionsAdd },
  data () {
    return {
      fromDate: {
        page: 1,
        pagesize: 10,
        keyword: ''
      },
      permissions: [],
      visible: false,
      id: ''
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
    }
  }
}
</script>

<style scoped lang='less'>
.container{
  padding: 20px;
}
</style>
