import type { VNode } from "hyperapp"
import type { SearchboxData, Transform } from "../../../lib/main"
import type { Story } from "../../types"

import { h } from "hyperapp"
import { freshSearchbox, searchbox } from "../../../lib/main"
import { readout } from "../../utility/readout"
import { search } from "../effect/search"

const freshState = (state: Story): Story => ({
  ...state,
  searchbox: freshSearchbox(""),
  searchboxResultsIDs: new Map<string, Transform<Story, Event>>(),
})

const id = "searchbox"
const onresults = (results: SearchboxData["results"], id: string, state: Story): Story => {
  const ids = state.searchboxResultsIDs as Map<string, Transform<Story, Event>>
  const f = (state: Story, _props?: any) => state
  if (results.length) {
    ids.set(id, f)
  } else {
    ids.delete(id)
  }
  return { ...state, searchboxResultsIDs: ids }
}

const searchboxNormal = searchbox({ id, search, onresults })("searchbox")
const searchboxDisabled = searchbox({ id, search, onresults, disabled: true })("searchbox")

const view = (state: Story): VNode<Story> =>
  h("section", { class: "uy-storyboard-showcase-panel" }, [
    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          state.showingNormal && searchboxNormal(state),
          state.showingDisabled && searchboxDisabled(state),
        ]),
      ]),
      h("section", {}, [
        readout("searchbox")(state),
        readout("searchboxResultsIDs")(state),
      ]),
    ]),
  ])

export { freshState, view }
