export default function parseQueryString(queryString: string) {
  if (!queryString) {
    return {}
  }

  const qs =
    queryString.indexOf('?') !== -1
      ? queryString.substring(queryString.indexOf('?') + 1).split('&')
      : queryString.split('&')

  return qs.reduce((prev: Record<string, any>, curr: string) => {
    const [key, value] = curr.split('=')

    let val: string | boolean = decodeURIComponent(value)
    val = ['true', 'false'].includes(val) ? (JSON.parse(val) as boolean) : val
    return (prev[key] = val), prev
  }, {})
}
