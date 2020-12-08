/*
 * 接口公共访问方法
 * @param  url  请求地址
 * @param  param      请求参数
 * @param  requestType 请求方式  GET POST
 */
const getData = (url, param, requestType, title) => {
  if (!requestType) {
    requestType = 'GET';
  }

  if (requestType == 'GET') {// var url = newUrl(url, param)
    // console.log(url)
  }

  if (title == '' || title == undefined) {
    title = "加载中...";
  }

  return new Promise((resolve, reject) => {
    const header = {
      "Content-Type": "application/x-www-form-urlencoded"
    };

    if (title == 'login') {} else {
      tt.showLoading({
        title: title
      });
    }

    tt.request({
      url: url,
      method: requestType,
      header: header,
      data: param || {},
      success: function (res) {
        if (res.statusCode == 200) {
          if (res) {
            resolve(res);
          } else {
            resolve(res);
            tt.hideLoading();
            console.log('网络访问失败：' + JSON.stringify(res));
          }
        } else {
          var status = '';

          switch (res.statusCode) {
            case 400:
              status = '错误请求';

              _show_erroe(status);

              return false;
              break;

            case 401:
              status = '错误请求或认证失败';

              _show_erroe(status);

              return false;
              break;

            case 403:
              status = '拒绝访问';

              _show_erroe(status);

              return false;
              break;

            case 404:
              status = '请求错误,未找到该资源';

              _show_erroe(status);

              return false;
              break;

            case 405:
              status = '请求方法未允许';

              _show_erroe(status);

              return false;
              break;

            case 408:
              status = '请求超时';

              _show_erroe(status);

              return false;
              break;

            case 500:
              status = '服务器端出错';

              _show_erroe(status);

              return false;
              break;

            case 501:
              status = '网络未实现';

              _show_erroe(status);

              return false;
              break;

            case 502:
              status = '网络错误';

              _show_erroe(status);

              return false;
              break;

            case 503:
              status = '服务不可用';

              _show_erroe(status);

              return false;
              break;

            case 504:
              status = '网络超时';

              _show_erroe(status);

              return false;
              break;

            case 505:
              status = 'http版本不支持该请求';

              _show_erroe(status);

              return false;
              break;

            default:
              status = `连接错误${res.statusCode}`;

              _show_erroe(status);

              return false;
          }
        }
      },
      fail: function (res) {
        tt.hideLoading();
        console.log('网络访问失败：' + JSON.stringify(res));
      },
      complete: function (res) {
        tt.hideLoading();
      }
    });
  });
};
/**
 * 创建解析参数，返回一个拼接好的params字符串
 */


const parseParamToString = param => {
  let paramStr = "";

  for (var key in param) {
    let value = param[key] !== undefined ? data[key] : '';
    paramStr += `&${k}=${encodeURIComponent(value)}`;
  }

  return paramStr.substr(1);
};
/**
 * 把json对象拆成url参数格式的方法
 * @param 需要处理的json对象
 */


const getParam = param => {
  let paramStr = '';

  for (var k in param) {
    let value = param[k] !== undefined ? param[k] : '';
    paramStr += `&${k}=${encodeURIComponent(value)}`;
  }

  return paramStr ? paramStr.substring(1) : '';
}; // //最终获取带参数的url方法


const newUrl = (url, param) => {
  return url += (url.indexOf('?') < 0 ? '?' : '') + getParam(param);
}; // 错误弹窗


const _show_erroe = status => {
  tt.showModal({
    title: status,
    icon: 'none',
    duration: 2000
  });
};

const _show_toast = status => {
  tt.showToast({
    title: status,
    icon: 'none',
    duration: 2000
  });
};

module.exports = {
  getData
};