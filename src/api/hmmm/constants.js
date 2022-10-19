/*
 * @Author: taoshiwei
 * @Date: 2019-04-09 14:26:41
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 10:57:59
 *
 * 通用常量
 */

// 状态
export const status = [
  {
    value: 1,
    label: '启用'
  },
  {
    value: 0,
    label: '禁用'
  }
]

// 难度
export const difficulty = [
  {
    value: 1,
    label: '简单'
  },
  {
    value: 2,
    label: '一般'
  },
  {
    value: 3,
    label: '困难'
  }
]

// 题型
export const questionType = [
  {
    value: 1,
    label: '单选'
  },
  {
    value: 2,
    label: '多选'
  },
  {
    value: 3,
    label: '简答'
  }
]

// 方向
export const direction = [
  'o2o',
  '外包服务',
  '企业服务',
  '互联网金融',
  '企业咨询',
  '互联网',
  '电子商务',
  '其他'
]

// 精品审核
export const chkType = [
  {
    value: 0,
    label: '待审核'
  },
  {
    value: 1,
    label: '已审核'
  },
  {
    value: 2,
    label: '已拒绝'
  }
]

// 发布状态
export const publishType = [
  // {
  //   value: 1,
  //   label: '已上架'
  // },
  // {
  //   value: 2,
  //   label: '已发布'
  // },
  // {
  //   value: 3,
  //   label: '已下架'
  // }
  {
    value: 0,
    label: '已下架'
  },
  {
    value: 1,
    label: '已上架'
  }
]

// 每个选项都是一个对象，其中包含了选项前字母，渲染
// 选项的内容，选项的图片地址，是否是正确选项(true/false)
export const array = [
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
]
