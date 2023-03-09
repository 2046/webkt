import { parseQueryString } from '../src'
import { describe, expect } from '@jest/globals'

describe('parseQueryString', () => {
  it('parse url search', () => {
    expect(parseQueryString('?a=1&b=2&c=3')).toEqual({ a: '1', b: '2', c: '3' })
    expect(parseQueryString('?a=1&b=2&c=3&c=4')).toEqual({
      a: '1',
      b: '2',
      c: '4'
    })
    expect(parseQueryString('?a=1&b=true')).toEqual({ a: '1', b: true })

    expect(parseQueryString('a=1&b=2&c=3')).toEqual({ a: '1', b: '2', c: '3' })
    expect(parseQueryString('a=1&b=2&c=3&c=4')).toEqual({
      a: '1',
      b: '2',
      c: '4'
    })
    expect(parseQueryString('a=1&b=true')).toEqual({ a: '1', b: true })
  })

  it('parse url', () => {
    expect(parseQueryString('https://example.com/test?a=1&b=2&c=3')).toEqual({
      a: '1',
      b: '2',
      c: '3'
    })
    expect(parseQueryString('https://example.com/?a=1&b=2&c=3&c=4')).toEqual({
      a: '1',
      b: '2',
      c: '4'
    })
    expect(parseQueryString('https://example.com?a=1&b=true')).toEqual({
      a: '1',
      b: true
    })
  })

  it('parse url query string with empty string', () => {
    expect(parseQueryString('')).toEqual({})
  })
})
