<template>
  <div class="container">
    <el-card>
      <div class="el-card_body">
        <!-- 头部导航+按钮 -->
        <el-row type="flex" justify="space-between" class="btn-wrapper">
          <span style="fontsize: 12px; color: pink"
            >说明:目前支持学科和关键字条件筛选</span
          >
          <el-button type="success" size="small"
            ><span class="el-icon-edit">新增试题</span></el-button
          >
        </el-row>
        <!-- 试题列表table，form表单 -->
        <el-form size="small" label-width="80px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="学科" label-width="80px">
                <el-select style="width: 100%">
                  <el-option label="区域一" value="shanghai"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="二级目录">
                <el-select style="width: 100%">
                  <el-option label="区域一" value="shanghai"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="标签">
                <el-select style="width: 100%">
                  <el-option label="区域一" value="shanghai"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="关键字">
                <el-input placeholder="审批人" style="width: 100%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="试题类型">
                <el-select style="width: 100%">
                  <el-option label="区域一" value="shanghai"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="难度">
                <el-select style="width: 100%">
                  <el-option label="区域一" value="shanghai"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="方向">
                <el-select style="width: 100%">
                  <el-option label="区域一" value="shanghai"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="录入人">
                <el-select style="width: 100%">
                  <el-option label="区域一" value="shanghai"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="题目备注">
                <el-input placeholder="审批人" style="width: 100%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="企业简称">
                <el-input placeholder="审批人" style="width: 100%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="城市" class="city">
                <el-select class="city-1">
                  <el-option label="区域一" value="x"></el-option>
                </el-select>
                <el-select class="city-2">
                  <el-option label="区域一" value="x"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item class="table_btn">
                <el-button size="small">清除</el-button>
                <el-button size="small" type="primary">搜索</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- tabs筛选 -->
        <el-row>
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="全部" name="first"></el-tab-pane>
            <el-tab-pane label="待审核" name="second"></el-tab-pane>
            <el-tab-pane label="已审核" name="third"></el-tab-pane>
            <el-tab-pane label="已拒绝" name="fourth"></el-tab-pane>
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
            <el-table-column prop="date" label="试题编号" width="120">
            </el-table-column>
            <el-table-column prop="name" label="学科" width="120">
            </el-table-column>
            <el-table-column prop="date" label="目录" width="120">
            </el-table-column>
            <el-table-column prop="name" label="题型" width="120">
            </el-table-column>
            <el-table-column prop="date" label="题干" width="280">
            </el-table-column>
            <el-table-column prop="name" label="录入时间" width="180">
            </el-table-column>
            <el-table-column prop="name" label="难度" width="80">
            </el-table-column>
            <el-table-column prop="name" label="录入人" width="120">
            </el-table-column>
            <el-table-column prop="name" label="审核状态" width="120">
            </el-table-column>
            <el-table-column prop="name" label="审核意见" width="150">
            </el-table-column>
            <el-table-column prop="name" label="审核人" width="120">
            </el-table-column>
            <el-table-column prop="name" label="发布状态" width="150">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="200"
              align="center"
            >
              <template>
                <el-button type="text" size="small">预览</el-button>
                <el-button type="text" size="small">审核</el-button>
                <el-button type="text" size="small">修改</el-button>
                <el-button type="text" size="small">上架</el-button>
                <el-button type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick (row) {
      console.log(row)
    }
  },

  data () {
    return {
      activeName: 'first',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }]
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
