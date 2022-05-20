$(function () {
})
function balanceData(callback) {
    let data = getCookie();
    if (data == "") {
        callback(null);
    }
    else {
        callback({
            code: 200,
            message: "Succeed!",
            data: $("#headerCpetCountPcId").text()
        })
    }
}
function putData(callback) {
    let data = getCookie();
    if (data == "") {
        $.message({
            message: "Sorry, you are not logged in.",
            type: 'warning'
        });
        callback(null);
    }
    else {
        $.getJSON("/api/mining/put", function (result) {
            if (env == ENV_DEV)
                console.log(result);
            callback(result);
        });
    }
}
function stakeData(id, hash, callback) {
    let data = getCookie();
    if (data == "") {
        $.message({
            message: "Sorry, you are not logged in.",
            type: 'warning'
        });
        callback(null);
    }
    else {
        $.getJSON("/api/mining/stake/" + id + "/" + hash, function (result) {
            if (env == ENV_DEV)
                console.log(result);
            callback(result);
        });
    }
}
function redeemData(tokenId, callback) {
    let data = getCookie();
    if (data == "") {
        $.message({
            message: "Sorry, you are not logged in.",
            type: 'warning'
        });
        callback(null);
    }
    else {
        $.getJSON("/api/mining/redeem/" + tokenId, function (result) {
            if (env == ENV_DEV)
                console.log(result);
            callback(result);
        });
    }
}
function harvestData(callback) {
    let data = getCookie();
    if (data == "") {
        $.message({
            message: "Sorry, you are not logged in.",
            type: 'warning'
        });
        callback(null);
    }
    else {
        $.getJSON("/api/mining/harvest", function (result) {
            if (env == ENV_DEV)
                console.log(result);
            callback(result);
        });
    }
}