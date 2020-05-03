import { h } from "hyperapp"
import { get } from "./shadesHelper"

// -----------------------------------------------------------------------------

// Array utilities.

const exclude = (i: number) => (xs: any[]): any[] => [...xs.slice (0, i), ...xs.slice (i + 1)]

// map :: (a -> b) -> [a] -> [b]
const map = (f: (a: any) => any) => (xs: any[]): any[] => xs.map (f)

const range = (m: number) => (n: number): number[] => [...Array (n - m)].map ((_, i) => m + i)

// -----------------------------------------------------------------------------

// Function utilities.

// always :: a -> b -> a
const always = (x: any) => (_: any): any => x

// compose :: (a -> b) -> (c -> a) -> c -> b
const compose = (f: (a: any) => any) => (g: (c: any) => any) => (x: any): any =>
  f (g (x))

// identity :: a -> a
const identity = (x: any): any => x

// ifElse :: (a -> Bool) -> (a -> b) -> (a -> b) -> a -> b
const ifElse = (predicate: (a: any) => boolean) => (f: (a: any) => any) => (g: (a: any) => any) => (x: any): any =>
  predicate (x) ? f (x) : g (x)

// ifExists :: (Nullable a, Nullable b) => (a -> b) -> a -> b
const ifExists = (f: (a: any) => any) => (x: any): any =>
  x != null ? f (x) : null

// ifThen :: (a, Nullable b) => (a -> Bool) -> (a -> b) -> a -> b
const ifThen = (f: Function) => (g: Function) => (x: any): any => f (x) ? g (x) : null

// pipe :: [* -> *] -> * -> *
const pipe = (fs: Function[]) => (x: any): any =>
  fs.reduce ((acc: any, f: Function): any => f (acc), x)

// -----------------------------------------------------------------------------

// Number utilities.

const asNumber = (x: string): number => Number.parseInt (x, 10)

// -----------------------------------------------------------------------------

// Object utilities.

const delist = (key: string) => (xr: { [k: string]: any }): { [k: string]: any } => {
  const { [key]: _, ...etc } = xr
  return etc
}

const hasOwn = (prop: string) => (obj: { [k: string]: any }): boolean => {
  return Object.prototype.hasOwnProperty.call (obj, prop)
}

// -----------------------------------------------------------------------------

// Other utilities.

const isSomething = (x: any): boolean => x != null

const readoutReplacer = (_key: any, value: any): any => typeof value === "function" ? "function" : value
const readout = (path: string[]) => (obj: object): any => {
  const json = JSON.stringify (get (path) (obj), readoutReplacer, 2)
  return h ("pre", {}, [`${path.join (".")}: ${json}`])
}

// -----------------------------------------------------------------------------

export {
  always,
  asNumber,
  compose,
  delist,
  exclude,
  hasOwn,
  identity,
  ifElse,
  ifExists,
  ifThen,
  isSomething,
  map,
  pipe,
  range,
  readout,
}
