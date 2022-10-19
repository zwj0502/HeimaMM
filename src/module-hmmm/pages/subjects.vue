<template>
  <div class='container'>

<el-card class="box-card">
  <div slot="header" class="clearfix">
    <label> 学科名称：</label>
    <el-input class="avv" v-model="value"></el-input>
      <el-button @click="clear">清除</el-button>
  <el-button type="primary" @click="subjectsSearch">搜索</el-button>
    <el-button style="float:right;"  type="success" @click="newSubjects">新增学科</el-button>
  </div>
 <page-tools >
      <template #before>
        <span>数据一共{{pages}}条</span>
      </template>
    </page-tools>
     <el-table :data="SubjectsItems" >
        <el-table-column label="序号" width="110" type="index" />
        <el-table-column label="学科名称" prop="subjectName" width="110" />
        <el-table-column label="创建者" prop="username" width="110"/>
        <el-table-column label="创建日期" prop="addDate" width="180"  />
        <el-table-column label="前台是否显示" width="110" prop="isFrontDisplay">
          <template slot-scope="{row:{isFrontDisplay}}" >
            <span v-if="+isFrontDisplay===1">是</span>
            <span v-else>否</span>

          </template>
        </el-table-column>
        <el-table-column label="二级目录" prop="twoLevelDirectory" width="110" />
        <el-table-column label="标签" prop="tags" width="110" />
        <el-table-column label="题目数量" prop="totals" width="110"/>
        <el-table-column label="操作" >
          <template slot-scope="{row}" >
            <el-button type="text" size="small" @click="classify(row)">学科分类</el-button>
            <el-button type="text" size="small" @click="classtages(row)">学科标签</el-button>
            <el-button type="text" size="small" @click="newSubjectes(row)">修改</el-button>
            <el-button type="text" size="small" @click="del(row)">删除</el-button>

          </template>
        </el-table-column>

      </el-table>
      <el-pagination
      background
      :page-sizes="[5,10, 20, 50]"
      :current-page.sync="page.page"
      :page-size.sync="page.pagesize"
      layout=" prev, pager, next, sizes,jumper"
      :total="pages"
      @current-change ="getSubjectsList"
      @size-change ="getSubjectsList"
      style="float:right;margin:20px"
      >
    </el-pagination>
</el-card>
<subjects-add :dialogVisible.sync="dialogVisible" @refList="getSubjectsList" ref="newsser"></subjects-add>

  </div>
</template>

<script>
import PageTools from '@/components/PageTools'
import { list, remove } from '@/api/hmmm/subjects'
import SubjectsAdd from '../components/subjects-add.vue'
export default {
  components: { PageTools, SubjectsAdd },
  data () {
    return {
      page: {
        page: 1,
        pagesize: 10
      },
      SubjectsItems: [],
      pages: 0,
      value: '',
      dialogVisible: false

    }
  },
  created () {
    this.getSubjectsList()
  },
  methods: {
    async getSubjectsList () {
      const { data } = await list(this.page)
      this.SubjectsItems = data.items
      this.pages = data.counts
    },
    async subjectsSearch () {
      const { data } = await list({ subjectName: this.value })
      this.SubjectsItems = data.items
    },

    clear () {
      this.value = ''
    },
    newSubjects () {
      this.dialogVisible = true
    },
    newSubjectes (row) {
      this.$refs.newsser.roleForm = { ...row }
      this.dialogVisible = true
    },
    async classify (row) {
      this.$router.push({ path: '/subjects/directorys/', query: { id: row.id, name: row.subjectName, t: Date.now() } })
    },
    async del (row) {
      try {
        await this.$confirm('确认要删除吗', '删除', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await remove(row)
        this.getSubjectsList()
      } catch (error) {
        console.log(error)
      }
    },
    classtages (row) {
      this.$router.push({ path: '/subjects/tags/', query: { id: row.id, name: row.subjectName, t: Date.now() } })
    }
  }
}
</script>

<style scoped lang='less'>
.avv{
  width: 180px;
}</style>
