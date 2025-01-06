import { Action, ClassProp, VNode, h } from "hyperapp"
import type { Content } from "hyperapplicable"
import type { Focus } from "eyepiece"
import { CheckboxData, CheckboxValue, checkbox, freshCheckbox } from "./checkbox"

export type { MultiselectChoices, MultiselectData, MultiselectOptions }
export { freshMultiselect, multiselect }

// -----------------------------------------------------------------------------

type MultiselectData = { value: Record<string, CheckboxData> }
type MultiselectChoices<S> = Record<string, Content<S>>
type MultiselectOptions<S> = MultiselectChoices<S> | MultiselectFullOptions<S>
type MultiselectFullOptions<S> = {
  choices: MultiselectChoices<S>
  usingColumnMode?: boolean
  updater?: Action<S, CheckboxValue>
  class?: ClassProp
  disabled?: boolean
}

const freshMultiselect = <S>(
  choices: MultiselectChoices<S>,
  value: readonly string[]
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

const multiselect = <S>(options: MultiselectOptions<S>) => (...focus: Focus) => (state: S): VNode<S> => {
  const props = isOnlyChoices<S>(options) ? { choices: options } : options
  const { choices, usingColumnMode, updater, disabled, ...etc } = props
  return h("div", {
    ...etc,
    class: [
      "uwye-control uwye-scroller uwye-multiselect",
      { "uwye-multiselect--grid-mode": !!usingColumnMode },
      etc.class,
      { disabled },
    ],
  }, [
    h("div", { class: "uwye-multiselect-options" },
      Object.entries(choices).map(
        ([value, label]) =>
          checkbox({ label, updater, disabled })(focus, "value", value)(state)
      ),
    ),
  ])
}
