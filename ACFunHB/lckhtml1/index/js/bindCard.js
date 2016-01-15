/**
 * Created by guoyecheng on 2015/12/22.
 * 绑卡
 */
var bindCard = {
     bankNo:"",
     reply_id:"",
     request_id:"",
     trans_date:"",
     waitTime: 60,

    /** 协议查看 弹出浮层 **/
    showDivB:function(id1, id2){
        showLogs("打开协议");
        document.getElementById(id1).style.display='block';
        document.getElementById(id2).style.display='block';
    },
    /** 协议关闭 关闭浮层 **/
    hideDivB:function(id1, id2){
        showLogs("关闭协议");
        document.getElementById(id1).style.display='none';
        document.getElementById(id2).style.display='none';
    },

    show_choseBank_box_Div: function (id){
        $("#"+id).show();
    },
     close_choseBank_box_Div: function (id){
        $("#"+id).hide();
    },
    register3_choseBank:function (id){
        $("#choseBank_box").hide();
        this.bankNo=$("#banks_bankNo_"+id).val();
        $("#register3_bankName").html($("#banks_bankName_"+id).val());
        $("#register3_bankName").css("color","#000000");
        //如果是中国银行，显示相应的协议
        if(this.bankNo == '6003'){
            document.getElementById("bocxy").style.display='block';
        } else {
            document.getElementById("bocxy").style.display='none';
        }
    },

    showBanks:function (){

    },
	
    /**发送银行验证码*/
    sendBankCode:function (){
        //加载loading
        showloding_box();
        var mobile =document.getElementById("bindCard_mobile").value;
        var bankAccount = document.getElementById("register3_bankAccount").value;
        showLogs("发送短信："+mobile+"--"+bankAccount);
		//验证是否已选择银行
		if(this.bankNo==""){
            showErrorMsgDiv("请选择银行","reg_msg_div_id3");
            return false;
        }
		//银行卡号非空及格式验证
        if(!checkBankAccount(bankAccount,"reg_msg_div_id3")){
            return false;
        }
		//手机号非空及格式验证
        if(!validateMobile(mobile,"reg_msg_div_id3")){
            return false;
        }
        showLogs("发送银行短信");
        if(registerObj.reg001_token==null || registerObj.reg001_token==""){
            showLogs("reg001_token   is  null ");
        }else{
            registerObj.reg001_token=registerObj.reg001_token.substring(registerObj.reg001_token.lastIndexOf("=")+1);
            showLogs(registerObj.reg001_token);
        }
        var _ix = new IXContent();
        _ix.Set("regcust_id", registerObj.regcust_id);
        _ix.Set("mobile", mobile);
        _ix.Set("bank_no", this.bankNo);
        _ix.Set("bank_account", bankAccount);
        _ix.Set("token", registerObj.reg001_token);
        showLogs("发送银行短信,请求参数"+_ix.retcnt.join(""));
        cleanErrorMsgDiv("reg_msg_div_id3");
        Win_CallTQL( 'register_sendBankCode_callback', 'getBankSmsv2', _ix, '', '', '', '', '', '', '', 'TP', 'POST');

    },

    get_identification_Time:function(obj) {
    if (bindCard.waitTime == 0) {
        obj.removeAttribute("disabled");
        obj.style.background="#ed1c24";
        obj.style.color="white";
        obj.value = "免费获取";
        bindCard.waitTime = 60;
    } else {
        obj.setAttribute("disabled", true);
        obj.style.background="#eee";
        obj.style.color="#A2A1A1";
        obj.value = bindCard.waitTime + "秒";
        bindCard.waitTime--;
        setTimeout(function () {
            bindCard.get_identification_Time(obj)  },  1000)
    }
},

    cleanMessage:function(){
        document.getElementById("bindCard_mobile_code").value="";
    },
    /**提交*/
    submit:function(){
        //加载loading
        showloding_box();
        var mobile =document.getElementById("bindCard_mobile").value;
        var bankAccount = document.getElementById("register3_bankAccount").value;
        var code = document.getElementById("bindCard_mobile_code").value;
        showLogs("开理财户"+"--"+mobile+"--"+bankAccount+"--"+code);
        //验证是否已选择银行
		if(this.bankNo==""){
            showErrorMsgDiv("请选择银行","reg_msg_div_id3");
            return false;
        }
		//银行卡号非空及格式验证
        if(!checkBankAccount(bankAccount,"reg_msg_div_id3")){
            return false;
        }
		//手机号非空及格式验证
        if(!validateMobile(mobile,"reg_msg_div_id3")){
            return false;
        }
		//先同意相关协议
		if(document.getElementById("bindCard_agreement").checked!=true){
            showErrorMsgDiv("请先同意相关协议","reg_msg_div_id3");
            return;
        }
		//验证码非空验证
		var bindcard_getCodeId = document.getElementById("bindCard_mobile_code").value;
        if(bindcard_getCodeId.trim()==''){
            showErrorMsgDiv("请输入验证码","reg_msg_div_id3");
            return false;
        }
		
        if(registerObj.reg001_token==null || registerObj.reg001_token==""){
            showLogs("reg001_token   is  null ");
        }else{
            registerObj.reg001_token=registerObj.reg001_token.substring(registerObj.reg001_token.lastIndexOf("=")+1);
            showLogs(registerObj.reg001_token);
        }

        this.cleanMessage();
        var _ix = new IXContent();
        _ix.Set("client_id", registerObj2.client_id);
        _ix.Set("bank_no", bindCard.bankNo);
        _ix.Set("bank_acc", bankAccount);
        _ix.Set("mobile", mobile);
        _ix.Set("code", code);
        _ix.Set("reqId", bindCard.request_id);
        _ix.Set("repId", bindCard.reply_id);
        _ix.Set("td", bindCard.trans_date);
        _ix.Set("token", registerObj.reg001_token);
        showLogs("开理财户请求参数"+_ix.retcnt.join(""));
        cleanErrorMsgDiv("reg_msg_div_id3");
        Win_CallTQL( 'register_bindCard_callback', 'regLCv2', _ix, '', '', '', '', '', '', '', 'TP', 'POST');

    },

    regist_close_page:function(obj){
       /* var id=obj.id;
        var value=id.substring(id.lastIndexOf('-')+1);
        var nextValue=new Number(value)+1;
        var currentPage="page"+value;
        var nextPage="page"+nextValue;*/

        document.getElementById("bindCard_clentName").innerHTML=registerObj2.client_name.substring(0,1)+"**";
        document.getElementById("bindCard_idNo").innerHTML=registerObj2.id_no.substring(0,3)+"****"+registerObj2.id_no.substring(registerObj2.id_no.length-4,registerObj2.id_no.length);

        //获取银行列表
        showLogs("获取银行列表");
        if(registerObj.reg001_token==null || registerObj.reg001_token==""){
            showLogs("reg001_token   is  null ");
        }else{
            registerObj.reg001_token=registerObj.reg001_token.substring(registerObj.reg001_token.lastIndexOf("=")+1);
            showLogs(registerObj.reg001_token);
        }
        var _ix = new IXContent();
        _ix.Set("token", registerObj.reg001_token);
        Win_CallTQL( 'register_getBankList_callback', 'getBanksInfov2', _ix, '', '', '', '', '', '', '', 'TP', 'POST');

        document.getElementById("page1").style.display="none";
        document.getElementById("page2").style.display="none";
        document.getElementById("page3").style.display="none";
        document.getElementById("page4").style.display="none";
        document.getElementById("page5").style.display="block";
       /* var arr=new Array();
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
        }*/
    }


};


/**获取银行列表回调*/
var register_getBankList_callback = function (formid,funcid,flagtype,_json){
    showLogs("获取银行列表"+_json);
    var json_data = JSON.parse(_json);
    if (json_data.success) {
        //registerObj.reg001_token =json_data.logon_token;
        var objects = json_data.data;
        var html = "";
        for(var x in objects){
            var detal =  objects[x];
            var detals = detal.split(",");
            /*html += '<section style="border: rgb(221,221,221) 1px solid;padding:12px;" onclick="bindCard.register3_choseBank(\''+x+'\')">'+
                '<input type="hidden" id="banks_bankNo_'+x+'" value="'+x+'">'+
                '<input type="hidden" id="banks_bankName_'+x+'" value="'+detals[0]+'">'+
                '<div class="ui-grid-b">'+
                '<div class="ui-block-a">'+
                '<img src="img/'+detals[3]+'">'+
                '</div>'+
                '<div class="ui-block-b" style="width: 60%; font-size:14px;font-family:\'微软雅黑\'">'+
                detals[0]+
                '</div>'+
                '<div class="ui-block-c" style="width: 20%">'+
                '</div>'+
                '</div>'+
                '</section>';*/
			var dfxe = detals[1]/10000;
			var drlj = detals[2]/10000;
			html += '<dl class="banklogo" onclick="bindCard.register3_choseBank(\''+x+'\')">'+
					'<input type="hidden" id="banks_bankNo_'+x+'" value="'+x+'">'+
                	'<input type="hidden" id="banks_bankName_'+x+'" value="'+detals[0]+'">'+
					'<img src="img/'+detals[3]+'">'+
					'<dd>'+detals[0]+'</dd>'+
					'<dt>单笔限额：'+dfxe+'万元 &nbsp; 单日累计：'+drlj+'万元 </dt>'+
					'</dl>';
        }

        document.getElementById("bindCard_bankList").innerHTML=html;
    }
};

var register_sendBankCode_callback = function(formid,funcid,flagtype,_json){
    showLogs("发送短信验证码返回"+_json);
    var json_data = JSON.parse(_json);
    if (json_data.success) {
        //移除loading
        hiddenloding_box();
        registerObj.reg001_token =json_data.logon_token;
        bindCard.reply_id=json_data.reply_id;
        bindCard.request_id=json_data.request_id;
        bindCard.trans_date=json_data.trans_date;
        var obj=document.getElementById("register3_bindCard_code");
        bindCard.get_identification_Time(obj);
    }else{
        showErrorMsgDiv("发送失败","reg_msg_div_id3");
    }
};

var register_bindCard_callback = function(formid,funcid,flagtype,_json){
    showLogs("开理财户返回"+_json);
    var json_data = JSON.parse(_json);
    if (json_data.success) {
        //移除loading
        hiddenloding_box();
        registerObj.reg001_token =json_data.logon_token;
        document.getElementById("page1").style.display="none";
        document.getElementById("page2").style.display="none";
        document.getElementById("page3").style.display="none";
        document.getElementById("page4").style.display="block";
        document.getElementById("page5").style.display="none";
        //TZIndex();
    }else{
        showErrorMsgDiv("绑卡失败","reg_msg_div_id3");
    }

}