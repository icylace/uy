import { h } from "hyperapp"
import { box } from "../container/ui"
import { icon } from "../display/icon"
import { component } from "../utility/component"
import { action } from "../utility/event"

// freshFile :: String -> ControlData
const freshFile = (value: string): any => ({ value })

// https://codepen.io/adamlaki/pen/VYpewx

// rawFile :: LabeledControlOptions -> Object -> VNode
const rawFile = ({ disabled, locked, update, label = "Select your file...", ...etc }: any) => (data: any): any =>
  box({
    disabled,
    locked,
    "uy-control": true,
    "uy-file": true,
    "uy-input": true,
  }, [
    h("label", { class: "uy-clicky", "data-text": label }, [
      h("input", {
        disabled,
        value: data.value,
        type: "file",
        // TODO:
        // - probably needs to be rethought
        onchange: action(({ target }: any) => (state: any) => {
          target.parentNode.dataset.text = target.value !== "" ? target.value.replace(/.*(\/|\\)/, "") : label
          return state
        }),
        ...etc,
        class: {
          disabled,
          locked,
          [etc.class]: !!etc.class,
        },
      }),
      h("span", { class: "uy-clicky" }, [
        icon({ fas: true, "fa-file-upload": true }),
        " Upload",
      ]),
    ]),
  ])

// file :: LabeledControlOptions -> [String] -> State -> VNode
const file = component(rawFile)

export { freshFile, file }
