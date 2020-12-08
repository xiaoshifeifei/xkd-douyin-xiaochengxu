import request from './interface';
import requestUpload from './uploadFile';
export default {
  //登录
  login: data => request.post('/wxuser/wxuserLogin', data),
  searchGoods: params => request.get(`/goods/searchGoods/${params.hotelId}/${params.selectParam}/${params.belongModule}/${params.pageNo}/${params.pageSize}`),
  addrepair: data => {
    return request.post('/repair/addrepair', data);
  },
  // 图片上传
  addrepairUpload: (data, filePath) => requestUpload.requestUploadFile(`/repair/addrepair?orderid=${data.orderid}&hotelid=${data.hotelid}&roomid=${data.roomid}&roomnumber=${data.roomnumber}&hotelname=${data.hotelname}&remark=${data.remark}`, filePath)
};