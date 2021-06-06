import type { Focus } from "eyepiece"
import type { Action, ClassProp, VNode } from "hyperapp"
import type { Content } from "ntml"
import type { CheckboxData, CheckboxValue } from "./checkbox"

import { h } from "hyperapp"
import { box } from "../container/box"
import { checkbox, freshCheckbox } from "./checkbox"

export type MultiselectData = {
  value: Record<string, CheckboxData>
}

export type MultiselectChoices<S> = Record<string, Content<S>>

export type MultiselectOptions<S> =
  | MultiselectChoices<S>
  | {
    choices: MultiselectChoices<S>
    usingColumnMode?: boolean
    onchange?: Action<S, CheckboxValue>
    class?: ClassProp
    disabled?: boolean
  }

const freshMultiselect = <S>(
  choices: MultiselectChoices<S>,
  value: string[]
): MultiselectData => {
  const data = Object.fromEntries(
    Object.entries(choices).map(([k, _]) => [k, freshCheckbox(false)])
  )
  return {
    value: value.reduce(
      (xr: Record<string, CheckboxData>, x: string) => {
        return { ...xr, [x]: freshCheckbox(true) }
      },
      data
    ),
  }
}

const isOnlyChoices = <S>(x: any): x is Record<string, Content<S>> =>
  typeof x === "object" && !("choices" in x)

const multiselect = <S>(options: MultiselectOptions<S>) => (...focus: Focus) => {
  return (state: S): VNode<S> => {
    const props = isOnlyChoices<S>(options) ? { choices: options } : options
    const { choices, usingColumnMode, onchange, disabled, ...etc } = props
    return h("div", {
      ...etc,
      class: [
        "uy-control uy-scroller uy-multiselect",
        { "uy-multiselect--grid-mode": !!usingColumnMode, disabled },
        etc.class,
      ],
    }, [
      box("uy-multiselect-options",
        Object.entries(choices).map(
          ([value, label]) =>
            checkbox({ label, onchange, disabled })(focus, "value", value)(state)
        ),
      ),
    ])
  }
}

export { freshMultiselect, multiselect }
