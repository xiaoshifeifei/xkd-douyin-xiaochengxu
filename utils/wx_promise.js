import api from '../api/shopping';

const wx_login = () => {
  return new Promise((resolve, reject) => {
    tt.login({
      success: function (res) {
        if (res.code) {
          resolve(res);
        } else {
          console.log(res.errMsg);
          reject(res);
        }
      },
      fail: reject
    });
  });
};

const wx_getSetting = scope => {
  return new Promise((resolve, reject) => {
    tt.getSetting({
      success(res) {
        scope = `scope.${scope}`;
        res.authSetting[scope] ? resolve(res) : reject(res);
      }

    });
  });
};

const wx_openSetting = () => {
  return new Promise((resolve, reject) => {
    tt.openSetting({
      success: resolve,
      fail: reject
    });
  });
};

const wx_authorize = scope => {
  return new Promise((resolve, reject) => {
    tt.authorize({
      scope: `scope.${scope}`,

      success(res) {
        console.log(res);
      }

    });
  });
};
/*@params {options} 参数 为 wx.showModal 参数
 *@params type 'cancel' 取消类型 'confirm' 确认类型
 */


const wx_showModal = (options, type = 'confirm') => {
  return new Promise((resolve, reject) => {
    let cancelColor = type === 'confirm' ? '#999' : '#FFC905';
    let confirmColor = type === 'confirm' ? '#FFC905' : '#999';
    tt.showModal({
      title: '',
      content: '',
      showCancel: true,
      cancelColor,
      confirmColor,
      ...options,
      success: resolve,
      fail: reject
    });
  });
};
/**
 * 获取消息订阅状态
 * @param {String} tmplIds 消息模板id
 */


const tmplId = 'ybpyDqApur4QKrg8Uo12kRW0NmvkUdW7F2tbW4sW2fA'; // const tmplId = 'TKRvll6Ex4Iu5Y_ZQkGfogLwDxvBroR8oNJgznmszAY'

const getSubscribeMessage = () => {
  return new Promise((resolve, reject) => {
    tt.getSetting({
      withSubscriptions: true,

      success(res) {
        if (res.subscriptionsSetting.itemSettings && res.subscriptionsSetting.itemSettings[tmplId] === 'accept') {
          resolve(res.subscriptionsSetting);
        } else {
          requestSubscribeMessage().then(resolve).catch(reject);
        }
      },

      fail: reject
    });
  });
};

const requestSubscribeMessage = () => {
  return new Promise((resolve, reject) => {
    tt.requestSubscribeMessage({
      tmplIds: [tmplId],
      success: resolve,
      fail: reject
    });
  });
};
/**
 * 微信支付
 * @param {Object} payParams 微信支付 心要参数
 * @return {Promise}
 */


const wx_requestPayment = payParams => {
  return new Promise((resolve, reject) => {
    tt.requestPayment({
      timeStamp: payParams.timeStamp,
      // 时间戳，必填（后台传回）
      nonceStr: payParams.nonceStr,
      // 随机字符串，必填（后台传回）
      package: payParams.package,
      // 统一下单接口返回的 prepay_id 参数值，必填（后台传回）
      signType: 'MD5',
      // 签名算法，非必填，（预先约定或者后台传回）
      paySign: payParams.paySign,
      // 签名 ，必填 （后台传回）
      success: resolve,
      fail: reject
    });
  });
};
/**
 * 用户提交订单后 进行微信支付 
 * @param {Number} orderId 订单id
 * @param {Number} orderNo 订单编号
 * @param {Number} actuallyPay 实际支付 金额
 * @param {Number} belongModule 所属模块
 * @return {Promise}
 */


const wxPay = params => {
  const {
    orderId,
    orderNo,
    actuallyPay,
    belongModule
  } = params;
  return new Promise((resolve, reject) => {
    if (+actuallyPay === 0) {
      // 支付金额为 0 
      api.reqWxPayRefund(orderNo).then(() => resolve({
        pay: 'success',
        params
      })).catch(() => resolve({
        pay: 'success',
        params
      }));
    } else {
      let promise = new Promise((resolve, reject) => {
        api.reqWxOrder({
          body: '知了酒店超市-微信支付',
          total_fee: actuallyPay,
          out_trade_no: orderNo
        }).then(res => {
          return wx_requestPayment(res.data);
        }).then(resolve).catch(reject);
      });
      promise.then(res => {
        tt.hideLoading();
        tt.showToast({
          title: '订单支付成功',
          mask: true
        });
        api.reqWxPayRefund(orderNo).then(() => resolve({
          pay: 'success',
          params
        })).catch(() => resolve({
          pay: 'success',
          params
        }));
      }).catch(err => {
        tt.hideLoading();
        wx_showModal({
          title: '订单支付',
          content: "订单号：" + orderNo + '\r\n支付金额：' + actuallyPay + '元',
          cancelText: "离开",
          confirmText: "去支付"
        }).then(res => {
          if (res.confirm) {
            wxPay(params);
          } else {
            resolve({
              pay: 'fail',
              params
            });
          }
        });
      });
    }
  });
};

module.exports = {
  wxPay,
  wx_login,
  wx_getSetting,
  wx_openSetting,
  wx_showModal,
  wx_authorize,
  getSubscribeMessage
};