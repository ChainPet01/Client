$(function () {
})
/**
 * 我的宝箱
 * @param {*} callback 
 */
function myChestData(type, callback) {
    let data = getCookie();
    if (data == "") {
        // $.message({
        // 	message: "Sorry, you are not logged in.",
        // 	type: 'warning'
        // });
        // callback(null);
    }
    else {
        $.getJSON("/api/user/chest/" + type, function (result) {
            if (env == ENV_DEV)
                console.log(result);
            callback(result);
        });
    }
}
/**
 * 预购宝箱
 * @param {*} type  ordinary_elf 普通精灵宝箱
 *                  precious_elf 高级精灵宝箱
 *                  ordinary_energy 普通能量石宝箱
 *                  precious_energy 高级能量石宝箱
 */
function buyChestData(type, callback) {
    let data = getCookie();
    if (data == "") {
        $.message({
            message: "Sorry, you are not logged in.",
            type: 'warning'
        });
    }
    else {
        loading();
        $.getJSON("/api/chest/buy/" + type, function (result) {
            loaded();
            if (env == ENV_DEV)
                console.log(result);
            callback(result);
        });
    }
}
function queryChestData(type, hash, callback) {
    let data = getCookie();
    if (data == "") {
        $.message({
            message: "Sorry, you are not logged in.",
            type: 'warning'
        });
    }
    else {
        loading();
        $.getJSON("/api/chest/query/" + type + "/" + hash, function (result) {
            loaded();
            callback(result);
        });
    }
}
/**
 * 开宝箱
 * @param {*} type  ordinary_elf 普通精灵宝箱
 *                  precious_elf 高级精灵宝箱
 *                  ordinary_energy 普通能量石宝箱
 *                  precious_energy 高级能量石宝箱
 */
function openChestData(type, callback) {
    let data = getCookie();
    if (data == "") {
        $.message({
            message: "Sorry, you are not logged in.",
            type: 'warning'
        });
        callback(null);
    }
    else {
        $.getJSON("/api/chest/open/" + type, function (result) {
            if (env == ENV_DEV)
                console.log(result);
            callback(result);
        });
    }
}