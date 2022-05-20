/**
 * 登录
 * @param {*} id 
 */
function loginData(id) {
	$.getJSON("/api/user/login/" + id, function (result) {
		if (env == ENV_DEV)
			console.log(result);
		let isReload = false;
		let d = getCookie('plausarLoginInfo');
		if (typeof d == 'undefined' || d == '') {
			isReload = true;
		}
		else {
			let hash = JSON.parse(d).hash;
			if (hash != result.data.hash) {
				isReload = true;
			}
		}
		addCookie('plausarLoginInfo', JSON.stringify(result.data), 30);
		if (isReload) {
			window.location.reload();
		}
	});
}
function userInof(callback) {
	let data = getCookie();
	if (data == "") {
	}
	else {
		$.getJSON("/api/user/info", function (result) {
			if (env == ENV_DEV)
				console.log(result);
			callback(result);
		});
	}
}
/**
 * 个人宝库
 */
function myData(callback) {
	let data = getCookie();
	if (data == "") {
		// $.message({
		// 	message: "Sorry, you are not logged in.",
		// 	type: 'warning'
		// });
		callback(null);
	}
	else {
		$.getJSON("/api/user/my", function (result) {
			if (env == ENV_DEV)
				console.log(result);
			callback(result);
		});
	}
}
/**
 * 图鉴
 */
function handbookData(callback) {
	let data = getCookie();
	if (data == "") {
		// $.message({
		// 	message: "Sorry, you are not logged in.",
		// 	type: 'warning'
		// });
		callback(null);
	}
	else {
		$.getJSON("/api/user/handbook", function (result) {
			if (env == ENV_DEV)
				console.log(result);
			callback(result);
		});
	}
}
/**
 * 碎片合成
 */
function synthesisData(callback) {
	let data = getCookie();
	if (data == "") {
		$.message({
			message: "Sorry, you are not logged in.",
			type: 'warning'
		});
		callback(null);
	}
	else {
		loading();
		$.getJSON("/api/user/synthesis", function (result) {
			loaded();
			if (env == ENV_DEV)
				console.log(result);
			callback(result);
		});
	}
}

function isApprovedData(callback) {
	let data = getCookie();
	if (data == "") {
		callback(null);
	}
	else {
		$.getJSON("/api/user/approved/status", function (result) {
			if (env == ENV_DEV)
				console.log(result);
			callback(result);
		});
	}
}
function approvedData(transferHash, callback) {
	let data = getCookie();
	if (data == "") {
		$.message({
			message: "Sorry, you are not logged in.",
			type: 'warning'
		});
		callback(null);
	}
	else {
		loading();
		$.getJSON("/api/user/approved/" + transferHash, function (result) {
			loaded();
			if (env == ENV_DEV)
				console.log(result);
			callback(result);
		});
	}
}

function invitationData(callback) {
	let data = getCookie();
	if (data == "") {
		callback(null);
	}
	else {
		$.getJSON("/api/user/invitation", function (result) {
			if (env == ENV_DEV)
				console.log(result);
			callback(result);
		});
	}
}
function invitationHarvest(callback) {
	let data = getCookie();
	if (data == "") {
		$.message({
			message: "Sorry, you are not logged in.",
			type: 'warning'
		});
		callback(null);
	}
	else {
		loading();
		$.getJSON("/api/user/receive_inviter_award", function (result) {
			loaded();
			if (env == ENV_DEV)
				console.log(result);
			callback(result);
		});
	}
}

function invitationRhythmicData(callback) {
	$.getJSON("/api/user/invitation_rhythmic", function (result) {
		if (env == ENV_DEV)
			console.log(result);
		callback(result);
	});
}
function invitationRhythmicRankData(time, callback) {
	$.getJSON("/api/user/invitation_rhythmic_time/" + time, function (result) {
		if (env == ENV_DEV)
			console.log(result);
		callback(result);
	});
}
function invitationRhythmicHarvest(callback) {
	let data = getCookie();
	if (data == "") {
		$.message({
			message: "Sorry, you are not logged in.",
			type: 'warning'
		});
		callback(null);
	}
	else {
		loading();
		$.getJSON("/api/user/receive_inviter_rhythmic_award", function (result) {
			loaded();
			if (env == ENV_DEV)
				console.log(result);
			callback(result);
		});
	}
}