const delist = (key: string) => <T>(r: Record<string, T>): Record<string, T> => {
  const { [key]: _, ...etc } = r
  return etc
}

// -----------------------------------------------------------------------------

const adjust = <T>(i: number, value: any, xs: T[]): T[] => {
  return [...xs.slice(0, i), value, ...xs.slice(i + 1)]
}

const exclude = <T>(i: number, xs: T[]): T[] => {
  return [...xs.slice(0, i), ...xs.slice(i + 1)]
}

// -----------------------------------------------------------------------------

// const map = <T, U>(f: (_: T) => U) => (xs: T[]): U[] =>
//   xs.map (f)

// TODO:
// const pipe = <T extends any>(...fs: ((_: T) => T)[]) => (x: T): T =>
//   fs.reduce ((acc: any, f: Function) => f (acc), x)
const pipe = (...fs: ((_: any) => any)[]) => (x: any): any => {
  return fs.reduce((acc: any, f: ((_: any) => any)) => f(acc), x)
}

const range = (m: number, n: number): number[] => {
  return [...Array(n - m)].map((_, i) => m + i)
}

// -----------------------------------------------------------------------------

export {
  adjust,
  delist,
  exclude,
  pipe,
  range,
}
