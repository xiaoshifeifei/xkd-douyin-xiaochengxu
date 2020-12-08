import request from './interface';
import config from './config.js'; //配置文件

let _token = config['TOKEN'] || 'access_token'; //token字段


export function requestUploadFile(filePath) {
  return new Promise((resolve, rejest) => {
    //  url: `http://192.168.110.85:8066/comment/addComment?hotelID=10&evaluation=1&tagIDs=1&content=1&roomnumber=150&roomid=10`,
    // 参数合并
    let url = config['URL'] + '/uploadPhoto/uploadPhoto';
    tt.uploadFile({
      filePath: filePath,
      url: url,
      name: 'multipartFile',
      header: {
        'token': tt.getStorageSync('userInfo')[_token],
        'content-type': 'multipart/form-data'
      },
      success: resolve,
      fail: rejest
    });
  });
}
export function uploadImg(list) {
  return new Promise(resolve => {
    _uploadImg(list, 0, resolve);
  });
}

function _uploadImg(list, i, resolve, urls = []) {
  tt.showLoading();
  let l = list.length;
  requestUploadFile(list[i]).then(res => {
    let data = JSON.parse(res.data) || {};

    if (data.code === 0) {
      urls.push(data.message);
    }

    tt.hideLoading();
    i++;

    if (i < l) {
      _uploadImg(list, i, resolve, urls);
    } else {
      resolve(urls);
    }
  }).catch(err => {
    console.log(err);
    tt.hideLoading();
    i++;

    if (i < l) {
      _uploadImg(list, i, resolve, urls);
    } else {
      resolve(urls);
    }
  });
}