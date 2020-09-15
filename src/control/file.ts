import type { ClassProp, VDOM } from "hyperapp"
import type { Transform } from "../types"

import cc from "classcat"
import * as html from "ntml"
import { component } from "../component"
import { box } from "../container/box"
import { icon } from "../display/icon"

export type FileOptions<S> = {
  class?: ClassProp
  disabled: boolean
  label?: string
  locked: boolean
  update: Transform<S, string, Event>
}

export type FileData = {
  value: string
}

export const freshFile = (value: string): FileData =>
  ({ value })

// https://codepen.io/adamlaki/pen/VYpewx

const rawFile =
  <S>({ disabled, locked, label = "Select your file...", update, ...etc }: FileOptions<S>) =>
    (data: FileData): VDOM<S> =>
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
            onchange: (state, event) => {
              if (!event) return state
              const target = event.target as HTMLInputElement
              const parent = target.parentNode as HTMLElement
              parent.dataset.text = target.value !== ""
                ? target.value.replace (/.*(\/|\\)/, "")
                : label
              return update (state, target.value)
            },
            ...etc,
            class: cc ([{ disabled, locked }, etc.class]),
          }),
          html.span ({ class: "uy-clicky" }, [
            icon ("fas fa-file-upload"),
            " Upload",
          ]),
        ]),
      ])

export const file = component (rawFile)
