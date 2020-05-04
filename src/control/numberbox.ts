import { h } from "hyperapp"
import { component } from "../component"
import { box } from "../container/ui"
import { handleValueWith } from "../utility/hyperappHelper"
import { set } from "../utility/shadesHelper"
import { asNumber, ifExists } from "../utility/utility"

// freshNumberbox :: Int -> ControlData
const freshNumberbox = (value: number): any => ({ value, focused: false })

// sanitizedNumber :: Any -> Int
const sanitizedNumber = (n: any): number => {
  return Math.max (0, asNumber (n))
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
      ifExists ((x: any) => h ("span", { class: { disabled, locked, "uy-input": true } }, [x])) (label),
    ]),
  ])
}

// numberbox :: ControlOptions -> [String] -> State -> VNode
const numberbox = component (rawNumberbox)

export { freshNumberbox, numberbox }
