
// var maxtime = 0; //一个小时，按秒计算，自己调整!   
function CountDown(timeMax, callback) {
	if (timeMax > 0) {
		// day = Math.floor();
		// minutes = Math.floor(maxtime / 60);
		// seconds = Math.floor(maxtime % 60);
		time = SecondToDate(timeMax);
		--timeMax;
		callback(time,timeMax)
		// $("#remainingTime").text('Remaining time : ' + time);
	}
	else {
		callback('00:00:00',0);
		// $("#remainingTime").text('Remaining time : 00:00:00');
	}
}
/**
 * 秒转倒计时
 * @param {*} msd 
 * @returns 
 */
function SecondToDate(msd) {
	var time = msd
	if (null != time && "" != time) {
		if (time > 60 && time < 60 * 60) {
			time = parseInt(time / 60.0) + ":" + parseInt((parseFloat(time / 60.0) -
				parseInt(time / 60.0)) * 60);
		}
		else if (time >= 60 * 60 && time < 60 * 60 * 24) {
			time = parseInt(time / 3600.0) + ":" + parseInt((parseFloat(time / 3600.0) -
				parseInt(time / 3600.0)) * 60) + ":" +
				parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
					parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60);
		} else if (time >= 60 * 60 * 24) {
			time = parseInt(time / 3600.0 / 24) + " Day " + parseInt((parseFloat(time / 3600.0 / 24) -
				parseInt(time / 3600.0 / 24)) * 24) + ":" + parseInt((parseFloat(time / 3600.0) -
					parseInt(time / 3600.0)) * 60) + ":" +
				parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
					parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60);
		}
		else {
			time = parseInt(time);
		}
	}
	return time;
}

/**
 * 顶部导航条高亮逻辑
 * @param {*} elementId 
 * @param {*} elementTag 
 * @param {*} homeActive 
 * @param {*} navActive 
 * @param {*} siginAction 
 */
function switchNavMainClass(elementId, elementTag, homeActive, navActive, siginAction) {
	let e = document.getElementById(elementId);
	if (e == null) return;
	//  console.log(e);
	//获取div下面所有的a标签（返回节点对象）
	let myNav = e.getElementsByTagName(elementTag);
	//获取当前窗口的url
	let myURL = document.location.href;
	// console.log(myURL);
	//循环div下面所有的链接，
	for (let i = 0; i < myNav.length; i++) {
		//获取每一个a标签的herf属性
		let links = myNav[i].getAttribute("href");
		// let myURL = document.location.href;
		let regularMarket = [/market2/, /market3/, /s-me/, /s-market/, /s-auction/, /s-rank/, /s-prize/];//market 子导航条逻辑
		for (let j = 0; j < regularMarket.length; j++) {
			if (regularMarket[j].test(myURL)) {
				myURL = 'market.html';//统一是market的子页面
				break;
			}
			// else if(){//其他页面如果有子页面也使用上方逻辑

			// }
		}
		//查看div下的链接是否包含当前窗口，如果存在，则给其添加样式
		if (myURL.indexOf(links) != -1) {
			if (i == 0) {
				myNav[i].className = homeActive;
			} else if (i >= myNav.length - 1) {
				myNav[i].className = siginAction;
			} else {
				myNav[i].className = navActive;
			}
		}
	}
}

function switchNavMarketClass(elementId, elementTag, active) {
	let e = document.getElementById(elementId);
	console.log(e);
	// 	if(e == null)return;
	// 	// console.log("---");
	//获取div下面所有的a标签（返回节点对象）
	let myNav = e.getElementsByTagName(elementTag);
	//获取当前窗口的url
	let myURL = document.location.href;
	//    console.log(elementTag);
	console.log(myNav);
	//    //循环div下面所有的链接，
	for (let i = 0; i < myNav.length; i++) {
		// 	   //获取每一个a标签的herf属性
		let links = myNav[i].getAttribute("href");
		//    console.log(links);
		// 	//    let regularMarketHome = [/market2/,/market3/,/s-me/,/s-prize/];//market 子导航条逻辑
		// 	//    let regularMarketList = [/s-market/];
		// 	//    let regularMarketAuction = [/s-auction/];
		// 	//    let regularMarketRank = [/s-rank/];
		// 	//    let regularMarketPrize = [/s-prize/];
		// 	//    for(let j = 0;j<regularMarketHome.length; j++){
		// 	// 	   if(regularMarketHome[j].test(myURL)){
		// 	// 			myURL = 'market.html';//统一是market的子页面
		// 	// 			break;
		// 	// 	   }
		// 	//    }
		// 	//    for(let j = 0;j<regularMarketList.length; j++){
		// 	// 	   if(regularMarketList[j].test(myURL)){//其他页面如果有子页面也使用上方逻辑
		// 	// 			myURL = 's-market.html';
		// 	// 			break;
		// 	// 	   }
		// 	// 	}
		// 	// 	for(let j = 0;j<regularMarketAuction.length; j++){
		// 	// 		if(regularMarketAuction[j].test(myURL)){//其他页面如果有子页面也使用上方逻辑
		// 	// 			myURL = 's-auction.html';
		// 	// 			break;
		// 	// 		}
		// 	// 	}
		// 	// 	for(let j = 0;j<regularMarketRank.length; j++){
		// 	// 		if(regularMarketRank[j].test(myURL)){//其他页面如果有子页面也使用上方逻辑
		// 	// 			 myURL = 's-rank.html';
		// 	// 			 break;
		// 	// 		}
		// 	// 	}
		// 	// 	for(let j = 0;j<regularMarketPrize.length; j++){
		// 	// 		if(regularMarketPrize[j].test(myURL)){//其他页面如果有子页面也使用上方逻辑
		// 	// 			 myURL = 's-prize.html';
		// 	// 			 break;
		// 	// 		}
		// 	// 	}
		// 	   //查看div下的链接是否包含当前窗口，如果存在，则给其添加样式
		console.log(links);
		if (myURL.indexOf(links) != -1) {
			console.log(myURL);
			console.log(links);
			console.log(myNav[i]);
			myNav[i].className = active;
			// 			console.log(myNav[i]);
		}
	}
}
function toThousands(num) {
	var result = [], counter = 0;
	num = (num || 0).toString().split('');
	for (var i = num.length - 1; i >= 0; i--) {
		counter++;
		result.unshift(num[i]);
		if (!(counter % 3) && i != 0) { result.unshift(','); }
	}
	return result.join('');
}

/**
 * 检查输入是否为数字
 * */
function checkNum(value) {
	// var r = value.match(/^[0-9]*$/);
	var r = value.match(/^\d+(\.\d+)?$/g);
	if (r == null) {
		// alert('Please input number!');
		return true;
	}
	else {
		return false;
	}
}
// function toOrderNum(num) {
// 	num = num.toString()     // 数字变成字符串
// 	if (num.length < 6) {  // 如未满位数，添加"0"补位
// 		num = '0' + num
// 		toOrderNum(num) // 递归添加"0"补位
// 	} else if (num.length === 6) {      // 数中加入逗号
// 		// num = num.slice(0, 2) + ',' + num.slice(2, 5) + ',' + num.slice(5, 8)
// 		chartNum = num.split('') // 将其便变成数据
// 	} else {
// 		alert('显示异常');
// 	}
// }
// function setNumberTransform(){
// 	var numberItems = $('.item');
// 	const numberArr = chartNum.filter(item => !isNaN(item));
// 	for (var  index = 0; index < numberItems.length; index++) {
// 		const elem = numberItems[index];
// 		elem.style.transform = 'translate(-50%, -'+numberArr[index]  * 10 +'%)'
// 	}
// }