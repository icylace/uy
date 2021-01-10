// TODO:
// - `file` -> `fileUpload`

import type { Focus } from "eyepiece"
import type { ActionTransform, ClassProp, State, VDOM } from "hyperapp"

import { get, set } from "eyepiece"
import * as html from "ntml"
import { box } from "../container/box"
import { icon } from "../indicator/icon"

export type FileValue = string

export type FileData = {
  value: FileValue
}

export type FileOptions<S>
  = string
  | {
    label?: string
    onchange?: ActionTransform<S, FileValue>
    class?: ClassProp
    disabled?: boolean
  }

const freshFile = (value: FileValue): FileData => ({ value })

// https://codepen.io/adamlaki/pen/VYpewx

const file = <S>(options: FileOptions<S> = {}) => (...focus: Focus) => {
  return (state: State<S>): VDOM<S> => {
    const props = typeof options === "string" ? { label: options } : options
    const { label = "Select your file...", onchange, disabled, ...etc } = props
    return box(["uy-control uy-file uy-input", { disabled }], [
      html.label({ "data-text": label }, [
        html.input({
          type: "file",
          value: get<FileData>(focus)(state).value,
          disabled,
          // TODO:
          // - probably needs to be rethought
          onchange: (state, event) => {
            if (!event) return state
            const target = event.target as HTMLInputElement

            const parent = target.parentNode as HTMLElement
            parent.dataset.text = target.value !== ""
              ? target.value.replace(/.*(\/|\\)/, "")
              : label

            const nextValue = target.value
            const nextState = set<State<S>>(focus, "value")(nextValue)(state)
            return onchange ? onchange(nextState, nextValue) : nextState
          },
          ...etc,
          class: [{ disabled }, etc.class],
        }),
        html.span([icon("fas fa-file-upload"), "Upload"]),
      ]),
    ])
  }
}

export { file, freshFile }
