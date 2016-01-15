/**
 * Created by guoyecheng on 2015/12/20.
 * 注册第一步
 */
var registerObj = {
    sessionMobileNo:"",
    reg001_token:"",
    wait:60,
    waitTime: 60,
    regcust_id:"",
    /** 验证手机号码*/
    sendCode:function(){
        //加载loading
        showloding_box();
        removeKeyB();
        if(validateMobile(document.getElementById("reg_mb_no").value,"reg_msg_div_id")) {
            document.getElementById("reg_msg_div_id").style.display = 'none';
            var reg_mb = document.getElementById("reg_mb_no").value;
            //手机号检查
            var _ix = new IXContent();
            _ix.Set("mobile", reg_mb);
            Win_CallTQL('get_send_mobile_callback', 'validateHSv2', _ix, '', '', '', '', '', '', '', 'TP', 'POST');
        }
    },
    /** 获取手机验证码*/
    getCodeByMobile:function(){
        var reg_mb = document.getElementById("reg_mb_no").value;
        var _ix = new IXContent();
        _ix.Set("mobile", reg_mb);
        Win_CallTQL( 'get_send_code_callback', 'sendSmsv2', _ix, '', '', '', '', '', '', '', 'TP', 'POST');
    },

    /**倒计时*/
    identification_time:function(obj) {
        if (this.wait == 0) {
            obj.removeAttribute("disabled");
            obj.style.background="#ed1c24";
            obj.style.color="white";
            obj.value = "免费获取";
            this.wait = 60;
        } else {
            obj.setAttribute("disabled", true);
            obj.style.background="#eee";
            obj.style.color="#A2A1A1";
            obj.value = this.wait + "秒";
            this.wait--;
            setTimeout(function () {
                registerObj.identification_time(obj)
            },  1000);
        }
    },


    /** 非空校验 */
    validate:function(){
        var mobile = document.getElementById("reg_mb_no").value;
        if(mobile.trim()==''){
            showErrorMsgDiv("请输入手机号","reg_msg_div_id");
            return false;
        }
        var password1 = document.getElementById("password1").value;
        if(password1.trim()==''){
            showErrorMsgDiv("请输入登录密码","reg_msg_div_id");
            return false;
        }
        var password2 = document.getElementById("password2").value;
        if(password2.trim()==''){
            showErrorMsgDiv("请输入确认密码","reg_msg_div_id");
            return false;
        }
        var reg_getCodeId = document.getElementById("reg_code_value_id").value;
        if(reg_getCodeId.trim()==''){
            showErrorMsgDiv("请输入验证码","reg_msg_div_id");
            return false;
        }

        return true;
    },
    /**验证手机号是否是获取验证码的那个手机号*/
    validateMobileOverDue:function(){
        var currentMobileNO=document.getElementById("reg_mb_no").value;
        if(currentMobileNO!=this.sessionMobileNo){
            showErrorMsgDiv("手机号非获取验证码的手机号","reg_msg_div_id");
            return false;
        }
        return true;
    },

    /**验证两次号码是否相同*/
    validatePsdIsSame:function (value){
        var currentPsd="password"+(new Number(value)-1);
        var againPsd="password"+value;
        var password2=document.getElementById(againPsd).value;
        var password1=document.getElementById(currentPsd).value;
        if(password1.trim()==""){
            showErrorMsgDiv("请输入登录密码","reg_msg_div_id");
            return false;
        }
        if(password2.trim()==""){
            showErrorMsgDiv("请输入确认密码","reg_msg_div_id");
            return false;
        }
        if(password1!=password2){
            showErrorMsgDiv("登录密码与确认密码不一致","reg_msg_div_id");
            return false;
        }
        return true;
    },
    /**验证验证码是否正确*/
    validateCode:function(){
        var currentCode=document.getElementById("reg_code_value_id").value;
        if(currentCode.trim()==""){
            showErrorMsgDiv("请输入验证码","reg_msg_div_id");
            return false;
        }
        return true;
    },
    /**密码强度校验*/
    validatePsdStrength:function(){
        var password1=document.getElementById("password1").value;
        if(password1.trim()==""){
            showErrorMsgDiv("请输入登录密码","reg_msg_div_id");
            return false;
        } else {
            //进行密码强度验证
            this.validatePsd(password1);
        }
    },
    /**进行密码强度验证*/
    validatePsd:function(psdValue){
        showLogs("调用验证密码强度接口")
        var _ix = new IXContent();
        _ix.Set("pwd", psdValue);
        _ix.Set("token", "");
        Win_CallTQL( 'validate_send_psd_callback', 'validatePwdv2', _ix, '', '', '', '', '', '', '', 'TP', 'POST');
    },

    /**验证通过后  进行注册用户*/
    reg001_register_user:function (){

        showLogs("调用注册接口");
        var mobile = document.getElementById("reg_mb_no").value;
        var rpwd=document.getElementById("password2").value;
        var pwd=document.getElementById("password1").value;
        var code=document.getElementById("reg_code_value_id").value;
        if(this.reg001_token==null || this.reg001_token==""){
            showLogs("reg001_token   is  null ");
        }else{
            this.reg001_token=this.reg001_token.substring(this.reg001_token.lastIndexOf("=")+1);
            showLogs(this.reg001_token);
        }
        var _ix = new IXContent();
        _ix.Set("mobile", mobile);
        _ix.Set("pwd", pwd);
        _ix.Set("rpwd", rpwd);
        _ix.Set("code", code);
        _ix.Set("token", this.reg001_token);
        showLogs(_ix)
        this.cleanMessage();
        Win_CallTQL( 'get_reg_register_user_callback', 'registv2', _ix, '', '', '', '', '', '', '', 'TP', 'POST');
    },

    cleanMessage:function(){
        document.getElementById("password1").value="";
        document.getElementById("password2").value="";
        document.getElementById("reg_code_value_id").value="";
    },

    /** 注册提交*/
    regist_next_page:function(obj){
        removeKeyB();
        //加载loading
        showloding_box();
        if(this.validate()){
            showLogs("注册第一步提交");
            var id=obj.id;
            var value=id.substring(id.lastIndexOf('-')+1);
            var nextValue=new Number(value)+1;
            var currentPage="page"+value;
            var nextPage="page"+nextValue;
            if(currentPage=="page2"){

				//验证密码格式是否正确
                if(!validatePassword(document.getElementById("password1").value,"reg_msg_div_id")){
                    return false;
                }
                //登录密码和确认密码是否一致
                if(!this.validatePsdIsSame(value)){
                    return false;
                }
				//验证手机号是否是获取验证码的那个手机号
				if(!this.validateMobileOverDue()){
                    return false;
                }
                //验证码是否正确
                if(!this.validateCode()){
                    return false;
                }
                //验证登录密码强度
                this.validatePsdStrength();
            }
        }
    },

    regist_close_page:function(obj){
        //tdxWebLoad('1', '0', '注册', 'GOSY', '', '', '', '1', '', '', '', '0', '', '', '');
        var id=obj.id;
        var value=id.substring(id.lastIndexOf('-')+1);
        var nextValue=new Number(value)+1;
        var currentPage="page"+value;
        var nextPage="page"+nextValue;
        if(currentPage=="page2"){

            var currentPsd="password"+value;
            var againPsd="password"+nextValue;
            var currentMobileNO=document.getElementById("reg_mb_no").value;
            var currentCode=document.getElementById("reg_code_value_id").value;
            //判断密码是否修改
            if(currentMobileNO!=this.sessionMobileNo){
                showErrorMsgDiv("手机号非获取验证码的手机号","reg_msg_div_id");
                return false;
            }
            //验证登录密码
            if(currentPsd=="password1"){
                if(currentPsd.trim()==""){
                    showErrorMsgDiv("请输入登录密码","reg_msg_div_id");
                    return false;
                }else{
                    var password1=document.getElementById(currentPsd).value;
                    validatePsd(password1);
                }
            }
            //判断密码是否一致
            if(againPsd=="password2"){
                var password2=document.getElementById(againPsd).value;
                var password1=document.getElementById(currentPsd).value;
                if(password2.trim()==""){
                    showErrorMsgDiv("请输入确认密码","reg_msg_div_id");
                    return false;
                } else if(password1!=password2){
                    showErrorMsgDiv("登录密码与确认密码不一致","reg_msg_div_id");
                    return false;
                }
            }
            //判断验证码的正确性
            if(currentCode.trim()==""){
                showErrorMsgDiv("请输入验证码","reg_msg_div_id");
                return false;
            }
            if(document.getElementById("reg_msg_id").innerHTML!=""){
                return false;
            }
        }
        var arr=new Array();
        arr.push('page1');
        arr.push('page2');
        arr.push('page3');
        arr.push('page4');
        arr.push('page5');
        for(var i=0;i<5;i++){
            if(currentPage==arr[i]){
                document.getElementById(currentPage).style.display="none";
                document.getElementById(nextPage).style.display="block";
                i=i+1;
            }else{
                document.getElementById(arr[i]).style.display="none";
            }
        }
    },

    init:function(){
        showLogs("初始化")
        _formid = 'reg';
        _mob_system = '';
       // _fm_system = '';
        last_page = "";
        tdxWebLoad('1', '0', '注册', 'GOSY', '', '', '', '1', '', '', '', '0', '', '', '');
        removeKb();
        noselect();
        //页面跳转控制
        var path=location.href;
        //第一个流程
        if(path.indexOf('#')<0){
            document.getElementById("page1").style.display="block"; //首页
            document.getElementById("page2").style.display="none";  //注册账户
            document.getElementById("page3").style.display="none";  //设置身份信息和支付密码
            document.getElementById("page4").style.display="none";  //结果页面
            document.getElementById("page5").style.display="none";  //绑卡
        }else{
            path=path.substring(path.lastIndexOf('#')+1);
        }
        if(path=='page1' || path=='#'){
            document.getElementById("page1").style.display="block";
            document.getElementById("page2").style.display="none";
            document.getElementById("page3").style.display="none";
            document.getElementById("page4").style.display="none";
            document.getElementById("page5").style.display="none";
        }
        if(path=='page2'){
            document.getElementById("page1").style.display="none";
            document.getElementById("page2").style.display="block";
            document.getElementById("page3").style.display="none";
            document.getElementById("page4").style.display="none";
            document.getElementById("page5").style.display="none";
        }
        if(path=='page3'){
            document.getElementById("page1").style.display="none";
            document.getElementById("page2").style.display="none";
            document.getElementById("page3").style.display="block";
            document.getElementById("page4").style.display="none";
            document.getElementById("page5").style.display="none";
        }
        if(path=='page4'){
            document.getElementById("page1").style.display="none";
            document.getElementById("page2").style.display="none";
            document.getElementById("page3").style.display="none";
            document.getElementById("page4").style.display="block";
            document.getElementById("page5").style.display="none";
        }
        if(path=='page5'){
            document.getElementById("page1").style.display="none";
            document.getElementById("page2").style.display="none";
            document.getElementById("page3").style.display="none";
            document.getElementById("page4").style.display="none";
            document.getElementById("page5").style.display="block";
        }
        //第二个流程
        if(path=='zjRegister_step1'){
            document.getElementById("page1").style.display="none"; //首页
            document.getElementById("zjRegister_step1").style.display="block";  //资金账户验证
            document.getElementById("zjRegister_step2").style.display="none";  //注册账户
            document.getElementById("zjRegister_step3").style.display="none";  //身份信息 设置支付密码
            document.getElementById("zjRegister_step4").style.display="none";  //绑卡
            document.getElementById("zjRegister_step5").style.display="none";  //结果页面
        }
        if(path=='zjRegister_step2'){
            document.getElementById("page1").style.display="none";
            document.getElementById("zjRegister_step1").style.display="none";
            document.getElementById("zjRegister_step2").style.display="block";
            document.getElementById("zjRegister_step3").style.display="none";
            document.getElementById("zjRegister_step4").style.display="none";
            document.getElementById("zjRegister_step5").style.display="none";
        }
        if(path=='zjRegister_step3'){
            document.getElementById("page1").style.display="none";
            document.getElementById("zjRegister_step1").style.display="none";
            document.getElementById("zjRegister_step2").style.display="none";
            document.getElementById("zjRegister_step3").style.display="block";
            document.getElementById("zjRegister_step4").style.display="none";
            document.getElementById("zjRegister_step5").style.display="none";
        }
        if(path=='zjRegister_step4'){
            document.getElementById("page1").style.display="none";
            document.getElementById("zjRegister_step1").style.display="none";
            document.getElementById("zjRegister_step2").style.display="none";
            document.getElementById("zjRegister_step3").style.display="none";
            document.getElementById("zjRegister_step4").style.display="block";
            document.getElementById("zjRegister_step5").style.display="none";
        }
        if(path=='zjRegister_step5'){
            document.getElementById("page1").style.display="none";
            document.getElementById("zjRegister_step1").style.display="none";
            document.getElementById("zjRegister_step2").style.display="none";
            document.getElementById("zjRegister_step3").style.display="none";
            document.getElementById("zjRegister_step4").style.display="none";
            document.getElementById("zjRegister_step5").style.display="block";
        }
    },

};


/** 验证手机号码回调*/
var get_send_mobile_callback=function(formid,funcid,flagtype,_json){
    showLogs(_json);
    var json_data = JSON.parse(_json);
    if (json_data.success) {
        var reg_mb_no = document.getElementById("reg_mb_no").value;
        registerObj.sessionMobileNo=reg_mb_no;//全部变量 手机号码
        registerObj.getCodeByMobile();//手机号验证通过后，获取验证码
        //移除loading
        hiddenloding_box();
    } else {
        showErrorMsgDiv(json_data.msg,"reg_msg_div_id");
    }
};

/**获取手机验证码回调*/
var get_send_code_callback=function(formid, funcid, flagtype, _json) {
    showLogs(_json);
    var json_data = JSON.parse(_json);
    if (json_data.success) {
        registerObj.reg001_token=json_data.logon_token;
        var obj=document.getElementById("reg_getCodeId");
        registerObj.identification_time(obj);	//倒计时60
    } else {
        showErrorMsgDiv("验证码发送不成功","reg_msg_div_id");
    }
};

/**密码强度校验 - 回调*/
var validate_send_psd_callback=function(formid,funcid,flagtype,_json){
    showLogs("密码强度校验返回："+_json);
    var json_data = JSON.parse(_json);
    if (json_data.success) {
        registerObj.reg001_register_user();
        //移除loading
        hiddenloding_box();
        //return true;
    } else {
        //showErrorMsgDiv(json_data.msg,"reg_msg_div_id");
		showErrorMsgDiv("密码强度不足，请重新设置","reg_msg_div_id");
        //return false;
    }
};
/**注册第一步提交回调*/
var get_reg_register_user_callback =function(formid,funcid,flagtype,_json){
    showLogs(_json);
    var json_data = JSON.parse(_json);
    if (json_data.success) {
        registerObj.regcust_id=json_data.regcust_id;
        registerObj.reg001_token=json_data.logon_token;
        document.getElementById("page1").style.display="none";
        document.getElementById("page2").style.display="none";
        document.getElementById("page3").style.display="block";
        document.getElementById("page4").style.display="none";
        document.getElementById("page5").style.display="none";

    }else{
        showErrorMsgDiv("注册失败","reg_msg_div_id");
    }
};

/*window.onload = function (){
    registerObj.init();
}*/

/*document.onload=function(){
    registerObj.init();
}*/



