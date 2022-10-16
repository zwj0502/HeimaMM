<template>
  <div class="container">
    <el-card>
      <div class="el-card_body">
        <!-- 头部导航+按钮 -->
        <el-row type="flex" justify="space-between" class="btn-wrapper">
          <span style="font-size: 12px; color: pink"
            >说明:目前支持学科和关键字条件筛选</span
          >
          <el-button type="success" size="small"
            ><span class="el-icon-edit" @click="addQuestion"
              >新增试题</span
            ></el-button
          >
        </el-row>
        <!-- 试题列表table，form表单 -->
        <el-form size="small" label-width="80px" :model="query">
          <el-row>
            <!-- 学科 -->
            <el-col :span="6">
              <el-form-item label="学科">
                <el-select
                  style="width: 100%"
                  v-model="query.subjectID"
                  @change="onSubjectChange"
                >
                  <el-option
                    v-for="(item, index) in subjects"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 二级目录 -->
            <el-col :span="6">
              <el-form-item label="二级目录">
                <el-select
                  style="width: 100%"
                  v-model="query.catalogID"
                  @change="onDirectoryChange"
                >
                  <el-option
                    v-for="(item, index) in catalogs"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 标签 -->
            <el-col :span="6">
              <el-form-item label="标签">
                <el-select style="width: 100%" v-model="query.tags">
                  <!-- <el-option label="区域一" value="shanghai"></el-option> -->
                  <el-option
                    v-for="(item, index) in tagsList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 关键字 -->
            <el-col :span="6">
              <el-form-item label="关键字">
                <el-input
                  placeholder="根据题干搜索"
                  style="width: 100%"
                  v-model="query.keyword"
                ></el-input>
              </el-form-item>
            </el-col>
            <!-- 试题类型 -->
            <el-col :span="6">
              <el-form-item label="试题类型">
                <el-select style="width: 100%" v-model="query.questionType">
                  <el-option
                    v-for="(item, index) in questionType"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 难度 -->
            <el-col :span="6">
              <el-form-item label="难度">
                <el-select style="width: 100%" v-model="query.difficulty">
                  <el-option
                    v-for="(item, index) in difficulty"
                    :key="index"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 方向 -->
            <el-col :span="6">
              <el-form-item label="方向">
                <el-select style="width: 100%" v-model="query.direction">
                  <el-option
                    v-for="(item, index) in direction"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 录入人 -->
            <el-col :span="6">
              <el-form-item label="录入人">
                <el-select style="width: 100%" v-model="query.creatorID">
                  <el-option
                    v-for="(item, index) in userList"
                    :key="index"
                    :label="item.username"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 题目备注 -->
            <el-col :span="6">
              <el-form-item label="题目备注">
                <el-input
                  v-model="query.remarks"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <!-- 企业简称 -->
            <el-col :span="6">
              <el-form-item label="企业简称">
                <el-input
                  v-model="query.shortName"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
            </el-col>
            <!-- 城市 -->
            <el-col :span="6">
              <el-form-item label="城市" class="city">
                <el-select
                  class="city-1"
                  v-model="query.province"
                  @change="onProvince"
                >
                  <el-option
                    v-for="(item, index) in province"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
                <el-select class="city-2" v-model="query.city">
                  <el-option
                    v-for="(item, index) in city"
                    :key="index"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 清除和搜索按钮 -->
            <el-col :span="6">
              <el-form-item class="table_btn">
                <el-button size="small" @click="clearAll">清除</el-button>
                <el-button size="small" type="primary" @click="search"
                  >搜索</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- tabs筛选 -->
        <el-row>
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="全部" name="all"></el-tab-pane>
            <el-tab-pane label="待审核" name="0"></el-tab-pane>
            <el-tab-pane label="已审核" name="1"></el-tab-pane>
            <el-tab-pane label="已拒绝" name="2"></el-tab-pane>
          </el-tabs>
        </el-row>
        <!-- 消息提示 -->
        <el-row>
          <el-alert
            title="消息提示的文案"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
        </el-row>
        <!-- 表格样式 -->
        <el-row>
          <el-table
            :data="tableData"
            style="width: 100%"
            max-height="100%"
            :header-cell-style="{
              background: '#f4f3f9',
              color: '#606266',
              borderBottom: '2px solid #e8e8e8',
            }"
          >
            <el-table-column prop="number" label="试题编号" width="120">
            </el-table-column>
            <el-table-column prop="subject" label="学科" width="120">
            </el-table-column>
            <el-table-column prop="catalog" label="目录" width="120">
            </el-table-column>
            <el-table-column
              prop="questionType"
              label="题型"
              width="120"
              :formatter="questionTypeForm"
            >
            </el-table-column>
            <el-table-column prop="question" label="题干" width="280">
              <template slot-scope="{ row }">
                <div v-html="row.question"></div>
              </template>
            </el-table-column>
            <el-table-column prop="addDate" label="录入时间" width="180">
              <template slot-scope="{ row }">
                {{ row.addDate | parseTimeByString }}
              </template>
            </el-table-column>
            <el-table-column
              prop="difficulty"
              label="难度"
              width="80"
              :formatter="difficultyForm"
            >
            </el-table-column>
            <el-table-column prop="creator" label="录入人" width="120">
            </el-table-column>
            <el-table-column
              prop="chkState"
              label="审核状态"
              width="120"
              :formatter="chkTypeForm"
            >
            </el-table-column>
            <el-table-column prop="chkRemarks" label="审核意见" width="150">
            </el-table-column>
            <el-table-column prop="chkUser" label="审核人" width="120">
            </el-table-column>
            <el-table-column
              prop="publishState"
              label="发布状态"
              width="150"
              :formatter="publishTypeForm"
            >
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="200"
              align="center"
            >
              <template slot-scope="{ row }">
                <el-button type="text" size="small">预览</el-button>
                <el-button
                  type="text"
                  size="small"
                  :disabled="row.chkState !== 0"
                  @click="questionCheck(row)"
                  >审核</el-button
                >
                <el-button type="text" size="small" @click="editQuestion(row)"
                  >修改</el-button
                >
                <el-button type="text" size="small" @click="putQuestion(row)">
                  {{ row.publishState === 1 ? '下架' : '上架' }}
                </el-button>
                <el-button type="text" size="small" @click="delQuestion(row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <!-- 底部分页组件 -->
        <el-row>
          <!-- 分页功能 -->
          <el-pagination
            v-if="total > 0"
            style="text-align: right; margin-top: 20px; margin-bottom: 15px"
            layout="prev, pager, next, sizes, jumper"
            :total="total"
            :current-page.sync="query.page"
            :page-size.sync="query.pagesize"
            :page-sizes="[5, 10, 20, 30]"
            @current-change="getQuestionList"
            @size-change="getQuestionList"
            background
          >
          </el-pagination>
          <!-- 分页功能 end-->
        </el-row>
      </div>
    </el-card>
    <!-- 试题审核弹窗组件 -->
    <QuestionsCheck
      :questionCheckShow.sync="questionCheckShow"
      ref="QuestionsCheck"
      @getQuestionList="getQuestionList"
    ></QuestionsCheck>
  </div>
</template>

<script>
import { choice, choicePublish, remove } from '../../api/hmmm/questions'
import { simple } from '../../api/hmmm/subjects'
import { simpleDirectorys } from '../../api/hmmm/directorys'
import { simpleTags } from '../../api/hmmm/tags'
import { getUserList } from '../../api/base/users'
import { provinces, citys } from '../../api/hmmm/citys'
import { questionType, difficulty, chkType, publishType, direction } from '../../api/hmmm/constants'
import QuestionsCheck from '../components/questions-check.vue'
export default {
  name: 'questionChoice',
  components: { QuestionsCheck },
  data () {
    return {
      // 所有城市
      province: provinces(),
      // 城市下所有地区
      city: [],
      // 页面数量总条数
      total: 0,
      activeName: 'all',
      // 表格渲染需要的数据
      tableData: [],
      // 表格数据查询信息
      query: {
        page: 1,
        pagesize: 5,
        subjectID: null,
        difficulty: null,
        questionType: null,
        tags: null,
        province: null,
        city: null,
        keyword: null,
        remarks: null,
        shortName: null,
        direction: null,
        creatorID: null,
        catalogID: null,
        chkState: null // 审核状态
      },
      // 难度和题型的数据选择(数组)
      difficulty: difficulty,
      questionType: questionType,
      // 审核状态
      chkState: chkType,
      publishType: publishType,
      direction: direction,
      // 获取录入人
      userList: [],
      // 学科下拉数据
      subjects: [],
      catalogs: [],
      tagsList: [],
      // 控制试题审核是否显示的变量
      questionCheckShow: false
      // 控制显示上架还是下架按钮
    }
  },
  created () {
    // 初始化列表数据
    this.getQuestionList()
    // 获取学科列表，做下拉的用法
    this.getSubjectList()
    // 获取录入人
    this.getUserList()
  },
  // methods
  methods: {
    // 点击新增试题，跳转到试题录入界面
    addQuestion () {
      this.$router.push('/questions/new')
    },
    // 底部标签的选择
    handleClick () {
      // 打印出来的是绑定的name值
      console.log(this.activeName)
      // 根据选择的不同的值去设置不同的chkState的值，再去发请求渲染页面
      switch (this.activeName) {
        case 'all':
          this.query.chkState = null // 全部状态
          this.getQuestionList() // 重新获取列表
          break
        case '0':
          this.query.chkState = 0 // 待审核
          this.getQuestionList() // 重新获取列表
          break
        case '1':
          this.query.chkState = 1 // 通过
          this.getQuestionList() // 重新获取列表
          break
        case '2':
          this.query.chkState = 2 // 不通过
          this.getQuestionList() // 重新获取列表
          break
      }
    },
    // 初始化题库列表
    async getQuestionList () {
      try {
        const { data } = await choice(this.query)
        this.tableData = data.items
        console.log(data)
        this.total = data.counts
      } catch (error) {
        console.log(error)
      }
    },
    // 表格数据的格式化,后端返回的是数字
    // 格式化题型
    questionTypeForm (row, column, cellValue) {
      const res = this.questionType.find(ele => ele.value.toString() === cellValue)
      // console.log(questionType)
      return res ? res.label : ''
    },
    // 格式化题目难度
    difficultyForm (row, column, cellValue) {
      const res = this.difficulty.find(ele => ele.value.toString() === cellValue)
      // console.log(questionType)
      return res ? res.label : ''
    },
    // 审核状态格式化
    chkTypeForm (row, column, cellValue) {
      const res = this.chkState.find(ele => ele.value === cellValue)
      // console.log(questionType)
      return res ? res.label : ''
    },
    // 发布状态格式化
    publishTypeForm (row, column, cellValue) {
      const res = this.publishType.find(ele => ele.value === cellValue)
      // console.log(questionType)
      return res ? res.label : ''
    },
    // 初始化获取学科列表在，做下拉用
    async getSubjectList () {
      try {
        const { data } = await simple()
        // console.log(data)
        this.subjects = data
      } catch (error) {
        console.log(error)
      }
    },
    // 学科选择变化后执行的函数
    async onSubjectChange (id) {
      // 学科选择一旦发生变化，就把二级目录和标签的值进行重置
      this.query.tags = null
      this.query.catalogID = null
      this.catalogs = []
      this.tagsList = []
      // 学科选择变化后，根据最新的值再去获取二级目录
      try {
        const { data } = await simpleDirectorys({
          subjectID: id
        })
        // console.log(data)
        this.catalogs = data
        // 去调用获取标签的函数,标签是通过学科id来直接获取的，有的学科也没有二级目录
        this.getTabsList()
      } catch (error) {
        console.log(error)
      }
    },
    // 目录变化后再去执行获取标签的内容
    onDirectoryChange () {
      this.query.tags = null
      this.tagsList = []
      // 获取标签的数组
      this.getTabsList()
    },
    // 获取标签的内容
    async getTabsList () {
      try {
        const { data } = await simpleTags({
          subjectID: this.query.subjectID
        })
        // console.log(data)
        this.tagsList = data
      } catch (error) {
        console.log(error)
      }
    },
    // 获取录入人
    async getUserList () {
      try {
        const { data } = await getUserList()
        this.userList = data.list
      } catch (error) {
        console.log(error)
      }
    },
    // 所有城市调用他的函数，返回所哟城市
    // 所有城市选择后，利用select的change事件，再去请求城市所有下级
    async onProvince (val) {
      try {
        // 每一次触发后,像这种级联关联的一定要把后面的值给清空
        // 否则会出现，前面变化，后面不变的情况
        this.query.city = ''
        this.city = await citys(val)
      } catch (error) {
        console.log(error)
      }
    },
    // 点击清除按钮，清除所有的数据
    clearAll () {
      for (const key in this.query) {
        if (key === 'page' || key === 'pagesize') {
          continue
        }
        this.query[key] = null
      }
      this.tagList = this.catalogs = []
      // 更新题库列表
      this.getQuestionList()
      this.activeName = 'all'
    },
    // 点击搜索按钮,调用刷新列表方法
    search () {
      this.getQuestionList()
    },
    // 试题审核功能
    questionCheck (row) {
      console.log(row)
      // 未审核row.chkState===0
      // 已审核为1，不通过为2
      this.questionCheckShow = true
      this.$refs.QuestionsCheck.formData = {
        chkState: 1,
        // 审核意见
        chkRemarks: '',
        id: row.id
      }
    },
    // 试题编辑功能
    editQuestion (row) {
      this.$router.push({ path: '/questions/new', query: { id: row.id } })
    },
    // 上架或者下架试题
    async putQuestion (row) {
      try {
        await this.$confirm(`您确定${row.publishState === 1 ? '下架' : '上架'}这道题目吗`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        row.publishState === 1 ? await choicePublish({
          id: row.id,
          publishState: 0
        }) : await choicePublish({
          id: row.id,
          publishState: 1
        })
        // 后台更新完成后调用刷新方法
        this.getQuestionList()
      } catch (error) {
        console.log(error)
      }
    },
    // 删除数据
    async delQuestion (row) {
      try {
        await this.$confirm('此操作将永久删除该题目,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const res = await remove({
          id: row.id
        })
        console.log(res)
        // 删除成功后的提示
        this.$message.success('删除成功')
        // 刷新列表
        this.getQuestionList()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang='less'>
::v-deep .el-card {
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  margin: 10px;
}

.btn-wrapper {
  margin-bottom: 15px;
}
::v-deep .city-1 {
  width: 45%;
  margin-right: 5%;
}
::v-deep .city-2 {
  width: 50%;
}
.el-input__inner {
  width: 100%;
}
.table_btn {
  display: flex;
  justify-content: end;
  margin-left: 80px;
}

.el-alert--info.is-light {
  margin-bottom: 15px;
}

::v-deep .el-table--enable-row-transition .el-table__body td.el-table__cell {
  height: 72px;
  padding: 10px, 0;
}
</style>
