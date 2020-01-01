import { h } from "../hyperappHelper.js"
import { box, asArray } from "../utility.js"

// tabs :: {a} -> (Int | String) -> VNode
const tabs = ({ disabled = false, navigationHeader = null, navigationFooter = null, tabs, updater, ...etc }, x) => {
  const [tabList, contentPanels] = R.transpose(tabs)

  const tab = (tabItem, i) => {
    const selected = x === i || x === tabItem.attributes["data-tab-id"]
    return h(
      "div",
      {
        class: "uy-tabs-tab" + (selected ? " selected" : ""),
        // oncreate: () => (selected ? updater(i) : null),
        // onclick: () => updater(i),
        onclick: [updater, i],
        onupdate: (state, event) => {
          // Make sure the selected tab is within view.
          if (selected) {
            event.target.scrollIntoView({ behavior: "smooth", block: "nearest" })
          }
          return state
        },
      },
      [tabItem],
    )
  }

  const content = tabList
    ? box("uy-tabs-content", [
        contentPanels[tabList.findIndex((tabItem, i) => x === i || x === tabItem.attributes["data-tab-id"])],
      ])
    : null

  return box("uy-control uy-tabs", [
    h("div", { class: "uy-tabs" + (disabled ? " disabled" : ""), ...etc }, [
      box("uy-tabs-navigation", [
        navigationHeader,
        box("uy-tabs-tab-list scroller", [asArray(tabList).map(tab)]),
        navigationFooter,
      ]),
      content,
    ]),
  ])
}

export { tabs }
