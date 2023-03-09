export default async function polling<T = any>(options: {
  interval?: number
  maxAttempts?: number
  fn: () => Promise<T>
  validate: (result: T) => boolean
}) {
  let attempts = 0
  const { fn, validate, interval = 100, maxAttempts = 10 } = options

  const executePoll = (
    resolve: (value: T) => void,
    reject: (reason?: any) => void
  ) => {
    fn()
      .then((result) => {
        attempts++

        if (validate(result)) {
          resolve(result)
        } else if (maxAttempts && attempts === maxAttempts) {
          reject(new Error('Exceeded max attempts'))
        } else {
          setTimeout(executePoll, interval, resolve, reject)
        }
      })
      .catch((error) => reject(error))
  }

  return new Promise(executePoll)
}
