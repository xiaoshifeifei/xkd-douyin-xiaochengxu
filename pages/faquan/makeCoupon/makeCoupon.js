var Moment = require("../../calendar/moment.js");
var DATE_LIST = [];
var DATE_YEAR = new Date().getFullYear()
var DATE_MONTH = new Date().getMonth() + 1
var DATE_DAY = new Date().getDate()
Page({
  data: {
    items: [{
      value: 'djq',
      name: '代金券',
      checked: 'true'
    }, {
      value: 'zkq',
      name: '折扣券'
    }],


    typezuidi: 'zd',



    // 代金券
    type: 'djq',
    name: '',
    kaPianFileList: [],
    loGoFileList: [],
    shiyong: '',
    youxiaoqi: [{
      value: 'gd',
      name: '固定日期',
      checked: 'true'
    }, {
      value: 'yx',
      name: '领取生效'
    }],
    typeyou: 'gd',
    date: '',
    show: false,
    // 时间
    gdvalue: '',
    checkInDate: "",
    checkOutDate: "",
    tianshu: '',
    phone: '',
    xuzhi: '',
    typezuidi: 'zd',
    zuidixiaofei: [{
      value: 'zd',
      name: '设置最低消费',
      checked: 'true'
    }, {
      value: 'bx',
      name: '不限制最低消费'
    }],
    zuidivalue: '',
    jianmianvalue: '',
    mrxlvalue: '',
    fjzlvalue: '',
    faquanFlag: 'yes',
    isoryes: [{
      value: 'yes',
      name: '是',
      checked: 'true'
    }, {
      value: 'no',
      name: '否'
    }]


    // 折扣券


  },
  onLoad: function (options) {
    //设缓存缓存起来的日期
    wx.setStorage({
      key: 'ROOM_SOURCE_DATE',
      data: {
        checkInDate: Moment(new Date()).format('YYYY-MM-DD'),
        checkOutDate: Moment(new Date()).add(1, 'day').format('YYYY-MM-DD')
      }
    });
  },
  onShow: function () {
    let getDate = wx.getStorageSync("ROOM_SOURCE_DATE");
    let gdvalue = getDate.checkInDate + '　至　' + getDate.checkOutDate
    this.setData({
      checkInDate: getDate.checkInDate,
      checkOutDate: getDate.checkOutDate,
      gdvalue
    })
  },
  checkboxChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      type: e.detail.value
    })
  },
  checkboxChangeYou: function (e) {
    console.log(e.detail.value)
    this.setData({
      typeyou: e.detail.value
    })
  },
  checkboxChangeZd: function (e) {
    console.log(e.detail.value)
    this.setData({
      typezuidi: e.detail.value
    })
  },
  checkboxChangeYesOrNo: function (e) {
    console.log(e.detail.value)
    this.setData({
      faquanFlag: e.detail.value
    })
  },

  handleInput(event) {
    console.log(event.detail);
  },
  shiyongOnTextInput(e) {
    console.log('1111')
    this.setData({
      shiyong: e.detail.value
    })
  },
  tianShuInput(e) {
    console.log(e)
    this.setData({
      tianshu: e.detail.value
    })
  },
  phoneInput(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  xuzhiInput(e) {
    this.setData({
      xuzhi: e.detail.value
    })
  },
  zuidiInput(e) {
    this.setData({
      zuidivalue: e.detail.value
    })
  },
  jianmianInput(e) {
    this.setData({
      jianmianvalue: e.detail.value
    })
  },
  mrxlInput(e) {
    this.setData({
      mrxlvalue: e.detail.value
    })
  },
  fjzlInput(e) {
    this.setData({
      fjzlvalue: e.detail.value
    })
  },
  // 图片上传卡券
  afterRead(event) {
    const { file } = event.detail;
    console.log(file)
    this.setData({
      kaPianFileList: [{
        url: file.path
      }]
    })
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    // wx.uploadFile({
    //   url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
    //   filePath: file.path,
    //   name: 'file',
    //   formData: { user: 'test' },
    //   success(res) {
    //     // 上传完成需要更新 fileList
    //     const { fileList = [] } = this.data;
    //     fileList.push({ ...file, url: res.data });
    //     this.setData({ fileList });
    //   },
    // });
  },
  beforeRead(event) {
    console.log('1111')
    const { file, callback } = event.detail;
    console.log(callback)
    callback(file.type === 'image');
  },
  delete() {
    console.log('删除了')
    this.setData({
      loGoFileList: []
    })
  },
  // 图片上传卡券
  afterReadLogo(event) {
    const { file } = event.detail;
    console.log(file)
    this.setData({
      loGoFileList: [{
        url: file.path
      }]
    })
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    // wx.uploadFile({
    //   url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
    //   filePath: file.path,
    //   name: 'file',
    //   formData: { user: 'test' },
    //   success(res) {
    //     // 上传完成需要更新 fileList
    //     const { fileList = [] } = this.data;
    //     fileList.push({ ...file, url: res.data });
    //     this.setData({ fileList });
    //   },
    // });
  },
  beforeReadLogo(event) {
    console.log('1111')
    const { file, callback } = event.detail;
    console.log(callback)
    callback(file.type === 'image');
  },
  deleteLogo() {
    console.log('删除了')
    this.setData({
      loGoFileList: []
    })
  },


  // 日历
  // onDisplay() {
  //   this.setData({ show: true });
  // },
  tapGuDing() {
    console.log('1111')
    // this.setData({ show: true });
    tt.navigateTo({
      url: '/pages/calendar/index' // 指定页面的url
    });
  },
  onClose() {
    console.log('1111')
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
    console.log('111')
    console.log(event)
    const [start, end] = event.detail;
    this.setData({
      show: false,
      gdvalue: `${this.formatDate(start)} - ${this.formatDate(end)}`,
    });
  },
});