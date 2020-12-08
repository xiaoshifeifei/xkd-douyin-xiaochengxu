/*******************************
		请求参数视情况改变
******************************/

/******************************
请求示范:
http.get(mod,data,configOPT,options);
	mod:拼接请求URL,必传!
	data:传入参数
	configOPT:配置交互动作
			noGoToLogin:1 需要token但不跳转登录
			navToLogin:1  普通方式跳转登录(可返回)
			reject:1      需要捕捉失败.catch
	options:可改变默认请求信息(如header,dataType)
****************************************/
import home from './home';
export default { ...home
};