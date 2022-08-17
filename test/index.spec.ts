import { sayHello } from '../src/index'

describe('Test', () => {
  it('sayHello', () => {
    expect(sayHello('2046')).toBe('Hello 2046')
  })
})
