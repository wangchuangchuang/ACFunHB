	
	var _formid = 'reg_usr';
	var _mob_system = '';
	
	var wait = 60;
	var waitTime = 60;		
	function identification_time(obj) {
		if (wait == 0) {  
		   obj.removeAttribute("disabled");  
		   obj.value = "免费获取";  
			wait = 60;  
		} else {
			obj.setAttribute("disabled", true); 
			obj.value = wait + "秒后,重新获取";  
			wait--;  
			setTimeout(function () {  
				identification_time(obj)  
			},  1000)  
		 }  
	   } 
	   
	   
	   function get_identification_Time(obj) {
			  if (waitTime == 0) {  
				obj.removeAttribute("disabled");  
				obj.value = "免费获取";  
				 waitTime = 60;  
			  } else {
				  obj.setAttribute("disabled", true); 
				  obj.value = waitTime + "秒后,重新获取";  
				   waitTime--;  
				  setTimeout(function () {  
				  get_identification_Time(obj)  },  1000)  
				   }  
		  }
	function  showErrorMsgDiv(msg){
		document.getElementById("reg_msg_div_id").style.display='none';
		document.getElementById("reg_msg_div_id").style.display='block';	
		document.getElementById("reg_msg_id").innerHTML=msg;	
	}
	
	//获取验证码时，验证手机号			   
	function mobile_sendSms( obj ){
		document.getElementById("reg_msg_div_id").style.display='none';
		var reg_mb = document.getElementById("reg_mb_no").value;
		//手机号检查
		var _ix = new IXContent();
		_ix.Set("mobile", reg_mb);
		Win_CallTQL( 'get_send_mobile_callback', 'validateHSv2', _ix, '', '', '', '', '', '', '', 'TP', 'POST');
	}
	
	//手机号验证通过后，获取验证码
	function getCodeByMobile(){
		var reg_mb = document.getElementById("reg_mb_no").value;
		var _ix = new IXContent();
		_ix.Set("mobile", reg_mb);
		Win_CallTQL( 'get_send_code_callback', 'sendSmsv2', _ix, '', '', '', '', '', '', '', 'TP', 'POST');
		}
		
	//获取验证码时，验证手机号 - 回调
	var  sessionMobileNo;
	var  get_send_mobile_callback = function(formid,funcid,flagtype,_json){
			var json_data = JSON.parse(_json);
			if (json_data.success) {
				var reg_mb_no = document.getElementById("reg_mb_no").value;
				sessionMobileNo=reg_mb_no;//全部变量 手机号码
				alert(sessionMobileNo);
				getCodeByMobile();//手机号验证通过后，获取验证码
			} else {
				 showErrorMsgDiv(json_data.msg);
			}		 		 
		 }
	//手机号验证通过后，获取验证码 - 回调
	var reg001_token;//动态令牌
	var get_send_code_callback = function(formid, funcid, flagtype, _json) {
		var json_data = JSON.parse(_json);
		if (json_data.success) {
			reg001_token=json_data.logon_token;
			alert(json_data);
			alert(reg001_token);
			var obj=document.getElementById("reg_getCodeId");
			identification_time(obj);	//倒计时60
			alert("验证码发送成功");
		} else {
			showErrorMsgDiv("验证码发送不成功");	
		}
	}
	
	//第二页的   点击下一步
	function regist_next_page(obj){
		var mobile = document.getElementById("reg_mb_no").value;
        if(mobile.trim()==''){
			showErrorMsgDiv("手机号码不能为空");
			return false;
		}
		var password1 = document.getElementById("password1").value;
		if(password1.trim()==''){
			showErrorMsgDiv("密码不能为空");
			return false;
		}
		var password2 = document.getElementById("password2").value;
		if(password2.trim()==''){
			showErrorMsgDiv("密码不能为空");
			return false;
		}
		var reg_getCodeId = document.getElementById("reg_getCodeId").value;
		if(reg_getCodeId.trim()==''){
			showErrorMsgDiv("验证码不能为空");
			return false;
		}
		var id=obj.id;
		var value=id.substring(id.lastIndexOf('-')+1);
		var nextValue=new Number(value)+1;
		var currentPage="page"+value;
		var nextPage="page"+nextValue;
		if(currentPage=="page2"){
			document.getElementById("reg_msg_div_id").style.display='none';
			document.getElementById("reg_msg_id").innerHTML="";
			if(!validateMobileOverDue()){
				return false;
			}
			//两次密码是否一致
			if(!validatePsdIsSame(value)){
				return false;
				}
		    //验证码是否正确
		    if(! validateCode()){
				return false;
				}
		  	//验证登陆密码强度
			validatePsdStrength();
		   //控制是否有错误信息
	
			
	  	}
	}
	
	//验证手机号是否是获取验证码的那个手机号
	function  validateMobileOverDue(){
		var currentMobileNO=document.getElementById("reg_mb_no").value;
		    alert(currentMobileNO);
			alert(sessionMobileNo);
			if(currentMobileNO!=sessionMobileNo){
				showErrorMsgDiv("手机号码非验证码获取的号码");
				return false;
			}	
			return true;
		}
	
	//验证两次号码是否相同
	function validatePsdIsSame(value){
			var currentPsd="password"+(new Number(value)-1);
			var againPsd="password"+value;
			alert(currentPsd);
			alert(againPsd);
			var password2=document.getElementById(againPsd).value;	
			var password1=document.getElementById(currentPsd).value;
		   if(password1==""){
				showErrorMsgDiv("登陆密码不可以为空");
				return false;
			}
			if(password2==""){
				showErrorMsgDiv("确认密码不可以为空");
				return false;
			}
		
		   if(password1!=password2){
				alert('4444444');
				showErrorMsgDiv("登陆密码与确认密码不一致");
				return false;
			 } 
	     return true;
		}
		

	//验证验证码是否正确
	function 	validateCode(){
	 var currentCode=document.getElementById("reg_code_value_id").value;
	  if(currentCode==""){
				alert('55555555');
		   		showErrorMsgDiv("验证码不可以为空");
		   		return false;	
		   }
		   return true;	
		}
	
	//密码强度校验

	function  validatePsdStrength(){
		     var password1=document.getElementById("password1").value;
				alert('22222222');
		 		if(password1==""){
					showErrorMsgDiv("登陆密码不可以为空");
					return false;
				} else {
					//进行密码强度验证
					validatePsd(password1);
				}
		}
	//进行密码强度验证
	function validatePsd(psdValue){
		var _ix = new IXContent();
		_ix.Set("pwd", psdValue);	
		 _ix.Set("token", "");	
		Win_CallTQL( 'validate_send_psd_callback', 'validatePwdv2', _ix, '', '', '', '', '', '', '', 'TP', 'POST');		
	}
	
	//密码强度校验 - 回调
	var validate_send_psd_callback=function(formid,funcid,flagtype,_json){
		alert('psd');
		var json_data = JSON.parse(_json);
		if (json_data.success) {
			alert('psd  ok');
			 alert(document.getElementById("reg_msg_id").innerHTML);
		    if(document.getElementById("reg_msg_id").innerHTML!=""){
				showErrorMsgDiv("错误信息框不为空 不可以注册");
		     }else{
			     reg001_register_user();
				 }
			//return true;	
		} else {
			showErrorMsgDiv(json_data.msg);
			//return false;
		} 	
	}
	
	//验证通过后  进行注册用户	
	function reg001_register_user(){
		alert('777777');
		var mobile = document.getElementById("reg_mb_no").value;
		var rpwd=document.getElementById("password2").value;	
		var pwd=document.getElementById("password1").value;
		var code=document.getElementById("reg_code_value_id").value;
		if(reg001_token==null || reg001_token==""){
			alert("reg001_token   is  null ");
			}else{
			reg001_token=reg001_token.substring(reg001_token.lastIndexOf("=")+1);	
			alert(reg001_token);
				}
		var _ix = new IXContent();
		_ix.Set("mobile", mobile);
		_ix.Set("pwd", pwd);
		_ix.Set("rpwd", rpwd);
		_ix.Set("code", code);
		_ix.Set("token", reg001_token);
		alert(_ix)
		Win_CallTQL( 'get_reg_register_user_callback', 'registv2', _ix, '', '', '', '', '', '', '', 'TP', 'POST');
		}	
		
		
  var get_reg_register_user_callback =function(formid,funcid,flagtype,_json){
	  alert('88888');
	var json_data = JSON.parse(_json);
	alert(json_data);
	if (json_data.success) {
		alert('success');
		document.getElementById("page1").style.display="none";	
		document.getElementById("page2").style.display="none";
		document.getElementById("page3").style.display="block";		
		document.getElementById("page4").style.display="none";	
		document.getElementById("page5").style.display="none";	
		}else{
			alert('注册失败');
	    showErrorMsgDiv("注册失败");
			}
	}
	
		
	function regist_close_page(obj){
		var id=obj.id;
		var value=id.substring(id.lastIndexOf('-')+1);
		var nextValue=new Number(value)+1;
		var currentPage="page"+value;
		var nextPage="page"+nextValue;
	if(currentPage=="page2"){
			document.getElementById("reg_msg_div_id").style.display='none'; 
			document.getElementById("reg_msg_id").innerHTML=""; 
		var currentPsd="password"+value;
		var againPsd="password"+nextValue;
		var currentMobileNO=document.getElementById("reg_mb_no").value;
		var currentCode=document.getElementById("reg_code_value_id").value;
		//判断密码是否修改
		if(currentMobileNO!=sessionMobileNo){
			alert('11111111111');
				alert(currentMobileNO);
				alert(sessionMobileNo);
			showErrorMsgDiv("手机号码不正确！");
			return false;
		}
		//验证登陆密码
		if(currentPsd=="password1"){
			alert('22222222');
			 if(currentPsd==""){
			showErrorMsgDiv("登陆密码不能为空 请输入！");
			return false;
			}else{
				var password1=document.getElementById(currentPsd).value;
				validatePsd(password1);
			}
		}
		//判断密码是否一致
		if(againPsd=="password2"){
		alert('3333333333');
		var password2=document.getElementById(againPsd).value;
		var password1=document.getElementById(currentPsd).value;
		if(password2==""){
		  showErrorMsgDiv("确认密码不能为空！");
		  return false;
		 } else if(password1!=password2){
			alert('4444444');
		   showErrorMsgDiv("两次密码不相同，请重新输入确认密码！");
		  return false;
		} 
		}
		//判断验证码的正确性
		if(currentCode==""){
			alert('55555555');
		showErrorMsgDiv("验证码不能为空！");
		return false;	
		  }else if(currentCode!="888888"){
		showErrorMsgDiv("输入验证码错误  请重新输入！");
		return false;				 
		 }  
	   if(document.getElementById("reg_msg_id").innerHTML!=""){
		   alert('666666');
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
	}
	
	
	var show_choseBank_box_Div= function (id){
		$("#"+id).show();
	}
	var close_choseBank_box_Div= function (id){
		$("#"+id).hide();
	}
	var register3_choseBank=function (id){
		$("#choseBank_box").hide();
		$("#reg3_bankNo").val($("#banks_bankNo_"+id).val());
		$("#register3_bankName").html($("#banks_bankName_"+id).val());
		$("#register3_bankName").css("color","#000000");
	}
	
	
	
	
	
	
		
		
	//02：验证用户姓名   
	function reg_user_name( obj ){
		document.getElementById("reg_msg_div_id").style.display='none';
		var client_name = document.getElementById("client_name").value;
		var id_no = document.getElementById("id_no").value;
		var regcust_id = document.getElementById("regcust_id").value;
				if(reg001_token==null || reg001_token==""){
			alert("reg001_token   is  null ");
			}else{
			reg001_token=reg001_token.substring(reg001_token.lastIndexOf("=")+1);	
			alert(reg001_token);
				}	
		//用户姓名检查检查
		var _ix = new IXContent();
		_ix.Set("client_name", client_name);
		_ix.Set("id_no", id_no);
		_ix.Set("regcust_id", regcust_id);
		_ix.Set("token", "");
		Win_CallTQL( 'get_client_name_callback', 'regCFv2', _ix, '', '', '', '', '', '', '', 'TP', 'POST');
	}
	
	
	var  get_client_name_callback = function(formid,funcid,flagtype,_json){
			var json_data = JSON.parse(_json);
			if (json_data.success) {
				var client_name = document.getElementById("client_name").value;
				var id_no = document.getElementById("id_no").value;
				var regcust_id = document.getElementById("regcust_id").value;
				sessionclient_name=client_name;//全部变量
				sessionid_no=id_no;
				alert(sessionclient_name);
			} else {
				 showErrorMsgDiv(json_data.msg);
			}		 		 
		 }
	
	
	//02:验证两次支付密码是否相同
	function validatePsdIsSame(value){
			var currentPsd="password"+(new Number(value)-1);
			var againPsd="password"+value;
			alert(currentPsd);
			alert(againPsd);
			var password4=document.getElementById(againPsd).value;	
			var password3=document.getElementById(currentPsd).value;
		   if(password3==""){
				showErrorMsgDiv("支付密码不能为空");
				return false;
			}
			if(password4==""){
				showErrorMsgDiv("确认密码不可以为空");
				return false;
			}
		
		   if(password3!=password4){
				alert('4444444');
				showErrorMsgDiv("支付密码码与确认密码不一致");
				return false;
			 } 
	     return true;
		}
		

	//02:验证真实姓名是否正确
	function reg_user_name(){
	 var Real_name=document.getElementById("Real_name").value;
	  if(Real_name==""){
				alert('55555555');
		   		showErrorMsgDiv("真实姓名不能为空");
		   		return false;	
		   }
		   return true;	
		}
	
	//02:密码强度校验
	function  validatePsdStrength(){
		     var password3=document.getElementById("password3").value;
				alert('22222222');
		 		if(password1==""){
					showErrorMsgDiv("支付密码不可以为空");
					return false;
				} else {
					//进行密码强度验证
					validatePsd(password1);
				}
		}
	//02:进行密码强度验证
	function validatePsd(psdValue){
		var _ix = new IXContent();
		_ix.Set("pwd", psdValue);	
		 _ix.Set("token", "");	
		Win_CallTQL( 'validate_send_psd_callback', 'validatePwdv2', _ix, '', '', '', '', '', '', '', 'TP', 'POST');		
	}
	
	
	//财富账户进行注册用户	
	function reg002_register_user(){
		alert('财户注册');
		var reg_rm = document.getElementById("Real_name").value;
		var reg_iin = document.getElementById("identity_id_no").value;
		var rpwd=document.getElementById("password4").value;	
		var pwd=document.getElementById("password3").value;
		var _ix = new IXContent();
		_ix.Set("mobile", regcust_id);
		_ix.Set("pwd", pwd);
		_ix.Set("rpwd", rpwd);
		_ix.Set("reg_iin", client_name);
		Win_CallTQL( 'get_regbbb_register_user_callback', 'regCFv2', _ix, '', '', '', '', '', '', '', 'TP', 'POST');
		}	
		
	var get_regbbb_register_user_callback =	 function(formid,funcid,flagtype,_json){
	  alert('第三');
	var json_data = JSON.parse(_json);
	if (json_data.success) {
		alert('success');
		 return true;
		}else{
			return false;
			}	
	}	
	//第三页的   点击下一步
	function regist_next_two_page(obj){
		var id=obj.id;
		var value=id.substring(id.lastIndexOf('-')+1);
		var nextValue=new Number(value)+1;
		var currentPage="page"+value;
		var nextPage="page"+nextValue;
		alert(currentPage);
		if(currentPage=="page3"){
			document.getElementById("reg_msg_div_id").style.display='none';
			if(!validateMobileOverDue()){
				return false;
			}
			//两次密码是否一致
			if(!validatePsdIsSame(value)){
				return false;
				}
		  	//验证登陆密码强度
			if(!validatePsdStrength()){
				return false;
				}
		   //控制是否有错误信息
		   if(document.getElementById("reg_msg_id").innerHTML!=""){
				return false;
		   } else {
			   if(!reg002_register_user() ){
				   alert('fail');
				   return false;
			 } 
		   }  
			
	  	}
		document.getElementById("page1").style.display="none";	
		document.getElementById("page2").style.display="none";
		document.getElementById("page3").style.display="none";		
		document.getElementById("page4").style.display="block";	
		document.getElementById("page5").style.display="none";	
	}
	
	
	/*第一页到第n页
	*/
	$(document).ready(function(){
		document.getElementById("reg_msg_div_id").style.display='none';
		//tdxWebLoad('1', '0', '注册', 'GOSY', '', '', '', '1', '', '', '', '0', '', '', '');
		var path=location.href;
		if(path.indexOf('#')<0){
		$("#page2,#page3,#page4,#page5").hide();
		}else{
		 path=path.substring(path.lastIndexOf('#')+1);
			}
		if(path=='page1' || path=='#'){
		$("#page2,#page3,#page4,#page5").hide();	
			}
		if(path=='page2'){
		$("#page1,#page3,#page4,#page5").hide();
		$('#page2').show();	
			}
		if(path=='page3'){		
	   $("#page1,#page2,#page4,#page5").hide();
	   $('#page3').show();	
			}
		if(path=='page4'){
		$("#page1,#page2,#page3,#page5").hide();
		$('#page4').show();	
			}
		if(path=='page5'){
		$("#page1,#page2,#page3,#page4").hide();
			}
		if(path=='page_ok_2'){
		$("#page1,#page_ok_3,#page_ok_4").hide();
		$('#page_ok_2').show();	
			}
		if(path=='page_ok_3'){
		$("#page1,#page_ok_2,#page_ok_4").hide();
		$('#page_ok_3').show();	
			}
		if(path=='page_ok_4'){
		$("#page1,#page_ok_2,#page_ok_3").hide();
		$('#page_ok_4').show();	
			}
		$("#page-ok_1").click(function(){
		$("#page_ok_3,#page_ok_4,#page1").hide();
		$("#page_ok_2").show();
			});
		$("#page-ok_2").click(function(){
		$("#page_ok_2,#page_ok_4,#page1").hide();
		$("#page_ok_3").show();
			});
		$("#page-ok_3").click(function(){
		$("#page1,#page_ok_2,#page_ok_3").hide();
		$("#page_ok_4").show();
			});
			/*点击弹出层*/
					
		
		
		
		
		
		
		$(".btn").click(function(){
		$(".a1").show();
		$(".a2").show();
			});
		$(".abox .closed").click(function(){
		$(".a1").hide();
		$(".a2").hide();
			});
		$(".banklogo").click(function(){
		$(".fucenbj").hide();
		$(".bj-fucen").hide();
			});
			
			
		$(".smallfont2").click(function(){
		$(".fucenbj").show();
		$(".bj-fucen").show();
			});
		$(".biaoti span").click(function(){
		$(".fucenbj").hide();
		$(".bj-fucen").hide();
			});
	})
		
	
	
	
	
	
				
	
		
				
				