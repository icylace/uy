export const delist = <T>(prop: string) => (r: Record<string, T>): Record<string, T> => {
  const { [prop]: _, ...etc } = r
  return etc
}
