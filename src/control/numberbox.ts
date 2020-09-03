import type { Payload, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { ComponentOptions, Control, ControlData, Handler } from "../types"
import type { Path } from "../utility/shadesHelper"

import cc from "classcat"
import * as html from "ntml"
import { set } from "../utility/shadesHelper"
import { component } from "../component"
import { box } from "../container/box"

export type NumberboxOptions = ComponentOptions & {
  label?: Content
  path: Path
  update: Handler
}

export type NumberboxData = ControlData<number> & {
  focused?: boolean
}

export const freshNumberbox = (value: number): NumberboxData => ({
  value,
  focused: false,
})

const sanitizedNumber = (n: string): number =>
  Math.max (0, Number.parseInt (n, 10))

const update = (path: Path) =>
  <S>(state: State<S>, value: Payload<string>): State<S> =>
    set ([...path, "value"]) (sanitizedNumber (value as unknown as string)) (state)

const rawNumberbox = ({ disabled, locked, label, path, ...etc }: NumberboxOptions) => (data: NumberboxData): VDOM =>
  box ("uy-control uy-numberbox") ([
    html.label ({ class: { focus: !!data.focused, locked, disabled } }, [
      html.input ({
        disabled,
        min: 0,
        readonly: locked,
        type: "number",
        value: data.value,
        onchange: (state, event) => {
          if (!event) return state
          const target = event.target as HTMLInputElement
          return update (path) (state, target.value)
        },
        onfocus: set ([...path, "focused"]) (true),
        onblur: set ([...path, "focused"]) (false),
        ...etc,
        class: cc (["uy-input", { locked, disabled }, etc.class]),
      }),
      label != null
        ? html.span ({ class: { "uy-input": true, locked, disabled } }, label)
        : null,
    ]),
  ])

export const numberbox: Control = component (rawNumberbox)
