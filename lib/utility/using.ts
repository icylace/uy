export const using = <T, U>(fs: ((_: T) => U)[]) => (x: T): U[] =>
  fs.map((f) => f(x))
