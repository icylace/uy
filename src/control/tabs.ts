import { State, Payload, Reaction, VDOM, VNode, h } from "hyperapp"
import { ControlData, TabsOptions } from "../types"
import { component } from "../component"
import { box } from "../container/ui"
import { hasOwn } from "../utility/utility"
import { scrollIntoView } from "./tabs.effect"

const freshTabs = (value: string): ControlData<string> => ({ value })

const isSelected = (activeTab: string) => (item: any, i: number): boolean => {
  return activeTab === String (i) || (typeof item === "object" && hasOwn ("props") (item) && activeTab === item.props["data-tab-id"])
}

// tab :: Action -> String -> VNode -> Int -> VNode
const tab = (update: Function) => (activeTab: string) => (item: VNode, i: number): VDOM => {
  const selected = isSelected (activeTab) (item, i)
  return h (
    "div",
    {
      class: { "uy-tabs-item": true, selected },
      onclick: <S, D>(state: State<S>, { target }: Payload<Event>): Reaction<S, D> =>
        selected
          ? [update (state, String (i)), scrollIntoView (target)]
          : update (state, String (i))
      ,
    },
    item
  )
}

const rawTabs = ({ disabled, locked, itemsFooter, itemsHeader, tabList, update, ...etc }: TabsOptions) => (data: ControlData<string>): VDOM => {
  const headings = tabList.map ((x: any) => x.heading)
  const panels = tabList.map ((x: any) => x.panel)
  return h (
    "div",
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
        box ("uy-tabs-list uy-scroller") (headings.map (tab (update) (data.value))),
        itemsFooter,
      ]),
      box ("uy-tabs-panels") ([panels[headings.findIndex (isSelected (data.value))]]),
    ]
  )
}

// tabs :: TabsOptions -> [String] -> State -> VNode
const tabs = component (rawTabs)

export { freshTabs, tabs }
