// import type { ClassProp, EffectDescriptor, Payload, State, Transition, VDOM, VNode } from "hyperapp"
import type { ClassProp, EffectDescriptor, VDOM, VNode } from "hyperapp"
import type { Content } from "ntml"
import type { Control, Handler } from "../types"
// import type { FxData } from "./tabs.effect"

import cc from "classcat"
import { div } from "ntml"
import { component } from "../component"
import { box } from "../container/box"
import { scrollIntoView } from "./tabs.effect"

export type Tab = {
  heading: Content
  panel: Content
}

export type TabsOptions = {
  [_: string]: unknown
  class?: ClassProp
  disabled: boolean
  itemsFooter?: string | VNode
  itemsHeader?: string | VNode
  locked: boolean
  tabList: Tab[]
  update: Handler
}

export type TabsData = {
  [_: string]: unknown
  value: string
}

export const freshTabs = (value: string): TabsData => ({ value })

const isSelected = (activeTab: string) => (item: Content, i: number): boolean => {
  if (typeof item === "object") {
    const vdomItem = item as VDOM
    return ("props" in vdomItem) && activeTab === vdomItem.props["data-tab-id"]
  }
  return activeTab === String (i)
}

const tab = (update: Handler) => (activeTab: string) => (item: Content, i: number): VDOM => {
  const selected = isSelected (activeTab) (item, i)
  return div (
    {
      class: { "uy-tabs-item": true, selected },
      onclick: (state, event) => {
        if (!event) return state
        const target = event.target as Element
        // return update (state, String (i))
        return [update (state, String (i)), scrollIntoView (target)]
        // return selected
        //   ? [update (state, String (i)), scrollIntoView (target)]
        //   : update (state, String (i))
      },
    },
    item,
  )
}

const rawTabs = (
  {
    disabled,
    locked,
    itemsFooter,
    itemsHeader,
    tabList,
    update,
    ...etc
  }: TabsOptions,
) =>
  (data: TabsData): VDOM => {
    const headings = tabList.map ((x: Tab): Content => x.heading)
    const panels = tabList.map ((x: Tab): Content => x.panel)
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
    )
  }

export const tabs: Control = component (rawTabs)
