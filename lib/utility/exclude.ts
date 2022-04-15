export { exclude }

// -----------------------------------------------------------------------------

const exclude = <T>(i: number) => (xs: readonly T[]): T[] =>
  [...xs.slice(0, i), ...xs.slice(i + 1)]
