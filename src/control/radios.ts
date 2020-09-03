import type { VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { Control, ControlData, ControlOptions } from "../types"

import cc from "classcat"
import * as html from "ntml"
import { component } from "../component"
import { box } from "../container/box"

export type RadiosOptions = ControlOptions & {
  options: Record<string, Content>
}

export type RadiosData = ControlData<string>

export const freshRadios = (value: string): RadiosData =>
  ({ value })

const rawRadios =
  ({ disabled, locked, options, update, ...etc }: RadiosOptions) =>
    (data: RadiosData): VDOM =>
      box ("uy-control uy-radios") (
        // TODO:
        // - switch to using a Map object instead in order to guarantee order
        Object.entries (options).map (([value, label]: [string, Content]): VDOM =>
          html.label ({ class: { locked, disabled } }, [
            html.input ({
              disabled,
              value,
              checked: value === data.value,
              type: "radio",
              onchange: (state, event) => {
                if (!event) return state
                const target = event.target as HTMLInputElement
                return update (state, target.value)
              },
              ...etc,
              class: cc (["uy-input", { locked, disabled }, etc.class]),
            }),
            label != null ? html.span (label) : null,
          ]),
        ),
      )

export const radios: Control = component (rawRadios)
