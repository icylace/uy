// TODO:

// https://github.com/jorgebucaran/hyperapp/blob/f30e70e77513948d2a1286ea6509b4e0c1de8999/lib/dom/src/index.js
const fx = (a: Function) => (b: any): any[] => [a, b]

// var fx = function (a) {
//   return function (b) {
//     return [a, b]
//   }
// }

// export var focus = fx(function (_, id) {
//   document.getElementById(id).focus()
// })

// export var blur = fx(function (_, id) {
//   document.getElementById(id).blur()
// })

// glam :: { String: Bool } -> String
const glam = (xr: any): string =>
  Object.entries(xr)
    .reduce((acc: any, [cssClass, active]: any) => (active ? [...acc, cssClass] : acc), [])
    .join(" ")

export { fx, glam }
