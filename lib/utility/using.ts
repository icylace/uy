export const using = <T, U>(fs: T[]) => (x: T): U[] =>
  fs.map((f) => typeof f === "function" ? f(x) : f)
