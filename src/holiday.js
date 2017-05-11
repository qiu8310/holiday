"use strict";
exports.__esModule = true;
var MIN_YEAR = 2010;
var MAX_YEAR = new Date().getFullYear();
function holiday(dateLike, lang) {
    if (lang === void 0) { lang = 'zh_CN'; }
    var date = typeof dateLike === 'string' ? new Date(dateLike) : dateLike;
    var year = date.getFullYear();
    var monthString = date.getMonth() + 1 + '';
    var dayString = date.getDate() + '';
    var holidayData = {};
    if (year >= MIN_YEAR && year <= MAX_YEAR) {
        try {
            holidayData = require("../data/" + year + "." + lang + ".json");
        }
        catch (e) {
            console.warn("\u6CA1\u6709\u5E74\u4EFD<" + year + ">\uFF0C\u8BED\u8A00<" + lang + ">\u7684\u6570\u636E\uFF0C\u8BF7\u8054\u7CFB\u7BA1\u7406\u5458\u66F4\u65B0");
        }
    }
    if (monthString in holidayData && dayString in holidayData[monthString]) {
        return holidayData[monthString][dayString];
    }
    return isWeekend(date) ? 1 : 0;
}
exports["default"] = holiday;
function isWeekend(date) {
    return [0, 6].includes(date.getDay());
}
