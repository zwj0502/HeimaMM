<template>
  <div class="container">
    <div class="companys">
      <!-- 搜索框 -->
      <div class="search">
        <el-form
          v-loading="loading"
          :inline="true"
          :model="formData"
          class="demo-form-inline"
        >
          <el-form-item label="标签名称" style="margin-right: 35px">
            <el-input v-model="formData.tags" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="城市" style="margin-right: 35px">
            <el-select v-model="formData.city" placeholder="请选择">
              <el-option
                v-for="item in state"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地区" style="margin-right: 35px">
            <el-select v-model="formData.area" placeholder="请选择">
              <el-option
                v-for="item in state"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业简称">
            <el-input
              v-model="formData.shortName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formData.state" placeholder="请选择">
              <el-option
                v-for="item in state"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="clear">清除</el-button>
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button
              type="success"
              icon="el-icon-edit"
              style="float: right; margin-left: 615px"
              @click="addBtn"
              >新增技巧</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <el-alert
        :title="'数据一共' + count + '条'"
        type="info"
        show-icon
        :closable="false"
      >
      </el-alert>
      <!-- 表格 -->
      <el-table :data="list" style="width: 100%">
        <el-table-column type="index" label="序号" width="60">
        </el-table-column>
        <el-table-column prop="number" label="企业编号" width="160">
        </el-table-column>
        <el-table-column prop="shortName" label="企业简称" width="110">
        </el-table-column>
        <el-table-column prop="tags" label="标签" width="120">
        </el-table-column>
        <el-table-column prop="creatorID" label="创建者" width="100">
        </el-table-column>
        <el-table-column prop="addDate" label="创建日期" width="200">
          <template slot-scope="{ row }">{{
            row.addDate | timeFilters
          }}</template>
        </el-table-column>
        <el-table-column prop="remarks" label="备注" width="190">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          width="80"
          :formatter="stateCode"
        >
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="{ row }">
            <el-button
              @click="edit(row)"
              class="edit"
              type="primary"
              icon="el-icon-edit"
              circle
              plain
            ></el-button>
            <el-button
              @click="disabled(row)"
              class="disabled"
              type="warning"
              icon="el-icon-close"
              circle
              plain
            ></el-button>
            <el-button
              @click="del(row)"
              class="remove"
              type="danger"
              icon="el-icon-delete"
              circle
              plain
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <PageTool
        class="page"
        :total.sync="count"
        :paginationPagesize.sync="pagesize"
        :paginationPage.sync="page"
        @pageChange="pageChange"
      />
    </div>
  </div>
</template>

<script>
import { list, remove } from '@/api/hmmm/companys.js'
import state from '@/api/base/baseApi.js'
import PageTool from '../../module-dashboard/components/pageTool.vue'
export default {
  name: 'Companyments',
  components: {
    PageTool
  },
  data () {
    return {
      list: [],
      formData: {
        tags: '',
        city: '',
        area: '',
        shortName: '',
        state: ''
      },
      state: state.state,
      loading: false,
      count: 0,
      page: 1,
      pagesize: 10
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      try {
        this.loading = true
        const { data } = await list()
        this.list = data.items
        this.count = data.counts
        this.page = data.page
        this.pagesize = data.pagesize
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
    async pageChange (node) {
      try {
        this.loading = true
        const { data } = await list({ page: node, pagesize: this.pagesize })
        this.list = data.items
        this.count = data.counts
        this.page = data.page
        this.pagesize = data.pagesize
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
    stateCode (row, column, cellValue) {
      const obj = this.state.find(item => +item.id === cellValue)
      return obj.value
    },
    clear () {
      this.formData = {
        tags: '',
        city: '',
        area: '',
        shortName: '',
        state: ''
      }
    },
    search () { // 根据关键字,进行数据的搜索
      try {
        this.loading = true
        this.list = this.list.filter(item => {
          if (item.title.includes(this.formData.keywords) && +this.formData.state === item.state) {
            return item
          } else if (this.formData.keywords === '' && this.formData.state === '') {
            this.getList()
          }
        })
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    addBtn () {

    },
    edit (row) {
    },
    disabled (row) { },
    del (row) {
      this.$confirm('此操作将永久删除该文章,是否继续?', '提示', {
        type: 'warning',
        center: true
      }).then(() => {
        remove({ id: row.id })
        this.$message.success('删除成功!')
      })
      this.getList()
    }
  }
}

</script>

<style scoped lang='less'>
.companys {
  // border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  margin: 10px;
  border-radius: 5px;
  padding: 15px;
}
.page {
  margin-top: 20px;
  margin-left: 650px;
}
.edit {
  color: #409eff;
  background: #ecf5ff;
  border-color: #b3d8ff;
}
.disabled {
  color: #e6a23c;
  background: #fdf6ec;
  border-color: #f5dab1;
}
.remove {
  color: #f56c6c;
  background: #fef0f0;
  border-color: #fbc4c4;
}
</style>
