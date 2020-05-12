import { State, VDOM, h } from "hyperapp"
import { ControlData, NumberboxOptions, Path } from "../types"
import { component } from "../component"
import { box } from "../container/ui"
import { handleValueWith } from "../utility/hyperappHelper"
import { set } from "../utility/shadesHelper"

const freshNumberbox = (value: number): ControlData<number> => ({ value, focused: false })

const sanitizedNumber = (n: any): number => {
  return Math.max (0, Number.parseInt (n, 10))
}

const update = (path: Path) => <S>(state: State<S>, value: string): State<S> => {
  return set ([...path, "value"]) (sanitizedNumber (value)) (state)
}

const rawNumberbox = ({ disabled, locked, label, path, ...etc }: NumberboxOptions) => (data: ControlData<number>): VDOM => {
  return box ("uy-control uy-numberbox") ([
    h ("label", {
      class: {
        disabled,
        locked,
        focus: data.focused,
      },
    }, [
      h ("input", {
        disabled,
        min: 0,
        readonly: locked,
        type: "number",
        value: data.value,
        onchange: handleValueWith (update (path)),
        onfocus: set ([...path, "focused"]) (true),
        onblur: set ([...path, "focused"]) (false),
        ...etc,
        class: {
          disabled,
          locked,
          "uy-input": true,
          [etc.class]: !!etc.class,
        },
      }),
      label != null
        ? h ("span", { class: { disabled, locked, "uy-input": true } }, [label])
        : null,
    ]),
  ])
}

// numberbox :: ControlOptions -> [String] -> State -> VNode
const numberbox = component (rawNumberbox)

export { freshNumberbox, numberbox }
