import type { Action, Dispatch, Effect } from "hyperapp"
import type { SearchboxData, SearchEffectData } from "../../lib/uy"

export { search }

// -----------------------------------------------------------------------------

const runSearch = async <S>(dispatch: Dispatch<S>, props: SearchEffectData<S>): Promise<void> => {
  const { action, value } = props

  if (!value) {
    const payload = {
      value: "",
      results: [],
      searching: false,
    }
    window.requestAnimationFrame(() => dispatch(action, payload))
    return
  }

  try {
    const response = await fetch(`https://restcountries.eu/rest/v2/name/${value}`)
    const data: Record<string, any>[] = await response.json()
    const results: string[] = data.map((x: Record<string, any>) => x.name)
    const payload = {
      value,
      results: results ?? [],
      searching: false,
    }
    window.requestAnimationFrame(() => dispatch(action, payload))
  } catch (error) {
    console.error(error)
    const payload = {
      value,
      results: [],
      searching: false,
    }
    window.requestAnimationFrame(() => dispatch(action, payload))
  }
}

const search = <S>(
  action: Action<S, SearchboxData>,
  value: string
): Effect<S, SearchEffectData<S>> => {
  return [runSearch, { action, value }]
}
