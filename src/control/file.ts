import type { State, VDOM } from "hyperapp"
import type { Control, ControlData, ControlOptions } from "../types"

import * as html from "ntml"
import { component } from "../component"
import { box } from "../container/box"
import { icon } from "../display/icon"

const freshFile = (value: string): ControlData<string> => ({ value })

// https://codepen.io/adamlaki/pen/VYpewx

const rawFile = (
  { disabled, locked, label = "Select your file...", ...etc }: ControlOptions,
) =>
  (data: ControlData<string>): VDOM => {
    return box ({
      disabled,
      locked,
      "uy-control": true,
      "uy-file": true,
      "uy-input": true,
    }) ([
      html.label ({ class: "uy-clicky", "data-text": label }, [
        html.input ({
          disabled,
          value: data.value,
          type: "file",
          // TODO:
          // - probably needs to be rethought
          onchange: <S>(state: State<S>, { target }: any): any => {
            target.parentNode.dataset.text = target.value !== ""
              ? target.value.replace (/.*(\/|\\)/, "")
              : label
            return state
          },
          ...etc,
          class: {
            disabled,
            locked,
            [etc.class]: !!etc.class,
          },
        }),
        html.span ({ class: "uy-clicky" }, [
          icon ({ fas: true, "fa-file-upload": true }),
          " Upload",
        ]),
      ]),
    ])
  }

const file: Control = component (rawFile)

export { freshFile, file }
