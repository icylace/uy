import type { SearchboxData, Transform } from "../../../lib/main"
import type { Story } from "../../types"

import { freshSearchbox, panel, row, searchbox, toggle } from "../../../lib/main"
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

const view =
  panel("uy-control-storyboard", [
    row([
      toggle("showingNormal")(searchboxNormal),
      toggle("showingDisabled")(searchboxDisabled),
    ]),
    readout("searchbox"),
    readout("searchboxResultsIDs"),
  ])

export { freshState, view }
