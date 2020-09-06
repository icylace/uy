import type { ClassProp, Payload, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { Transform } from "../types"
import type { Path } from "../utility/shadesHelper"

import cc from "classcat"
import * as html from "ntml"
import { set } from "../utility/shadesHelper"
import { component } from "../component"
import { box } from "../container/box"

export type NumberboxOptions<S, P>= {
  [_: string]: unknown
  class?: ClassProp
  disabled: boolean
  label?: Content<S>
  locked: boolean
  path: Path
  update: Transform<S, P>
}

export type NumberboxData = {
  focused?: boolean
  value: number
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

const rawNumberbox =
  <S, P>({ disabled, locked, label, path, ...etc }: NumberboxOptions<S, P>) =>
    (data: NumberboxData): VDOM<S> =>
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

export const numberbox = component (rawNumberbox)
