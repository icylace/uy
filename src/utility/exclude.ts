export const exclude = <T>(i: number) => (xs: T[]): T[] =>
  [...xs.slice(0, i), ...xs.slice(i + 1)]
