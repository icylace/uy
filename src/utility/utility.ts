// Array utilities.

const exclude = (i: number) => (xs: any[]): any[] => [...xs.slice(0, i), ...xs.slice(i + 1)]
const map = (f: (a: any) => any) => (xs: any[]): any[] => xs.map(f)

// -----------------------------------------------------------------------------

// Number utilities.

const asNumber = (x: string): number => Number.parseInt(x, 10)

// -----------------------------------------------------------------------------

// Object utilities.

const delist = (key: string) => (xr: { [k: string]: any }): { [k: string]: any } => {
  const { [key]: _, ...etc } = xr
  return etc
}

const hasOwn = (prop: string) => (obj: { [k: string]: any }): boolean =>
  Object.prototype.hasOwnProperty.call(obj, prop)

// -----------------------------------------------------------------------------

export { asNumber, delist, exclude, hasOwn, map }
