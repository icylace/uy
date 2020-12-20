export const assign = <T>(value: any, i: number, xs: T[]): T[] =>
  [...xs.slice(0, i), value, ...xs.slice(i + 1)]
