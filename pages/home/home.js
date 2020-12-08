import $api from '../../api/index';
import config from '../../api/config.js'; //配置文件
let _token = config['TOKEN'] || 'access_token'; //token字段
let app = getApp();

Page({
  data: {
    couponList: [],
    pageIndex: 0,
    isLoading: true,
    loadOver: false,
    selectCategory: "C100",
    selectIndex: 0,
    inputContent: "",
    sort: 1,
    firstSort: true,
    sortnum: 1,
    firstSortNum: true,
  },
  onLoad: function (options) {
    // this.getCategoryList()
  },
  onShow: function () {
    this.setData({
      couponList: [
        {
          ItemID: 0,
          ItemPic: 'https://fc3tn.baidu.com/it/u=3253659183,3491377631&fm=202&src=bqdata',
          ItemName: 'VOPPO不错不错味道好极了,人间美味啊,不错不错味道好极了,人间美味啊,不错不错味道好极了,人间美味啊',
          CouponDenomination: '满20元减10元',
          CouponTotal: '5000',
          Jian: '10',
          ZongHeBiLiText: '50%',
          MonthlySales: '2020-11-01'
        },
        {
          ItemID: 0,
          ItemPic: 'https://fc3tn.baidu.com/it/u=3253659183,3491377631&fm=202&src=bqdata',
          ItemName: 'VOPPO不错不错味道好极了,人间美味啊,不错不错味道好极了,人间美味啊,不错不错味道好极了,人间美味啊',
          CouponDenomination: '满20元减10元',
          CouponTotal: '5000',
          Jian: '10',
          ZongHeBiLiText: '50%'
        },
        {
          ItemID: 0,
          ItemPic: 'https://fc3tn.baidu.com/it/u=3253659183,3491377631&fm=202&src=bqdata',
          ItemName: 'VOPPO不错不错味道好极了,人间美味啊,不错不错味道好极了,人间美味啊,不错不错味道好极了,人间美味啊',
          CouponDenomination: '满20元减10元',
          CouponTotal: '5000',
          Jian: '10',
          ZongHeBiLiText: '50%'
        },
        {
          ItemID: 0,
          ItemPic: 'https://fc3tn.baidu.com/it/u=3253659183,3491377631&fm=202&src=bqdata',
          ItemName: 'VOPPO不错不错味道好极了,人间美味啊,不错不错味道好极了,人间美味啊,不错不错味道好极了,人间美味啊',
          CouponDenomination: '满20元减10元',
          CouponTotal: '5000',
          Jian: '10',
          ZongHeBiLiText: '50%'
        },
        {
          ItemID: 0,
          ItemPic: 'https://fc3tn.baidu.com/it/u=3253659183,3491377631&fm=202&src=bqdata',
          ItemName: 'VOPPO不错不错味道好极了,人间美味啊,不错不错味道好极了,人间美味啊,不错不错味道好极了,人间美味啊',
          CouponDenomination: '满20元减10元',
          CouponTotal: '5000',
          Jian: '10',
          ZongHeBiLiText: '50%'
        },
        {
          ItemID: 0,
          ItemPic: 'https://fc3tn.baidu.com/it/u=3253659183,3491377631&fm=202&src=bqdata',
          ItemName: 'VOPPO不错不错味道好极了,人间美味啊,不错不错味道好极了,人间美味啊,不错不错味道好极了,人间美味啊',
          CouponDenomination: '满20元减10元',
          CouponTotal: '5000',
          Jian: '10',
          ZongHeBiLiText: '50%'
        },
        {
          ItemID: 0,
          ItemPic: 'https://fc3tn.baidu.com/it/u=3253659183,3491377631&fm=202&src=bqdata',
          ItemName: 'VOPPO不错不错味道好极了,人间美味啊,不错不错味道好极了,人间美味啊,不错不错味道好极了,人间美味啊',
          CouponDenomination: '满20元减10元',
          CouponTotal: '5000',
          Jian: '10',
          ZongHeBiLiText: '50%'
        },
        {
          ItemID: 0,
          ItemPic: 'https://fc3tn.baidu.com/it/u=3253659183,3491377631&fm=202&src=bqdata',
          ItemName: 'VOPPO不错不错味道好极了,人间美味啊,不错不错味道好极了,人间美味啊,不错不错味道好极了,人间美味啊',
          CouponDenomination: '满20元减10元',
          CouponTotal: '5000',
          Jian: '10',
          ZongHeBiLiText: '50%'
        },
        {
          ItemID: 0,
          ItemPic: 'https://fc3tn.baidu.com/it/u=3253659183,3491377631&fm=202&src=bqdata',
          ItemName: 'VOPPO不错不错味道好极了,人间美味啊,不错不错味道好极了,人间美味啊,不错不错味道好极了,人间美味啊',
          CouponDenomination: '满20元减10元',
          CouponTotal: '5000',
          Jian: '10',
          ZongHeBiLiText: '50%'
        },
        {
          ItemID: 0,
          ItemPic: 'https://fc3tn.baidu.com/it/u=3253659183,3491377631&fm=202&src=bqdata',
          ItemName: 'VOPPO不错不错味道好极了,人间美味啊,不错不错味道好极了,人间美味啊,不错不错味道好极了,人间美味啊',
          CouponDenomination: '满20元减10元',
          CouponTotal: '5000',
          Jian: '10',
          ZongHeBiLiText: '50%'
        },
        {
          ItemID: 0,
          ItemPic: 'https://fc3tn.baidu.com/it/u=3253659183,3491377631&fm=202&src=bqdata',
          ItemName: 'VOPPO不错不错味道好极了,人间美味啊,不错不错味道好极了,人间美味啊,不错不错味道好极了,人间美味啊',
          CouponDenomination: '满20元减10元',
          CouponTotal: '5000',
          Jian: '10',
          ZongHeBiLiText: '50%'
        },
      ],
      pageIndex: 0,
      isLoading: true,
      loadOver: false
    })
    // this.getMoreCouponList()
  },

  getCategoryList: function () {
    var that = this
  },
  getMoreCouponList() {
    // let that = this
    // let resRequest = true
    // if (resRequest) {
    //   // 继续加重数据
    //   that.setData({
    //     couponList: [],
    //     isLoading: false
    //   });
    // } else {
    //   //无数据
    //   that.setData({
    //     isLoading: true,
    //     loadOver: true
    //   });
    // }
  },
  selectByCategory: function (e) {

    if (e.currentTarget.dataset.categoryId == 'C010') {
      if (this.data.firstSort) {
        this.setData({
          firstSort: false
        })
      } else {
        if (this.data.sort == '1') {
          this.setData({
            sort: 2
          })
        } else {
          this.setData({
            sort: 1
          })
        }
      }
    } else {
      this.setData({
        sort: 1,
        firstSort: true
      })
    }

    if (e.currentTarget.dataset.categoryId == 'C110') {
      if (this.data.firstSortNum) {
        this.setData({
          firstSortNum: false
        })
      } else {
        if (this.data.sortnum == '1') {
          this.setData({
            sortnum: 2
          })
        } else {
          this.setData({
            sortnum: 1
          })
        }
      }
    } else {
      this.setData({
        sortnum: 1,
        firstSortNum: true
      })
    }

    var selectNum = 0
    this.setData({
      couponList: [],
      loadOver: false,
      isLoading: true,
      pageIndex: 0,
      selectCategory: e.currentTarget.dataset.categoryId,
      selectIndex: selectNum,
    })

  },
  selectByItemName: function () {
    console.log('点击了搜索了')
    // this.setData({
    //   couponList: [],
    //   loadOver: false,
    //   isLoading: true,
    //   pageIndex: 0
    // })
    // this.getMoreCouponList()
  },
  selectAll: function () {
    this.setData({
      couponList: [],
      pageIndex: 0,
      isLoading: true,
      loadOver: false,
      selectCategory: "C100",
      selectIndex: 0,
      inputContent: "",
      sort: 1,
      firstSort: true
    })


  },
  bindInputChange: function (e) {
    this.setData({
      inputContent: e.detail.value
    })
    wx.setStorageSync('inputContent', e.detail.value)
  },

  setCouponInfo: function (e) {
    wx.setStorageSync('couponInfo', this.data.couponList[e.currentTarget.dataset.index])
  },
  onPullDownRefresh: function () {
    console.log('上拉了')
    this.setData({
      couponList: [],
      loadOver: false,
      isLoading: true,
      pageIndex: 0
    })
    wx.stopPullDownRefresh()
    this.getMoreCouponList()
  },
  onReachBottom: function () {
    console.log('下拉了')
    this.setData({
      isLoading: true,
      loadOver: false,
      pageIndex: this.data.pageIndex + 1
    })
    this.getMoreCouponList()
  },
  goToGetCoupon(){
    console.log('111111111111111')
  }
})
