<template>
  <div class="container">
    <div class="questions">
      <!-- 搜索框 -->
      <el-form
        v-loading="loading"
        :inline="true"
        :model="ruleData"
        class="demo-form-inline"
      >
        <el-form-item label="关键字">
          <el-input
            v-model="ruleData.keyword"
            placeholder="根据编号搜索"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="ruleData.keyword = ''" style="margin-left: 730px"
            >清除</el-button
          >
          <el-button v-loading="loading" type="primary" @click="search"
            >搜索</el-button
          >
        </el-form-item>
      </el-form>
      <el-alert
        :title="'数据一共' + count + '条'"
        type="info"
        show-icon
        :closable="false"
      >
      </el-alert>

      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="编号" width="200"> </el-table-column>
        <el-table-column
          prop="questionType"
          label="题型"
          width="120"
          :formatter="typeCode"
        >
        </el-table-column>
        <el-table-column label="题目编号" width="200">
          <template slot-scope="{ row }">
            <span
              @click="titlePreview(item)"
              style="color: #0099ff"
              v-for="(item, index) in row.questionIDs"
              :key="index"
              >{{ item.number }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="addTime" label="录入时间" width="180">
        </el-table-column>
        <el-table-column prop="totalSeconds" label="答题时间(s)" width="120">
        </el-table-column>
        <el-table-column prop="accuracyRate" label="正确率(%)" width="120">
        </el-table-column>
        <el-table-column prop="userName" label="录入人" width="120">
        </el-table-column>
        <el-table-column prop="address" label="操作" width="120">
          <template slot-scope="{ row }">
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
        @pageSizeChange="pageSizeChange"
      />
    </div>
    <randoms-preview :isTitleDialog.sync="isTitleDialog" />
  </div>
</template>

<script>
import types from '@/api/base/baseApi.js'
import { randoms, removeRandoms, detail } from '@/api/hmmm/questions'
import PageTool from '../../module-dashboard/components/pageTool.vue'
import RandomsPreview from '../components/randoms-preview.vue'
export default {
  name: 'Questions',
  components: {
    PageTool,
    RandomsPreview
  },
  data () {
    return {
      ruleData: {
        keyword: ''
      },
      tableData: [],
      loading: false,
      count: 0,
      page: 1,
      pagesize: 10,
      questionsTypes: types.types,
      isTitleDialog: false
    }
  },
  created () {
    this.getRandoms()
  },
  methods: {
    async getRandoms () {
      const { data } = await randoms({ page: this.page, pagesize: this.pagesize })
      console.log(data)
      console.log(data.items)
      this.tableData = data.items
      this.count = data.counts
    },
    typeCode (row, column, cellValue) {
      const obj = this.questionsTypes.find(item => item.id === cellValue)
      return obj.value
    },
    async pageChange (node) {
      try {
        this.loading = true
        const { data } = await randoms({ page: node, pagesize: this.pagesize })
        this.tableData = data.items
        this.count = data.counts
        this.page = data.page
        this.pagesize = data.pagesize
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
    async pageSizeChange (node) {
      console.log(node)
      this.pagesize = node
      const { data } = await randoms({ page: this.page, pagesize: this.pagesize })
      this.tableData = data.items
    },
    async search () {
      console.log(111)
      const { data } = await randoms({ page: this.page, pagesize: this.pagesize, keyword: this.ruleData.keyword })
      console.log(data)
      this.tableData = data.items
      this.count = data.counts
    },
    async del (row) {
      try {
        await this.$confirm('此操作将永久删除该文章,是否继续?', '提示', {
          type: 'warning'
        })
        await removeRandoms({ id: row.id })
        this.getRandoms()
        this.$message.success('删除成功!')
      } catch (error) {
        console.log(error)
      }
    },
    async titlePreview ({ id }) {
      this.isTitleDialog = true
      // console.log()
      try {
        const res = await detail({ id })
        console.log(res)
      } catch (error) {
        this.$message.error(error)
      }
    }
  }
}
</script>

<style scoped lang='less'>
.questions {
  background-color: #fff;
  color: #303133;
  margin: 10px;
  border-radius: 5px;
  padding: 15px;
}
.page {
  margin-top: 20px;
  margin-left: 550px;
}
.remove {
  color: #f56c6c;
  background: #fef0f0;
  border-color: #fbc4c4;
}
</style>
