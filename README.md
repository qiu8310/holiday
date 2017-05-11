# @mora/holiday

[![Greenkeeper badge](https://badges.greenkeeper.io/qiu8310/holiday.svg)](https://greenkeeper.io/)

* 支持获取 `2010-当前` 的节假日
* 其它时间范围只能判断是周末还是工作日


**注意：最新年份的节假日需要等候国家公布后才能知道，并且数据也需要更新进来**

## 安装

```bash
npm install --save @mora/holiday
```

## 使用

* `holiday(date, lang = 'zh_CN')`
* `holiday(dateString, lang = 'zh_CN')`


## 例子

```js
const holiday = require('@mora/holiday')

holiday(new Date()) // => 返回 0, 1 或者 2
holiday('2017-05-01', 'zh_CN') // 2
```

## TODO

* [ ] 自动获取最新的节假日信息


## 字段含义

* `0`: workday
* `1`: weekend
* `2`: holiday
