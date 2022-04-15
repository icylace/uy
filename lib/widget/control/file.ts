// TODO:
// - `file` -> `fileUpload`

import { Action, ClassProp, VNode, h, text } from "hyperapp"
import { Focus, get, set } from "eyepiece"
import { icon } from "../indicator/icon"

export type { FileData, FileOptions, FileValue }
export { file, freshFile }

// -----------------------------------------------------------------------------

type FileValue = string

type FileData = {
  value: FileValue
}

type FileOptions<S> =
  | string
  | {
    label?: string
    onchange?: Action<S, FileValue>
    class?: ClassProp
    disabled?: boolean
  }

const freshFile = (value: FileValue): FileData => ({ value })

// https://codepen.io/adamlaki/pen/VYpewx

const file = <S>(options: FileOptions<S> = {}) => (...focus: Focus) => {
  return (state: S): VNode<S> => {
    const props = typeof options === "string" ? { label: options } : options
    const { label = "Select your file...", onchange, disabled, ...etc } = props
    return h("div", { class: ["uy-control uy-file uy-input", etc.class, { disabled }] }, [
      h("label", { "data-text": label }, [
        h("input", {
          type: "file",
          value: get<FileData>(focus)(state).value,
          disabled,
          // TODO:
          // - probably needs to be rethought
          onchange: (state, event) => {
            const target = event.target as HTMLInputElement

            const parent = target.parentNode as HTMLElement
            parent.dataset.text = target.value !== ""
              ? target.value.replace(/.*(\/|\\)/, "")
              : label

            const nextValue = target.value
            const nextState = set<S>(focus, "value")(nextValue)(state)
            return onchange ? onchange(nextState, nextValue) : nextState
          },
          ...etc,
        }),
        h("span", {}, [icon("fas fa-file-upload"), text("Upload")]),
      ]),
    ])
  }
}
