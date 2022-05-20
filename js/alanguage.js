var dict = {};
var curr_lang = '';

$(function () {
	loadDict("en");
	loadDict("zh");
	loadDict("fr");
	loadDict("jp");
	loadDict("ko");

	setLanguage("en");
});

function setLanguage(lang) {
	// var localLang = getCookieVal("langtest");
	// setCookie("langtest=" + lang + "; path=/;");
	curr_lang = lang;
	translate(lang);
	let tag = "English";
	if (lang == 'zh') {
		tag = "繁体中文"
	}
	else if (lang == 'fr') {
		tag = "France"
	}
	else if (lang == 'jp') {
		tag = "日本語"
	}
	else if (lang == 'ko') {
		tag = "한국어"
	}
	$("#languagedown-pc").text(tag);
	$("#languagedown-mob").text(tag);
}

function translate(lang) {
	$("[langtest]").each(function () {
		// console.log(this);
		switch (this.tagName.toLowerCase()) {
			case "input":
				$(this).val(__tr(lang, $(this).attr("langtest")));
				break;
			default:
				$(this).text(__tr(lang, $(this).attr("langtest")));
			// console.log($(this).attr("langtest"),$(this).text())
		}
	});

}

function __tr(lang, src) {
	return (dict[lang][src]);
}

function get_str(src) {
	return (dict[curr_lang][src]);
}


function loadDict(lang) {
	// var lang = (getCookieVal("langtest") || "en");
	$.ajax({
		async: false,
		type: "GET",
		dataType: "text",
		url: "language/" + lang + ".json",
		success: function (msg) {
			// let tmp = "{\"" + lang + "\": " + msg + "}";
			// console.log(tmp)
			dict[lang] = eval("(" + msg + ")");
			// console.log(dict)
		}
	});
}

// function registerWords() {
// 	// var lang = (getCookieVal("langtest") || "en");
// 	// console.log(lang+"==");
// 	$("[langtest]").each(function () {
// 		switch (this.tagName.toLowerCase()) {
// 			case "input":
// 				$(this).attr("langtest", $(this).val());
// 				break;
// 			default:
// 				$(this).attr("langtest", $(this).text());
// 		}
// 	});
// 	// var lang = (getCookieVal("langtest") || "en");
// 	// if (lang == 'zh') {
// 	// 	$("#selectLanguageId").attr('src', 'images/flags/hk.svg');
// 	// }
// 	// else if (lang == 'en') {
// 	// 	$("#selectLanguageId").attr('src', 'images/flags/us.svg')
// 	// }
// }

// function reloadStylesheets() {
// 	var queryString = '?reload=' + new Date().getTime();
// 	$('link[rel="stylesheet"]').each(function () {
// 		console.log(this.href);
// 		this.href = this.href.replace(/\?.*|$/, queryString);
// 		console.log(queryString);
// 		console.log(this.href);
// 	});
// }