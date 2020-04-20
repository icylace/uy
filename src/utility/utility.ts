// Array utilities.

const exclude = (i: number) => (xs: any[]): any[] => [...xs.slice(0, i), ...xs.slice(i + 1)]
const map = (f: (a: any) => any) => (xs: any[]): any[] => xs.map(f)
const range = (m: number) => (n: number): number[] => [...Array(n - m)].map((_, i) => m + i)

// -----------------------------------------------------------------------------

// Function utilities.

// compose :: (a -> b) -> (c -> a) -> c -> b
const compose = (f: (a: any) => any) => (g: (c: any) => any) => (x: any): any =>
  f(g(x))

// identity :: a -> a
const identity = (x: any): any => x

// ifElse :: (a -> Bool) -> (a -> b) -> (a -> b) -> a -> b
const ifElse = (predicate: (a: any) => boolean) => (f: (a: any) => any) => (g: (a: any) => any) => (x: any) =>
  predicate(x) ? f(x) : g(x)

// ifExists :: (Nullable a, Nullable b) => (a -> b) -> a -> b
const ifExists = (f: (a: any) => any) => (x: any): any =>
  x != null ? f(x) : null

// pipe :: [* -> *] -> * -> *
const pipe = (fs: Function[]) => (x: any): any =>
  fs.reduce((acc: any, f: Function): any => f(acc), x)

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

export { asNumber, compose, delist, exclude, hasOwn, identity, ifElse, ifExists, isSomething, map, pipe, range }
