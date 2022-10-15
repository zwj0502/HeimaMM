<template>
  <div class="add-form">
    <el-dialog :title="title" :visible="dialogFormVisible" @close="dialogFormH">
      <el-form
        :rules="rules"
        ref="dataForm"
        :model="ruleInline"
        label-position="left"
        label-width="150px"
        style="width: 80%; margin-left: 10px"
      >
        <el-form-item label="企业名称" prop="shortName">
          <el-input v-model="ruleInline.shortName"></el-input>
          <el-checkbox v-model="ruleInline.isFamous">是否为名企</el-checkbox>
        </el-form-item>
        <el-form-item label="所属公司" prop="company">
          <el-input v-model="ruleInline.company"></el-input>
          <p>https://www.tianyancha.com （在此可查询所属公司全称及简称）</p>
        </el-form-item>
        <el-form-item label="城市" prop="province">
          <el-select
            class="filter-item"
            style="width: 130px"
            v-model="ruleInline.province"
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
          <el-select
            class="filter-item"
            style="width: 130px"
            v-model="ruleInline.city"
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
        <el-form-item label="方向（企业标签）" prop="tags">
          <el-input v-model="ruleInline.tags"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入"
            v-model="ruleInline.remarks"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormH">取消</el-button>
        <el-button type="primary" @click="createData">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import { update, add } from '@/api/base/users'
import { provinces, citys } from '@/api/hmmm/citys.js'
import { add, update } from '@/api/hmmm/companys'
export default {
  name: 'CompanysAdd',
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      citySelect: {
        province: [],
        cityDate: []
      },
      ruleInline: {
        shortName: '',
        company: '',
        province: '',
        isFamous: false,
        city: '',
        remarks: '',
        tags: ''
      },
      // 表单验证
      rules: {
        shortName: [
          { required: true, message: '企业简称不能为空', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '所属公司不能为空', trigger: 'blur' }
        ],
        province: [
          { required: true, message: '请选择省份', trigger: 'change' }
        ],
        remarks: [
          { required: true, message: '备注不能为空', trigger: 'blur' }
        ],
        tags: [{ required: true, message: '方向(企业标签)不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    title () {
      return this.ruleInline.id ? '编辑用户' : '新增用户'
    }
  },
  methods: {
    // 关闭弹层
    dialogFormH () {
      this.$emit('update:dialogFormVisible', false)
      this.$refs.dataForm.resetFields()
      this.ruleInline = {
        shortName: '',
        isFamous: false,
        company: '',
        province: '',
        remarks: '',
        tags: ''
      }
    },
    // 获取省
    getCityData: function () {
      this.citySelect.province = provinces()
    },
    // 选省获取到市
    handleProvince: function (e) {
      this.citySelect.cityDate = citys(e)
      this.ruleInline.city = this.citySelect.cityDate[0]
    },
    // 表单提交
    createData () {
      this.$refs.dataForm.validate(async valid => {
        if (valid) {
          const data = {
            ...this.ruleInline
          }
          if (this.ruleInline.id) {
            await update(data).then(() => {
              this.$emit('newDataes', this.ruleInline)
              this.dialogFormH()
              this.$message.success('编辑成功')
            })
          } else {
            await add(this.ruleInline).then(() => {
              this.$emit('newDataes', this.ruleInline)
              this.dialogFormH()
              this.$message.success('新增成功')
            })
          }
        } else {
          this.$message.error('*号为必填项!')
        }
      })
    }
  },
  // 挂载结束

  mounted: function () { },
  // 创建完毕状态
  created () {
    this.getCityData()
  },

  // 组件更新
  updated: function () { }
}
</script>
<style>
.el-form--label-left .el-form-item__label {
  text-align: right;
}
.el-form-item--medium {
  margin-bottom: 22px;
}
.el-dialog__footer {
  text-align: center;
}
</style>
