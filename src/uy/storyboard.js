import {
  asArray,
  box,
  checkbox,
  checkboxField,
  checklist,
  checklistField,
  classAttr,
  datePicker,
  datePickerField,
  fieldset,
  icon,
  multiSelect,
  multiSelectField,
  pager,
  radios,
  radiosField,
  select,
  selectField,
  spinner,
  table,
  tabs,
  textbox,
  textboxField,
  vnode,
} from "./uy.js"

const storyboard = state => {
  // const focus = xs => concat(["test"], xs)
  // const disabled = get(focus("disabled"), state)

  return box("uy-storyboard", [
    checkbox({ content: "", disabled: false, updater: state => state }, state.checkbox.value),
    checkboxField({ disabled: false, title: "TEST" }, state.checkboxField.value),

    // appCheckbox({ text: "disabled" }, focus("disabled")),
    // appCheckbox({ text: "UI state" }, focus("uiState")),
    // // appTabs(
    // //   {
    // //     disabled,
    // //     navigationHeader: h1(["test"]),
    // //     navigationFooter: myButton("+", null, disabled),
    // //     tabs: [
    // //       [p(["1"]), [img({ src: "http://placekitten.com/800/150" }), p(["one"])]],
    // //       [p(["2"]), [img({ src: "http://placekitten.com/801/250" }), p(["two"])]],
    // //       [p(["3"]), [img({ src: "http://placekitten.com/802/250" }), p(["three"])]],
    // //       [p(["4"]), [img({ src: "http://placekitten.com/803/250" }), p(["four"])]],
    // //       [p(["V"]), [img({ src: "http://placekitten.com/804/250" }), p(["five"])]],
    // //       [p(["V23"]), [img({ src: "http://placekitten.com/80/25" }), p(["five"])]],
    // //       [
    // //         p({ "data-tab-name": "five" }, ["V24"]),
    // //         [img({ src: "http://placekitten.com/106/250" }), p(["five"])],
    // //       ],
    // //       [p(["V"]), [img({ src: "http://placekitten.com/807/250" }), p(["five"])]],
    // //       [p(["a"]), [p(["a"])]],
    // //       [p(["b"]), [p(["b"])]],
    // //       [p(["c"]), [p(["c"])]],
    // //       [p(["d"]), [p(["d"])]],
    // //       [p(["e"]), [p(["e"])]],
    // //       [p(["f"]), [p(["f"])]],
    // //       [p(["g"]), [p(["g"])]],
    // //       [p(["h"]), [p(["h"])]],
    // //       [p(["i"]), [p(["i"])]],
    // //       [p(["j"]), [p(["j"])]],
    // //       [p(["k"]), [p(["k"])]],
    // //       [p(["l"]), [p(["l"])]],
    // //     ],
    // //   },
    // //   focus("curTab"),
    // // ),
    // // appVerticalTabs(
    // //   {
    // //     disabled,
    // //     navigationHeader: h1("test"),
    // //     tabs: [
    // //       [p(["1"]), [img({ src: "http://placekitten.com/800/150" }), p(["one"])]],
    // //       [p(["2"]), [img({ src: "http://placekitten.com/801/250" }), p(["two"])]],
    // //       [p(["3"]), [img({ src: "http://placekitten.com/802/250" }), p(["three"])]],
    // //       [p(["4"]), [img({ src: "http://placekitten.com/803/250" }), p(["four"])]],
    // //       [p(["V"]), [img({ src: "http://placekitten.com/804/250" }), p(["five"])]],
    // //       [p(["V23"]), [img({ src: "http://placekitten.com/80/25" }), p(["five"])]],
    // //       [
    // //         p({ "data-tab-name": "five" }, ["V24"]),
    // //         [img({ src: "http://placekitten.com/106/250" }), p(["five"])],
    // //       ],
    // //       [p(["V"]), [img({ src: "http://placekitten.com/807/250" }), p(["five"])]],
    // //     ],
    // //   },
    // //   focus("curVerticalTab"),
    // // ),
    // // myButton("test", null, disabled),
    // // appCheckbox({ disabled }, focus("boolean")),
    // // appCheckbox({ disabled, text: "test" }, focus("boolean")),
    // // appDatePicker({ disabled }, focus("date")),
    // // appDropDown({ disabled, choices: ["foo", "bar", "baz"] }, focus("text")),
    // // appDropDown(
    // //   {
    // //     disabled,
    // //     defaultLabel: "flgsgdshjfgjk",
    // //     choices: ["foo", "bar", "baz"],
    // //   },
    // //   focus("text"),
    // // ),
    // // myChoice({ disabled, leftLabel: "left", rightLabel: "right" }, null),
    // // myChoice({ disabled, leftLabel: "left", rightLabel: "right" }, true),
    // // myChoice({ disabled, leftLabel: "left", rightLabel: "right" }, false),
    // // appFileUpload({ disabled }, focus("file")),
    // // appFreeformList({ disabled }, focus("xs")),
    // // appFreeformText({ disabled }, focus("text")),
    // // appNumberBox({ disabled }, focus("number")),
    // // appNumberBox({ disabled, text: "foo" }, focus("number")),
    // // myTable({ disabled, headers: ["List"] }, [
    // //   ["argwergreg"],
    // //   [appTextBox({ disabled }, focus("text"))],
    // //   ["bergergerg"],
    // //   ["c5gw45g4w5g"],
    // //   ["aqrttrt"],
    // // ]),
    // // appTextBox({ disabled }, focus("text")),
    // // appTextBox({ disabled }, append(1, focus("xs"))),
    // appSearchBox(
    //   {
    //     disabled,
    //     findings: get(focus(["utility", "tmpSearchBox", "findings"]), state),
    //     clearFindings: () => update(set(focus(["utility", "tmpSearchBox", "findings"]), [])),
    //     searching: get(focus(["utility", "tmpSearchBox", "searching"]), state),
    //     search: async (updateInput, x) => {
    //       updateInput(x)
    //       if (x) {
    //         update(set(focus(["utility", "tmpSearchBox", "searching"]), true))
    //         // const findings = ["oiwiude", "oisdfdsffweoiude", "oiweoi23ude", "f435432oiweoiude", "2343432oiweoiude"]
    //         const findings = await insiteAPI.searchApps(x, ({ done }) => {
    //           if (done) {
    //             update(set(focus(["utility", "tmpSearchBox", "searching"]), false))
    //           }
    //         })
    //         update(set(focus(["utility", "tmpSearchBox", "findings"]), findings))
    //       } else {
    //         update(set(focus(["utility", "tmpSearchBox", "findings"]), []))
    //       }
    //     },
    //   },
    //   focus("searchText"),
    // ),
    // mySearchList(
    //   {
    //     disabled,
    //     findings: i => get(focus(["utility", "tmpSearchList", i, "findings"]), state),
    //     clearFindings: i => update(set(focus(["utility", "tmpSearchList", i, "findings"]), [])),
    //     isSearching: i => get(focus(["utility", "tmpSearchList", i, "searching"]), state),
    //     search: i => async (updateInput, x) => {
    //       updateInput(x)
    //       if (x) {
    //         update(set(focus(["utility", "tmpSearchList", i, "searching"]), true))
    //         // const findings = ["oiwiude", "oisdfdsffweoiude", "oiweoi23ude", "f435432oiweoiude", "2343432oiweoiude"]
    //         const findings = await insiteAPI.searchApps(x, ({ done }) => {
    //           if (done) {
    //             update(set(focus(["utility", "tmpSearchList", i, "searching"]), false))
    //           }
    //         })
    //         update(set(focus(["utility", "tmpSearchList", i, "findings"]), findings))
    //       } else {
    //         update(set(focus(["utility", "tmpSearchList", i, "findings"]), []))
    //       }
    //     },
    //     updateList: xs => {
    //       update(set(focus("searches"), xs))
    //       // update(set(focus(["utility", "tmpSearchList"]), xs))
    //     },
    //     updateItem: i => x => {
    //       update(set(focus(["searches", i]), x))
    //       update(set(focus(["utility", "tmpSearchList", i]), x))
    //     },
    //   },
    //   asArray(get(focus("searches"), state)),
    // ),
    // // appTransfer({ disabled, leftHeader: "a", rightHeader: "b", choices: ["d", "e", "f"] }, focus("texts")),
    // // myYesNo({ disabled, update: noop }, null),
    // // myYesNo({ disabled, update: noop }, true),
    // // myYesNo({ disabled, update: noop }, false),
    // // appYesNo({ disabled }, focus("boolean")),
  ])
}

export { storyboard }
