import { h } from "./hyperappHelper.js"

// asArray :: Maybe [a] -> [a]
const asArray = xs => (Array.isArray(xs) ? xs : [])

// classAttr :: { String: Bool } -> String
const classAttr = xr =>
  Object.entries(xr)
    .reduce((acc, [cssClass, active]) => (active ? [...acc, cssClass] : acc), [])
    .join(" ")

// box :: String -> [VNode] -> VNode
const box = (x, xs) => h("div", { class: x }, xs)

// icon :: String -> VNode
const icon = x => h("i", { class: classAttr({ "uy-icon": true, [x]: x }) })

// Based on:
// https://github.com/Swizz/hyperapp-html
const vnode = new Proxy(
  {},
  {
    get: (_obj, name) => (attributes, children) =>
      typeof attributes === "object" && !Array.isArray(attributes)
        ? h(name, attributes, children)
        : h(name, {}, attributes),
  },
)

export { asArray, box, classAttr, icon, vnode }
