/*
 * 是否显示输入密码框
 * tr 为固定信息 yh_tr  和 zj_tr
 */
function Show_mm(flag) {

	if (flag == undefined) {
		return false;
	}

	switch (flag) {
		case "0":
			//都不显示
			$("#yh_tr").css({
				"display": "none"
			});
			$("#zj_tr").css({
				"display": "none"
			});
			break;

		case "1":
			//资金密码
			$("#yh_tr").css({
				"display": "none"
			});
			$("#zj_tr").css({
				"display": ""
			});
			break;

		case "2":
			//银行密码
			$("#yh_tr").css({
				"display": ""
			});
			$("#zj_tr").css({
				"display": "none"
			});
			break;

		default:
			//都显示
			$("#yh_tr").css({
				"display": ""
			});
			$("#zj_tr").css({
				"display": ""
			});
			break;
	}
}


/*
 * 翻译常量名称
 * vid：常量ID
 * _json：常量JSON
 */
function Render_Name(vid, _json) {
	for (var i = 1; i <= _json[0]['Num']; i++) {
		if ($.trim(_json[i]['ID']) == $.trim(vid)) {
			return _json[i]['NAME'];
		}
	}
	return "其他";
}


//获取各种格式的当前时间
function GetNow(type) {
	var mydate = new Date();
	var xYear = mydate.getFullYear();

	xYear = xYear;

	var xMonth = mydate.getMonth() + 1;
	if (xMonth < 10) {
		xMonth = "0" + xMonth;
	}

	var xDay = mydate.getDate();
	if (xDay < 10) {
		xDay = "0" + xDay;
	}

	var xHours = mydate.getHours();
	if (xHours < 10) {
		xHours = "0" + xHours;
	}

	var xMinutes = mydate.getMinutes();
	if (xMinutes < 10) {
		xMinutes = "0" + xMinutes;
	}

	var xSeconds = mydate.getSeconds();
	if (xSeconds < 10) {
		xSeconds = "0" + xSeconds;
	}
	if (type == 112) {
		return xYear + "" + xMonth + "" + xDay;

		//return mydate.format("yyyy-MM-dd");
	}
	if (type == 120) {
		return xYear + "-" + xMonth + "-" + xDay + " " + xHours + ":" + xMinutes + ":" + xSeconds;
	}
	if (type == 121) {
		return xYear + "年" + xMonth + "月";
	}
	if (type == 122) {
		return xYear + "" + xMonth;
	}
	if (type == 123) {
		return xYear + "." + xMonth + "." + xDay;
	}
}



// var _addmonth = 0;

function addMonth(_addmonth, elm) {
	var _nowd = "";
	var _nowdate = new Date();
	if (_addmonth < 0) {
		// _addmonth = _addmonth + 1;
		// 设置成1号是为了防止空日期
		_nowdate.setMonth((_nowdate.getMonth() + _addmonth), 1);

		var m = _nowdate.getMonth() + 1;
		_nowd = _nowdate.getFullYear() + "" + (m < 10 ? ("0" + m) : m);
		$('#' + elm).html(_nowdate.getFullYear() + "年" + (m < 10 ? ("0" + m) : m) + "月");
	} else {
		var m = _nowdate.getMonth() + 1;
		_nowd = _nowdate.getFullYear() + "" + (m < 10 ? ("0" + m) : m);
		$('#' + elm).html(_nowdate.getFullYear() + "年" + (m < 10 ? ("0" + m) : m) + "月");
	}
	return _nowd;
}

function MinusMonth(_addmonth, elm) {
	var _nowd = "";
	var _nowdate = new Date();
	// _addmonth = _addmonth - 1;

	_nowdate.setMonth((_nowdate.getMonth() + _addmonth), 1);

	var m = _nowdate.getMonth() + 1;
	_nowd = _nowdate.getFullYear() + "" + (m < 10 ? ("0" + m) : m);

	$('#' + elm).html(_nowdate.getFullYear() + "年" + (m < 10 ? ("0" + m) : m) + "月");

	return _nowd;
}


//跳转返回首页
function TZIndex() {
	var _ix = new IXContent();
	_ix.Set('abc', '');
	Win_CallTQL('TZ_INDEX', 'GOSY', _ix, '', '', '', '', '', _mob_system, _formid, 'Local', 'PUL');
}



//div 折叠效果
var accordion = function() {
	var tm = sp = 10;

	function slider(n) {
		this.nm = n;
		this.arr = []
	}
	slider.prototype.init = function(t, c, k) {
		var a, h, s, l, i;
		a = document.getElementById(t);
		this.sl = k ? k : '';
		h = a.getElementsByTagName('dt');
		s = a.getElementsByTagName('dd');
		this.l = h.length;
		for (i = 0; i < this.l; i++) {
			var d = h[i];
			this.arr[i] = d;
			d.onclick = new Function(this.nm + '.pro(this)');
			if (c == i) {
				d.className = this.sl
			}
		}
		l = s.length;
		for (i = 0; i < l; i++) {
			var d = s[i];
			d.mh = d.offsetHeight;
			if (c != i) {
				d.style.height = 0;
				d.style.display = 'none'
			}
		}
	}
	slider.prototype.pro = function(d) {
		for (var i = 0; i < this.l; i++) {
			var h = this.arr[i],
				s = h.nextSibling;
			s = s.nodeType != 1 ? s.nextSibling : s;
			clearInterval(s.tm);
			if ((h == d && s.style.display == 'none') || (h == d && s.style.display == '')) {
				s.style.display = '';
				su(s, 1);
				h.className = this.sl
			} else if (s.style.display == '') {
				su(s, -1);
				h.className = ''
			}
		}

		$(".sliderbox img").attr("src", "../images/jt_d.png");
		$("#slider2 dt").each(function(e, m) {
			if ($(this).hasClass("open")) {
				$("#img" + e).attr("src", "../images/jt_u.png");
			}
		})

	}

	function su(c, f) {
		c.tm = setInterval(function() {
			sl(c, f)
		}, tm)
	}

	function sl(c, f) {
		var h = c.offsetHeight,
			m = c.mh,
			//d = f == 1 ? m - h: h;
			d = f == 1 ? m - h + 9 : h + 9;

		c.style.height = h + (Math.ceil(d / sp) * f) + 'px';
		c.style.opacity = h / m;
		c.style.filter = 'alpha(opacity=' + h * 100 / m + ')';

		if (f == 1 && h >= m) {
			clearInterval(c.tm)
		} else if (f != 1 && h == 1) {
			c.style.display = 'none';
			clearInterval(c.tm)
		}
	}
	return {
		slider: slider
	}
}();



function touchCk(elm, callbackfun) {
		var obj = document.getElementById(elm);

		obj.addEventListener('touchstart', function(event) {
			if (event.targetTouches.length == 1) {
				_cx = event.touches[0].clientX;
				_cy = event.touches[0].clientY;
			}
		}, false);

		obj.addEventListener('touchend', function(event) {
			var _ccx = event.changedTouches[0].clientX;
			var _ccy = event.changedTouches[0].clientY;

			if (_cx == _ccx && _cy == _ccy) {
				callbackfun;
			}
		}, false);
	}
	/*
	 * 获取URL参数
	 */

function URLParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]);
		}
		return null;
	}
	/*输出昨天的日期，格式
	0:'20140805'
	1:'2014/08/05'*/

function getYestoday(_st) {
		var td = new Date();
		td.setDate(td.getDate() - 1);
		if (_st == 1) {
			return (td.getFullYear() + '/' + ((td.getMonth() + 1) < 10 ? ('0' + (td.getMonth() + 1)) : (td.getMonth() + 1)) + '/' + (td.getDate() < 10 ? ('0' + td.getDate()) : td.getDate()));
		} else if (_st == 0) {
			return (td.getFullYear().toString() + ((td.getMonth() + 1) < 10 ? ('0' + (td.getMonth() + 1)).toString() : (td.getMonth() + 1).toString()) + (td.getDate() < 10 ? ('0' + td.getDate()).toString() : td.getDate().toString()));
		}

	}
	/*
	function getYestoday(_st) {
		var td = new Date();
		td.setDate(td.getDate()-1);
		if(_st == 1) {
			return (td.getFullYear()+'/'+((td.getMonth()+1)<10?('0'+(td.getMonth()+1)):(td.getMonth()+1))+'/'+(td.getDate()<10?('0'+td.getDate()):td.getDate()));
		}
		else if(_st == 0) {
			return (td.getFullYear()+((td.getMonth()+1)<10?('0'+(td.getMonth()+1)):(td.getMonth()+1))+(td.getDate()<10?('0'+td.getDate()):td.getDate()));
		}

	}*/

/*
	取传入日期d1('2014/08/05') , n(30)天之前的日期
*/
function getPreDay(d1, n) {
		var dt = new Date(d1);
		dt.setDate(dt.getDate() - n);
		return (dt.getFullYear().toString() + ((dt.getMonth() + 1) < 10 ? ('0' + (dt.getMonth() + 1)).toString() : (dt.getMonth() + 1).toString()) + (dt.getDate() < 10 ? ('0' + dt.getDate()).toString() : dt.getDate().toString()));
	}
	//公共跳转

function IndexTZ(_url) {
	var _ix = new IXContent();
	_ix.Set('url', _url);
	//alert("URL:" + _url);
	//alert(_mob_system+" "+_formid);
	Win_CallTQL('TZ_INDEX', 'URLTZ', _ix, '', '', '', '', '', _mob_system, _formid, 'Local', 'PUL');
}


// <!-- 引用jquery.blockUI.js文件, 此文件在mobile_sdk中 -->  
// <script type="text/javascript" src="jquery.blockUI.js"></script>  


function openDlg(_pagediv, _dlgid, _content) {
	//弹出框的样式可以自定义，将样式代码写入bk。  
	// var bk='<div id="'+ _dlgid +'" style="display:none; cursor: default;"><table boder="0" style="width: 100%;"><tr><td style="padding-top: 25px;"><div id="pp" class="font22" style="color: #333333;text-align: center;border-bottom: 1px solid #999999;height: 69px;">'+_content+'</div></td></tr><tr><td style="text-align: center;color: #0072c5;height: 20px;line-height: 20px;padding: 6px 0px;"><div class="font22" onclick="closeDlg()">确定</div></td></tr></table></div>';  
	var bk = '<div id="' + _dlgid + '" style="display:none; cursor: default;"><table boder="0" style="width: 100%;"><tr><td style="padding-top: 25px;"><div id="pp" class="font22" style="color: #333333;text-align: center;border-bottom: 1px solid #999999;height: 62px;">' + _content + '</div></td></tr><tr><td style="text-align: center;color: #0072c5;height: 35px;line-height: 25px;padding: 6px 0px;"><div type="button" class="font22" onclick="closeDlg()">确定</div></td></tr></table></div>';

	$("#" + _pagediv).append(bk);

	$.blockUI({
		message: $('#' + _dlgid),
		css: {
			padding: '0',
			margin: '0',
			width: ($(window).width() - 28 + 'px'),
			top: '40%',
			left: '14px',
			textAlign: 'center',
			color: '#000',
			border: 'none',
			cursor: 'wait',
			radius: '10px',
			'-webkit-border-radius': '10px',
			'-moz-border-radius': '10px'
		}
	});
}

function openDlg_xll(_pagediv, _dlgid, _content, _header, _agree, _disagree) {
	var bk = '<div id="' + _dlgid + '"style="border:0px;background-color:#F6F6F6;display:none; cursor:default;"><div style="width:100%;height:40px;background-color:#ebebeb;line-height:40px;text-align:center;border-bottom:1px solid #d5d5d5;"><span class="ofont18">' + _header + '</span></div><div style="width:100%;">' + _content + '</div><div style="width:100%;display:block;"><table style="width:100%;height: 40px;line-height: 40px;"><tr><td style="text-align: center;width:50%;border-right:1px solid #d5d5d5;"><div type="button" class="ofont19" onclick=' + _disagree + '>取消</div></td><td style="text-align: center;"><div type="button" class="ofont20" onclick=' + _agree + '>确定</div></td></tr></table></div></div>';

	$("#" + _pagediv).append(bk);

	$.blockUI({
		message: $('#' + _dlgid),
		css: {
			padding: '0',
			margin: '0',
			width: ($(window).width() - 28 + 'px'),
			top: '20%',
			left: '14px',
			textAlign: 'center',
			color: '#000',
			border: 'none',
			cursor: 'wait',
			radius: '10px',
			'-webkit-border-radius': '10px',
			'-moz-border-radius': '10px'
		}
	});
}

function closeDlg(_pagediv) {
		$.unblockUI();
		return false;
	}
	// <!-- 调用方法 -->  
	/*第一个入参是page的id，  
	第二个入参是弹出框id，  
	第三个入参是弹出框内容*/
	// openDlg('wdldiv', 'dlg2', "申购已结束");  
	// http://192.168.4.63/zdweb/template/mobile/index.html#/gg_opendlg
	//东方样例库-----李妮~~



function CHECK_LOGIN() { //未登录发送跳转登录消息,用于生活缴费和金融理财

		var _zjzh_temp = localStorage.getItem('zjzh');
		// alert("CHECK_LOGIN::"+_zjzh_temp)
		if ('' == _zjzh_temp || null == _zjzh_temp || undefined == _zjzh_temp) {

			var _ix = new IXContent();
			if (_fm_system == 'IOS') {

			} else {
				_ix.Set('loginMode', '0');
			}

			Win_CallTQL('local', 'ToLogin', _ix, '', '', '', '', '', _mob_system, _formid, 'Local', 'PUL');
			return false;
		} else {
			return true;
		}
	}
	//手动获取当前页底部栏目焦点

function Focus_TableBar(a) {
	var _ix = new IXContent();
	_ix.Set('Bar_Index', a); // 底部栏的顺序，获取客户端焦点，0,1,2,3,4  分别表示第一个，第二个，第三个第四个等等。页面跳转不用考虑

	Win_CallTQL('Local', 'Focus_TableBar', _ix, '', '', '', '', '', _mob_system, _formid, 'Local', 'PUL');
}


//安卓专用登录状态下的登陆 送 1 ； 未登录送 0.
function Check_ErrorCode(args) {
	if (args == "99") {
		var _ix = new IXContent();
		if (_fm_system == 'IOS') {

		} else {
			_ix.Set('loginMode', '1');
		}

		Win_CallTQL('local', 'ToLogin', _ix, '', '', '', '', '', _mob_system, _formid, 'Local', 'PUL');
		return false;
	} else {
		return true;
	}
}
var winWidth = 0;
var winHeight = 0;

function findDimensions() //函数：获取尺寸
	{
		// 获取窗口宽度
		if (window.innerWidth)
			winWidth = window.innerWidth;
		else if ((document.body) && (document.body.clientWidth))
			winWidth = document.body.clientWidth;
		// 获取窗口高度
		if (window.innerHeight)
			winHeight = window.innerHeight;
		else if ((document.body) && (document.body.clientHeight))
			winHeight = document.body.clientHeight;

		// 通过深入Document内部对body进行检测，获取窗口大小
		if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
			winHeight = document.documentElement.clientHeight;
			winWidth = document.documentElement.clientWidth;
		}
		var result = [winWidth, winHeight];
		return result;
	}

/*	 Α α
	 Β β
	 Γ γ
	 Δ δ
	 Ε ε
	 Ζ ζ
	 Η η
	 Θ θ
	 Ι ι
	 Κ κ
	 Λ λ
	 Μ μ
	 Ν ν
	 Ξ ξ
	 Ο ο
	 Π π
*/