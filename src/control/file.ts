import type { State, VDOM } from "hyperapp"
import type { ComponentOptions, Control, ControlData, Handler } from "../types"

import cc from "classcat"
import * as html from "ntml"
import { component } from "../component"
import { box } from "../container/box"
import { icon } from "../display/icon"

export type FileOptions = ComponentOptions & {
  label?: string
  update: Handler
}

export type FileData = ControlData<string>

export const freshFile = (value: string): FileData => ({ value })

// https://codepen.io/adamlaki/pen/VYpewx

const rawFile = ({ disabled, locked, label = "Select your file...", ...etc }: FileOptions) => (data: FileData): VDOM =>
  box ({
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
        onchange: <S>(state: State<S>, event: Event): State<S> => {
          const target = event.target as HTMLInputElement
          const parent = target.parentNode as HTMLElement
          parent.dataset.text =
            target.value !== ""
              ? target.value.replace (/.*(\/|\\)/, "")
              : label
          return state
        },
        ...etc,
        class: cc ([{ disabled, locked }, etc.class]),
      }),
      html.span ({ class: "uy-clicky" }, [icon ("fas fa-file-upload"), " Upload"]),
    ]),
  ])

export const file: Control = component (rawFile)
