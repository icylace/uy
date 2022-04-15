export { using }

// -----------------------------------------------------------------------------

type Callable<T, U> = ((_: T) => U)

const using = <T, U>(fs: readonly (Callable<T, U> | U)[]) => (x: T): U[] =>
  fs.map((f) => typeof f === "function" ? (f as Callable<T, U>)(x) : f)
