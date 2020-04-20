import { get, has, mod, set } from "shades"
import { action, handleUsing, onClick, onMouseDown, onOutside } from "./event"
import { delist, identity, isSomething } from "./utility"

// @ts-ignore
const { S } = window.sanctuary

// -----------------------------------------------------------------------------

// TODO:

// // addClickHandler :: String -> Action -> State -> State
// const addClickHandler = def ("addClickHandler :: String -> Object -> State -> State") (
//   set ("uy", "utility", "eventHandler", "click")
// )

// // TODO:
// const removeClickHandler = def ("removeClickHandler :: String -> State -> State") (
//   set ("uy", "utility", "eventHandler", "click") (undefined)
// )

// -----------------------------------------------------------------------------

// addInsideEl :: String -> (State -> State) -> State -> State
const addInsideEl = (id: string): any => set("uy", "insideEl", id)

// removeInsideEl :: String -> State -> State
const removeInsideEl = (id: string): any =>
  S.ifElse(has({ uy: { popups: { [id]: isSomething } } }))
    (mod("uy", "insideEl")(delist(id)))
    (identity)

// -----------------------------------------------------------------------------

const detectOutside = ([popup, f]: any[]) =>
  onOutside(`#${popup}`)((_: any) => S.pipe([f, removeInsideEl(popup)]))

const detectOutsideOfElements = (event: any) => (state: any): any => {
  const handlers =
    S.pipe([
      get("uy", "insideEl"),
      S.pairs,
      S.map(detectOutside),
    ])
  return handleUsing(handlers(state))(state, event)
}

// freshState :: State -> State
const freshState =
  set("uy")({
    insideEl: {},
    utility: {
      eventHandler: {
        click: {},
        mousedown: { detectOutsideAction: action(detectOutsideOfElements) },
      },
    },
  })

const clickSubscription =
  S.pipe([
    get("uy", "utility", "eventHandler", "click"),
    S.values,
    handleUsing,
    onClick,
  ])

const mouseDownSubscription =
  S.pipe([
    get("uy", "utility", "eventHandler", "mousedown"),
    S.values,
    handleUsing,
    onMouseDown,
  ])

// subscriptions :: State -> (State | [State])
const subscriptions = (state: any): any => [mouseDownSubscription(state), clickSubscription(state)]

// -----------------------------------------------------------------------------

const uyAppConfig = (config: any): any => ({
  ...config,
  // TODO: account for any subscriptions from `config`
  subscriptions,
  init: freshState(config.init),
})

// -----------------------------------------------------------------------------

export {
  // addClickHandler,
  addInsideEl,
  // removeClickHandler,
  removeInsideEl,
  uyAppConfig,
}
