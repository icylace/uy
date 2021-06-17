import type { Action, Dispatch, Effect } from "hyperapp"
import type { SearchboxData, SearchEffectData } from "../../../lib/main"

import axios from "axios"

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
    const response = await axios.get(`https://restcountries.eu/rest/v2/name/${value}`)
    const data = response.data as Record<string, any>[]
    const results = data.map((x: Record<string, any>) => x.name as string)
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

export { search }
