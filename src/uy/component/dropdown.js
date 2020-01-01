import { h, targetValue } from "../hyperappHelper.js"
import { box, classAttr } from "../utility.js"

const select = ({ disabled, options, updater, ...etc }, value) =>
  box("uy-control uy-select my-drop-down-wrapper", [
    box(classAttr({ "my-drop-down-arrow": true, disabled }), [
      h(
        "select",
        {
          disabled,
          value,
          class: "uy-input my-control-input my-drop-down",
          onchange: [updater, targetValue],
          onfocus: (state, { target }) => {
            target.parentNode.classList.add("focus")
            return state
          },
          onblur: (state, { target }) => {
            target.parentNode.classList.remove("focus")
            return state
          },
          ...etc,
        },
        Object.entries(options).map(([x, content]) => h("option", { value: x }, content)),
      ),
    ]),
  ])

// selectField :: {a} -> String -> VNode
const selectField = ({ disabled, title, ...etc }, value) =>
  box("uy-field", [h("label", { class: classAttr({ disabled }) }, [title, select({ disabled, ...etc }, value)])])

// // option :: String -> a -> VNode
// const option = (content, value) => h("option", { value }, content)

// // radios  :: {a} -> b -> VNode
// const radios = ({ title, updater, options, ...etc }, valueSelected) =>
//   box("uy-control uy-input", [
//     h("label", {}, [
//       title,
//       ...Object.entries(options).map(([value, content]) =>
//         h("label", {}, [
//           h("input", {
//             value,
//             type: "radio",
//             checked: value === valueSelected,
//             onchange: [updater, targetValue],
//             ...etc,
//           }),
//           content,
//         ]),
//       ),
//     ]),
//   ])

// export { option, selectField }

export { select, selectField }
