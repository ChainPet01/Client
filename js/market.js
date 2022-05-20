$(function () {
})
/**
 * 可以上架商品列表
 * @param {*} type 商品类型
 *                  elf
 *                  energy
 */
function putAwayGoodsData(type, callback) {
    let data = getCookie();
    if (data == "") {
        $.message({
            message: "Sorry, you are not logged in.",
            type: 'warning'
        });
        callback(null);
    }
    else {
        $.getJSON("/api/market/put/" + type, function (result) {
            if (env == ENV_DEV)
                console.log(result);
            callback(result);
        });
    }
}
/**
 * 上架商品
 * @param {*} type 商品类型
 *                  elf
 *                  energy
 * @param {*} id    商品id
 * @param {*} price 商品价格
 */
function sellGoodsData(type, id, price, page, callback) {
    let data = getCookie();
    if (data == "") {
        $.message({
            message: "Sorry, you are not logged in.",
            type: 'warning'
        });
        callback(null);
    }
    else {
        $.getJSON("/api/market/sell/" + type + "/" + id + "/" + price + "/" + page, function (result) {
            if (env == ENV_DEV)
                console.log(result);
            callback(result);
        });
    }
}

/**
 * 下架商品
 * @param {*} type 商品类型
 *                  elf
 *                  energy
 * @param {*} tokenId market展示列表的index
 * @param {*} page 页面类型
 *                   market 市场列表
 *                   my  我出售的列表
 */
function sellBackGoodsData(type, tokenId, page, callback) {
    let data = getCookie();
    if (data == "") {
        $.message({
            message: "Sorry, you are not logged in.",
            type: 'warning'
        });
    }
    else {
        $.getJSON("/api/market/back/" + type + "/" + tokenId + "/" + page, function (result) {
            if (env == ENV_DEV)
                console.log(result);
            callback(result);
        });
    }
}
/**
 * 我的出售列表
 * @param {*} type 类型
 *                  elf
 *                  energy
 * @param {*} page 页数
 */
function mySellListData(type, page, callback) {
    let data = getCookie();
    if (data == "") {
        $.message({
            message: "Sorry, you are not logged in.",
            type: 'warning'
        });
    }
    else {
        $.getJSON("/api/market/my/" + type + "/" + page, function (result) {
            if (env == ENV_DEV)
                console.log(result);
            callback(result);
        });
    }
}
/**
 * 确定购买
 * @param {*} type 类型
 *                  elf
 *                  energy
 * @param {*} index market列表索引
 */
function buyGoodsData(type, transferHash, to, tokenId, callback) {
    let data = getCookie();
    if (data == "") {
        $.message({
            message: "Sorry, you are not logged in.",
            type: 'warning'
        });
    }
    else {
        $.getJSON("/api/market/buy/" + type + "/" + transferHash + "/" + to + "/" + tokenId, function (result) {
            if (env == ENV_DEV)
                console.log(result);
            callback(result);
        });
        // let url = "/api/market/buy/" + type + "/" + transferHash + "/" + to + "/";
        // $.ajax({
        //     url: url,
        //     dataType: 'json',
        //     data: data,
        //     success: callback,
        //     timeout: 3000 //3 second timeout
        //   });
    }
}
/**
 * 个人交易记录
 * @param {*} time 时间范围
 */
function myMarketTransactionLogData(type, time, callback) {
    let data = getCookie();
    if (data == "") {
        $.message({
            message: "Sorry, you are not logged in.",
            type: 'warning'
        });
    }
    else {
        $.getJSON("/api/market/log/" + type + "/" + time, function (result) {
            if (env == ENV_DEV)
                console.log(result);
            callback(result)
        });
    }
}
