const CryptoJS = require('crypto');
const moment = require('moment');
const encrypt = function (data) {
  var key = CryptoJS.enc.Utf8.parse('zhiliao666888999');
  var iv = CryptoJS.enc.Utf8.parse('zhiliao666888999');
  var encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }); //返回的是base64格式的密文	

  return encrypted.ciphertext.toString().toUpperCase();
};

const getNoLoginRequiredToken = function () {
  return encrypt(moment().format('YYYY-MM-DD HH:mm:ss'));
};

export default getNoLoginRequiredToken;