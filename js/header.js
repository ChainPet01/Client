$(function () {
})
function addCookie(key, value, minute) {
	if (key == undefined || key == null || key == '') {
		key = 'plausarLoginInfo';
	}
	if (value == "null") value = "";
	var str = key + "=" + escape(value); //编码
	if (minute > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失
		var date = new Date();
		var ms = minute * 60 * 1000;
		date.setTime(date.getTime() + ms);
		str += "; expires=" + date.toGMTString();
	}
	document.cookie = str;
}
function getCookie(key) {
	if (key == undefined || key == null || key == '') {
		key = 'plausarLoginInfo';
		let currTime = Date.now();
		if (!window.plausarLoginInfoTime || currTime - window.plausarLoginInfoTime >= 3000) {
			window.plausarLoginInfoTime = currTime;
			isOnline(function (result) {
				if (!result.data) {
					$("#headerBtnWallet").text('Wallet');
					$("#headerBtnWallet").parent().attr('onclick', 'loginEthereum()');
					addCookie('plausarLoginInfo', '');
					return "";
				}
			})
		}
	}
	var arrStr = document.cookie.split("; ");
	for (var i = 0; i < arrStr.length; i++) {
		var temp = arrStr[i].split("=");
		if (temp[0] == key) {
			if (key == 'plausarLoginInfo')
				addCookie('plausarLoginInfo', unescape(temp[1]), 30);
			return unescape(temp[1]);  //解码
		}
	}
	return "";
}
function isOnline(callback) {
	$.getJSON("/api/user/online", function (result) {
		if (env == ENV_DEV)
			console.log(result);
		callback(result)
	});
}

function submitTest(s) {
	if (s) {
		$.message({
			message: "Too soon!",
			type: 'warning'
		});
		return true;
	}
	s = true;
	setTimeout(function () {
		s = false;
	}, 2000);
	return false;
}
/*
 * 显示loading遮罩层
 */
var isLoading = false;
function loading() {
	this.isLoading = true;
	var mask_bg = document.createElement("div");
	mask_bg.id = "mask_bg";
	mask_bg.style.position = "fixed";
	mask_bg.style.top = "0px";
	mask_bg.style.left = "0px";
	mask_bg.style.width = "100%";
	mask_bg.style.height = "100%";
	mask_bg.style.backgroundColor = "#222222";
	mask_bg.style.opacity = 0.8;
	mask_bg.style.zIndex = 10001;
	document.body.appendChild(mask_bg);

	var mask_msg = document.createElement("div");
	mask_msg.style.position = "fixed";
	mask_msg.style.top = "35%";
	// mask_msg.style.left = "42%";
	mask_msg.style.background = "url(./images/load.gif) no-repeat center center";
	// mask_msg.style.background-position = "center center";
	mask_msg.style.width = "100%";
	mask_msg.style.height = "100px";
	mask_msg.style.textAlign = "center";
	// mask_msg.style.fontSize = "1.1em";
	// mask_msg.style.fontWeight = "bold";
	mask_msg.style.padding = "0.5em 3em 0.5em 3em";
	mask_msg.style.zIndex = 10002;
	// mask_msg.innerText = "Please wait...";
	mask_bg.appendChild(mask_msg);

	setTimeout(function () {
		if (this.isLoading) {
			this.loaded();
		}
	}, 200000);
}
/*
 * 关闭遮罩层
 */
function loaded() {
	this.isLoading = false;
	var mask_bg = document.getElementById("mask_bg");
	console.log('mask_bg',mask_bg);
	if (mask_bg != null)
		mask_bg.parentNode.removeChild(mask_bg);
		console.log(document);
}
