// import { get, has, mod, set } from "shades"
import { get, mod, set } from "shades"
import { handleUsing, onClick, onMouseDown, onOutside } from "./event"
// import { delist, identity, ifElse, isSomething, map, pipe } from "./utility"
import { delist, map, pipe } from "./utility"

// -----------------------------------------------------------------------------

// TODO:

// // addClickHandler :: String -> Action -> State -> State
// const addClickHandler = set ("uy", "utility", "eventHandler", "click")

// // TODO:
// removeClickHandler :: String -> State -> State
// const removeClickHandler = set ("uy", "utility", "eventHandler", "click") (undefined)

// -----------------------------------------------------------------------------

// addInsideEl :: String -> (State -> State) -> State -> State
const addInsideEl = (id: string): any => set ("uy", "insideEl", id)

// removeInsideEl :: String -> State -> State
const removeInsideEl = (id: string): any => mod ("uy", "insideEl") (delist (id))

// -----------------------------------------------------------------------------

const detectOutside = ([popup, f]: any[]): any =>
  onOutside (`#${popup}`) (
    (_state: any, _event: any): any => pipe ([f, removeInsideEl (popup)])
  )

const detectOutsideOfElements = (event: any) => (state: any): any =>
  handleUsing (pipe ([
    get ("uy", "insideEl"),
    Object.entries,
    map (detectOutside),
  ]) (state)) (state, event)

// freshState :: State -> State
const freshState =
  set ("uy") ({
    insideEl: {},
    utility: {
      eventHandler: {
        click: {},
        mousedown: { detectOutsideAction: detectOutsideOfElements },
      },
    },
  })

const clickSubscription =
  pipe ([
    get ("uy", "utility", "eventHandler", "click"),
    Object.values,
    handleUsing,
    onClick,
  ])

const mouseDownSubscription =
  pipe ([
    get ("uy", "utility", "eventHandler", "mousedown"),
    Object.values,
    handleUsing,
    onMouseDown,
  ])

// subscriptions :: State -> (State | [State])
const subscriptions = (state: any): any => [mouseDownSubscription (state), clickSubscription (state)]

// -----------------------------------------------------------------------------

const uyAppConfig = (config: any): any => ({
  ...config,
  // TODO: account for any subscriptions from `config`
  subscriptions,
  init: freshState (config.init),
})

// -----------------------------------------------------------------------------

export {
  // addClickHandler,
  addInsideEl,
  // removeClickHandler,
  removeInsideEl,
  uyAppConfig,
}
