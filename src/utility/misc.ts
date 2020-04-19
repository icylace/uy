import { h } from "hyperapp"
import { get } from "./lens"

const isSomething = (x: any): boolean => x != null

const readout = (path: string[]) => (obj: object): any => {
  const replacer = (_key: any, value: any): any => typeof value === "function" ? "function" : value
  const json = JSON.stringify(get(path)(obj), replacer, 2)
  return h("pre", {}, [`${path.join(".")}: ${json}`])
}

export { isSomething, readout }
