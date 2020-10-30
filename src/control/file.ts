import type { ClassProp, State, VDOM } from "hyperapp"
import type { Wiring } from "../component"

import cc from "classcat"
import * as html from "ntml"
import { box } from "../container/box"
import { icon } from "../indicator/icon"

export type FileData = {
  value: string
}

export type FileOptions<S> = {
  class?: ClassProp
  disabled?: boolean
  label?: string
  locked?: boolean
  wiring: Wiring<S, FileData>
}

const freshFile = (value: string): FileData => {
  return { value }
}

// https://codepen.io/adamlaki/pen/VYpewx

const file = <S>(options: FileOptions<S>) => (state: State<S>): VDOM<S> => {
  const { disabled, locked, label = "Select your file...", wiring, ...etc } = options
  return box(cc(["uy-control uy-file uy-input", { disabled, locked }]), [
    html.label({ class: "uy-clicky", "data-text": label }, [
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
        class: cc([{ disabled, locked }, etc.class]),
      }),
      html.span({ class: "uy-clicky" }, [
        icon("fas fa-file-upload"),
        " Upload",
      ]),
    ]),
  ])
}

export { file, freshFile }
