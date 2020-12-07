const assign = <T>(value: any, i: number, xs: T[]): T[] => {
  return [...xs.slice(0, i), value, ...xs.slice(i + 1)]
}

export { assign }
