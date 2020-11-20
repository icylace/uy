import type { ClassProp, EffectfulState, State, VDOM, VNode } from "hyperapp"
import type { Content } from "ntml"
import type { Wiring } from "../component"

import { div } from "ntml"
import { box } from "../container/box"
import { scrollIntoView } from "./tabs.effect"

export type Tab<S> = {
  heading: Content<S>
  panel: Content<S>
}

export type TabsData = {
  value: string
}

export type TabsOptions<S> = {
  class?: ClassProp
  disabled?: boolean
  itemsFooter?: string | VNode<S>
  itemsHeader?: string | VNode<S>
  locked?: boolean
  tabList: Tab<S>[]
  wiring: Wiring<S, TabsData>
}

const freshTabs = (value: string): TabsData => {
  return { value }
}

const isSelected = (activeTab: string) => <S>(item: Content<S>, i: number): boolean => {
  return typeof item === "object"
    && item != null && "props" in item && activeTab === item.props["data-tab-id"]
    || activeTab === String(i)
}

const tab = <S>(wiring: Wiring<S, TabsData>, activeTab: string) => {
  return (item: Content<S>, i: number): VDOM<S> => {
    const selected = isSelected(activeTab)(item, i)
    return div({
      class: { "uy-tabs-item": true, selected },
      onclick: (state, event) => {
        const transition = wiring.set(state, freshTabs(String(i)))
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

const tabs = <S>(options: TabsOptions<S>) => (state: State<S>): VDOM<S> => {
  const { disabled, locked, itemsFooter, itemsHeader, tabList, wiring, ...etc } = options
  const x = wiring.get(state)
  const headings = tabList.map((x: Tab<S>): Content<S> => x.heading)
  const panels = tabList.map((x: Tab<S>): Content<S> => x.panel)
  return div(
    {
      ...etc,
      class: ["uy-control uy-tabs", { locked, disabled }, etc.class],
    },
    [
      box("uy-tabs-navigation", [
        itemsHeader,
        box("uy-tabs-list uy-scroller", headings.map(tab(wiring, x.value))),
        itemsFooter,
      ]),
      box("uy-tabs-panels", [
        panels[headings.findIndex(isSelected(x.value))],
      ]),
    ],
  )
}

export { freshTabs, tabs }
