<template>
  <div class="question-new">
    <el-card>
      <!-- 头部标题 -->
      <el-row class="title">
        <span>{{ title }}</span>
      </el-row>
      <!-- 具体的内容 -->
      <el-row class="configBody">
        <!-- form表单 -->
        <el-form
          label-width="120px"
          ref="questionForm"
          :model="form"
          :rules="ruleForm"
        >
          <!-- 学科 -->
          <el-row>
            <el-form-item label="学科：" prop="subjectID">
              <el-select
                style="width: 400px"
                v-model="form.subjectID"
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
          </el-row>
          <!-- 目录 -->
          <el-row>
            <el-form-item label="目录：" prop="catalogID">
              <el-select
                style="width: 400px"
                v-model="form.catalogID"
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
          </el-row>
          <!-- 企业 -->
          <el-row>
            <el-form-item label="企业：" prop="enterpriseID">
              <el-select style="width: 400px" v-model="form.enterpriseID">
                <el-option
                  v-for="(item, index) in companyList"
                  :key="index"
                  :label="item.company"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <!-- 城市 -->
          <el-row>
            <el-form-item label="城市：" prop="province">
              <el-select
                v-model="form.province"
                @change="onProvince"
                style="width: 195px; margin-right: 10px"
              >
                <el-option
                  v-for="(item, index) in province"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
              <el-select v-model="form.city" style="width: 195px">
                <el-option
                  v-for="(item, index) in city"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <!-- 方向 -->
          <el-row>
            <el-form-item label="方向：" prop="direction">
              <el-select style="width: 400px" v-model="form.direction">
                <el-option
                  v-for="(item, index) in direction"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <!-- 题型 -->
          <el-row>
            <el-form-item label="题型：">
              <el-radio v-model="form.questionType" label="1">单选</el-radio>
              <el-radio v-model="form.questionType" label="2">多选</el-radio>
              <el-radio v-model="form.questionType" label="3">简答</el-radio>
            </el-form-item>
          </el-row>
          <!-- 难度 -->
          <el-row>
            <el-form-item label="题型：">
              <el-radio v-model="form.difficulty" label="1">简单</el-radio>
              <el-radio v-model="form.difficulty" label="2">一般</el-radio>
              <el-radio v-model="form.difficulty" label="3">困难</el-radio>
            </el-form-item>
          </el-row>
          <!-- 题干 -->
          <el-row>
            <el-form-item label="题干：" prop="question">
              <quillEditor v-model="form.question" :options="editorOption" />
            </el-form-item>
          </el-row>
          <!-- 答案选项,分多选，单选和简答用个变量来控制显示哪一个 -->
          <el-row>
            <!-- 显示单选 -->
            <el-form-item label="选项：" v-if="form.questionType === '1'">
              <!-- 遍历提前准备好的文档，从而生成选项 -->
              <div v-for="(item, index) in arr" :key="index">
                <!-- 控制显示多少选项 -->
                <!-- 单选4个选框，且禁用增加按钮 -->
                <el-row
                  v-if="index < questionIndex"
                  style="padding-bottom: 20px"
                  type="flex"
                  align="middle"
                >
                  <el-col :span="1">
                    <el-radio :label="index" v-model="radio"
                      >{{ item.code }}:</el-radio
                    >
                  </el-col>
                  <el-col :span="5">
                    <el-input v-model="item.title"></el-input>
                  </el-col>
                  <el-col :span="10">
                    <el-upload
                      class="upload-demo"
                      action="#"
                      multiple
                      :show-file-list="false"
                    >
                      <div class="el-upload__text">上传图片</div>
                      <i class="el-icon-circle-close"></i>
                    </el-upload>
                  </el-col>
                </el-row>
              </div>
              <!-- 增加试题与答案 -->
              <el-row>
                <el-col>
                  <el-button class="add_btn" type="danger" size="small" disabled
                    >+增加选项与答案</el-button
                  >
                </el-col>
              </el-row>
            </el-form-item>
            <!-- 显示多选 -->
            <el-form-item label="选项：" v-if="form.questionType === '2'">
              <el-checkbox-group v-model="checkList">
                <div v-for="(item, index) in arr" :key="index">
                  <!-- 控制显示多少选项 -->
                  <el-row
                    v-if="index < questionIndex"
                    style="padding-bottom: 20px"
                    type="flex"
                    align="middle"
                  >
                    <el-col :span="1">
                      <el-checkbox :label="index">{{ item.code }}:</el-checkbox>
                    </el-col>
                    <el-col :span="5">
                      <el-input v-model="item.title"></el-input>
                    </el-col>
                    <el-col :span="10">
                      <el-upload
                        class="upload-demo"
                        action="#"
                        multiple
                        :show-file-list="false"
                      >
                        <div class="el-upload__text">上传图片</div>
                        <i class="el-icon-circle-close"></i>
                      </el-upload>
                    </el-col>
                  </el-row>
                </div>
              </el-checkbox-group>
              <!-- 增加试题与答案 -->
              <el-row>
                <el-col>
                  <el-button
                    class="add_btn"
                    type="danger"
                    size="small"
                    @click="addItem"
                    >+增加选项与答案</el-button
                  >
                </el-col>
              </el-row>
            </el-form-item>
            <!-- 简答的话就不显示了 -->
          </el-row>
          <!-- 解析视频 -->
          <el-row>
            <el-form-item label="解析视频：" prop="videoURL">
              <el-input
                v-model="form.videoURL"
                style="width: 400px"
                label="解析视频"
              ></el-input>
            </el-form-item>
          </el-row>
          <!-- 答案解析 -->
          <el-row>
            <el-form-item label="答案解析：" prop="answer">
              <quillEditor v-model="form.answer" :options="editorOption" />
            </el-form-item>
          </el-row>
          <!-- 题目备注 -->
          <el-row>
            <el-form-item label="题目备注：" style="width: 400px">
              <el-input
                type="textarea"
                :rows="4"
                v-model="form.remarks"
              ></el-input>
            </el-form-item>
          </el-row>
          <!-- 试题标签 -->
          <el-row>
            <el-form-item label="视题标签：">
              <el-select
                style="width: 400px"
                multiple
                allow-create
                v-model="form.tags"
              >
                <el-option
                  v-for="(item, index) in tagsList"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <!--提交按钮-->
          <el-row>
            <el-form-item>
              <el-button :type="id ? 'success ' : 'primary'" @click="confirm">{{
                id ? '提交修改' : '新增提交'
              }}</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-row>
    </el-card>
  </div>
</template>

<script>
// 引入富文本
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { simple } from '../../api/hmmm/subjects'
import { simpleDirectorys } from '../../api/hmmm/directorys'
import { simpleTags } from '../../api/hmmm/tags'
import { list as getCompanysList } from '../../api/hmmm/companys'
// 导入一个对象
import { array, direction } from '../../api/hmmm/constants'
import { provinces, citys } from '../../api/hmmm/citys'
import { add as addNewQuestion, update as updateQuestion, detail as getQuestionDetail } from '../../api/hmmm/questions'
export default {
  name: 'newQuestion',
  components: {
    quillEditor
  },
  data () {
    return {
      editorOption: {
        placeholder: '请在这里输入',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
            ['blockquote', 'code-block'], // 引用，代码块
            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: 'ordered' }, { list: 'bullet' }], // 列表
            [{ script: 'sub' }, { script: 'super' }], // 上下标
            [{ indent: '-1' }, { indent: '+1' }], // 缩进
            [{ direction: 'rtl' }], // 文本方向
            [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题
            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], // 字体
            [{ align: [] }], // 对齐方式
            ['clean'], // 清除字体样式
            ['image', 'video'] // 上传图片、上传视频
          ]
        }
      },
      id: this.$route.query.id,
      title: this.$route.query.id ? '修改试题' : '新增试题',
      ruleForm: {
        subjectID: [{ required: true, message: '请选择学科' }],
        catalogID: [{ required: true, message: '请选择目录' }],
        enterpriseID: [{ required: true, message: '请选择企业' }],
        province: [{ required: true, message: '请选择地区' }],
        direction: [{ required: true, message: '请选择方向' }],
        question: [{ required: true, message: '请输入题干' }],
        answer: [{ required: true, message: '请输入答案解析' }],
        videoURL: [{ required: true, message: '请输入解析视频地址' }]
      },
      // 选项存储的index
      questionIndex: 4,
      // 存储选项的数组,在数据声明里配置好数组
      arr: [
        {
          code: 'A', // 代码
          title: '', // 标题
          img: '', // 图片URL
          isRight: false // 是否正确答案 true/false
        },
        {
          code: 'B', // 代码
          title: '', // 标题
          img: '', // 图片URL
          isRight: false // 是否正确答案 true/false
        },
        {
          code: 'C', // 代码
          title: '', // 标题
          img: '', // 图片URL
          isRight: false // 是否正确答案 true/false
        },
        {
          code: 'D', // 代码
          title: '', // 标题
          img: '', // 图片URL
          isRight: false // 是否正确答案 true/false
        },
        {
          code: 'E', // 代码
          title: '', // 标题
          img: '', // 图片URL
          isRight: false // 是否正确答案 true/false
        },
        {
          code: 'F', // 代码
          title: '', // 标题
          img: '', // 图片URL
          isRight: false // 是否正确答案 true/false
        },
        {
          code: 'G', // 代码
          title: '', // 标题
          img: '', // 图片URL
          isRight: false // 是否正确答案 true/false
        },
        {
          code: 'H', // 代码
          title: '', // 标题
          img: '', // 图片URL
          isRight: false // 是否正确答案 true/false
        },
        {
          code: 'I', // 代码
          title: '', // 标题
          img: '', // 图片URL
          isRight: false // 是否正确答案 true/false
        },
        {
          code: 'J', // 代码
          title: '', // 标题
          img: '', // 图片URL
          isRight: false // 是否正确答案 true/false
        },
        {
          code: 'K', // 代码
          title: '', // 标题
          img: '', // 图片URL
          isRight: false // 是否正确答案 true/false
        },
        {
          code: 'L', // 代码
          title: '', // 标题
          img: '', // 图片URL
          isRight: false // 是否正确答案 true/false
        },
        {
          code: 'M', // 代码
          title: '', // 标题
          img: '', // 图片URL
          isRight: false // 是否正确答案 true/false
        },
        {
          code: 'N', // 代码
          title: '', // 标题
          img: '', // 图片URL
          isRight: false // 是否正确答案 true/false
        },
        {
          code: 'O', // 代码
          title: '', // 标题
          img: '', // 图片URL
          isRight: false // 是否正确答案 true/false
        },
        {
          code: 'P', // 代码
          title: '', // 标题
          img: '', // 图片URL
          isRight: false // 是否正确答案 true/false
        },
        {
          code: 'Q', // 代码
          title: '', // 标题
          img: '', // 图片URL
          isRight: false // 是否正确答案 true/false
        },
        {
          code: 'R', // 代码
          title: '', // 标题
          img: '', // 图片URL
          isRight: false // 是否正确答案 true/false
        },
        {
          code: 'S', // 代码
          title: '', // 标题
          img: '', // 图片URL
          isRight: false // 是否正确答案 true/false
        },
        {
          code: 'T', // 代码
          title: '', // 标题
          img: '', // 图片URL
          isRight: false // 是否正确答案 true/false
        },
        {
          code: 'U', // 代码
          title: '', // 标题
          img: '', // 图片URL
          isRight: false // 是否正确答案 true/false
        },
        {
          code: 'V', // 代码
          title: '', // 标题
          img: '', // 图片URL
          isRight: false // 是否正确答案 true/false
        },
        {
          code: 'W', // 代码
          title: '', // 标题
          img: '', // 图片URL
          isRight: false // 是否正确答案 true/false
        },
        {
          code: 'X', // 代码
          title: '', // 标题
          img: '', // 图片URL
          isRight: false // 是否正确答案 true/false
        },
        {
          code: 'Y', // 代码
          title: '', // 标题
          img: '', // 图片URL
          isRight: false // 是否正确答案 true/false
        },
        {
          code: 'Z', // 代码
          title: '', // 标题
          img: '', // 图片URL
          isRight: false // 是否正确答案 true/false
        }
      ],
      // 单选
      radio: '',
      // 复选框列表
      checkList: [],
      // form表单集合的数据
      form: {
        // number: null, // 试题编号后台自动生成（忽略）
        subjectID: '', // 学科
        catalogID: '', // 目录
        enterpriseID: '', // 企业
        province: '', // 企业所在地省份
        city: '', // 企业所在城市
        direction: '', // 方向
        questionType: '1', // 题型:1:单选，2:多选
        difficulty: '1', // 难度
        question: '', // 题干
        // 选项
        options: [],
        videoURL: ' ', // 解析视频
        answer: '', // 答案解析
        remarks: '', // 题目备注
        tags: [] // 试题标签
      },
      // 下拉框初始化需要的数据
      subjects: [],
      // 目录初始化
      catalogs: [],
      tagsList: [],
      // 企业列表
      companyList: [],
      direction: direction,
      // 所有城市
      province: provinces(),
      // 城市下所有地区
      city: []
    }
  },
  created () {
    // 初始化下拉框
    this.getSubjectList()
    this.getCompanys()
    // 一开始进来就调用获取题目详情,根据有咩有id来判定要不要发出去
    this.getQuestionInfo()
  },
  methods: {
    uploadPic () {
      console.log(this.$refs.inputFile)
      this.$refs.inputFile.click()
    },
    // 一开始加载执行题目详情获取
    async getQuestionInfo () {
      if (this.id) {
        // 发送修改的题目详情的请求
        const { data } = await getQuestionDetail({
          id: this.id
        })
        console.log(data)
        // 需要对data中返回的某些数据进行操作才能直接赋值
        this.form = data
        // 双向绑定的tags需要把返回的字符串转成数组字符串
        this.form.tags = data.tags.split(',')
        // 对目录进行重新获取
        const { data: data1 } = await simpleDirectorys({
          subjectID: this.form.subjectID
        })
        this.catalogs = data1
        // 这里要获取所有的选项列表，相当于调用啦一次初始获取函数
        this.getTabsList()
        this.questionIndex = this.form.options.length
        // 重新加载添加按钮所需的容器
        const array1 = array
        // 对添加按钮的数据进行处理
        const newArr = array1.splice(+this.form.options.length)
        // 对返回的form中数据排序
        this.form.options.sort((a, b) => {
          return a.code.localeCompare(b.code)
        })
        // 如果是多选要先对数据进行true和false改变
        this.arr = this.form.options.concat(newArr)
        // 上面对数据进行了重定义容器，排序，现在对数据进行选中渲染
        // 后端返回的是1,0，整体通过index索引和radio,checkList控制哪个选中
        switch (this.form.questionType) {
          // 单选
          case '1':
            this.form.options.forEach((item, index) => {
              if (item.isRight === 1) {
                // 唯一的一个，找到他的索引赋值给
                this.radio = index
              }
            })
            break
          // 多选
          case '2':
            this.form.options.forEach((item, index) => {
              if (item.isRight === 1) {
                // 很多，找到他，push进checkList的数组
                this.checkList.push(index)
              }
            })
            break
        }
      }
    },
    // 提交编辑的方法
    // 正常提交方法，这里点击提交要对答案的数组对象进行操作
    async confirm () {
      // console.log('11')
      await this.$refs.questionForm.validate()
      // 验证通过后再去发请求
      // 先对tags进行操作，要求传的是一个String，现在的是数组

      this.form.tags = this.form.tags.join(',')
      // 对数组对象进行操作，拿到我想要的数据
      // 1单选，2多选
      if (this.form.questionType === '1') {
        // 把前四个对象从数组中截取出来成一个新数组，利用循环
        // 改完isRight的值再去赋值给表单中的form
        const oldOptions = this.arr.slice(0, 4)
        // console.log(oldOptions)
        oldOptions.forEach((item, index) => {
          if (index === this.radio) {
            item.isRight = true
          } else {
            item.isRight = false
          }
          this.form.options = oldOptions
        })
      } else if (this.form.questionType === '2') {
        const oldOptions1 = this.arr.slice(0, this.questionIndex)
        // for循环遍历截取的数组，其中索引相同的就把他isRight改为true
        for (let i = 0; i < oldOptions1.length; i++) {
          this.checkList.forEach((item, index) => {
            if (index === i) {
              oldOptions1[i].isRight = true
            }
          })
        }
        this.form.options = oldOptions1
        // console.log(this.form.options)
      }
      // 发送请求
      this.id ? await updateQuestion(this.form) : await addNewQuestion(this.form)
      // console.log(res)
      // 发送完成后页面进行跳转至基础题库页面，数据全部重置
      this.$refs.questionForm.resetFields()
      this.form = {}
      this.questionIndex = 4
      this.$router.push('/questions/list')
    },
    // 点击增加选项与答案
    addItem () {
      if (this.questionIndex > 25) {
        return
      }
      this.questionIndex++
    },
    // 初始化获取公司下拉列表
    async getCompanys () {
      const { data } = await getCompanysList({
        page: 1,
        pagesize: 99
      })
      // console.log(data)
      this.companyList = data.items
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
      this.form.tags = null
      this.form.catalogID = null
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
    // 获取标签的内容
    async getTabsList () {
      try {
        const { data } = await simpleTags({
          subjectID: this.form.subjectID
        })
        const newArr = []
        data.forEach(item => {
          newArr.push(item.label)
        })
        // console.log(newArr)
        this.tagsList = newArr
      } catch (error) {
        console.log(error)
      }
    },
    // 目录变化后再去执行获取标签的内容
    onDirectoryChange () {
      this.form.tags = null
      this.tagsList = []
      // 获取标签的数组
      this.getTabsList()
    },
    // 所有城市调用他的函数，返回所哟城市
    // 所有城市选择后，利用select的change事件，再去请求城市所有下级
    async onProvince (val) {
      try {
        // 每一次触发后,像这种级联关联的一定要把后面的值给清空
        // 否则会出现，前面变化，后面不变的情况
        this.form.city = ''
        this.city = await citys(val)
      } catch (error) {
        console.log(error)
      }
    }
    // 根据编辑传过来的id去发送请求，拿数据再渲染到页面上

  }
}
</script>

<style scoped lang='less'>
.question-new {
  padding: 20px;

  ::v-deep .el-card__body {
    padding: 0;
  }
  .title {
    width: 100%;
    height: 55px;
    padding: 18px 25px;
    border-bottom: 1px solid #ebeef5;
  }

  .el-form-item {
    margin-bottom: 22px;
  }

  ::v-deep .configBody {
    padding: 20px;
    .el-input--medium .el-input__inner {
      height: 36px;
      line-height: 36px;
    }
    .ql-editor {
      height: 200px;
    }

    .el-upload {
      margin-left: 6px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      width: 100px;
      height: 60px;
      line-height: 60px;
      font-size: 12px;
      .el-upload-list__item-name {
        display: none;
      }
    }

    .el-icon-circle-close {
      position: absolute;
      right: -6px;
      top: -6px;
    }
    ::v-deep .el-textarea__inner {
      display: block;
      resize: vertical;
      padding: 5px 15px;
      line-height: 1.5;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 100%;
      font-size: inherit;
      color: #606266;
      background-color: #fff;
      background-image: none;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
}
</style>
