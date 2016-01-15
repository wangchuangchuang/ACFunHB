/***
** 密码键盘 - 随机生成的软键盘
***/
;(function(exports){
	var KeyBoard = function(input, len, options){

		function RandomSort(a,b){
			return Math.random() - 0.5;
		}

		function getRandomNum()
		{
			var numArray=new Array();
			var i;
			for(i=0;i<10;i++)
			  numArray[i]=i;//生成一个数组
			numArray.sort(RandomSort);
			return numArray;
		}

		function getRandomChar()
		{
			var charArray=new Array();
			var i,j;
			for(i=0,j=97;j<123;i++,j++)
			  charArray[i]=j;//生成字母表
			charArray.sort(RandomSort);
			//对字母进行翻译
			for(i=0;i<charArray.length;i++)
				charArray[i] = String.fromCharCode(charArray[i]);
			return charArray;
		}

		var body = document.getElementsByTagName('body')[0];
		var DIV_ID = options && options.divId || '__w_l_h_v_c_z_e_r_o_divid';
		
		if(document.getElementById(DIV_ID)){
			body.removeChild(document.getElementById(DIV_ID));
		}
		
		this.input = input;
		this.el = document.createElement('div');
		
		var self = this;
		var zIndex = options && options.zIndex || 1000;
		var width = options && options.width || '100%';
		var height = options && options.height || '165px';
		var fontSize = options && options.fontSize || '15px';
		var backgroundColor = options && options.backgroundColor || '#fff';
		var TABLE_ID = options && options.table_id || 'table_0909099';
		var mobile = typeof orientation !== 'undefined';

		/*alert(getElementAbsPos(input));
		alert(input.height);*/
		this.el.id = DIV_ID;
		this.el.style.position = 'absolute';
		this.el.style.left = 0;
		this.el.style.right = 0;
		this.el.style.bottom = 0;
		//this.el.style.top = getElementAbsPos(input)+45+"px";
		this.el.style.zIndex = zIndex;
		this.el.style.width = width;
		this.el.style.height = height;
		this.el.style.backgroundColor = backgroundColor;
		
		//样式
		var cssStr = '<style type="text/css">';
		cssStr += '#' + TABLE_ID + '{text-align:center;width:100%;height:160px;border-top:1px solid #CECDCE;background-color:#FFF;}';
		cssStr += '#' + TABLE_ID + ' td{width:33%;border:1px solid #ddd;border-right:0;border-top:0;vertical-align:middle;font-size:20px;font-weight:bold;font-family:微软雅黑;}';
		if(!mobile){
			cssStr += '#' + TABLE_ID + ' td:hover{background-color:#1FB9FF;color:#FFF;}';
		}
		cssStr += '</style>';
		
		//Button
		//var btnStr = '<div style="width:60px;height:28px;background-color:#1FB9FF;';
		//btnStr += 'float:right;margin-right:5px;text-align:center;color:#fff;';
		//btnStr += 'line-height:28px;border-radius:3px;margin-bottom:5px;cursor:pointer;">完成</div>';
		
		//table
		numArray = getRandomNum();  //随机生成数字
		//charArray = getRandomChar();   //随机生成字符
		var tableStr = '<table id="' + TABLE_ID + '" border="0" cellspacing="0" cellpadding="0">';
			tableStr += '<tr>';
			tableStr += '<td>' + numArray[0] + '</td>';
			tableStr += '<td>' + numArray[1] + '</td>';
			tableStr += '<td>' + numArray[2] + '</td>';
			tableStr += '</tr>';
			tableStr += '<tr>';
			tableStr += '<td>' + numArray[3] + '</td>';
			tableStr += '<td>' + numArray[4] + '</td>';
			tableStr += '<td>' + numArray[5] + '</td>';
			tableStr += '</tr>';
			tableStr += '<tr>';
			tableStr += '<td>' + numArray[6] + '</td>';
			tableStr += '<td>' + numArray[7] + '</td>';
			tableStr += '<td>' + numArray[8] + '</td>';
			tableStr += '</tr>';
			tableStr += '<tr><td style="background-color:#E7E7E7;font-size:16px;font-weight:normal;color:#ed1c24;">确定</td>';
			tableStr += '<td>' + numArray[9] + '</td>';
			tableStr += '<td style="background-color:#E7E7E7;font-size:16px;font-weight:normal;">退格</td></tr>';
			tableStr += '</table>';
		//this.el.innerHTML = cssStr + btnStr + tableStr;
		this.el.innerHTML = cssStr + tableStr;
		
		function closeKeyboard(){
		  body.removeChild(self.el);
		}

		function addEvent(e){
			var ev = e || window.event;
			var clickEl = ev.element || ev.target;
			var value = clickEl.textContent || clickEl.innerText;
			//点击时添加背景色
			//clickEl.style.backgroundColor = "#D3D9DF";
			if(clickEl.tagName.toLocaleLowerCase() === 'td' && value !== "退格" && value !== "确定"){
				if(self.input){
					if(self.input.value.length < len){
						self.input.value += value;
					}
				}
			}else if(clickEl.tagName.toLocaleLowerCase() === 'td' && value === "确定"){
				//body.removeChild(self.el);
				setTimeout(function () {
	                closeKeyboard();
	            },  500);
			}else if(clickEl.tagName.toLocaleLowerCase() === 'td' && value === "退格"){
				var num = self.input.value;
				if(num){
					var newNum = num.substr(0, num.length - 1);
					self.input.value = newNum;
				}
			}
			//点击后消除背景色
			//clickEl.style.backgroundColor = "transparent";
		}

		if(mobile){
			this.el.ontouchstart = addEvent;
		}else{
			this.el.onclick = addEvent;
		}

		body.appendChild(this.el);
	}
	
	exports.KeyBoard = KeyBoard;

})(window);

