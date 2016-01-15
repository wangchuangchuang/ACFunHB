
/** 是否开启调试模式
  * true 开启
  * false 关闭
*/
var commonDebug = false;
var _formid = 'reg';
var _mob_system = '';
//var _fm_system = '';
var last_page = "";
/**
 * Created by guoyecheng on 2015/12/21.
 */

//body remove 密码键盘
function removeKb(){
    //input标签事件
    var inputs = document.getElementsByTagName("input");
    for(var i = 0; i < inputs.length; i++){
        var inputId = inputs[i].id;
        if(inputId == 'password1' || inputId == 'password2' || inputId == 'password3' || inputId == 'password4'
        ||inputId == 'reg_getCodeId'||inputId == 'register3_bindCard_code'
        ||inputId == 'zjRegister_payPsd'||inputId == 'zjRegister_psw'||inputId == 'zjRegister_psw2'
            ||inputId == 'zjRegister_payPassWord'||inputId == 'zjRegister_payPassWord2'){

        } else {
            inputs[i].onclick = function(){
                removeKeyB();
            }
        }
    }
    //a标签事件
   /* var asss = document.getElementsByTagName("a");
    for(var i = 0; i < asss.length; i++){
        asss[i].onclick = function(){
            var kbDiv = document.getElementById("__w_l_h_v_c_z_e_r_o_divid");
            if(kbDiv != null){
                kbDiv.remove();
            }
        }
    }*/
}

function noselect(){
    document.documentElement.style.webkitTouchCallout = "none"; //禁止弹出菜单
    document.documentElement.style.webkitUserSelect = "none";//禁止选中
}
function removeKeyB(){
    var kbDiv = document.getElementById("__w_l_h_v_c_z_e_r_o_divid");
    if(kbDiv != null){
        kbDiv.remove();
    }
}
function getElementAbsPos(e)
{
    var t = e.offsetTop;
    var l = e.offsetLeft;
    while(e = e.offsetParent)
    {
        t += e.offsetTop;
        l += e.offsetLeft;
    }
    return t;
}

function  showErrorMsgDiv(msg,id){
  /*  document.getElementById(id).style.display='none';
     document.getElementById(id).style.display='block';
     document.getElementById(id).innerHTML=msg;*/
    document.getElementById("MessageBox").style.display="block";
    document.getElementById("MessageMsg").innerHTML=msg;
    hiddenloding_box();
}
function hideErrorMsgDiv(){
    document.getElementById("MessageBox").style.display="none";
    document.getElementById("MessageMsg").innerHTML="";
}

function  cleanErrorMsgDiv(id){
   /* document.getElementById(id).style.display='none';
    document.getElementById(id).innerHTML="";*/
}
function validateMobile(value,id){
    var length = value.length;
    var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
    if(length==11&&mobile.test(value)){
        return true;
    }else{
        showErrorMsgDiv("请正确输入手机号码",id);
        return false;
    }
}

function validateIdCard(value,id){
    var myreg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
    if(value !=''){
        if(!myreg.test(value)){
            showErrorMsgDiv("请输入有效的身份证",id);
            return false;
        }
        return true;
    }else{
        showErrorMsgDiv("请输入有效的身份证",id);
        return false;
    }
}

function validatePassword(value,id){
    var myreg = /^(\d{6})|(\d{7})|(\d{8})$/;
    if(value !=''){
        if(!myreg.test(value)){
            showErrorMsgDiv("请正确输入密码",id);
            return false;
        }
        else return true;
    }else{
        showErrorMsgDiv("请正确输入密码",id);
        return false;
    }
}

function validatePayPassword(value,id){
    var myreg = /^\d{6}$/;
    if(value !=''){
        if(!myreg.test(value)){
            showErrorMsgDiv("请正确输入密码",id);
            return false;
        }
        else return true;
    }else{
        showErrorMsgDiv("请正确输入密码",id);
        return false;
    }
}

function checkBankAccount(value,id){
    var myreg = /^\d{13,19}$/;
    if(value !=''){
        if(!myreg.test(value)){
            showErrorMsgDiv("请正确输入银行卡号",id);
            return false;
        }
        else return true;
    }else{
        showErrorMsgDiv("请正确输入银行卡号",id);
        return false;
    }
}

function showLogs(message){
   if(commonDebug){
       alert(message);
   }
}

function showloding_box(){
    document.getElementById("loding_box").style.display="block";
}
function hiddenloding_box(){
    document.getElementById("loding_box").style.display="none";
}





