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

          <el-form-item label="城市" prop="province" style="margin-right: 35px">
            <el-select
              class="filter-item"
              style="width: 200px"
              v-model="formData.province"
              @keyup.enter="handleFilter"
              @change="handleProvince"
              filterable
            >
              <el-option
                v-for="item in citySelect.province"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地区" style="margin-right: 35px">
            <el-select
              class="filter-item"
              style="width: 200px"
              v-model="formData.city"
              @keyup.enter="handleFilter"
              filterable
            >
              <el-option
                v-for="item in citySelect.cityDate"
                :key="item"
                :label="item"
                :value="item"
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

            <el-tooltip
              class="item"
              effect="dark"
              :content="row.state === 1 ? '禁用' : '启用'"
              placement="top-start"
            >
              <el-button
                @click="disabled(row)"
                :class="row.state === 1 ? 'disabled' : 'success'"
                :type="row.state === 1 ? 'warning' : 'success'"
                :icon="row.state === 1 ? 'el-icon-close' : 'el-icon-check'"
                circle
                plain
              ></el-button>
            </el-tooltip>

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
    <CompanysAdd
      :dialogFormVisible.sync="dialogFormVisible"
      ref="addForm"
      @newDataes="getList"
      :row="row"
    />
  </div>
</template>

<script>
import CompanysAdd from '../components/companys-add.vue'
import { list, remove, disabled } from '@/api/hmmm/companys.js'
import state from '@/api/base/baseApi.js'
import PageTool from '../../module-dashboard/components/pageTool.vue'
import { provinces, citys } from '@/api/hmmm/citys.js'
export default {
  name: 'Companyments',
  components: {
    PageTool,
    CompanysAdd
  },
  data () {
    return {
      list: [],
      formData: {
        tags: '',
        city: '',
        province: '',
        shortName: '',
        state: ''
      },
      dialogFormVisible: false,
      state: state.state,
      row: {},
      loading: false,
      count: 0,
      page: 1,
      pagesize: 10,
      citySelect: {
        province: [],
        cityDate: []
      }
    }
  },
  created () {
    this.getList()
    this.getCityData()
  },
  methods: {
    // 获取省
    getCityData: function () {
      this.citySelect.province = provinces()
    },
    // 选省获取到市
    handleProvince: function (e) {
      this.citySelect.cityDate = citys(e)
      this.formData.city = this.citySelect.cityDate[0]
    },
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
    async search () {
      try {
        // this.loading = true
        const { data } = await list({ tags: this.formData.tags, province: this.formData.province, city: this.formData.city, shortName: this.formData.shortName, state: this.formData.state })
        console.log(data)
        this.list = data.items
        this.count = data.counts
        this.page = data.page
        this.pagesize = data.pagesize
        this.loading = false
      } catch (error) {
        console.log(error)
      }

      // try {
      //   this.loading = true
      //   this.list = this.list.filter(item => {
      //     if (item.title.includes(this.formData.keywords) && +this.formData.state === item.state) {
      //       return item
      //     } else if (this.formData.keywords === '' && this.formData.state === '') {
      //       this.getList()
      //     }
      //   })
      // } catch (error) {
      //   console.log(error)
      // } finally {
      //   this.loading = false
      // }
    },
    addBtn () {
      this.dialogFormVisible = true
    },
    edit (row) {
      const { addDate, city, company, creatorID, id, isFamous, number, province, remarks, shortName, state, tags } = row
      const rows = { addDate, city, company, creatorID, id, isFamous, number, province, remarks, shortName, state, tags }
      if (rows.isFamous === 0) {
        rows.isFamous = false
      } else if (rows.isFamous === 1) {
        rows.isFamous = true
      }
      this.$refs.addForm.ruleInline = { ...rows }
      this.dialogFormVisible = true
    },
    async disabled (row) {
      row.state = +!row.state
      await disabled(row)
    },
    del (row) {
      this.$confirm('此操作将永久删除该文章,是否继续?', '提示', {
        type: 'warning',
        center: true
      }).then(() => {
        remove({ id: row.id })
        this.getList()
        this.$message.success('删除成功!')
      })
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
.success {
  color: #67c23a;
  background: #f0f9eb;
  border-color: #c2e7b0;
}
.remove {
  color: #f56c6c;
  background: #fef0f0;
  border-color: #fbc4c4;
}
</style>
