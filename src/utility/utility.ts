const adjust = <T>(i: number, value: any, xs: T[]): T[] => {
  return [...xs.slice(0, i), value, ...xs.slice(i + 1)]
}

const delist = (prop: string) => (r: Record<string, any>): Record<string, any> => {
  const { [prop]: _, ...etc } = r
  return etc
}

const exclude = <T>(i: number, xs: T[]): T[] => {
  return [...xs.slice(0, i), ...xs.slice(i + 1)]
}

const range = (m: number, n: number): number[] => {
  return [...Array(n - m)].map((_, i) => m + i)
}

export { adjust, delist, exclude, range }
