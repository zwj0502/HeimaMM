<template>
  <div class="question-new">
    <el-card>
      <!-- 头部标题 -->
      <el-row class="title">
        <span>试题录入</span>
      </el-row>
      <!-- 具体的内容 -->
      <el-row class="configBody">
        <!-- form表单 -->
        <el-form label-width="120px">
          <!-- 学科 -->
          <el-row>
            <el-form-item label="学科：">
              <el-select style="width: 400px">
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <!-- 目录 -->
          <el-row>
            <el-form-item label="目录：">
              <el-select style="width: 400px">
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <!-- 企业 -->
          <el-row>
            <el-form-item label="企业：">
              <el-select style="width: 400px">
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <!-- 城市 -->
          <el-row>
            <el-form-item label="企业：">
              <el-select style="width: 195px; margin-right: 10px">
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
              <el-select style="width: 195px">
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <!-- 方向 -->
          <el-row>
            <el-form-item label="方向：">
              <el-select style="width: 400px">
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <!-- 题型 -->
          <el-row>
            <el-form-item label="题型：">
              <el-radio-group>
                <el-radio :label="1">单选</el-radio>
                <el-radio :label="2">多选</el-radio>
                <el-radio :label="3">简答</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <!-- 难度 -->
          <el-row>
            <el-form-item label="题型：">
              <el-radio-group>
                <el-radio :label="1">简单</el-radio>
                <el-radio :label="2">一般</el-radio>
                <el-radio :label="3">困难</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <!-- 题干 -->
          <el-row>
            <el-form-item label="题干：">
              <quillEditor />
            </el-form-item>
          </el-row>
          <!-- 答案选项,分多选，单选和简答用个变量来控制显示哪一个 -->
          <el-row>
            <!-- 显示单选 -->
            <el-form-item label="选项：" v-if="form.questionType === '1'">
              <div v-for="(item, index) in arr" :key="index">
                <!-- 控制显示多少选项 -->
                <el-row
                  v-if="index < 4"
                  style="padding-bottom: 20px"
                  type="flex"
                  align="middle"
                >
                  <el-col :span="1">
                    <el-radio :label="index">{{ item.code }}:</el-radio>
                  </el-col>
                  <el-col :span="5">
                    <el-input v-model="item.title"></el-input>
                  </el-col>
                  <el-col :span="10">
                    <el-upload class="upload-demo" action="#" multiple>
                      <div class="el-upload__text">上传图片</div>
                      <i class="el-icon-circle-close"></i>
                    </el-upload>
                  </el-col>
                </el-row>
              </div>
              <!-- 增加试题与答案 -->
              <el-row>
                <el-col>
                  <el-button
                    class="add_btn"
                    type="danger"
                    size="small"
                    @click="addItem"
                    disabled
                    >+增加选项与答案</el-button
                  >
                </el-col>
              </el-row>
            </el-form-item>
            <!-- 显示多选 -->
            <el-form-item label="选项：" v-if="form.questionType === '2'">
              <div v-for="(item, index) in arr" :key="index">
                <!-- 控制显示多少选项 -->
                <el-row
                  v-if="index < 4"
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
                    <el-upload class="upload-demo" action="#" multiple>
                      <div class="el-upload__text">上传图片</div>
                      <i class="el-icon-circle-close"></i>
                    </el-upload>
                  </el-col>
                </el-row>
              </div>
              <!-- 增加试题与答案 -->
              <el-row>
                <el-col>
                  <el-button
                    class="add_btn"
                    type="danger"
                    size="small"
                    @click="addItem"
                    disabled
                    >+增加选项与答案</el-button
                  >
                </el-col>
              </el-row>
            </el-form-item>
            <!-- 简答的话就不显示了 -->
          </el-row>
          <!-- 解析视频 -->
          <el-row>
            <el-form-item label="目录：">
              <el-input style="width: 400px" label="解析视频"></el-input>
            </el-form-item>
          </el-row>
          <!-- 答案解析 -->
          <el-row>
            <el-form-item label="答案解析：">
              <quillEditor />
            </el-form-item>
          </el-row>
          <!-- 题目备注 -->
          <el-row>
            <el-form-item label="题目备注：" style="width: 400px">
              <el-input
                type="textarea"
                :rows="4"
                v-model="ruleForm.desc"
              ></el-input>
            </el-form-item>
          </el-row>
          <!-- 视频标签 -->
          <el-row>
            <el-form-item label="视题标签：">
              <el-select style="width: 400px">
                <el-option label="区域一" value="shanghai"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <!--提交按钮-->
          <el-row>
            <el-form-item>
              <el-button type="primary">确认提交</el-button>
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
// 导入一个对象
import { array } from '../../api/hmmm/constants'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      ruleForm: {
        desc: ''
      },
      // 选项存储的index
      questionIndex: 4,
      // 存储选项的数组
      arr: array,
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
      }
    }
  },
  methods: {
    uploadPic () {
      console.log(this.$refs.inputFile)
      this.$refs.inputFile.click()
    }
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
