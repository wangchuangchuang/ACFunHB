/*
 * 固定参数
 */
var ReqPack = [{}];



/*
 * 判断是否为 IOS 系统
 * true 是IOS  false 非ios
 */
var Check_IOS = function() {
	var xt_type = typeof(navigator.platform) == "undefined" ? "" : navigator.platform.toLowerCase();

	if (xt_type == "ipod" || xt_type == "iphone" || xt_type == "ipad" || xt_type == "iphone simulator" || xt_type == "ipad simulator") {
		return "IOS";
	}
	return "Andorid";
};



/*
 var userAgent = navigator.userAgent.toLowerCase();

 browser = {
 version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, '0'])[1],
 safari: /webkit/.test(userAgent),
 opera: /opera/.test(userAgent),
 msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
 mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
 }
 */

/*
 * IOS函数桥接
 */
var IOS_Bridge = {

	callbacksCount: 1,
	callbacks: {},

	resultForCallback: function resultForCallback(callbackId, resultArray) {
		try {
			var callback = IOS_Bridge.callbacks[callbackId];
			if (!callback) {
				return;
			}
			callback.apply(null, resultArray);
		} catch (e) {
			alert(e);
		}
	},

	/*
	 * functionName: 调用函数名称
	 * args:json 格式参数
	 * callback 回调函数，可有可无
	 * mob_funcname 类似PUL 或 CCS
	 */
	call: function call(functionName, args, funcID, frameID, callback, mob_funcname) {

		var hasCallback = callback && typeof callback == "function";
		var callbackId = hasCallback ? IOS_Bridge.callbacksCount++ : 0;

		if (hasCallback) {
			IOS_Bridge.callbacks[callbackId] = callback;
		}
		var iframe = document.createElement("IFRAME");
		iframe.setAttribute("src", "js-frame:" + functionName + ";;" + callbackId + ";;" + frameID + ";;" + funcID + ";;" + args + ";;" + callback + ";;" + mob_funcname);
		//encodeURIComponent(JSON.stringify(args)));
		document.documentElement.appendChild(iframe);
		iframe.parentNode.removeChild(iframe);
		iframe = null;

	}
};


/*
 * 返回当前时间赋值F_RUNTIME
 */
function getRuntime() {
	var date = new Date();
	var now = "";
	now = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	return now;
}


/*
 * 获取 function 名称
 * 不处理 var xx = function(){}; 此种方式
 */
function Fun_Name(funname) {
	var tmp = funname.toString();
	var re = /function\s*(\w*)/i;
	var matches = re.exec(tmp);
	//alert("name:" +matches[1]);
	return matches[1];
}

var _fm_system = Check_IOS();

/*
 * 移动平台调用
 * callback_name： 回调函数名
 * funid： 功能号
 * _parm： 请求参数对象 设置好的IXContent对象
 * _url： web端调用ajax 请求地址 （可送''）
 * _webtype：web端调用ajax 请求类型 web用属必送字段 post/get
 * _webdatatype：web端调用ajax 数据传输类型 web用属必送字段 text/json/....  如果是ix 字符串，则数据传输为text
 * SPEC： ix_js ToRequest 请求设置（可送''）
 * STRUCT： ix_js ToRequest 请求设置（可送''）
 * _mob_system： 移动平台送 系统标示 （非移动平台送''）
 * _mob_formid： 移动平台用框架ID （非移动平台送''）
 * _mob_taget： Android 平台用，如交易送'JY','TP'，本地用'Local'
 * _mob_ard_funcname：Android 平台用，后台功能模块名称 如'FuncID:'
 */
function Win_CallTQL(callback_name, funid, _parm, _url, _webtype, _webdatatype, SPEC, STRUCT, _mob_system, _mob_formid, _mob_taget, _mob_ard_funcname) {
	if (_fm_system == "IOS") {
		IOS_Bridge.call("Get_Ret", _parm.Value(), funid, _mob_formid, callback_name, _mob_ard_funcname);
	} else {
		//如 FuncID:114
		var ardfun = _mob_ard_funcname + ':' + funid;
		//alert(_mob_formid + "-" + ardfun + "-" + _mob_taget + "-" + _parm.Length() + "-" + _parm.Value() + "-" + callback_name);
		window.tdx_java.Android_SendData(_mob_formid, ardfun, _mob_taget, _parm.Length(), _parm.Value(), callback_name);
	}
}

/*
 * CALLTQL 默认配置
 */
var CALLTQL_CONFIG = {
	url: "",
	timeout: 30000
};

/*
 * WEB平台调用
 * callback： 回调函数
 * funid： 功能号
 * _parm： 请求参数对象 设置好的IXContent对象
 * _url： web端调用ajax 请求地址 （可送''）
 * _webtype：web端调用ajax 请求类型 web用属必送字段 post/get
 * _dataType: 传输数据类型，text、JSON
 * _taget：  如交易送'JY','TP'，本地用'Local' 主要用于扩展
 * _funcname： 后台功能模块名称 如'FuncID'
 */
function Win_CallTQL_WEB_bak(callback, funid, _parm, _url, _webtype, _dataType, _taget, _funcname) {

	var fnamestr = _funcname + ":" + funid;


	$.ajax({
		url: _url,
		type: _webtype,
		dataType: _dataType,
		data: {
			funcid: funid,
			bodystr: _parm.Value(),
			timeout: CALLTQL_CONFIG.timeout
		},
		jsonp: "callback",
		timeout: CALLTQL_CONFIG.timeout,
		success: function(data, textStatus, XMLHttpRequest) {
			if (textStatus == "success") {
				callback('', fnamestr, 0, data);
			}
		},
		error: function(xhr, stat, err) {
			alert("HttpStatues:" + xhr.statues + ",AjaxStatues:" + stat + ",AjaxError:" + err);
			// return false;
		}

	});

}

function Win_CallTQL_WEB(callback, funid, _parm, _url, _webtype, _dataType, _taget, _funcname) {

	var fnamestr = _funcname + ":" + funid;


	$.ajax({
		url: _url,
		type: _webtype,
		dataType: _dataType,
		data: _parm.Value(),
		jsonp: "callback",
		timeout: CALLTQL_CONFIG.timeout,
		success: function(data, textStatus, XMLHttpRequest) {
			if (textStatus == "success") {
				callback('', fnamestr, 0, data);
			}
		},
		error: function(xhr, stat, err) {
			alert("HttpStatues:" + xhr.statues + ",AjaxStatues:" + stat + ",AjaxError:" + err);
			// return false;
		}

	});

}

/*
 * 交易应答
 * formid：框架ID
 * funcid：功能号ID
 * flagtype：0：成功 ，1：失败
 * _data：返回的json 数据
 * callbackname : 回调函数
 */
function Get_Ret(formid, funcid, flagtype, _data, callbackname) {
	window.frames["Main_Frame"].Cmd_cbk(formid, funcid, flagtype, _data, callbackname);
}

function Cmd_cbk(formid, funcid, flagtype, _data, callbackname) {
	callbackname(formid, funcid, flagtype, _data);
}


/*
 * 页面跳转
 */
function Ref_url(_url) {
	location.href = _url;
}


/*
 * 定义 IXContent
 */
var IXContent = function() {
	this.ret = "";
	this.retcnt = [];
	this.retlength = 0;
};

IXContent.prototype = {
	Set: function(k, v) {
		if ($.trim(k) == "") {
			alert("当前键对获取为NULL，不予录入，请输入键值对");
			return;
		} else {

			if (typeof(v) == 'string') {
				this.retcnt.push("\"" + k + "\":" + "\"" + v + "\"");
			} else if (typeof(v) == 'number') {
				this.retcnt.push("\"" + k + "\":" + v);
			} else {
				var _cnts = [];
				$.each(v, function(n, m) {
					if (typeof(m) == 'string') {
						_cnts.push("\"" + n + "\":" + "\"" + m + "\"");
					} else {
						_cnts.push("\"" + n + "\":" + m);
					}
				});
				this.retcnt.push("\"" + k + "\":{" + _cnts.join(',') + "}");
			}
			this.retlength++;
		}
	},

	Length: function() {
		return this.retlength;
	},

	Value: function() {
		return "[{" + this.retcnt.join(',') + "}]";
		// this.ret = "{" + this.retcnt.join(',') + "}";
		// return $.parseJSON(this.ret);
	}
};



function stringToBytes(str) {
	var ch, st, re = [];
	for (var i = 0; i < str.length; i++) {
		ch = str.charCodeAt(i);
		st = [];
		do {
			st.push(ch & 0xFF);
			ch = ch >> 8;
		} while (ch);
		re = re.concat(st.reverse());
	}
	return re;
}

var request = {
	QueryString: function(val) {
		var url = window.location.search;
		var re = new RegExp("" + val + "=([^&?]*)", "ig");
		return ((url.match(re)) ? (url.match(re)[0].substr(val.length + 1)) : null);
	}
};

/*
 * 获取url信息
 */
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {

		return unescape(r[2]);
	}
	return null;
}


/*
 * 解析提交的应答
 */
function Return_Reply(_json) {
	var _ret = "";

	for (var i = 2; i < _json.length; i++) {
		$.each(_json[0], function(n, m) {

			if (m == "0") {
				if (_json[i][n] != "") {
					_ret += _json[1][n] + ":" + _json[i][n];
				}
			}
		});
	}

	return _ret;
}

/*
 * 自定义样式
 */
function setStyle(_style) {
	var css = document.createElement('style');
	css.setAttribute('type', 'text/css');
	// var cssText = 'label{color:Red;font-size:;} input[type="button"]{font-size:;}';
	var cssText = _style;
	if (css.styleSheet) { // IE
		css.styleSheet.cssText = cssText;
	} else {
		css.appendChild(document.createTextNode(cssText));
	}
	document.getElementsByTagName("head")[0].appendChild(css);
}

/*
 * 设置主题
 */
function setTheme(_theme) {

	if (_theme.length > 0) {

		var themeHref = "../css/" + _theme + ".css";
		$("#csslink").attr("href", themeHref);
	}
}



/*********** 框架层数据获取 *****************/


function BaseInfo() {
		//获取
		var ix = new IXContent();
		ix.Set("zjxx", 'loc');
		Win_CallTQL('Global_Variables', 'uinfo', ix, '', '', '', '', '', _fm_system, '0', 'JY', 'FuncID');

	}
	//登录状态获取 0 未登录  1已经登录

function Get_Access() {
		var ix = new IXContent();
		Win_CallTQL('Get_Access_code', 'global_access', ix, '', '', '', '', '', _mob_system, _formid, 'Local', 'PUL');
	}
	/*
	 * 独立缓存获取
	 */

function Global_Variables(_formid, funcid, flagtype, _json) {
	var _temp = $.parseJSON(_json);
	if( _temp['wtfs'] == undefined ){
		localStorage.setItem("wtfs", "" );
	}else{
		localStorage.setItem("wtfs", $.trim(_temp['wtfs']));
	}
	if( _temp['gddm'] == undefined ){
		localStorage.setItem("gddm", "" );
	}else{
		localStorage.setItem("gddm", $.trim(_temp['gddm']));
	}
	if( _temp['tdxid'] == undefined ){
		localStorage.setItem("tdxid", "" );
	}else{
		localStorage.setItem("tdxid", $.trim(_temp['tdxid']));
	}
	if( _temp['zjzh'] == undefined ){
		localStorage.setItem("zjzh", "" );
	}else{
		localStorage.setItem("zjzh", $.trim(_temp['zjzh']));
	}
  if( _temp['khh'] == undefined ){
  	localStorage.setItem("khh", "" );
  }else{
		localStorage.setItem("khh", $.trim(_temp['khh']));
	}
	if( _temp['xyzh'] == undefined ){
			localStorage.setItem("xyzh", "" );
	}else{
		localStorage.setItem("xyzh", $.trim(_temp['xyzh']));
	}
	if( _temp['uname'] == undefined ){
		localStorage.setItem("uname", "" );
	}else{
		localStorage.setItem("uname", $.trim(_temp['uname']));
	}
  if( _temp['mob_system'] == undefined ){
		localStorage.setItem("mob_system", "" );
	}else{
	localStorage.setItem("mob_system", _fm_system);
	}
	if( _temp['phone'] == undefined ){
		localStorage.setItem("phone", "" );
	}else{
		localStorage.setItem("phone", $.trim(_temp['phone']));
	}
	if( _temp['fzjzh'] == undefined ){
		localStorage.setItem("fzjzh", "" );
	}else{
		localStorage.setItem("fzjzh", $.trim(_temp['fzjzh']));
	}
	if( _temp['hs_regcustid'] != undefined ){
		localStorage.setItem("token", $.trim(_temp['hs_logintoken']).replace("_client=", ""));
		var key_arr = ['client_id', 'regcustid', 'fund_account'];
		var value_arr = [$.trim(_temp['hs_clientid']), $.trim(_temp['hs_regcustid']), $.trim(_temp['hs_fundaccount'])];
		TdxLocalStorage('set', '', key_arr, value_arr);
	}
	StartFun();

}



//加载栏目样式和属性
function tdxWebLoad(SHOW_TITLE_BAR, TITLE_BAR_TYPE, TITLE_BAR_TITLE, TITLE_BAR_UPPAGE, TITLE_BAR_CLASS, TITLE_BAR_EVENT, TITLE_BAR_LIST_ITEM_EVENT, SHOW_LEFT_BAR, LEFT_BAR_TYPE, LEFT_BAR_TITLE, LEFT_BAR_EVENT, SHOW_RIGHT_BAR, RIGHT_BAR_TYPE, RIGHT_BAR_TITLE, RIGHT_BAR_EVENT) {
	showLogs("加载栏目样式和属性")
	var _ix = new IXContent();
	_ix.Set('SHOW_TITLE_BAR', SHOW_TITLE_BAR); // 例如： 0：不显示 1：显示。
	_ix.Set('TITLE_BAR_TYPE', TITLE_BAR_TYPE); // 例如：0:不可点击 1：可点击 2:客户端处理3:东方首页特殊处理（20140926，未登录送的 3; 登录送的 4; 安卓） 
	_ix.Set('TITLE_BAR_TITLE', TITLE_BAR_TITLE); //当前标题 如"转账"
	_ix.Set('TITLE_BAR_UPPAGE', TITLE_BAR_UPPAGE); //上一级页面锚点   //  2014 0418添加
	_ix.Set('TITLE_BAR_CLASS', TITLE_BAR_CLASS); //当前页面级别 例如：0：首页；1：1级页面；2:2级页面……目前根据是否送了‘1’判定当前是否为1级页面，其余暂时不理会。20140923 xll
	//_ix.Set('TITLE_BAR_ITEM', TITLE_BAR_ITEM);   //当前标题可点击时送点击后出现的对话框的条目
	_ix.Set('TITLE_BAR_EVENT', TITLE_BAR_EVENT); //点击事件  在处理点击时反馈
	_ix.Set('TITLE_BAR_LIST_ITEM_EVENT', TITLE_BAR_LIST_ITEM_EVENT); //点击函数，在有多列的时候启用

	_ix.Set('SHOW_LEFT_BAR', SHOW_LEFT_BAR); // 例如： 0：不显示 1：显示  无回退时不显示
	_ix.Set('LEFT_BAR_TYPE', LEFT_BAR_TYPE); // 例如： 一般为空 处理首页ios送的3
	_ix.Set('LEFT_BAR_TITLE', LEFT_BAR_TITLE); //当前标题 一般为空 （回退箭头）
	_ix.Set('LEFT_BAR_EVENT', LEFT_BAR_EVENT); //点击事件   回退确认函数

	_ix.Set('SHOW_RIGHT_BAR', SHOW_RIGHT_BAR); // 例如： 0：不显示 1：显示
	_ix.Set('RIGHT_BAR_TYPE', RIGHT_BAR_TYPE); // 例如： 0：添加 1：扫描 2: 列表  3：忘记了    4、更多  5、处理首页ios送的5
	_ix.Set('RIGHT_BAR_TITLE', RIGHT_BAR_TITLE); //当前标题 例如：一般为空
	_ix.Set('RIGHT_BAR_EVENT', RIGHT_BAR_EVENT); //点击事件  点击函数
	Win_CallTQL('Local', 'tdxWebLoad', _ix, '', '', '', '', '', _fm_system, _formid, 'Local', 'PUL');

}



//表单提交确定取消对话框定义
function tdxMessageBox(TITLE, CONT, ID, BTNTXT, CALLBACK1, CALLBACK2) {
	var _ix = new IXContent();
	_ix.Set('TITLE', TITLE); //标题文本 为空表示不需要标题
	_ix.Set('CONT', CONT); //对话框文本内容
	_ix.Set('ID', ID); //对话框ID
	_ix.Set('BTNTXT', BTNTXT); //按钮文本  “确定|取消”
	_ix.Set('CALLBACK1', CALLBACK1); //按钮1 的回调函数 为空表示不处理
	_ix.Set('CALLBACK2', CALLBACK2); //按钮2 的回调函数 为空表示不处理

	Win_CallTQL('Local', 'tdxMessageBox', _ix, '', '', '', '', '', _fm_system, _formid, 'Local', 'PUL');
}

//表单提交确定取消调用系统浏览器方法
function tdxMessageBoxWeb(HEIGHT, DATA, URL, ID, BTNTXT, CALLBACK1, CALLBACK2) {
	var _ix = new IXContent();
	_ix.Set('HEIGHT', HEIGHT); //控制浏览器的高度
	_ix.Set('DATA', DATA); //传给网页的关键字，数据样例   ASD|DSA|ASD  ，字符以‘|’分隔，按顺序传递，返回也按照顺序
	_ix.Set('URL', URL); //网页的url
	_ix.Set('ID', ID); //对话框ID
	_ix.Set('BTNTXT', BTNTXT); //按钮文本  “确定|取消”
	_ix.Set('CALLBACK1', CALLBACK1); //按钮1 的回调函数 为空表示不处理
	_ix.Set('CALLBACK2', CALLBACK2); //按钮2 的回调函数 为空表示不处理

	Win_CallTQL('Local', 'tdxMessageBoxWeb', _ix, '', '', '', '', '', _fm_system, _formid, 'Local', 'PUL');
}

//对回退函数的抽象
function Ret_back(uppage) { //"上级锚点"

	if (uppage == "GOSY") {
		TZIndex();
	} else if (RegExp(".html").test(uppage) == true) {
		location.href = uppage;
	} else if (RegExp(".htm").test(uppage) == true) {
		location.href = uppage;
	} else {
		TdxJumpPage(uppage);
	}
}

/* 获取加密的TDXid
function getMtdxid(retfunc) {
	var _ix = new IXContent();

	Win_CallTQL(retfunc, 'getMtdxid', _ix, '', '', '', '', '', _fm_system, _formid, 'Local', 'PUL');
}
*/


/* 获取加密的值*/
function getMMC(funid, ix_val) {
	if (_fm_system == "IOS") {
		Win_CallTQL('ret_MMC', funid, ix_val, '', '', '', '', '', _fm_system, '', 'Local', 'PUL');
	} else {
		funid = 'PUL:' + funid;
		var _mmc = window.tdx_java.Android_JmInfo('', funid, 'Local', ix_val.Length(), ix_val.Value(), '');
		eval("ret_MMC('" + _mmc + "')");
	}
}

var _rmmc = '';

//返回加密信息
function ret_MMC(rid) {
	_rmmc = rid;
}


/*
入参是推迟的天数，出参是实际应该推迟的天数（去掉周六周日）
*/
function getDate(_someD, addTS) {

		if (_someD == '') {
			var week = new Date().getDay();
		} else {
			var day1 = new Date(parseInt(_someD));
			var week = day1.getDay();
		}

		var realAdd = 0;
		if (addTS == 1) {
			switch (week) {
				case 0:
					realAdd = 0;
					break;
				case 1:
					realAdd = 0;
					break;
				case 2:
					realAdd = 0;
					break;
				case 3:
					realAdd = 0;
					break;
				case 4:
					realAdd = 0;
					break;
				case 5:
					realAdd = 2;
					break;
				case 6:
					realAdd = 1;
					break;
			}
		} else if (addTS == 2) {
			switch (week) {
				case 0:
					realAdd = 0;
					break;
				case 1:
					realAdd = 0;
					break;
				case 2:
					realAdd = 0;
					break;
				case 3:
					realAdd = 0;
					break;
				case 4:
					realAdd = 2;
					break;
				case 5:
					realAdd = 1;
					break;
				case 6:
					realAdd = 0;
					break;
			}
		} else if (addTS == 3) {
			switch (week) {
				case 0:
					realAdd = 0;
					break;
				case 1:
					realAdd = 0;
					break;
				case 2:
					realAdd = 0;
					break;
				case 3:
					realAdd = 2;
					break;
				case 4:
					realAdd = 1;
					break;
				case 5:
					realAdd = 0;
					break;
				case 6:
					realAdd = 0;
					break;
			}
		} else if (addTS == 4) {
			switch (week) {
				case 0:
					realAdd = 0;
					break;
				case 1:
					realAdd = 0;
					break;
				case 2:
					realAdd = 2;
					break;
				case 3:
					realAdd = 1;
					break;
				case 4:
					realAdd = 0;
					break;
				case 5:
					realAdd = 0;
					break;
				case 6:
					realAdd = 0;
					break;
			}
		}

		return (addTS + realAdd);
	}
	/*
	某天往后延迟_addTs天
	返回为 eg. 8月3号
	*/

function addDate(_someD, _addTs) {
	var myDate = '';

	if (_someD == '') {
		myDate = new Date();
		myDate = myDate.valueOf();
	} else {
		myDate = parseInt(_someD);
	}

	myDate = myDate + _addTs * 24 * 60 * 60 * 1000;

	myDate1 = new Date(myDate);

	var tpm = myDate1.getMonth() + 1; //几月
	var tpd = myDate1.getDate(); //几日
	var tpw = myDate1.getDay(); //星期几
	var tpk = ''; //星期几汉字
	switch (tpw) {
		case 0:
			tpk = '日';
			break;
		case 1:
			tpk = '一';
			break;
		case 2:
			tpk = '二';
			break;
		case 3:
			tpk = '三';
			break;
		case 4:
			tpk = '四';
			break;
		case 5:
			tpk = '五';
			break;
		case 6:
			tpk = '六';
			break;
	}

	var tmpS = myDate + '|' + (tpm < 10 ? ("0" + tpm) : tpm) + " - " + (tpd < 10 ? ("0" + tpd) : tpd) + "  星期" + tpk;
	return tmpS;
}

/*20150513 姚晓祺
 * 新的方法，开辟内存保留理财账户相关数据
 */
 function TdxLocalStorage(LocalStorageType,RetName,key,value){
    var _ix = new IXContent();
    _ix.Set('LocalStorageType', LocalStorageType);//'set|get|del'
    _ix.Set('key', key);//
    _ix.Set('value', value);//
    Win_CallTQL(RetName, 'TdxLocalStorage', _ix, '', '', '', '', '', _mob_system, _formid, 'Local', 'PUL');//RetName回调函数名，TdxLocalStorage方法统一归为此类
}
