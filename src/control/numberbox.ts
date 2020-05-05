import { h } from "hyperapp"
import { component } from "../component"
import { box } from "../container/ui"
import { handleValueWith } from "../utility/hyperappHelper"
import { set } from "../utility/shadesHelper"

// freshNumberbox :: Int -> ControlData
const freshNumberbox = (value: number): any => ({ value, focused: false })

// sanitizedNumber :: Any -> Int
const sanitizedNumber = (n: any): number => {
  return Math.max (0, Number.parseInt (n, 10))
}

// update :: [String] -> String -> State -> State
const update = (path: string[]) => (state: any, value: string): any => {
  return set ([...path, "value"]) (sanitizedNumber (value)) (state)
}

// rawNumberbox :: LabeledControlOptions -> Object -> VNode
const rawNumberbox = ({ disabled, locked, label, path, ...etc }: any) => (data: any): any => {
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
