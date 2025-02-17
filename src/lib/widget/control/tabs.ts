import { ClassProp, MaybeVNode, VNode, h } from "hyperapp"
import { Content, StateFormat, Transform, isVNode } from "hyperapplicable"
import { Focus, get, set } from "eyepiece"
import { encase } from "wtv"
import { scrollIntoView } from "../../effect/scrollIntoView"

export type { Tab, TabIndex, TabsData, TabsOptions }
export { freshTabs, tabs }

// -----------------------------------------------------------------------------

type TabIndex = number | string
type TabsData = Readonly<{ value: TabIndex }>
type Tab<S> = Readonly<{
  heading: MaybeVNode<S>
  panel: MaybeVNode<S>
}>
type TabsOptions<S> = readonly Tab<S>[] | TabsFullOptions<S>
type TabsFullOptions<S> = Readonly<{
  tabList: readonly Tab<S>[]
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
    && isVNode(item)
    // TODO:
    // && activeTab === (item.props["data-tab-id"] as string)
  )
  || activeTab === i

const tab = <S>(focus: Focus, activeTab: TabIndex, onclick?: Transform<S>) => {
  return (item: MaybeVNode<S>, i: number): VNode<S> => {
    const selected = isSelected(activeTab)(item, i)
    return h("div", {
      class: ["uwye-tabs-item", { selected }],
      onclick: (state, event) => {
        const target = event.target as HTMLInputElement
        const nextValue = freshTabs(
          i
          // TODO:
          // isVNode(item) && "data-tab-id" in item.props
          //   ? item.props["data-tab-id"] as string
          //   : i
        )
        const transition = set(focus)(nextValue)(state)
        // TODO:
        // const nextState: StateFormat<S> =
        //   [transition, selected ? scrollIntoView(target) : undefined]
        const nextState: StateFormat<S> = selected
          ? [transition, scrollIntoView(target)]
          : transition
        return onclick ? onclick(nextState, nextValue) : nextState
      },
    }, item)
  }
}

const tabs = <S>(options: TabsOptions<S>) => (...focus: Focus) => (state: S): VNode<S> => {
  const props = (Array.isArray(options) ? { tabList: options } : options) as TabsFullOptions<S>
  const { tabList, itemsHeader, itemsFooter, onclick, disabled, ...etc } = props

  const x = get<TabsData>(focus)(state).value
  const headings = tabList.map((tab) => tab.heading)
  const panels = tabList.map((tab) => tab.panel)

  return h("div", {
    ...etc,
    class: ["uwye-control uwye-tabs", etc.class, { disabled }],
  }, [
    h("div", { class: "uwye-tabs-navigation" }, [
      ...encase(itemsHeader),
      h(
        "div",
        { class: "uwye-tabs-list uwye-scroller" },
        headings.map(tab<S>(focus, x, onclick))
      ),
      ...encase(itemsFooter),
    ]),
    h("div", { class: "uwye-tabs-panels" }, [
      panels[headings.findIndex(isSelected(x))],
    ]),
  ])
}
