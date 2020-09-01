import type { VDOM } from "hyperapp"
import type { Contents } from "ntml"
import type { ComponentOptions } from "../types"

import cc from "classcat"
import { div } from "ntml"

export type PopupOptions = ComponentOptions & {
  id: string
}

export const popup = ({ disabled, id, locked, ...etc }: PopupOptions) => (contents: Contents): VDOM =>
  div ({
    id,
    ...etc,
    class: cc (["uy-container uy-popup", { locked, disabled }, etc.class]),
  }, contents)
