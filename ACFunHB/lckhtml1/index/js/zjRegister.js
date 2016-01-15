/**
 * Created by guoyecheng on 2016/1/4.
 * 资金账户注册
 */
var zjRegister={
    wait:60,
   /** 获取账号信息*/
    cif_acc:"",

    zjRegister_payPsw:"",
    /**资金账户开通财富账户*/
    zjzh:"",
    pwd:"",
    mobile:"",

    /** 注册帐号开通财富帐号*/
    regcust_id:"",
    token:"",

    zjRegister_idNo:"",
    zjRegister_clentName:"",

    /** 绑卡*/
    bankNo:"",
    bankNo:"",
    reply_id:"",
    request_id:"",
    trans_date:"",
    trade_account:"",

    waitTime: 60,


    showPage:function(){
        document.getElementById("page1").style.display="none";
        document.getElementById("zjRegister_step1").style.display="block";
    },
    showPage2:function(){
        document.getElementById("page1").style.display="none";
        document.getElementById("zjRegister_step1").style.display="none";
        document.getElementById("zjRegister_step2").style.display="block";
    },
    showPage3:function(){
        document.getElementById("page1").style.display="none";
        document.getElementById("zjRegister_step1").style.display="none";
        document.getElementById("zjRegister_step2").style.display="none";
        document.getElementById("zjRegister_step3").style.display="block";
        //获取账号信息
        var _ix = new IXContent();
        _ix.Set("regcust_id", this.regcust_id);
        _ix.Set("token", this.token);
        showLogs("获取身份信息"+_ix.retcnt.join(""));
        Win_CallTQL( 'zjRegister_getUsrIdv2_acc_callback', 'getUsrIdv2', _ix, '', '', '', '', '', '', '', 'TP', 'POST');
    },

    showPage4:function(){
        //获取银行信息
        showloding_box();
        showLogs("获取银行列表");
        if(zjRegister.token==null || zjRegister.token==""){
            showLogs("reg001_token   is  null ");
        }else{
            zjRegister.token=zjRegister.token.substring(zjRegister.token.lastIndexOf("=")+1);
            showLogs(zjRegister.token);
        }
        var _ix = new IXContent();
        _ix.Set("token", zjRegister.token);
        Win_CallTQL( 'zjRegister_getBankList_callback', 'getBanksInfov2', _ix, '', '', '', '', '', '', '', 'TP', 'POST');

    },

    /**
     * 第一步
     */
    step1:function(){
        showloding_box();
        var zjzhValue = document.getElementById("zjRegister_zjzh").value;
        var payPsw = document.getElementById("zjRegister_payPsd").value;
        if(zjzhValue==undefined||zjzhValue.trim()==""){
            showErrorMsgDiv("资金账号不能为空");
            return ;
        }
        if(!validatePayPassword(payPsw,"")){
            return ;
        }

        this.zjzh=zjzhValue;
        this.zjRegister_payPsw=payPsw;
        document.getElementById("zjRegister_zjzh").value="";
        document.getElementById("zjRegister_payPsd").value="";

        var _ix = new IXContent();
        _ix.Set("zjzh", this.zjzh);
        _ix.Set("pwd", this.zjRegister_payPsw);
        showLogs("验证资金帐号"+_ix.retcnt.join(""));
        Win_CallTQL( 'zjRegister_validateZjzhv2_callback', 'validateZjzhv2', _ix, '', '', '', '', '', '', '', 'TP', 'POST');


    },

    /**
     * 第二步
     */
    step2:function(){
        showloding_box();
        showLogs("调用注册接口");
        var mobile = document.getElementById("zjRegister_mobile").value;
        var psw = document.getElementById("zjRegister_psw").value;
        var psw2 = document.getElementById("zjRegister_pswd2").value;
        var code = document.getElementById("zjRegister_code").value;

        if(mobile!=this.mobile){
            showErrorMsgDiv("发送验证码的手机号和填写的手机号不一致");
            return;
        }
        if(validateMobile(mobile,"")){
            return;
        }
        if(validatePassword(psw,"")){
            return ;
        }
        if(psw!=psw2){
            showErrorMsgDiv("两次密码输入不一致");
            return;
        }
        //验证密码强度
        this.validatePsd(psw);
    },
    /**
     * 第三步
     */
    step3:function(){
        showloding_box();
        var zjRegister_payPassWord = document.getElementById("zjRegister_payPassWord").value;
        var zjRegister_payPassWord2= document.getElementById("zjRegister_payPassWord").value;

        if(this.token==null || this.token==""){
            showLogs("reg001_token   is  null ");
        }else{
            this.token=this.token.substring(this.token.lastIndexOf("=")+1);
            showLogs(this.token);
        }
        var _ix = new IXContent();
        _ix.Set("regcust_id", this.regcust_id);
        _ix.Set("pwd", zjRegister_payPassWord);
        _ix.Set("rpwd", zjRegister_payPassWord2);
        _ix.Set("token", this.token);
        this.pwd=zjRegister_payPassWord;
        showLogs("设置支付密码"+_ix.retcnt.join(""));
        Win_CallTQL( 'zjRegister_setPayPwdv_callback', 'setPayPwdv2', _ix, '', '', '', '', '', '', '', 'TP', 'POST');

    },
    /**
     * 第四步
     */
    step4:function (){
        showloding_box();
        var mobile =document.getElementById("zjRegister_mobile").value;
        var bankAccount = document.getElementById("zjRegister_bankAccount").value;
        var code = document.getElementById("zjRegister_mobile_code").value;
        showLogs("开理财户"+"--"+mobile+"--"+bankAccount+"--"+code);
        //验证是否已选择银行
        if(this.bankNo==""){
            showErrorMsgDiv("请选择银行","");
            return false;
        }
        //银行卡号非空及格式验证
        if(!checkBankAccount(bankAccount,"")){
            return false;
        }
        //手机号非空及格式验证
        if(!validateMobile(mobile,"")){
            return false;
        }
        //先同意相关协议
        if(document.getElementById("zjRegister_agreement").checked!=true){
            showErrorMsgDiv("请先同意相关协议","");
            return;
        }
        //验证码非空验证
        if(code==undefined||code.trim()==''){
            showErrorMsgDiv("请输入验证码","");
            return false;
        }

        if(this.token==null || this.token==""){
            showLogs("token   is  null ");
        }else{
            this.token=this.token.substring(this.token.lastIndexOf("=")+1);
            showLogs(this.token);
        }

        var _ix = new IXContent();
        _ix.Set("trade_account", zjRegister.trade_account);
        _ix.Set("bank_no", zjRegister.bankNo);
        _ix.Set("bank_acc", bankAccount);
        _ix.Set("mobile", mobile);
        _ix.Set("code", code);
        _ix.Set("name", zjRegister.zjRegister_clentName);
        _ix.Set("id", zjRegister.zjRegister_idNo);
        _ix.Set("pwd", zjRegister.trans_date);
        _ix.Set("pwd",zjRegister.pwd);
        _ix.Set("rpwd",zjRegister.pwd);
        _ix.Set("token", zjRegister.token);
        showLogs("开理财户请求参数"+_ix.retcnt.join(""));
        cleanErrorMsgDiv("reg_msg_div_id3");
        Win_CallTQL( 'zjRegister_regAccv2_callback', 'regAccv2', _ix, '', '', '', '', '', '', '', 'TP', 'POST');


    },

    subRegistv2:function(){
        var psw = document.getElementById("zjRegister_psw").value;
        var psw2 = document.getElementById("zjRegister_pswd2").value;
        var code = document.getElementById("zjRegister_code").value;

        if(this.token==null || this.token==""){
            showLogs("token   is  null ");
        }else{
            this.token=this.token.substring(this.token.lastIndexOf("=")+1);
            showLogs(this.token);
        }
        var _ix = new IXContent();
        _ix.Set("mobile", this.mobile);
        _ix.Set("pwd", psw);
        _ix.Set("rpwd", psw2);
        _ix.Set("code", code);
        _ix.Set("token", this.token);
        showLogs("调用注册接口"+_ix.join(""));
        Win_CallTQL( 'zjRegister_registv2_callback', 'registv2', _ix, '', '', '', '', '', '', '', 'TP', 'POST');
    },

    /**
     * 验证密码强度
     * @param psdValue
     */
    validatePsd:function(psdValue){
        showLogs("调用验证密码强度接口")

        if(this.token==null || this.token==""){
            showLogs("reg001_token   is  null ");
        }else{
            this.token=this.token.substring(this.token.lastIndexOf("=")+1);
            showLogs(this.token);
        }

        var _ix = new IXContent();
        _ix.Set("pwd", psdValue);
        _ix.Set("token", this.token);
        showLogs("验证密码强度"+_ix.join(""));
        Win_CallTQL( 'zjRegister_validatePwdv2_callback', 'validatePwdv2', _ix, '', '', '', '', '', '', '', 'TP', 'POST');
    },


    /** 获取手机验证码*/
    getCodeByMobile:function(){
        showloding_box();
        var zjRegister_mobile = document.getElementById("zjRegister_mobile").value
        if(validateMobile(zjRegister_mobile,"")){
            return;
        }
        var _ix = new IXContent();
        _ix.Set("mobile", zjRegister_mobile);
        showLogs("检查手机号是否可用"+_ix.join(""));
        Win_CallTQL('zjRegister_validateHSv2_callback', 'validateHSv2', _ix, '', '', '', '', '', '', '', 'TP', 'POST');
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
                zjRegister.identification_time(obj)
            },  1000);
        }
    },

    choseBank:function (id){
        $("#zjRegister_choseBank_box").hide();
        this.bankNo=$("#zjRegister_banks_bankNo_"+id).val();
        $("#zjRegister_bankName").html($("#banks_bankName_"+id).val());
        $("#zjRegister_bankName").css("color","#000000");
    },

    /**发送银行验证码*/
    sendBankCode:function (){
        showloding_box();
        var mobile =document.getElementById("zjRegister_mobile").value;
        var bankAccount = document.getElementById("zjRegister_bankAccount").value;
        showLogs("发送短信："+mobile+"--"+bankAccount);
        //验证是否已选择银行
        if(this.bankNo==""){
            showErrorMsgDiv("请选择银行","");
            return false;
        }
        //银行卡号非空及格式验证
        if(!checkBankAccount(bankAccount,"")){
            return false;
        }
        //手机号非空及格式验证
        if(!validateMobile(mobile,"")){
            return false;
        }
        showLogs("发送银行短信");
        if(this.token==null || this.token==""){
            showLogs("reg001_token   is  null ");
        }else{
            this.token=this.token.substring(this.token.lastIndexOf("=")+1);
            showLogs(this.token);
        }
        var _ix = new IXContent();
        _ix.Set("regcust_id", this.regcust_id);
        _ix.Set("mobile", mobile);
        _ix.Set("bank_no", this.bankNo);
        _ix.Set("bank_account", bankAccount);
        _ix.Set("name", this.bankNo);
        _ix.Set("id", this.bankNo);
        _ix.Set("token", this.token);
        showLogs("发送银行短信,请求参数"+_ix.retcnt.join(""));
        Win_CallTQL( 'zjRegister_sendBankCode_callback', 'htfBankSmsv2', _ix, '', '', '', '', '', '', '', 'TP', 'POST');
    },

    get_identification_Time:function(obj) {
        if (zjRegister.waitTime == 0) {
            obj.removeAttribute("disabled");
            obj.style.background="#ed1c24";
            obj.style.color="white";
            obj.value = "免费获取";
            zjRegister.waitTime = 60;
        } else {
            obj.setAttribute("disabled", true);
            obj.style.background="#eee";
            obj.style.color="#A2A1A1";
            obj.value = zjRegister.waitTime + "秒";
            zjRegister.waitTime--;
            setTimeout(function () {
                zjRegister.get_identification_Time(obj)  },  1000)
        }
    },

};

/**
 * 验证资金账号回调
 */
var zjRegister_validateZjzhv2_callback = function (formid,funcid,flagtype,_json){
    showLogs("获取银行列表"+_json);
    var json_data = JSON.parse(_json);
    if (json_data.success) {
        zjRegister.token=json_data.logon_token;
        zjRegister.showPage2();

    }else{
        showErrorMsgDiv(json_data.msg,"");
    }
};
/**
 *
 * @param formid
 * @param funcid
 * @param flagtype
 * @param _json
 */
var zjRegister_sendSmsv2_callback =  function (formid,funcid,flagtype,_json){
    showLogs("获取手机验证码"+_json);
    var json_data = JSON.parse(_json);
    if (json_data.success) {
        registerObj.reg001_token=json_data.logon_token;
        var obj=document.getElementById("zjRegister_code_btn");
        zjRegister.identification_time(obj);	//倒计时60
        hiddenloding_box();
    } else {
        showErrorMsgDiv("验证码发送不成功","");
    }
};

/**
 *注册回调接口
 * @param formid
 * @param funcid
 * @param flagtype
 * @param _json
 */
var zjRegister_registv2_callback =function(formid,funcid,flagtype,_json){
    showLogs(_json);
    var json_data = JSON.parse(_json);
    if (json_data.success) {
        zjRegister.regcust_id=json_data.regcust_id;
        zjRegister.token=json_data.logon_token;
        //资金账号升级
        showLogs("调用注册帐号开通财富帐号接口")
        if(zjRegister.token==null || zjRegister.token==""){
            showLogs("reg001_token   is  null ");
        }else{
            zjRegister.token=zjRegister.token.substring(zjRegister.token.lastIndexOf("=")+1);
            showLogs(zjRegister.token);
        }
        var _ix = new IXContent();
        _ix.Set("zjzh", zjRegister.zjzh);
        _ix.Set("pwd", zjRegister.zjRegister_payPsw);
        _ix.Set("regcust_id",zjRegister.regcust_id);
        _ix.Set("token",zjRegister.token);
        showLogs("注册帐号开通财富帐号"+_ix.join(""));
        Win_CallTQL( 'zjRegister_RaiseRegv2_callback', 'RaiseRegv2', _ix, '', '', '', '', '', '', '', 'TP', 'POST');
    }else{
        showErrorMsgDiv("注册失败","");
    }
};

/**
 * 获取账号信息回调
 * @param formid
 * @param funcid
 * @param flagtype
 * @param _json
 */
var zjRegister_getUsrIdv2_acc_callback = function(formid,funcid,flagtype,_json){
    showLogs("获取身份信息"+_json);
    var json_data = JSON.parse(_json);
    if (json_data.success) {
        zjRegister.token=json_data.logon_token;
        document.getElementById("zjRegister_clentName").innerHTML=json_data.client_name;
        document.getElementById("zjRegister_idNo").innerHTML=json_data.id_no;
        zjRegister.zjRegister_idNo=json_data.id_no;
        zjRegister.zjRegister_clentName=json_data.client_name;

        document.getElementById("page1").style.display="none";
        document.getElementById("zjRegister_step1").style.display="none";
        document.getElementById("zjRegister_step2").style.display="none";
        document.getElementById("zjRegister_step3").style.display="block";
    }else{
        showErrorMsgDiv(json_data.msg,"");
    }
};

/**设置支付密码-回掉*/
var zjRegister_setPayPwdv_callback = function(formid,funcid,flagtype,_json){
    showLogs("设置支付密码返回"+_json);
    var json_data = JSON.parse(_json);
    if (json_data.success) {
        hiddenloding_box();
        zjRegister.token=json_data.logon_token;
        zjRegister.showPage4();
    } else {
        showErrorMsgDiv("设置支付密码失败","reg_msg_div_id2");
    }
}

/** 验证手机号码回调*/
var zjRegister_validateHSv2_callback=function(formid,funcid,flagtype,_json){
    showLogs(_json);
    var json_data = JSON.parse(_json);
    if (json_data.success) {
        this.mobile=document.getElementById("zjRegister_mobile").value;
        var _ix = new IXContent();
        _ix.Set("mobile", this.mobile);
        showLogs("发送验证码"+_ix.join(""));
        Win_CallTQL( 'zjRegister_sendSmsv2_callback', 'sendSmsv2', _ix, '', '', '', '', '', '', '', 'TP', 'POST');

    } else {
        showErrorMsgDiv(json_data.msg,"");
    }
};

/**密码强度校验 - 回调*/
var zjRegister_validatePwdv2_callback=function(formid,funcid,flagtype,_json){
    showLogs("密码强度校验返回："+_json);
    var json_data = JSON.parse(_json);
    if (json_data.success) {
         zjRegister.subRegistv2();
    } else {
        showErrorMsgDiv("密码强度不足，请重新设置","reg_msg_div_id");
    }
};

/**
 *注册帐号开通财富帐号
 * @param formid
 * @param funcid
 * @param flagtype
 * @param _json
 */
var zjRegister_RaiseRegv2_callback = function(formid,funcid,flagtype,_json){
    showLogs("注册帐号开通财富帐号返回："+_json);
    var json_data = JSON.parse(_json);
    if (json_data.success) {
        hiddenloding_box();
        zjRegister.showPage3();
    } else {
        showErrorMsgDiv(json_data.msg,"");
    }
};

/**获取银行列表回调*/
var zjRegister_getBankList_callback = function (formid,funcid,flagtype,_json){
    showLogs("获取银行列表"+_json);
    hiddenloding_box();
    var json_data = JSON.parse(_json);
    if (json_data.success) {
       // zjRegister.token =json_data.logon_token;
        var objects = json_data.data;
        var html = "";
        for(var x in objects){
            var detal =  objects[x];
            var detals = detal.split(",");
            var dfxe = detals[1]/10000;
            var drlj = detals[2]/10000;
            html += '<dl class="banklogo" onclick="zjRegister.choseBank(\''+x+'\')">'+
                '<input type="hidden" id="zjRegister_banks_bankNo_'+x+'" value="'+x+'">'+
                '<input type="hidden" id="zjRegister_banks_bankName_'+x+'" value="'+detals[0]+'">'+
                '<img src="img/'+detals[3]+'">'+
                '<dd>'+detals[0]+'</dd>'+
                '<dt>单笔限额：'+dfxe+'万元 &nbsp; 单日累计：'+drlj+'万元 </dt>'+
                '</dl>';
        }
        document.getElementById("zjRegister_bankList").innerHTML=html;
    }
};


var zjRegister_sendBankCode_callback = function(formid,funcid,flagtype,_json){
    showLogs("发送短信验证码返回"+_json);
    var json_data = JSON.parse(_json);
    if (json_data.success) {
        hiddenloding_box();
        zjRegister.token =json_data.logon_token;
        /*zjRegister.reply_id=json_data.reply_id;
        zjRegister.request_id=json_data.request_id;
        zjRegister.trans_date=json_data.trans_date;*/
        zjRegister.trade_account = json_data.trade_account;
        var obj=document.getElementById("zjRegister_bindCard_code_btn");
        zjRegister.get_identification_Time(obj);
    }else{
        showErrorMsgDiv("发送失败","reg_msg_div_id3");
    }
};

var zjRegister_regAccv2_callback =  function(formid,funcid,flagtype,_json){
    showLogs("发送短信验证码返回"+_json);
    var json_data = JSON.parse(_json);
    if (json_data.success) {
        hiddenloding_box();
        zjRegister.token =json_data.logon_token;
        document.getElementById("zjRegister_step1").style.display="none";
        document.getElementById("zjRegister_step2").style.display="none";
        document.getElementById("zjRegister_step3").style.display="none";
        document.getElementById("zjRegister_step5").style.display="block";
    }else{
        showErrorMsgDiv("发送失败","reg_msg_div_id3");
    }
};