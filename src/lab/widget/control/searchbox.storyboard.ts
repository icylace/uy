import { VNode, h } from "hyperapp"
import { Transform, readout } from "hyperapplicable"
import type { Story } from "../../types"
import { SearchboxData, freshSearchbox, searchbox } from "../../../lib/uy"
import { search } from "../../effect/search"

export { freshState, view }

// -----------------------------------------------------------------------------

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
        readout<Story>("searchbox")(state),
        readout<Story>("searchboxResultsIDs")(state),
      ]),
    ]),
  ])
