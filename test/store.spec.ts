import { store } from '../src'
import { describe, test, expect } from '@jest/globals'

describe('Store', () => {
  it('get', () => {
    localStorage.setItem('hello1', JSON.stringify('world'))

    expect(store.get<null>('test')).toBeNull()
    expect(store.get<string>('hello1')).toBe('world')
  })

  it('get expired data', (done) => {
    localStorage.setItem(
      'hello4',
      JSON.stringify({ payload: 'world', _t: Date.now() })
    )

    setTimeout(() => {
      expect(store.get<string>('hello4')).toBeNull()
      done()
    }, 100)
  })

  it('get unexpired data', (done) => {
    localStorage.setItem(
      'hello5',
      JSON.stringify({ payload: 'world', _t: Date.now() + 1000 })
    )

    setTimeout(() => {
      expect(store.get<string>('hello5')).toBe('world')
      done()
    }, 100)
  })

  it('set', () => {
    store.set('hello6', 'world')
    expect(localStorage.getItem('hello6')).toBe('"world"')
    expect(store.get<string>('hello6')).toBe('world')
  })

  it('set expired data', (done) => {
    store.set('hello7', 'world', '1s')
    store.set('hello8', 'world', '1m')
    store.set('hello9', 'world', '1h')
    store.set('hello10', 'world', '1d')

    expect(store.get<string>('hello7')).toBe('world')

    setTimeout(() => {
      expect(store.get<string>('hello7')).toBeNull()
      expect(store.get<string>('hello8')).toBe('world')
      expect(store.get<string>('hello9')).toBe('world')
      expect(store.get<string>('hello10')).toBe('world')
      done()
    }, 1100)
  })

  it('get data parsing exception', () => {
    localStorage.setItem('hello12', 'world')
    expect(store.get<string>('hello12')).toBeNull()
  })

  it('set throw exception', () => {
    expect(() => store.set('hello11', 'world', '1y')).toThrow(
      'Invalid argument format.'
    )
  })

  it('set & get data', () => {
    store.set('hello13', 'world')
    expect(store.get('hello13')).toBe('world')
  })

  it('remove', () => {
    localStorage.setItem('hello2', 'world')

    store.remove('hello2')
    expect(localStorage.getItem('hello2')).toBeNull()
  })

  it('clear', () => {
    localStorage.setItem('hello3', JSON.stringify('world'))
    expect(localStorage.getItem('hello3')).toBe('"world"')

    store.clear()

    expect(localStorage.getItem('hello3')).toBeNull()
  })
})
