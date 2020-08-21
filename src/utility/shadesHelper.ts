import * as shades from "shades"

// The `shades` functions are called in a manual fashion instead of using
// argument spreading in order to appease its type definitions.
//
// i.e. `shades.get (...path)` would cause elicit a type-check error.

const get = (path: (number | string)[]) => <T>(obj: T): any => {
  if (!path.length) return null
  const p: any[] = path.reduce ((acc, x) => Array.isArray (x) ? [...acc, ...x] : [...acc, x], [])
  switch (p.length) {
    case 1: return shades.get (p[0]) (obj)
    case 2: return shades.get (p[0], p[1]) (obj)
    case 3: return shades.get (p[0], p[1], p[2]) (obj)
    case 4: return shades.get (p[0], p[1], p[2], p[3]) (obj)
    case 5: return shades.get (p[0], p[1], p[2], p[3], p[4]) (obj)
    case 6: return shades.get (p[0], p[1], p[2], p[3], p[4], p[5]) (obj)
  }
  throw Error ("`path` length is greater than 6.")
}

const mod = (path: (number | string)[]) => (f: (_: any) => any) => <T>(obj: T): any => {
  if (!path.length) return null
  const p: any[] = path.reduce ((acc, x) => Array.isArray (x) ? [...acc, ...x] : [...acc, x], [])
  switch (p.length) {
    case 1: return shades.mod (p[0]) (f) (obj)
    case 2: return shades.mod (p[0], p[1]) (f) (obj)
    case 3: return shades.mod (p[0], p[1], p[2]) (f) (obj)
    case 4: return shades.mod (p[0], p[1], p[2], p[3]) (f) (obj)
    case 5: return shades.mod (p[0], p[1], p[2], p[3], p[4]) (f) (obj)
    case 6: return shades.mod (p[0], p[1], p[2], p[3], p[4], p[5]) (f) (obj)
  }
  throw Error ("`path` length is greater than 6.")
}

const set = (path: (number | string)[]) => (value: any) => <T>(obj: T): any => {
  if (!path.length) return null
  const p: any[] = path.reduce ((acc, x) => Array.isArray (x) ? [...acc, ...x] : [...acc, x], [])
  switch (p.length) {
    case 0: return null
    case 1: return shades.set (p[0]) (value) (obj)
    case 2: return shades.set (p[0], p[1]) (value) (obj)
    case 3: return shades.set (p[0], p[1], p[2]) (value) (obj)
    case 4: return shades.set (p[0], p[1], p[2], p[3]) (value) (obj)
    case 5: return shades.set (p[0], p[1], p[2], p[3], p[4]) (value) (obj)
    case 6: return shades.set (p[0], p[1], p[2], p[3], p[4], p[5]) (value) (obj)
  }
  throw Error ("`path` length is greater than 6.")
}

export { get, mod, set }
