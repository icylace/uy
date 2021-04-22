export const delist = (prop: string) => {
  return (r: Record<string, any>): Record<string, any> => {
    const { [prop]: _, ...etc } = r
    return etc
  }
}
