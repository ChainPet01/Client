$(function () {
})
/**
 * 可上架拍卖的物品
 * @param {*} type 类型
 *                  elf
 *                  energy
 */
function putAwayAuctionData(type) {
    let data = getCookie();
    if (data == "") {
        $.message({
            message: "Sorry, you are not logged in.",
            type: 'warning'
        });
    }
    else {
        $.getJSON("/api/auction/put/" + type, function (result) {
            console.log(result);
        });
    }
}
/**
 * 上架拍卖
 * @param {*} type 类型
 *                  elf
 *                  energy
 * @param {*} id    拍卖物品的id
 * @param {*} price 拍卖物品的价格
 */
function sellAuctionData(type, id, price) {
    let data = getCookie();
    if (data == "") {
        $.message({
            message: "Sorry, you are not logged in.",
            type: 'warning'
        });
    }
    else {
        $.getJSON("/api/auction/sell/" + type + "/" + id + "/" + price, function (result) {
            console.log(result);
        });
    }
}
/**
 * 竞拍出价
 * @param {*} price 出价的价格
 */
function buyAuctionData(price, address, callback) {
    let data = getCookie();
    if (data == "") {
        $.message({
            message: "Sorry, you are not logged in.",
            type: 'warning'
        });
    }
    else {
        $.getJSON("/api/auction/buy/" + price + "/" + address, function (result) {
            console.log(result);
            callback(result);
        });
    }
}
/**
 * 我的交易记录
 * @param {*} time 时间范围
 */
function myAuctionListData(time, callback) {
    let data = getCookie();
    if (data == "") {
        $.message({
            message: "Sorry, you are not logged in.",
            type: 'warning'
        });
    }
    else {
        $.getJSON("/api/auction/log/" + time, function (result) {
            console.log(result);
            callback(result);
        });
    }
}