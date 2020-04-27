import * as shades from "shades"

const get = (path: any[]) => (state: any): any => {
  switch (path.length) {
    case 0: return null
    case 1: return shades.get (path[0]) (state)
    case 2: return shades.get (path[0], path[1]) (state)
    case 3: return shades.get (path[0], path[1], path[2]) (state)
    case 4: return shades.get (path[0], path[1], path[2], path[3]) (state)
    case 5: return shades.get (path[0], path[1], path[2], path[3], path[4]) (state)
    case 6: return shades.get (path[0], path[1], path[2], path[3], path[4], path[5]) (state)
  }
  throw Error ("`path` length is greater than 6.")
}

const mod = (path: any[]) => (f: (a: any) => any) => (state: any): any => {
  switch (path.length) {
    case 0: return null
    case 1: return shades.mod (path[0]) (f) (state)
    case 2: return shades.mod (path[0], path[1]) (f) (state)
    case 3: return shades.mod (path[0], path[1], path[2]) (f) (state)
    case 4: return shades.mod (path[0], path[1], path[2], path[3]) (f) (state)
    case 5: return shades.mod (path[0], path[1], path[2], path[3], path[4]) (f) (state)
    case 6: return shades.mod (path[0], path[1], path[2], path[3], path[4], path[5]) (f) (state)
  }
  throw Error ("`path` length is greater than 6.")
}

const set = (path: any[]) => (value: any) => (state: any): any => {
  switch (path.length) {
    case 0: return null
    case 1: return shades.set (path[0]) (value) (state)
    case 2: return shades.set (path[0], path[1]) (value) (state)
    case 3: return shades.set (path[0], path[1], path[2]) (value) (state)
    case 4: return shades.set (path[0], path[1], path[2], path[3]) (value) (state)
    case 5: return shades.set (path[0], path[1], path[2], path[3], path[4]) (value) (state)
    case 6: return shades.set (path[0], path[1], path[2], path[3], path[4], path[5]) (value) (state)
  }
  throw Error ("`path` length is greater than 6.")
}

export { get, mod, set }
