type Callable<T, U> = ((_: T) => U)

export const using = <T, U>(fs: (Callable<T, U> | U)[]) => (x: T): U[] =>
  fs.map((f) => typeof f === "function" ? (f as Callable<T, U>)(x) : f)
