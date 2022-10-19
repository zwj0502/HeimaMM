<template>
  <div class='container'>

<el-card class="box-card">
  <div slot="header" class="clearfix">
    <label> 目录名称：</label>
    <el-input class="avv" v-model="value"></el-input>
    <label>状态：</label>
    <el-select v-model="value1" placeholder="请选择">
    <el-option
      v-for="item in status"
      :key="item.id"
      :label="item.value"
      :value="item.id">
    </el-option>
  </el-select>
      <el-button @click="clear">清除</el-button>
  <el-button type="primary" @click="getDirectorys">搜索</el-button>
  <el-button style="float:right; " type="success" @click="onDirectorys">新增学科</el-button>
  <el-button type="text" style="float:right;" @click="back" v-if="id" >放回上一页</el-button>

  </div>
 <page-tools >
      <template #before>
        <span>数据一共{{counts}}条</span>
      </template>
    </page-tools>

        <el-table :data="DirectorysList" >
        <el-table-column label="序号" width="50" type="index" />
        <el-table-column label="所属科目" prop="subjectName" width="130" />
        <el-table-column label="目录名称" prop="directoryName" width="140"/>
        <el-table-column label="创建者" prop="username" width="180"  />
        <el-table-column label="创建日期" width="140" prop="addDate" />
        <el-table-column label="面试题数量" prop="totals" width="140" />
        <el-table-column label="状态" prop="state" width="140">
      <template slot-scope="{row:{state}}" >
        <span v-if="+state===1">启用</span>
        <span v-else>禁用</span>
      </template>
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="{row}">
            <el-button type="text" size="small" @click="Stop(row)">{{row.state ? '禁用':'启用'}}</el-button>
            <el-button type="text" size="small" @click="newdirectorys(row)" :disabled=Boolean(row.state)>修改</el-button>
            <el-button type="text" size="small" @click="del(row)" :disabled=Boolean(row.state)>删除</el-button>

          </template>
        </el-table-column>

      </el-table>
      <el-pagination
      style="float:right;margin:20px"
      background
      :page-sizes="[5,10, 20, 50]"
      :current-page.sync="page.page"
      :page-size.sync="page.pagesize"
      layout=" prev, pager, next, sizes,jumper"
      :total="counts"
      @current-change="getDirectorysList"
      @size-change ="getDirectorysList"
      >
    </el-pagination>

  </el-card>
  <directorys-add ref="refslist" :dialogVisible.sync="dialogVisible" @refList="getDirectorysList"></directorys-add>
    </div>
</template>

<script>
import DirectorysStatus from '@/api/base/baseApi'
import PageTools from '@/components/PageTools'
import { list, remove, changeState } from '@/api/hmmm/directorys.js'
import DirectorysAdd from '../components/directorys-add.vue'
export default {
  name: 'id',
  components: {
    PageTools,
    DirectorysAdd
  },
  data () {
    return {
      page: {
        page: 1,
        pagesize: 10
      },
      DirectorysList: [],
      counts: 0,
      id: this.$route.query.id,
      username: this.$route.query.name,
      value: '',
      value1: '',
      selectList: [],
      dialogVisible: false,
      status: DirectorysStatus.status

    }
  },
  mounted () {
    this.getDirectorysList()
    // this.getDirectorys()
  },
  methods: {
    back () {
      this.$router.back()
    },

    async getDirectorysList () {
      if (!this.id) {
        const { data } = await list(this.page)
        this.DirectorysList = data.items
        this.counts = data.counts
      } else {
        const { data } = await list({ subjectID: this.id })
        this.DirectorysList = data.items
        this.counts = data.counts
      }
    },

    async getDirectorys () {
      const { data } = await list({ directoryName: this.value, state: this.value1 })
      this.DirectorysList = data.items
    },
    async onDirectorys () {
      this.dialogVisible = true
    },
    clear () {
      this.value = ''
      this.value1 = ''
    },
    newdirectorys (row) {
      this.$refs.refslist.roleForm = { ...row }
      this.dialogVisible = true
    },
    async del (row) {
      try {
        await this.$confirm('确认要删除吗', '删除', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await remove(row)
        this.getDirectorysList()
      } catch (error) {
        console.log(error)
      }
    },
    async Stop (row) {
      this.state = row.state ? 0 : 1
      await changeState({ id: row.id, state: this.state })
      this.getDirectorysList()
    }

  }

}
</script>

<style scoped lang='less'>
.avv{
  width: 180px;
}</style>
