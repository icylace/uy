// TODO:
// - (?) use eyepiece with `readout`

import { h, text } from "hyperapp"

export { readout }

// -----------------------------------------------------------------------------

const readoutReplacer = <T>(_key: any, value: T): T | string =>
  typeof value === "function" ? "function" : value

const readout = (prop: string) => (obj: Record<string, any>): any =>
  h("pre", {}, text(`${prop}: ${JSON.stringify(obj[prop], readoutReplacer, 2)}`))
