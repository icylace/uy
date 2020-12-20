export const encase = <T>(x: T | T[]): T[] =>
  Array.isArray(x) ? x : [x]
