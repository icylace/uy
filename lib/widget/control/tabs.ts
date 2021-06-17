import type { Focus } from "eyepiece"
import type { ClassProp, MaybeVNode, VNode } from "hyperapp"
import type { Content } from "../../utility/hyperappHelper/content"
import type { StateWithEffects, Transform } from "../../utility/hyperappHelper/types"

import { get, set } from "eyepiece"
import { h } from "hyperapp"
import { c } from "../../utility/hyperappHelper/content"
import { isVDOM } from "ntml"
import { encase } from "../../utility/encase"
import { scrollIntoView } from "../effect/scrollIntoView"

export type TabIndex = number | string

export type TabsData = Readonly<{
  value: TabIndex
}>

export type Tab<S> = Readonly<{
  heading: MaybeVNode<S>
  panel: MaybeVNode<S>
}>

export type TabsOptions<S> =
  | Tab<S>[]
  | Readonly<{
    tabList: Tab<S>[]
    itemsHeader?: Content<S>
    itemsFooter?: Content<S>
    onclick?: Transform<S, TabIndex>
    class?: ClassProp
    disabled?: boolean
  }>

const freshTabs = (value: TabIndex): TabsData => ({ value })

const isSelected = (activeTab: TabIndex) => <S>(item: MaybeVNode<S>, i: number): boolean =>
  (
    typeof item === "object"
    && item != null
    && isVDOM(item)
    // TODO:
    // && activeTab === (item.props["data-tab-id"] as string)
  )
  || activeTab === i

const tab = <S>(focus: Focus, activeTab: TabIndex, onclick?: Transform<S>) => {
  return (item: MaybeVNode<S>, i: number): VNode<S> => {
    const selected = isSelected(activeTab)(item, i)
    return h("div", {
      class: ["uy-tabs-item", { selected }],
      onclick: (state, event) => {
        const target = event.target as HTMLInputElement
        const nextValue = freshTabs(
          i
          // TODO:
          // isVDOM(item) && "data-tab-id" in item.props
          //   ? item.props["data-tab-id"] as string
          //   : i
        )
        const transition = set<S>(focus)(nextValue)(state)
        const nextState = selected
          // TODO: get rid of this if possible
          // ? [...encase(transition), scrollIntoView(target)] as StateWithEffects<S>
          ? [transition, scrollIntoView(target)] as StateWithEffects<S>
          : transition
        return onclick ? onclick(nextState, nextValue) : nextState
      },
    }, item)
  }
}

const tabs = <S>(options: TabsOptions<S>) => (...focus: Focus) => {
  return (state: S): VNode<S> => {
    const props = Array.isArray(options) ? { tabList: options } : options
    const { tabList, itemsHeader, itemsFooter, onclick, disabled, ...etc } = props

    const x = get<TabsData>(focus)(state).value
    const headings = tabList.map((tab) => tab.heading)
    const panels = tabList.map((tab) => tab.panel)

    return h("div", {
      ...etc,
      class: ["uy-control uy-tabs", { disabled }, etc.class],
    }, [
      h("div", { class: "uy-tabs-navigation" }, [
        ...encase(c(itemsHeader)),
        h(
          "div",
          { class: "uy-tabs-list uy-scroller" },
          headings.map(tab<S>(focus, x, onclick))
        ),
        ...encase(c(itemsFooter)),
      ]),
      h("div", { class: "uy-tabs-panels" }, [
        panels[headings.findIndex(isSelected(x))],
      ]),
    ])
  }
}

export { freshTabs, tabs }
