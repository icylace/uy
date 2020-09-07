export const delist = (key: string) => (xr: Record<string, unknown>): Record<string, unknown> => {
  const { [key]: _, ...etc } = xr
  return etc
}

export const exclude = (i: number) => (xs: unknown[]): unknown[] =>
  [...xs.slice (0, i), ...xs.slice (i + 1)]

// export const map = <T, U>(f: (_: T) => U) => (xs: T[]): U[] =>
//   xs.map (f)

// TODO:
// export const pipe = <T extends any>(...fs: ((_: T) => T)[]) => (x: T): T =>
//   fs.reduce ((acc: any, f: Function) => f (acc), x)
export const pipe = (...fs: ((_: any) => any)[]) => (x: any): any =>
  fs.reduce ((acc: any, f: ((_: any) => any)) => f (acc), x)

export const range = (m: number) => (n: number): number[] =>
  [...Array (n - m) as undefined[]].map ((_, i) => m + i)
