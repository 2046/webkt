import { polling } from '../src'
import { describe, expect } from '@jest/globals'

describe('polling', () => {
  it('general polling', () => {
    let counter = 0

    polling({
      fn: () => {
        if (counter === 5) {
          return Promise.resolve(1)
        } else {
          counter++
          return Promise.resolve(2)
        }
      },
      validate: (result) => result === 1
    }).then((result) => {
      expect(result).toBe(1)
    })
  })

  it('polling with max attempts', () => {
    let counter = 0

    polling({
      fn: () => {
        if (counter === 5) {
          return Promise.resolve(1)
        } else {
          counter++
          return Promise.resolve(2)
        }
      },
      maxAttempts: 3,
      validate: (result) => result === 1
    }).catch((error) => {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toBe('Exceeded max attempts')
    })
  })

  it('polling fn exception', () => {
    let counter = 0

    polling({
      fn: () => {
        if (counter === 5) {
          return Promise.reject(new Error('test'))
        } else {
          counter++
          return Promise.resolve(2)
        }
      },
      validate: (result) => result === 1
    }).catch((error) => {
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toBe('test')
    })
  })
})
