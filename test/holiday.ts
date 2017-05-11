import * as assert from 'assert'
import * as sinon from 'sinon'

import holiday from '../src/holiday'


describe('holiday', () => {
  it('date format', () => {
    assert.ok([0, 1, 2].includes(holiday(new Date())), '可以接受 Date 参数')
    assert.ok([0, 1, 2].includes(holiday('2019-02-01')), '可以接受可以转化成 Date 的字符串参数')
    assert.ok([0, 1, 2].includes(holiday('2019-02-01', 'zh_CN')), '也可以指定地区')
  })
  it('output warn', () => {
    let spy = sinon.stub(console, 'warn')
    assert.equal(holiday('2017-02-05', 'en'), 1, 'en 不存在，应该输出警告')
    assert.ok(spy.callCount === 1, 'console.warn 应该被调用了')
    spy.restore()
  })
  it('<= min year', () => {
    assert.equal(holiday('2005-01-02'), 1, '2005-01-02 应该是星期天')
    assert.equal(holiday('2005-01-10'), 0, '2005-01-02 应该是星期一')
  })
  it('<= min year && >= max year', () => {
    assert.equal(holiday('2017-01-29'), 2, '2017-01-29 应该是春节')
    assert.equal(holiday('2017-02-04'), 0, '2017-02-04 应该是星期六，但需要上班（调春节的休）')
    assert.equal(holiday('2017-02-05'), 1, '2017-02-05 应该是星期天')
  })
})
