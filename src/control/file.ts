import type { ClassProp, Transform, VDOM } from "hyperapp"

import cc from "classcat"
import * as html from "ntml"
import { component } from "../component"
import { box } from "../container/box"
import { icon } from "../display/icon"

export type FileOptions<S> = {
  class?: ClassProp
  disabled?: boolean
  label?: string
  locked?: boolean
  update: Transform<S>
}

export type FileData = {
  value: string
}

export const freshFile = (value: string): FileData =>
  ({ value })

// https://codepen.io/adamlaki/pen/VYpewx

const rawFile = <S>(props: FileOptions<S>, data: FileData): VDOM<S> => {
  const { disabled, locked, label = "Select your file...", update, ...etc } = props
  return box({
    disabled,
    locked,
    "uy-control": true,
    "uy-file": true,
    "uy-input": true,
  }, [
    html.label({ class: "uy-clicky", "data-text": label }, [
      html.input({
        disabled,
        value: data.value,
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
          return update(state, target.value)
        },
        ...etc,
        class: cc([{ disabled, locked }, etc.class]),
      }),
      html.span({ class: "uy-clicky" }, [
        icon("fas fa-file-upload"),
        " Upload",
      ]),
    ]),
  ])
}

export const file = component(rawFile)
