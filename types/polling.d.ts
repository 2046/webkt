export default function polling<T = any>(options: {
  interval?: number
  maxAttempts?: number
  fn: () => Promise<T>
  validate: (result: T) => boolean
}): Promise<T>
