import type { Action, State, Payload, VDOM, VNode } from "hyperapp"
import type { Content, Control, ControlData, ControlOptions } from "../types"

import { div } from "ntml"
import { hasOwn } from "../utility/utility"
import { component } from "../component"
import { box } from "../container/box"
import { scrollIntoView } from "./tabs.effect"

export type Tab = {
  heading: Content
  panel: Content
}

export type TabsOptions = ControlOptions & {
  itemsFooter?: Content
  itemsHeader?: Content
  tabList: Tab[]
}

const freshTabs = (value: string): ControlData<string> => ({ value })

const isSelected = (activeTab: string) => (item: any, i: number): boolean =>
  activeTab === String (i) ||
    (typeof item === "object" && hasOwn ("props") (item) &&
      activeTab === item.props["data-tab-id"])

// tab :: Action -> String -> VNode -> Int -> VNode
const tab = (update: Function) => (activeTab: string) => (item: VNode, i: number): VDOM => {
  const selected = isSelected (activeTab) (item, i)
  return div ({
    class: { "uy-tabs-item": true, selected },
    onclick: <S, P extends Event, D>(
      state: State<S>,
      { target }: Payload<P>,
    ): Action<S, P, D> =>
      selected
        ? [update (state, String (i)), scrollIntoView (target)]
        : update (state, String (i)),
  }, item)
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
  (data: ControlData<string>): VDOM => {
    const headings = tabList.map ((x: Tab): Content => x.heading)
    const panels = tabList.map ((x: Tab): Content => x.panel)
    return div (
      {
        ...etc,
        class: {
          disabled,
          locked,
          "uy-control": true,
          "uy-container": true,
          "uy-tabs": true,
          [etc.class]: !!etc.class,
        },
      },
      [
        box ("uy-tabs-navigation") ([
          itemsHeader,
          box ("uy-tabs-list uy-scroller") (
            headings.map (tab (update) (data.value)),
          ),
          itemsFooter,
        ]),
        box ("uy-tabs-panels") ([
          panels[headings.findIndex (isSelected (data.value))],
        ]),
      ],
    )
  }

const tabs: Control = component (rawTabs)

export { freshTabs, tabs }
