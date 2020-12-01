const range = (m: number, n: number): number[] => {
  return [...Array(n - m)].map((_, i) => m + i)
}

export { range }
