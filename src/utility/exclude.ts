const exclude = <T>(i: number, xs: T[]): T[] => {
  return [...xs.slice(0, i), ...xs.slice(i + 1)]
}

export { exclude }
