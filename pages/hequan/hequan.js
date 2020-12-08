// pages/hequan/hequan.js
Page({
    data: {
        dates1: '',
        dates2: '',
        isShow1: true,
        isShow2: true,
    },
    onLoad: function(options) {

    },
    bindDateChange: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value);
        this.setData({
            dates1: e.detail.value,
            isShow1: false
        });
    },
    bindDateChange1: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value);
        this.setData({
            dates2: e.detail.value,
            isShow2: false
        });
    },
    goToGetCoupon() {
        console.log('111111111111111')
    },
    phineHX() {
        console.log(2222)
        tt.navigateTo({
            url: '/pages/phinehx/phinehx', // 指定页面的url
            success(res) {
                console.log(res);
            },
            fail(res) {
                console.log("navigateTo调用失败", res);
            },
        });
    },
    zhushou(){
      console.log(999)
      tt.navigateTo({
            url: '/pages/zhushou/zhushou', // 指定页面的url
            success(res) {
                console.log(res);
            },
            fail(res) {
                console.log("navigateTo调用失败", res);
            },
        });
    }
})