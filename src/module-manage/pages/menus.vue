<template>
  <div>
    <el-button type="primary" @click="visible = true" :PermissionGroupsList="tableData">新建</el-button>
    <template>
  <el-table
    :data="tableData"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    default-expand-all
    :tree-props="{children: 'childs', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="title"
      label="标题"
      width="500">
      <template slot-scope="scope">
        <i :class="iconrType(scope.row)"></i>
        <span style="margin-left: 10px">{{ scope.row.title }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="code"
      label="权限点代码"
      width="500">
    </el-table-column>
    <el-table-column
      prop="address"
      label="详情">
      <template slot-scope="{row}">
        <el-button plain type="primary" icon="el-icon-edit" circle @click="editorBtn(row)" ></el-button>
        <el-button plain type="danger" icon="el-icon-delete" circle  @click="deleteBtn(row)" ></el-button>
        <!-- <el-button type="primary" icon="el-icon-edit" circle @click="editorBtn(row)" ></el-button> -->
      </template>
    </el-table-column>
  </el-table>
  </template>
  <menuAdd ref="menuAdd" :visible.sync="visible" @newDataes="getmenus"></menuAdd>
  </div>
</template>

<script>
import { list, remove } from '@/api/base/menus'
// import menuAdd from '../components/menu-add.vue'
import menuAdd from '../components/menu-add.vue'
export default {
  components: {
    menuAdd
  },
  data () {
    return {
      visible: false,
      tableData: []
    }
  },
  computed: {

  },

  created () {
    this.getmenus()
    console.log(11111)
  },

  methods: {
    iconrType (row) {
      if (!row.pid) {
        return 'el-icon-folder-opened'
      } else if (row.pid && this.tableData.find(item => item.id === row.pid)?.childs) {
        return 'el-icon-document-remove'
      } else {
        return 'el-icon-view'
      }
    },
    async getmenus () {
      const { data } = await list()
      console.log(data)
      // this.tableData = data
      this.tableData = JSON.parse(JSON.stringify(data).replace(/points/g, 'childs'))
      // console.log(dataList)
    },
    async editorBtn (row) {
      console.log(row)
      await this.$refs.menuAdd.hanldeEditForm(row.id)
      this.visible = true
    },
    // async deleteBtn (row) {
    //   // console.log(id)
    //   try {
    //     await remove(row)
    //     this.$message.success('删除成功')
    //     this.getmenus()
    //   } catch (error) {
    //     this.$message.error('删除失败')
    //   }
    // },
    async deleteBtn (row) {
      this.$confirm('此操作将永久删除该权限,是否继续?', '提示', {
        type: 'warning',
        center: true
      }).then(() => {
        remove(row)
        this.getmenus()
        this.$message.success('删除成功!')
      })
    }
  }
}
</script>

<style scoped lang='scss'>
::v-deep .el-table [class*=el-table__row--level] .el-table__expand-icon{
  display: none;
}
.el-table td.el-table__cell div {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
</style>
