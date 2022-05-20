$(function () {
})
function shopIndex(callback) {
	$.getJSON("/api/shop/index/", function (result) {
		if (env == ENV_DEV)
			console.log(result);
		callback(result);
	});
}
/**
 * 宝箱预售
 * @param {*} type 	ordinary_elf 普通精灵宝箱
 * 					precious_elf 高级精灵宝箱
 * 					ordinary_energy 普通能量石宝箱
 * 					precious_energy 高级能量石宝箱
 */
function chestsSaleData(type, callback) {
	if (window.chestsSaleInterval != undefined && window.chestsSaleInterval != null) {
		clearInterval(window.chestsSaleInterval);
	}
	$.getJSON("/api/shop/chest/" + type, function (result) {
		if (env == ENV_DEV)
			console.log(result);
		callback(result);
	});
}
/**
 * 市场列表
 * @param {*} type 	elf 精灵
 * 					energy 能量石
 * @param {*} page 
 */
function marketListData(type, page, callback) {
	$.getJSON("/api/shop/market/" + type + "/" + page, function (result) {
		if (env == ENV_DEV)
			console.log(result);
		callback(result);
	});
}
/**
 * 通过范围获取成交历史列表
 * @param {*} time 时间
 */
function marketLogListData(type, time, callback) {
	$.getJSON("/api/shop/market/log/" + type + "/" + time, function (result) {
		if (env == ENV_DEV)
			console.log(result);
		callback(result);
	});
}
/**
 * 特殊竞拍
 */
function auctionData(callback) {
	$.getJSON("/api/shop/auction", function (result) {
		if (env == ENV_DEV)
			console.log(result);
		callback(result);
	});
}
/**
 * 当前竞品物品的出价历史
 */
function auctionHistoryLogListData(callback) {
	$.getJSON("/api/shop/auction/history", function (result) {
		if (env == ENV_DEV)
			console.log(result);
		callback(result);
	});
}
/**
 * 通过时间范围获取成交列表
 * @param {*} time 
 */
function auctionLogListData(time, callback) {
	$.getJSON("/api/shop/auction/log/" + time, function (result) {
		if (env == ENV_DEV)
			console.log(result);
		callback(result);
	});
}
/**
 * 排行榜
 */
function rankingData(callback) {
	$.getJSON("/api/shop/ranking", function (result) {
		if (env == ENV_DEV)
			console.log(result);
		callback(result);
	});
}
/**
 * 每周奖励
 */
function dailyData() {
	$.getJSON("/api/shop/daily", function (result) {
		if (env == ENV_DEV)
			console.log(result);
	});
}
/**
 * 礦池
 */
function miningData(callback) {
	$.getJSON("/api/shop/mining", function (result) {
		if (env == ENV_DEV)
			console.log(result);
		callback(result);
	});
}