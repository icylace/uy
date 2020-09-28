import type { ClassProp } from "hyperapp"

export type ComponentOptions = {
  [_: string]: unknown
  class?: ClassProp
  disabled?: boolean
  locked?: boolean
}
