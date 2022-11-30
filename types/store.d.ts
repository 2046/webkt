declare const _default: {
  get<T>(key: string): T | null
  set<T_1>(key: string, value: T_1, expire?: string): void
  remove(key: string): void
  clear(): void
}
export default _default
