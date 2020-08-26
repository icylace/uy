const delist = (key: string) => (xr: { [_: string]: any }): { [k: string]: any } => {
  const { [key]: _, ...etc } = xr
  return etc
}

const exclude = (i: number) => <T>(xs: T[]): T[] =>
  [...xs.slice (0, i), ...xs.slice (i + 1)]

const hasOwn = (prop: string) => (obj: { [_: string]: any }): boolean =>
  Object.prototype.hasOwnProperty.call (obj, prop)

const map = <T, U>(f: (_: T) => U) => (xs: T[]): U[] =>
  xs.map (f)

const pipe = <T extends any>(...fs: ((_: T) => T)[]) => (x: T): T =>
  fs.reduce ((acc: any, f: Function) => f (acc), x)

const range = (m: number) => (n: number): number[] =>
  [...Array (n - m) as undefined[]].map ((_, i) => m + i)

export {
  delist,
  exclude,
  hasOwn,
  map,
  pipe,
  range,
}
