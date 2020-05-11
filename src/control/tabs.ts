import { State, Payload, Reaction, h } from "hyperapp"
import { component } from "../component"
import { box } from "../container/ui"
import { hasOwn } from "../utility/utility"
import { scrollIntoView } from "./tabs.effect"

// freshTabs :: String -> ControlData
const freshTabs = (value: string): any => ({ value })

// isSelected :: String -> VNode -> Int -> Bool
const isSelected = (activeTab: string) => (item: any, i: number): boolean => {
  return activeTab === String (i) || (typeof item === "object" && hasOwn ("props") (item) && activeTab === item.props["data-tab-id"])
}

// tab :: Action -> String -> VNode -> Int -> VNode
const tab = (update: Function) => (activeTab: string) => (item: any, i: number): any => {
  const selected = isSelected (activeTab) (item, i)
  return h (
    "div",
    {
      class: { "uy-tabs-item": true, selected },
      onclick: (state: State<any>, { target }: Payload<Event>): Reaction<any, any> =>
        selected
          ? [update (state, String (i)), scrollIntoView (target)]
          : update (state, String (i))
      ,
    },
    [item]
  )
}

// rawTabs :: TabsOptions -> Object -> VNode
const rawTabs = ({ disabled, locked, itemsFooter, itemsHeader, tabList, update, ...etc }: any) => (data: any): any => {
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
