import "@fortawesome/fontawesome-free/css/fontawesome.css"
import "@fortawesome/fontawesome-free/css/regular.css"
import "@fortawesome/fontawesome-free/css/solid.css"
import "@icylace/uy/dist/index.css"
import "/index.css"

// import type { TypedH } from "hyperapp"
// import type { Story } from "./types"

// import { h as ha } from "hyperapp"

// const h: TypedH<Story> = ha

// // import type { State, Subscriber, Transform, View } from "hyperapp"
// // import type { State, Transform, View } from "hyperapp"
// import type { TypedH, VNode } from "hyperapp"
// import type { Story } from "./types"

// import { h as ha, app, text } from "hyperapp"
// // import { panel, uyMouseDownSubscription } from "@icylace/uy"
// import { panel } from "@icylace/uy"

// import * as buttonStoryboard from "./control/button/button.storyboard"
// import * as cancelButtonStoryboard from "./control/button/cancelButton.storyboard"

// import * as boardStoryboard from "./control/container/board.storyboard"
// import * as fieldStoryboard from "./control/container/field.storyboard"
// import * as fieldsetStoryboard from "./control/container/fieldset.storyboard"
// // TODO:
// // import * as overlayStoryboard from "./control/container/overlay.storyboard"
// import * as popupStoryboard from "./control/container/popup.storyboard"
// import * as tableStoryboard from "./control/container/table.storyboard"
// import * as uiStoryboard from "./control/container/ui.storyboard"

// // import * as iconStoryboard from "./control/indicator/icon.storyboard"
// import * as spinnerStoryboard from "./control/indicator/spinner.storyboard"

// import * as checkboxStoryboard from "./control/inputter/checkbox.storyboard"
// import * as checklistStoryboard from "./control/inputter/checklist.storyboard"
// import * as datePickerStoryboard from "./control/inputter/datePicker.storyboard"
// import * as dropdownStoryboard from "./control/inputter/dropdown.storyboard"
// import * as fileStoryboard from "./control/inputter/file.storyboard"
// import * as listStoryboard from "./control/inputter/list.storyboard"
// import * as multiselectStoryboard from "./control/inputter/multiselect.storyboard"
// import * as numberboxStoryboard from "./control/inputter/numberbox.storyboard"
// import * as pagerStoryboard from "./control/inputter/pager.storyboard"
// import * as radiosStoryboard from "./control/inputter/radios.storyboard"
// import * as searchboxStoryboard from "./control/inputter/searchbox.storyboard"
// import * as tabsStoryboard from "./control/inputter/tabs.storyboard"
// import * as textareaStoryboard from "./control/inputter/textarea.storyboard"
// import * as textboxStoryboard from "./control/inputter/textbox.storyboard"

// const h: TypedH<Story> = ha

// export type Storyboard = {
//   freshState: (_: Story) => Story
//   view: (state: Story) => VNode<Story>
// }

// const storyboards: Storyboard[] = [
//   boardStoryboard,
//   fieldStoryboard,
//   fieldsetStoryboard,
//   // overlayStoryboard,
//   popupStoryboard,
//   tableStoryboard,
//   uiStoryboard,

//   buttonStoryboard,
//   cancelButtonStoryboard,

//   checkboxStoryboard,
//   checklistStoryboard,
//   datePickerStoryboard,
//   dropdownStoryboard,
//   fileStoryboard,
//   listStoryboard,
//   multiselectStoryboard,
//   numberboxStoryboard,
//   pagerStoryboard,
//   radiosStoryboard,
//   searchboxStoryboard,
//   tabsStoryboard,
//   textareaStoryboard,
//   textboxStoryboard,

//   // iconStoryboard,
//   spinnerStoryboard,
// ]

// const storyboardView =
//   panel("uy-storyboard", [
//     (state: Story) =>
//       h("label", {}, [
//         h("input", {
//           type: "checkbox",
//           checked: state.showingNormal,
//           onclick: (state, event) => {
//             const target = event.target as HTMLInputElement
//             return { ...state, showingNormal: target.checked }
//           },
//         }),
//         text("normal"),
//       ]),
//     (state: Story) =>
//       h("label", {}, [
//         h("input", {
//           type: "checkbox",
//           checked: state.showingDisabled,
//           onclick: (state, event) => {
//             const target = event.target as HTMLInputElement
//             return { ...state, showingDisabled: target.checked }
//           },
//         }),
//         text("disabled"),
//       ]),
//     ...storyboards.map((x) => x.view),
//   ])

// // const getHandlers = (state: Story): Transform<Story, Event>[] => {
// //   const ids = state.searchboxResultsIDs as Map<string, Transform<Story, Event>>
// //   return Array.from(ids).map(([_, f]) => f)
// // }

// const runApp = (): void => {
//   const elApp = document.getElementById("app-uy-storyboard")
//   if (!elApp) return

//   // TODO:
//   // const freshState = <S extends UyHelper>(state: State<S>): State<S> => ({
//   //   ...state,
//   //   uyInsiders: new Map(),
//   //   uyMousedownHandlers: new Map([
//   //     [
//   //       "detectOutsideAction",
//   //       (state: State<S>, event: Payload<Event>): StateFormat<S> => {
//   //         const detectionsOutside: Transform<S, Event>[] = Array.from(state.uyInsiders).map(
//   //           ([insider, f]: [string, Transform<S>]): Transform<S, Event> => {
//   //             return onOutside(`#${insider}`, (state) => uyInsidersRemove("uyInsiders")(insider, f(state)))
//   //           }
//   //         )
//   //         return handleUsing(detectionsOutside)(state, event)
//   //       },
//   //     ],
//   //   ]),
//   // })

//   app({
//     init: storyboards
//       .map((x) => x.freshState)
//       .reduce((state, f) => f(state), {
//         showingNormal: true,
//         showingLocked: false,
//         showingDisabled: true,
//       } as Story),
//     // subscriptions: (_state: Story): Subscriber<Story>[] => {
//     //   return [uyMouseDownSubscription(getHandlers)]
//     // },
//     view: storyboardView,
//     node: elApp,
//   })
// }

// runApp()
