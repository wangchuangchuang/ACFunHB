/**
 * Created by guoyecheng on 2015/12/20.
 * 注册第二步
 */

var registerObj2 = {
    paypassword:"",
    flag:"",
    client_id:"",
    id_no:"",
    client_name:"",

    cleanMessage:function(){
        document.getElementById("password3").value="";
        document.getElementById("password4").value="";
    },

	/** 财富账户业务服务风险揭示书查看 弹出浮层 **/
	showDivA:function(){
		showLogs("打开财富账户业务服务风险揭示书");
		document.getElementById("diva1").style.display='block';
		document.getElementById("diva2").style.display='block';
	},
	/** 财富账户业务服务风险揭示书关闭 关闭浮层 **/
	hideDivA:function(){
		showLogs("关闭财富账户业务服务风险揭示书");
		document.getElementById("diva1").style.display='none';
		document.getElementById("diva2").style.display='none';
	},
	
    /**验证两次号码是否相同*/
    validatePsdIsSame:function (value){
        var currentPsd="password"+value;
        var againPsd="password"+(new Number(value)+1);
        var password2=document.getElementById(againPsd).value;
        var password1=document.getElementById(currentPsd).value;
        showLogs(password2+"---"+password1);
        if(password1.trim()==""){
            showErrorMsgDiv("请输入支付密码","reg_msg_div_id2");
            return false;
        }
        if(password2.trim()==""){
            showErrorMsgDiv("请输入确认密码","reg_msg_div_id2");
            return false;
        }
        if(password1!=password2){
            showErrorMsgDiv("支付密码与确认密码不一致","reg_msg_div_id2");
            return false;
        }
        return true;
    },

    //财富账户进行注册用户
    reg002_register_user:function(){
		showLogs("财富账户提交");
		var reg_rm = document.getElementById("Real_name").value;
		var reg_iin = document.getElementById("identity_id_no").value;
		this.paypassword=document.getElementById("password3").value;

        registerObj2.cleanMessage();
		if(registerObj.reg001_token==null || registerObj.reg001_token==""){
			showLogs("reg001_token   is  null ");
		}else{
			registerObj.reg001_token=registerObj.reg001_token.substring(registerObj.reg001_token.lastIndexOf("=")+1);
			showLogs(registerObj.reg001_token);
		}

		var _ix = new IXContent();
		_ix.Set("regcust_id", registerObj.regcust_id);
		_ix.Set("id_no", reg_iin);
		_ix.Set("client_name", reg_rm);
		_ix.Set("token", registerObj.reg001_token);
			this.id_no=reg_iin;
			this.client_name=reg_rm;
			showLogs("开财富账户请求参数："+registerObj.regcust_id+"---"+reg_iin+"--"+reg_rm+"--"+registerObj.reg001_token);
		Win_CallTQL( 'register_regCFv_callback', 'regCFv2', _ix, '', '', '', '', '', '', '', 'TP', 'POST');
	},

    /**密码强度校验*/
    validatePsdStrength:function(){
        var password1=document.getElementById("password3").value;
        if(password1.trim()==""){
            showErrorMsgDiv("请输入支付密码","reg_msg_div_id2");
            return false;
        } else {
            //进行密码强度验证
            this.validatePsd(password1);
        }
    },
    /**进行密码强度验证*/
    validatePsd:function(psdValue){
        showLogs("验证密码强度");
        var _ix = new IXContent();
        _ix.Set("pwd", psdValue);
        _ix.Set("token", "");
        Win_CallTQL( 'register_validate_psd_callback', 'validatePwdv2', _ix, '', '', '', '', '', '', '', 'TP', 'POST');
    },


    regist_next_two_page:function(obj){
        removeKeyB();
        //加载loading
        showloding_box();
        if(document.getElementById("reg2-agreement").checked!=true){
            showErrorMsgDiv("请先同意相关协议","reg_msg_div_id2");
            return;
        }
        showLogs("注册第二部提交");
        var id=obj.id;
        var value=id.substring(id.lastIndexOf('-')+1);
        var currentPage="page"+value;
        if(currentPage=="page3"){
            document.getElementById("reg_msg_div_id").style.display='none';
            //验证手机号是否是获取验证码的那个手机号
			if(!registerObj.validateMobileOverDue()){
                return false;
            }
			//姓名非空验证
			var cusName = document.getElementById("Real_name").value;
			if(cusName.trim()==''){
				showErrorMsgDiv("请输入姓名","reg_msg_div_id2");
				return false;
			}
			//验证身份证格式是否正确
			if(!validateIdCard(document.getElementById("identity_id_no").value,"reg_msg_div_id2")){
                return false;
            }
			//验证支付密码格式是否正确
            if(!validatePayPassword(document.getElementById("password3").value,"reg_msg_div_id2")){
                return false;
            }
            //两次密码是否一致
            if(!this.validatePsdIsSame(value)){
                return false;
            }
            //验证登录密码强度
            if(!this.validatePsdStrength()) {
                return false;
            }
        }
    }
};

var register_regCFv_callback =	 function(formid,funcid,flagtype,_json){
    showLogs("开财富账户返回"+_json);
    var json_data = JSON.parse(_json);
    if (json_data.success) {
        registerObj.reg001_token=json_data.logon_token;
        registerObj2.flag="1";
        registerObj2.client_id=json_data.client_id;
        //设置支付密码
        showLogs("开户成功，设置支付密码");
        if(registerObj.reg001_token==null || registerObj.reg001_token==""){
            showLogs("reg001_token   is  null ");
        }else{
            registerObj.reg001_token=registerObj.reg001_token.substring(registerObj.reg001_token.lastIndexOf("=")+1);
            showLogs(registerObj.reg001_token);
        }
        var _ix = new IXContent();
        _ix.Set("regcust_id", registerObj.regcust_id);
        _ix.Set("pwd", registerObj2.paypassword);
        _ix.Set("rpwd", registerObj2.paypassword);
        _ix.Set("token", registerObj.reg001_token);
        showLogs("设置支付密码"+_ix.retcnt.join(""));
        Win_CallTQL( 'register_setPayPwdv_callback', 'setPayPwdv2', _ix, '', '', '', '', '', '', '', 'TP', 'POST');
    }else{
        showErrorMsgDiv("开财富账户失败","reg_msg_div_id2");
    }
};

/**密码强度校验 - 回调*/
var register_validate_psd_callback=function(formid,funcid,flagtype,_json){
    showLogs("验证密码强度"+_json);
    var json_data = JSON.parse(_json);
    if (json_data.success) {
        //registerObj.reg001_token=json_data.logon_token;
      /*  if(document.getElementById("reg_msg_id").innerHTML!=""){
            showErrorMsgDiv("错误信息框不为空 不可以注册","reg_msg_div_id2");
        }else{*/
        //移除loading
        hiddenloding_box();
        cleanErrorMsgDiv("reg_msg_div_id2");
        if(registerObj2.flag=="1"){
            //设置支付密码
            showLogs("开户成功，设置支付密码");
            if(registerObj.reg001_token==null || registerObj.reg001_token==""){
                showLogs("reg001_token   is  null ");
            }else{
                registerObj.reg001_token=registerObj.reg001_token.substring(registerObj.reg001_token.lastIndexOf("=")+1);
                showLogs(registerObj.reg001_token);
            }
            var _ix = new IXContent();
            _ix.Set("regcust_id", registerObj.regcust_id);
            _ix.Set("pwd", registerObj2.paypassword);
            _ix.Set("rpwd", registerObj2.paypassword);
            _ix.Set("token", registerObj.reg001_token);
            showLogs("设置支付密码"+"--"+registerObj.regcust_id+"--"+registerObj2.paypassword+"--"+registerObj.reg001_token);

            Win_CallTQL( 'register_setPayPwdv_callback', 'setPayPwdv2', _ix, '', '', '', '', '', '', '', 'TP', 'POST');
        }else{
            registerObj2.reg002_register_user();
        }

      //  }
    } else {
        //showErrorMsgDiv(json_data.msg,"reg_msg_div_id2");
		showErrorMsgDiv("密码强度不足，请重新设置","reg_msg_div_id2");
    }
};

/**设置支付密码-回掉*/
var register_setPayPwdv_callback = function(formid,funcid,flagtype,_json){
    showLogs("设置支付密码返回"+_json);
    var json_data = JSON.parse(_json);
    if (json_data.success) {

        bindCard.regist_close_page();
        /*document.getElementById("page1").style.display="none";
        document.getElementById("page2").style.display="none";
        document.getElementById("page3").style.display="none";
        document.getElementById("page4").style.display="block";
        document.getElementById("page5").style.display="none";*/
    } else {
        //showErrorMsgDiv(json_data.msg,"reg_msg_div_id2");
		showErrorMsgDiv("设置支付密码失败","reg_msg_div_id2");
    }
}