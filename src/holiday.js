"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MIN_YEAR = 2010;
const MAX_YEAR = new Date().getFullYear();
function holiday(dateLike, lang = 'zh_CN') {
    const date = typeof dateLike === 'string' ? new Date(dateLike) : dateLike;
    let year = date.getFullYear();
    let monthString = date.getMonth() + 1 + '';
    let dayString = date.getDate() + '';
    let holidayData = {};
    if (year >= MIN_YEAR && year <= MAX_YEAR) {
        try {
            holidayData = require(`../data/${year}.${lang}.json`);
        }
        catch (e) {
            console.warn(`没有年份<${year}>，语言<${lang}>的数据，请联系管理员更新`);
        }
    }
    if (monthString in holidayData && dayString in holidayData[monthString]) {
        return holidayData[monthString][dayString];
    }
    return isWeekend(date) ? 1 : 0;
}
exports.default = holiday;
function isWeekend(date) {
    return [0, 6].includes(date.getDay());
}
