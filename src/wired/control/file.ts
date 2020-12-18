import type { Focus } from "eyepiece"
import type { ClassProp, State, VDOM } from "hyperapp"

import { get, set } from "eyepiece"
import * as html from "ntml"
import { box } from "../../wireless/container/box"
import { icon } from "../../wireless/indicator/icon"

export type FileData = {
  value: string
}

export type FileOptions
  = string
  | {
    class?: ClassProp
    disabled?: boolean
    label?: string
  }

const freshFile = (value: string): FileData => {
  return { value }
}

// https://codepen.io/adamlaki/pen/VYpewx

const file = <S>(options: FileOptions = {}) => (...focus: Focus) => (state: State<S>): VDOM<S> => {
  const props = typeof options === "string" ? { label: options } : options
  const { disabled, label = "Select your file...", ...etc } = props
  return box(["uy-control uy-file uy-input", { disabled }], [
    html.label({ "data-text": label }, [
      html.input({
        disabled,
        value: get<FileData>(focus)(state).value,
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
          return set<State<S>>(focus, "value")(target.value)(state) ?? state
        },
        ...etc,
        class: [{ disabled }, etc.class],
      }),
      html.span([icon("fas fa-file-upload"), " Upload"]),
    ]),
  ])
}

export { file, freshFile }
