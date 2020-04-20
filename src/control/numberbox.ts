import { h } from "hyperapp"
import { box } from "../container/ui"
import { component } from "../utility/component"
import { action, handleValueWith } from "../utility/event"
import { set } from "../utility/lens"
import { asNumber, ifExists } from "../utility/utility"

// freshNumberbox :: Int -> ControlData
const freshNumberbox = (value: number): any => ({ value, focused: false })

// sanitizedNumber :: Any -> Int
const sanitizedNumber = (n: any): number => Math.max(0, asNumber(n))

// update :: [String] -> String -> State -> State
const update = (path: string[]) => (value: string): any => set([...path, "value"])(sanitizedNumber(value))

// rawNumberbox :: LabeledControlOptions -> Object -> VNode
const rawNumberbox = ({ disabled, locked, label, path, ...etc }: any): any => (data: any): any =>
  box("uy-control uy-numberbox", [
    h("label", {
      class: {
        disabled,
        locked,
        focus: data.focused,
      },
    }, [
      h("input", {
        disabled,
        min: 0,
        readonly: locked,
        type: "number",
        value: data.value,
        onchange: handleValueWith(update(path)),
        onfocus: action((_event: any) => set([...path, "focused"])(true)),
        onblur: action((_event: any) => set([...path, "focused"])(false)),
        ...etc,
        class: {
          disabled,
          locked,
          "uy-input": true,
          [etc.class]: !!etc.class,
        },
      }),
      ifExists((x: any) => h("span", { class: { disabled, locked, "uy-input": true } }, [x]))(label),
    ]),
  ])

// numberbox :: ControlOptions -> [String] -> State -> VNode
const numberbox = component(rawNumberbox)

export { freshNumberbox, numberbox }
