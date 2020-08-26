import type { State, VDOM } from "hyperapp"
import type { Control, ControlData, NumberboxOptions, Path } from "../types"

import cc from "classcat"
import * as html from "ntml"
import { handleValueWith } from "../utility/hyperappHelper"
import { set } from "../utility/shadesHelper"
import { component } from "../component"
import { box } from "../container/box"

const freshNumberbox = (value: number): ControlData<number> => ({
  value,
  focused: false,
})

const sanitizedNumber = (n: any): number => Math.max (0, Number.parseInt (n, 10))

const update = (path: Path) =>
  <S>(state: State<S>, value: string): State<S> =>
    set ([...path, "value"]) (sanitizedNumber (value)) (state)

const rawNumberbox = (
  { disabled, locked, label, path, ...etc }: NumberboxOptions,
) =>
  (data: ControlData<number>): VDOM => {
    return box ("uy-control uy-numberbox") ([
      html.label ({
        class: {
          focus: data.focused,
          locked,
          disabled,
        },
      }, [
        html.input ({
          disabled,
          min: 0,
          readonly: locked,
          type: "number",
          value: data.value,
          onchange: handleValueWith (update (path)),
          onfocus: set ([...path, "focused"]) (true),
          onblur: set ([...path, "focused"]) (false),
          ...etc,
          class: cc ([{ "uy-input": true, locked, disabled }, etc.class]),
        }),
        label != null
          ? html.span ({ class: { disabled, locked, "uy-input": true } }, label)
          : null,
      ]),
    ])
  }

const numberbox: Control = component (rawNumberbox)

export { freshNumberbox, numberbox }
