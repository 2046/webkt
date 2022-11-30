export default {
  get<T>(key: string) {
    const value = normalize(parse<T>(localStorage.getItem(key) || 'null'))

    if (value._t && Date.now() >= value._t) {
      this.remove(key)
      value.payload = null
    }

    return value.payload
  },
  set<T>(key: string, value: T, expire?: string) {
    if (expire) {
      localStorage.setItem(
        key,
        JSON.stringify({
          payload: value,
          _t: Date.now() + toSecond(expire)
        })
      )
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    }
  },
  remove(key: string) {
    localStorage.removeItem(key)
  },
  clear() {
    localStorage.clear()
  }
}

function parse<T>(text: string) {
  try {
    return <T>JSON.parse(text)
  } catch (error) {
    return null
  }
}

function normalize<T>(value: T) {
  const val = <{ payload: T; _t: number }>value

  return val && val._t ? val : { _t: 0, payload: value }
}

function toSecond(val: string) {
  const [unit, ...tail] = [...val.trim()].reverse()
  const number = parseInt(tail.reverse().join(''), 10)

  switch (unit.toUpperCase()) {
    case 'S':
      return number * 1000
    case 'M':
      return number * 60000
    case 'H':
      return number * 3600000
    case 'D':
      return number * 86400000
    default:
      throw new Error('Invalid argument format.')
  }
}
