import type { Focus } from "eyepiece"
import type { ClassProp, EffectfulState, State, VDOM } from "hyperapp"
import type { Content, Stuff } from "ntml"

import { get, set } from "eyepiece"
import { div, isVDOM } from "ntml"
import { encase } from "../../utility/encase"
import { box } from "../container/box"
import { scrollIntoView } from "./tabs.effect"

export type TabIndex = number | string

export type TabsData = Readonly<{
  value: TabIndex
}>

export type Tab<S> = Readonly<{
  heading: Stuff<S>
  panel: Stuff<S>
}>

export type TabsOptions<S>
  = Tab<S>[]
  | Readonly<{
    tabList: Tab<S>[]
    class?: ClassProp
    itemsHeader?: Content<S>
    itemsFooter?: Content<S>
    disabled?: boolean
  }>

const freshTabs = (value: TabIndex): TabsData => ({ value })

const isSelected = (activeTab: TabIndex) => <S>(item: Stuff<S>, i: number): boolean =>
  typeof item === "object"
    ? item != null && isVDOM(item) && activeTab === (item.props["data-tab-id"] as string)
    : activeTab === i

const tab = <S>(focus: Focus, activeTab: TabIndex) => {
  return (item: Stuff<S>, i: number): VDOM<S> => {
    const selected = isSelected(activeTab)(item, i)
    return div({
      class: ["uy-tabs-item", { selected }],
      onclick: (state, event) => {
        const transition = set<State<S>>(focus)(freshTabs(
          isVDOM(item) ? item.props["data-tab-id"] as string : i
        ))(state)
        return !event ? transition
          : !event.target ? transition
          : selected ? [
              ...encase(transition),
              scrollIntoView(event.target as HTMLElement),
            ] as EffectfulState<S>
          : transition
      },
    }, item)
  }
}

const tabs = <S>(options: TabsOptions<S>) => (...focus: Focus) => {
  return (state: State<S>): VDOM<S> => {
    const props = Array.isArray(options) ? { tabList: options } : options
    const { tabList, itemsHeader, itemsFooter, disabled, ...etc } = props

    const x = get<TabsData>(focus)(state).value
    const headings = tabList.map((tab) => tab.heading)
    const panels = tabList.map((tab) => tab.panel)

    return div(
      { ...etc, class: ["uy-control uy-tabs", { disabled }, etc.class] },
      [
        box("uy-tabs-navigation", [
          ...encase(itemsHeader),
          box("uy-tabs-list uy-scroller", headings.map(tab(focus, x))),
          ...encase(itemsFooter),
        ]),
        box("uy-tabs-panels", [
          panels[headings.findIndex(isSelected(x))],
        ]),
      ],
    )
  }
}

export { freshTabs, tabs }
