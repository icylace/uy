// import type { Lens } from "shades"

import * as shades from "shades"

// The `shades` functions are called in a manual fashion instead of using
// argument spreading in order to appease its type definitions.
//
// i.e. `shades.get (...path)` would cause elicit a type-check error.

export type Path = (number | string)[]

export const get = (path: Path) => <T, U>(obj: T): U | null | undefined => {
  if (!path.length) return null
  const p = path.reduce(
    (acc: Path, x: number | string | Path): Path =>
      Array.isArray(x) ? [...acc, ...x] : [...acc, x],
    [],
  )
  switch (p.length) {
    case 0: return null
    case 1: return shades.get(p[0] as any)(obj)
    case 2: return shades.get(p[0] as any, p[1] as any)(obj)
    case 3: return shades.get(p[0] as any, p[1] as any, p[2] as any)(obj)
    case 4: return shades.get(p[0] as any, p[1] as any, p[2] as any, p[3] as any)(obj)
    case 5: return shades.get(p[0] as any, p[1] as any, p[2] as any, p[3] as any, p[4] as any)(obj)
    case 6: return shades.get(p[0] as any, p[1] as any, p[2] as any, p[3] as any, p[4] as any, p[5] as any)(obj)
  }
  throw Error("`path` length is greater than 6.")
}

export const mod = (path: Path) => <U>(f: (_: U) => U) => <T>(obj: T): T => {
  if (!path.length) return obj
  const p = path.reduce(
    (acc: Path, x: number | string | Path): Path =>
      Array.isArray(x) ? [...acc, ...x] : [...acc, x],
    [],
  )
  switch (p.length) {
    case 0: return obj
    case 1: return shades.mod(p[0] as any)(f)(obj)
    case 2: return shades.mod(p[0] as any, p[1] as any)(f)(obj)
    case 3: return shades.mod(p[0] as any, p[1] as any, p[2] as any)(f)(obj)
    case 4: return shades.mod(p[0] as any, p[1] as any, p[2] as any, p[3] as any)(f)(obj)
    case 5: return shades.mod(p[0] as any, p[1] as any, p[2] as any, p[3] as any, p[4] as any)(f)(obj)
    case 6: return shades.mod(p[0] as any, p[1] as any, p[2] as any, p[3] as any, p[4] as any, p[5] as any)(f)(obj)
  }
  throw Error("`path` length is greater than 6.")
}

export const set = (path: Path) => <V>(value: V) => <T>(obj: T): T => {
  if (!path.length) return obj
  const p = path.reduce(
    (acc: Path, x: number | string | Path): Path =>
      Array.isArray(x) ? [...acc, ...x] : [...acc, x],
    [],
  )
  switch (p.length) {
    case 0: return obj
    case 1: return shades.set(p[0] as any)(value)(obj)
    case 2: return shades.set(p[0] as any, p[1] as any)(value)(obj)
    case 3: return shades.set(p[0] as any, p[1] as any, p[2] as any)(value)(obj)
    case 4: return shades.set(p[0] as any, p[1] as any, p[2] as any, p[3] as any)(value)(obj)
    case 5: return shades.set(p[0] as any, p[1] as any, p[2] as any, p[3] as any, p[4] as any)(value)(obj)
    case 6: return shades.set(p[0] as any, p[1] as any, p[2] as any, p[3] as any, p[4] as any, p[5] as any)(value)(obj)
  }
  throw Error("`path` length is greater than 6.")
}
