import type { ClassProp, VDOM, VNode } from "hyperapp"
import type { Content } from "ntml"
import type { Transform } from "../types"

import cc from "classcat"
import { div } from "ntml"
import { component } from "../component"
import { box } from "../container/box"
import { scrollIntoView } from "./tabs.effect"

export type Tab<S> = {
  heading: Content<S>
  panel: Content<S>
}

export type TabsOptions<S, P> = {
  [_: string]: unknown
  class?: ClassProp
  disabled: boolean
  itemsFooter?: string | VNode<S>
  itemsHeader?: string | VNode<S>
  locked: boolean
  tabList: Tab<S>[]
  update: Transform<S, P>
}

export type TabsData = {
  value: string
}

export const freshTabs = (value: string): TabsData =>
  ({ value })

const isSelected = (activeTab: string) => <S>(item: Content<S>, i: number): boolean => {
  if (typeof item === "object") {
    const vdomItem = item as VDOM<S>
    return ("props" in vdomItem) && activeTab === vdomItem.props["data-tab-id"]
  }
  return activeTab === String (i)
}

const tab = <S, P>(update: Transform<S, P>) => (activeTab: string) => (item: Content<S>, i: number): VDOM<S> => {
  const selected = isSelected (activeTab) (item, i)
  return div ({
    class: { "uy-tabs-item": true, selected },
    onclick: (state, event) => {
      if (!event) return state
      const target = event.target
      // const target = event.target as Element
      return selected
        ? [update (state, String (i)), scrollIntoView (target)]
        : update (state, String (i))
    },
  }, item) as VDOM<S>
}

const rawTabs = <S, P>(
  {
    disabled,
    locked,
    itemsFooter,
    itemsHeader,
    tabList,
    update,
    ...etc
  }: TabsOptions<S, P>,
) =>
    (data: TabsData): VDOM<S> => {
      const headings = tabList.map ((x: Tab<S>): Content<S> => x.heading)
      const panels = tabList.map ((x: Tab<S>): Content<S> => x.panel)
      return div (
        {
          ...etc,
          class: cc (["uy-control uy-container uy-tabs", { locked, disabled }, etc.class]),
        },
        [
          box ("uy-tabs-navigation") ([
            itemsHeader,
            box ("uy-tabs-list uy-scroller") (
              headings.map (tab (update) (data.value)),
            ),
            itemsFooter,
          ]),
          box ("uy-tabs-panels") (
            panels[headings.findIndex (isSelected (data.value))],
          ),
        ],
      ) as VDOM<S>
    }

export const tabs = component (rawTabs)
