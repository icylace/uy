import * as shades from "shades"

const get = (path: any[]) => (state: any): any => {
  // @ts-ignore
  return shades.get(...path)(state)
}

const mod = (path: any[]) => (f: (a: any) => any) => (state: any): any => {
  // @ts-ignore
  return shades.mod(...path)(f)(state)
}

const set = (path: any[]) => (value: any) => (state: any): any => {
  // @ts-ignore
  return shades.set(...path)(value)(state)
}

export { get, mod, set }
