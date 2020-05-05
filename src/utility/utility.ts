const delist = (key: string) => (xr: { [k: string]: any }): { [k: string]: any } => {
  const { [key]: _, ...etc } = xr
  return etc
}

const exclude = (i: number) => <T>(xs: T[]): T[] => {
  return [...xs.slice (0, i), ...xs.slice (i + 1)]
}

const hasOwn = (prop: string) => (obj: { [k: string]: any }): boolean => {
  return Object.prototype.hasOwnProperty.call (obj, prop)
}

const map = <T, U>(f: (a: T) => U) => (xs: T[]): U[] => {
  return xs.map (f)
}

const pipe = (fs: Function[]) => (x: any): any => {
  return fs.reduce ((acc: any, f: Function) => f (acc), x)
}

const range = (m: number) => (n: number): number[] => {
  return [...Array (n - m)].map ((_, i) => m + i)
}

export {
  delist,
  exclude,
  hasOwn,
  map,
  pipe,
  range,
}
