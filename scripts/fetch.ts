// http://tool.bitefu.net/jiari/
// http://www.easybots.cn/holiday_api.net

// http://tool.bitefu.net/jiari/?d=20130101,20130103,20130105,20130201
// http://www.easybots.cn/api/holiday.php?d=20130101,20130103,20130105,20130201
import * as rp from 'request-promise'
import * as path from 'path'
import * as fs from 'fs'

const date = new Date(process.argv[2]) // 输入年份
const DATA_DIR = path.join(path.dirname(__dirname), 'data')

fetch(date.getFullYear())
  .then(msg => console.log(msg))
  .catch(err => console.log(err))

async function fetch(year: number, lang: string = 'zh_CN') {
  let data = await fetchYear(year)
  fs.writeFileSync(path.join(DATA_DIR, `${year}.${lang}.json`), JSON.stringify(data, null, 2))
  return 'done'
}

async function fetchYear(year: number) {
  let months = new Array(12).fill(0).map((_, i) => i + 1)
  let promiseFuns = months.map(month => async function() {
    return await fetchMonth(year, month)
  })

  return (await Promise.all(promiseFuns.map(fn => fn())))
    .reduce((res, map) => {
      Object.assign(res, map)
      return res
    }, {})
}

async function fetchMonth(year: number, month: number) {
  let days: number = getMonthDays(year, month)
  let daysString: Array<string> = new Array(days).fill(0)
    .map((_, i) => format(i + 1))
    .map(day => `${year}-${format(month)}-${day}`)

  let statusMapStr = await rp.get(`http://www.easybots.cn/api/holiday.php?d=${daysString.join(',')}`)
  let statusMap = JSON.parse(statusMapStr)

  let monthData = daysString.reduce((result, ds) => {
    let date = new Date(ds)
    let status = parseInt(statusMap[ds.replace(/-/g, '')])

    if (isNaN(status)) throw new Error(`结果 ${statusMapStr} 有问题`)

    let isWeekend = [0, 6].includes(date.getDay())
    if (isWeekend && status !== 1 || !isWeekend && status !== 0) {
      result[date.getDate()] = status
    }

    return result
  }, {})

  return Object.keys(monthData).length ? {[month]: monthData} : {}
}

function getMonthDays(year: number, month: number) : number {
  let d31 = [1, 3, 5, 7, 8, 10, 12]
  let d30 = [4, 6, 9, 11]
  if (d31.includes(month)) return 31
  if (d30.includes(month)) return 30
  if (year % 100 === 0) return year % 400 === 0 ? 29 : 28
  return year % 4 === 0 ? 29 : 28
}

function format(num: number): string {
  return (num < 10 ? '0' : '') + num
}
