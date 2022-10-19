<template>
  <div class="container">
    <el-dialog title="题目预览" :visible="questionPreview" @close="handleClose">
      <!-- 简介 -->
      <el-row>
        <el-row>
          <el-col :span="6">
            <span v-if="questionItem.questionType === '1'"
              >【题型】：单选题</span
            >
            <span v-else-if="questionItem.questionType === '2'"
              >【题型】：多选题</span
            >
            <span v-else>【题型】：简答题</span>
          </el-col>
          <el-col :span="6">【编号】：{{ questionItem.id }}</el-col>
          <el-col :span="6"
            ><span v-if="questionItem.difficulty === '1'">【题型】：简单</span>
            <span v-else-if="questionItem.difficulty === '2'"
              >【题型】：一般</span
            >
            <span v-else>【题型】：困难</span></el-col
          >
          <el-col :span="6">【标签】：{{ questionItem.tags }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">【学科】：{{ questionItem.subjectName }}</el-col>
          <el-col :span="6">【目录】：{{ questionItem.directoryName }}</el-col>
          <el-col :span="6">【方向】：企业咨询</el-col>
          <el-col :span="6"></el-col>
        </el-row>
      </el-row>
      <hr />
      <!-- 题干 -->
      <el-row>
        <el-col> 【题干】： </el-col>
        <el-col style="color: blue">
          <div v-html="questionItem.question"></div>
        </el-col>
      </el-row>
      <!-- 题目类型和选项 -->
      <!-- 题目类型标题 -->
      <!-- 单选题 -->
      <el-row>
        <span v-if="questionItem.questionType === '1'">单选题</span>
        <span v-else-if="questionItem.questionType === '2'">多选题</span>
        <span v-else>简答题</span>
        <span>选项：(以下选项中的选项为正确答案)</span>
      </el-row>
      <el-row v-if="questionItem.questionType === '1'" style="margin: 10px 0px">
        <!-- 展示题目的正确选项 -->
        <!-- 单选题目,1是代表，0代表错误，绑定的值代表我选的，底下渲染的时候让label绑定1正确的即可 -->
        <el-radio-group v-model="radio" @change="change">
          <el-row
            style="padding: 8px 0; height: 33px"
            v-for="(item, index) in questionItem.options"
            :key="index"
          >
            <el-radio :label="item.isRight">{{ item.title }}</el-radio></el-row
          >
        </el-radio-group>
      </el-row>
      <!-- 多选题目-->
      <el-row v-if="questionItem.questionType === '2'" style="margin: 10px 0px">
        <el-row
          style="padding: 8px 0; height: 33px"
          v-for="(item, index) in options"
          :key="index"
          ><el-checkbox
            v-model="item.isRight"
            :disabled="item.isRight === 0"
            @change="changeItem(item)"
            >{{ item.title }}</el-checkbox
          ></el-row
        >
      </el-row>
      <hr />
      <!-- 参考答案视频预览 -->
      <el-row>
        <el-col>
          【参考答案】：
          <el-button type="danger" @click="isVideoShow = true"
            >视频答案预览</el-button
          >
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px" v-if="isVideoShow">
        <video
          :src="questionItem.videoURL"
          controls="controls"
          class="video"
        ></video>
      </el-row>
      <hr />
      <!-- 答案解析 -->
      <el-row type="flex" align="middle" style="height: 40px"
        >【答案解析】：
        <template>
          <div v-html="questionItem.answer"></div>
        </template>
      </el-row>
      <hr />
      <!-- 题目备注 -->
      <el-row style="margin-bottom: 10px"
        >【题目备注】：{{ questionItem.remarks }}</el-row
      >
      <el-row type="flex" justify="end">
        <el-button type="primary" @click="handleClose">关闭</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'QuestionPreview',
  props: {
    questionPreview: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 返回的数值中，1代表正确，0代表错误
      radio: 1,
      questionItem: {},
      isVideoShow: false
    }
  },
  // 多选框中要对返回的数组进行操作，他v-model绑定true为选中
  // 后端返回的是1,0的判断，所以要利用计算属性算出正确的
  // '1',代表单选，'2'，代表多选
  computed: {
    // 计算属性对题目选项的数组操作
    options () {
      // 先把是多选的筛出来进行操作
      if (this.questionItem.questionType === '2') {
        // 是多选，但是没有选项的话，return false
        if (!this.questionItem.options) {
          return false
        }
        // 通过的是多选，且有选项的，现在把数组中的isRight改为true
        this.questionItem.options.forEach(item => {
          if (item.isRight === 1) {
            item.isRight = true
          }
        })
        // 上述修改完成后把新数组返回
        return this.questionItem.options
      } else {
        // 如果不是多选，则不变
        return this.questionItem.options
      }
    }
  },
  methods: {
    // 因为渲染出来的选项可以选择
    // 每次点击后都要把当前单选或多选的框判定值重置
    change () {
      this.radio = 1
    },
    // 对的点击之后值就会变为相反的false，满足条件执行再将它更改为true
    changeItem (item) {
      if (!item.isRight) {
        item.isRight = true
      }
    },
    // 关闭的回调函数
    handleClose () {
      this.isVideoShow = false
      this.$emit('update:questionPreview', false)
    }
    // 单机选择框，值还是赋值为1，代表还是选择争取的即可
  }
}
</script>

<style scoped lang='less'>
.el-col-6 {
  height: 36px;
  width: 25%;
}
</style>
