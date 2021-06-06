import { pre } from "ntml"

const readoutReplacer = <T>(_key: any, value: T): T | string =>
  typeof value === "function" ? "function" : value

export const readout = (prop: string) => (obj: Record<string, any>): any =>
  pre(`${prop}: ${JSON.stringify(obj[prop], readoutReplacer, 2)}`)
