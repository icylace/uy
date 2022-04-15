export { range }

// -----------------------------------------------------------------------------

const range = (m: number, n: number): number[] =>
  [...Array(n - m)].map((_, i) => m + i)
