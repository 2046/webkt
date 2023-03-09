import { compareVersion } from '../src'
import { describe, expect } from '@jest/globals'

describe('compareVersion', () => {
  it('currentVersion < targetVersion', () => {
    expect(compareVersion('2.0.0', '1.0.0')).toBe(-1)
    expect(compareVersion('1.1.0', '1.0.0')).toBe(-1)
    expect(compareVersion('1.0.1', '1.0.0')).toBe(-1)
  })

  it('currentVersion > targetVersion', () => {
    expect(compareVersion('1.0.0', '2.0.0')).toBe(1)
    expect(compareVersion('1.0.0', '1.1.0')).toBe(1)
    expect(compareVersion('1.0.0', '1.0.1')).toBe(1)
  })

  it('currentVersion == targetVersion', () => {
    expect(compareVersion('1.0.0', '1.0.0')).toBe(0)
  })
})
