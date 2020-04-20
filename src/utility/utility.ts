// Array utilities.

const exclude = (i: number) => (xs: any[]): any[] => [...xs.slice(0, i), ...xs.slice(i + 1)]
const map = (f: (a: any) => any) => (xs: any[]): any[] => xs.map(f)

// -----------------------------------------------------------------------------

// Function utilities.

// compose :: (a -> b) -> (c -> a) -> c -> b
const compose = (f: (a: any) => any) => (g: (c: any) => any) => (x: any): any =>
  f(g(x))

// identity :: a -> a
const identity = (x: any): any => x

// ifExists :: (Nullable a, Nullable b) => (a -> b) -> a -> b
const ifExists = (f: (a: any) => any) => (x: any): any => (x != null ? f(x) : null)

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

// Other utilities.

const isSomething = (x: any): boolean => x != null

// -----------------------------------------------------------------------------

export { asNumber, compose, delist, exclude, hasOwn, identity, ifExists, isSomething, map }
