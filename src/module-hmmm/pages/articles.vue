<template>
  <div class="container">
    <div class="article">
      <!-- 搜索框 -->
      <div class="search">
        <el-form
          v-loading="loading"
          :inline="true"
          :model="formData"
          class="demo-form-inline"
        >
          <el-form-item label="关键字">
            <el-input
              v-model="formData.keywords"
              placeholder="根据文章标题搜索"
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
              style="float: right; margin-left: 320px"
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
        <el-table-column prop="title" label="文章标题" width="400">
        </el-table-column>
        <el-table-column prop="visits" label="阅读数" width="80">
        </el-table-column>
        <el-table-column prop="username" label="录入人" width="120">
        </el-table-column>
        <el-table-column prop="createTime" label="录入时间" width="180">
          <template slot-scope="{ row }">{{
            row.createTime | timeFilters
          }}</template>
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          width="120"
          :formatter="stateCode"
        >
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="{ row }">
            <el-button @click="handleClick(row)" type="text" size="small"
              >预览</el-button
            >
            <el-button type="text" size="small" @click="disabled(row)">{{
              row.state === 1 ? '禁用' : '启用'
            }}</el-button>
            <el-button
              type="text"
              size="small"
              @click="edit(row)"
              :disabled="row.state === 0"
              >修改</el-button
            >
            <el-button
              type="text"
              size="small"
              :disabled="row.state === 0"
              @click="del(row)"
              >删除</el-button
            >
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

    <articlePreview :previewDialog.sync="previewDialog" :row="row" />
    <articleAdd :isAddDialog.sync="isAddDialog" ref="addForm" />
  </div>
</template>

<script>
import { list, changeState, remove } from '@/api/hmmm/articles.js'
import state from '@/api/base/baseApi.js'
import articlePreview from '@/module-hmmm/components/articles-preview'
import articleAdd from '@/module-hmmm/components/articles-add'
import PageTool from '../../module-dashboard/components/pageTool.vue'
export default {
  name: 'Article',
  components: {
    articlePreview,
    articleAdd,
    PageTool
  },
  data () {
    return {
      list: [],
      formData: {
        keywords: '',
        state: ''
      },
      state: state.state,
      count: 0,
      previewDialog: false,
      row: {},
      isAddDialog: false,
      page: 1,
      pagesize: 10,
      loading: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      try {
        this.loading = true
        const { data } = await list({ page: this.page, pagesize: this.pagesize })
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
    handleClick (row) {
      this.previewDialog = true
      this.row = row
    },
    clear () {
      this.formData = {
        keywords: '',
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
      this.isAddDialog = true
    },
    edit (row) {
      this.$refs.addForm.ruleForm = { ...row }
      this.isAddDialog = true
    },
    async disabled (row) {
      try {
        this.loading = true
        if (row.state === 0) {
          const state1 = 1
          await changeState({ id: row.id, state: state1 })
          this.getList()
        } else if (row.state === 1) {
          const state2 = 0
          await changeState({ id: row.id, state: state2 })
          console.log(row.state)
          this.getList()
        }
      } catch (error) {
        console.log(error)
      }
    },
    async del (row) {
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
.article {
  // border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  margin: 10px;
  border-radius: 5px;
  padding: 15px;
}
.page {
  margin-top: 20px;
  margin-left: 800px;
}
</style>
