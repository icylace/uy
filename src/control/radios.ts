import type { ClassProp, State, Transition, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { Transform } from "../types"

import cc from "classcat"
import * as html from "ntml"
import { component } from "../component"
import { box } from "../container/box"

export type RadiosOptions<S> = {
  class?: ClassProp
  disabled: boolean
  locked: boolean
  options: Record<string, Content<S>>
  update: Transform<S>
}

export type RadiosData = {
  value: string
}

export const freshRadios = (value: string): RadiosData =>
  ({ value })

const rawRadios =
  <S>({ disabled, locked, options, update, ...etc }: RadiosOptions<S>) =>
    (data: RadiosData): VDOM<S> =>
      box ("uy-control uy-radios") (
        // TODO:
        // - switch to using a Map object instead in order to guarantee order
        Object.entries (options).map (([value, label]: [string, Content<S>]): VDOM<S> =>
          html.label ({ class: { locked, disabled } }, [
            html.input ({
              disabled,
              value,
              checked: value === data.value,
              type: "radio",
              onchange: (state: State<S>, event?: Event): Transition<S> => {
                if (!event) return state
                const target = event.target as HTMLInputElement
                return update (state, target.value)
              },
              ...etc,
              class: cc (["uy-input", { locked, disabled }, etc.class]),
            }) as VDOM<S>,
            label != null ? html.span (label) : null,
          ]) as VDOM<S>,
        ),
      )

export const radios = component (rawRadios)
