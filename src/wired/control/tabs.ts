import type { Focus } from "eyepiece"
import type { ClassProp, EffectfulState, State, VDOM } from "hyperapp"
import type { Content, Stuff } from "ntml"

import { get, set } from "eyepiece"
import { div, isVDOM } from "ntml"
import { encase } from "../../utility/encase"
import { box } from "../../wireless/container/box"
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

const freshTabs = (value: TabIndex): TabsData => {
  return { value }
}

const isSelected = (activeTab: TabIndex) => <S>(item: Stuff<S>, i: number): boolean => {
  return typeof item === "object"
    ? item != null && isVDOM(item) && activeTab === item.props["data-tab-id"]
    : activeTab === i
}

const tab = <S>(focus: Focus, activeTab: TabIndex) => {
  return (item: Stuff<S>, i: number): VDOM<S> => {
    const selected = isSelected(activeTab)(item, i)
    return div({
      class: ["uy-tabs-item", { selected }],
      onclick: (state, event) => {
        const transition = set<State<S>>(focus)(freshTabs(
          isVDOM(item)
            ? item.props["data-tab-id"] as string
            : i
        ))(state) ?? state
        if (!event) return transition
        if (!event.target) return transition
        return selected
          ? Array.isArray(transition)
            ? [...transition, scrollIntoView(event.target as HTMLElement)] as EffectfulState<S>
            : [transition, scrollIntoView(event.target as HTMLElement)] as EffectfulState<S>
          : transition
      },
    }, item)
  }
}

const tabs = <S>(options: TabsOptions<S>) => (...focus: Focus) => {
  return (state: State<S>): VDOM<S> => {
    const props = Array.isArray(options) ? { tabList: options } : options
    const { tabList, itemsHeader, itemsFooter, disabled, ...etc } = props

    const x = get<TabsData>(focus)(state)
    const headings = tabList.map((x: Tab<S>): Stuff<S> => x.heading)
    const panels = tabList.map((x: Tab<S>): Stuff<S> => x.panel)

    return div(
      {
        ...etc,
        class: ["uy-control uy-tabs", { disabled }, etc.class],
      },
      [
        box("uy-tabs-navigation", [
          ...encase(itemsHeader),
          box("uy-tabs-list uy-scroller", headings.map(tab(focus, x.value))),
          ...encase(itemsFooter),
        ]),
        box("uy-tabs-panels", [
          panels[headings.findIndex(isSelected(x.value))],
        ]),
      ],
    )
  }
}

export { freshTabs, tabs }
