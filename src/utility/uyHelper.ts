import { get, mod, set } from "shades"
import { handleUsing, onMouseDown, onOutside } from "./event"
import { delist, map, pipe } from "./utility"

// -----------------------------------------------------------------------------

// addInsideEl :: String -> (State -> State) -> State -> State
const addInsideEl = (id: string): any => set ("uy", "insiders", id)

// removeInsideEl :: String -> State -> State
const removeInsideEl = (id: string): any => mod ("uy", "insiders") (delist (id))

// -----------------------------------------------------------------------------

const detectOutside = ([insider, f]: any[]): any =>
  onOutside (`#${insider}`) (
    (_state: any, _event: any): any => pipe ([f, removeInsideEl (insider)])
  )

// freshState :: State -> State
const freshState = (state: any): any => ({
  ...state,
  uy: {
    insiders: {},
    mousedownHandlers: {
      detectOutsideAction: (state: any, event: any): any => {
        return handleUsing (pipe ([
          get ("uy", "insiders"),
          Object.entries,
          map (detectOutside),
        ]) (state)) (state, event)
      },
    },
  },
})

// mouseDownSubscription :: State -> State
const mouseDownSubscription =
  pipe ([
    get ("uy", "mousedownHandlers"),
    Object.values,
    handleUsing,
    onMouseDown,
  ])

// -----------------------------------------------------------------------------

const uyAppConfig = (config: any): any => ({
  ...config,
  // TODO: account for any subscriptions from `config`
  subscriptions: (state: any): any => [mouseDownSubscription (state)],
  init: freshState (config.init),
})

// -----------------------------------------------------------------------------

export {
  addInsideEl,
  removeInsideEl,
  uyAppConfig,
}
