import type { Focus } from "eyepiece"
import type { ClassProp, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { CheckboxData } from "./checkbox"

import { div } from "ntml"
import { box } from "../../wireless/container/box"
import { checkbox, freshCheckbox } from "./checkbox"

export type MultiselectData = {
  value: Record<string, CheckboxData>
}

export type MultiselectChoices<S> = Record<string, Content<S>>

export type MultiselectOptions<S>
  = MultiselectChoices<S>
  | {
    choices: MultiselectChoices<S>
    usingColumnMode?: boolean
    class?: ClassProp
    disabled?: boolean
  }

const freshMultiselect = <S>(choices: MultiselectChoices<S>, value: string[]): MultiselectData => {
  const data = Object.fromEntries(Object.entries(choices).map(([k, _]) => [k, freshCheckbox(false)]))
  return {
    value: value.reduce((xr: Record<string, CheckboxData>, x: string): Record<string, CheckboxData> => {
      return { ...xr, [x]: freshCheckbox(true) }
    }, data),
  }
}

const isOnlyChoices = <S>(x: any): x is Record<string, Content<S>> =>
  typeof x === "object" && !("choices" in x)

const multiselect = <S>(options: MultiselectOptions<S>) => (...focus: Focus) => {
  return (state: State<S>): VDOM<S> => {
    const props = isOnlyChoices<S>(options) ? { choices: options } : options
    const { disabled, choices, usingColumnMode, ...etc } = props
    return div({
      ...etc,
      class: [
        "uy-control uy-scroller uy-multiselect",
        { "uy-multiselect--grid-mode": !!usingColumnMode, disabled },
        etc.class,
      ],
    }, [
      box("uy-multiselect-options",
        Object.entries(choices).map(
          ([value, label]: [string, Content<S>]): VDOM<S> =>
            checkbox({ disabled, label })(focus, value)(state)
        ),
      ),
    ])
  }
}

export { freshMultiselect, multiselect }
