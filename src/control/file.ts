import type { ClassProp, State, VDOM } from "hyperapp"
import type { Wiring } from "../component"

import * as html from "ntml"
import { box } from "../container/box"
import { icon } from "../indicator/icon"

export type FileData = {
  value: string
}

export type FileOptions = {
  class?: ClassProp
  disabled?: boolean
  label?: string
}

const freshFile = (value: string): FileData => {
  return { value }
}

// https://codepen.io/adamlaki/pen/VYpewx

const file = <S>(options: FileOptions) => (wiring: Wiring<S, FileData>) => (state: State<S>): VDOM<S> => {
  const { disabled, label = "Select your file...", ...etc } = options
  return box(["uy-control uy-file uy-input", { disabled }], [
    html.label({ "data-text": label }, [
      html.input({
        disabled,
        value: wiring.get(state).value,
        type: "file",
        // TODO:
        // - probably needs to be rethought
        onchange: (state, event) => {
          if (!event) return state
          const target = event.target as HTMLInputElement
          const parent = target.parentNode as HTMLElement
          parent.dataset.text = target.value !== ""
            ? target.value.replace(/.*(\/|\\)/, "")
            : label
          return wiring.set(state, { value: target.value })
        },
        ...etc,
        class: [{ disabled }, etc.class],
      }),
      html.span([icon("fas fa-file-upload"), " Upload"]),
    ]),
  ])
}

export { file, freshFile }
