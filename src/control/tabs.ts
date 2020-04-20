import { h } from "/web_modules/hyperapp.js"
import { component } from "../component"
import { box } from "../container/ui"
import { hasOwn } from "../utility/utility"
import { scrollIntoView } from "./tabs.effect"

// freshTabs :: String -> ControlData
const freshTabs = (value: string): any => ({ value })

// isSelected :: String -> VNode -> Int -> Bool
const isSelected = (activeTab: string) => (item: any, i: number): boolean => {
  return activeTab === String(i) || (typeof item === "object" && hasOwn("props")(item) && activeTab === item.props["data-tab-id"])
}

// tab :: String -> Action -> VNode -> Int -> VNode
const tab = (activeTab: string, update: Function) => (item: any, i: number): any => {
  const selected = isSelected(activeTab)(item, i)
  return h(
    "div",
    {
      class: { "uy-tabs-item": true, selected },
      onclick: (state: any, { target }: any) =>
        selected
          ? [update(String(i))(state), scrollIntoView(target)]
          : update(String(i))(state)
      ,
    },
    [item]
  )
}

// rawTabs :: TabsOptions -> Object -> VNode
const rawTabs = ({ disabled, locked, itemsFooter, itemsHeader, tabList, update, ...etc }: any) => (data: any): any => {
  const headings = tabList.map((x: any) => x.heading)
  const panels = tabList.map((x: any) => x.panel)
  return h(
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
      box("uy-tabs-navigation")([
        itemsHeader,
        box("uy-tabs-list uy-scroller")(headings.map(tab(data.value, update))),
        itemsFooter,
      ]),
      box("uy-tabs-panels")([panels[headings.findIndex(isSelected(data.value))]]),
    ]
  )
}

// tabs :: TabsOptions -> [String] -> State -> VNode
const tabs = component(rawTabs)

export { freshTabs, tabs }
