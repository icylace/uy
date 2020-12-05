const assign = <T>(i: number, value: any, xs: T[]): T[] => {
  return [...xs.slice(0, i), value, ...xs.slice(i + 1)]
}

export { assign }
