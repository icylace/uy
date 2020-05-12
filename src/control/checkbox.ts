import { State, VDOM, h } from "hyperapp"
import { ControlData, LabelledControlOptions } from "../types"
import { component } from "../component"
import { box } from "../container/ui"

const freshCheckbox = (value: boolean): ControlData<boolean> => ({ value })

const rawCheckbox = ({ disabled, locked, label, update, ...etc }: LabelledControlOptions) => (data: ControlData<boolean>): VDOM => {
  return box ("uy-control uy-checkbox") ([
    h ("label", { class: { disabled, locked } }, [
      h ("input", {
        disabled,
        checked: data.value,
        type: "checkbox",
        onchange: <S>(state: State<S>, event: any): any => update (state, event.target.checked),
        ...etc,
        class: {
          disabled,
          locked,
          "uy-input": true,
          [etc.class]: !!etc.class,
        },
      }),
      label != null ? h ("span", {}, [label]) : null,
    ]),
  ])
}

// checkbox :: LabeledControlOptions -> Path -> State -> VNode
const checkbox = component (rawCheckbox)

export { freshCheckbox, checkbox, rawCheckbox }
