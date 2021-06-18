import "@fortawesome/fontawesome-free/css/fontawesome.css"
import "@fortawesome/fontawesome-free/css/regular.css"
import "@fortawesome/fontawesome-free/css/solid.css"
import "../lib/main.css"
import "./index.css"

// import type { TypedH } from "hyperapp"
// import type { Story } from "./types"

// import { h as ha } from "hyperapp"

// const h: TypedH<Story> = ha

// import type { State, Subscriber, Transform, View } from "hyperapp"
// import type { State, Transform, View } from "hyperapp"
import type { VNode } from "hyperapp"
// import type { Transform } from "../lib/main"
import type { Story } from "./types"

import { h, app, text } from "hyperapp"
// import { panel, uyMouseDownSubscription } from "../lib/main"

// import * as fieldStoryboard from "./widget/container/field.storyboard"
// import * as fieldsetStoryboard from "./widget/container/fieldset.storyboard"
// import * as panelStoryboard from "./widget/container/panel.storyboard"
// import * as popperStoryboard from "./widget/container/popper.storyboard"
// // import * as tableStoryboard from "./widget/container/table.storyboard"

import * as buttonStoryboard from "./widget/control/button.storyboard"
import * as cancelButtonStoryboard from "./widget/control/cancelButton.storyboard"
import * as checkboxStoryboard from "./widget/control/checkbox.storyboard"

// TODO:
// import * as checklistStoryboard from "./widget/control/checklist.storyboard"

import * as datePickerStoryboard from "./widget/control/datePicker.storyboard"
// import * as dropdownStoryboard from "./widget/control/dropdown.storyboard"
// import * as fileStoryboard from "./widget/control/file.storyboard"
// import * as listStoryboard from "./widget/control/list.storyboard"
// import * as multiselectStoryboard from "./widget/control/multiselect.storyboard"
// import * as numberboxStoryboard from "./widget/control/numberbox.storyboard"
// import * as pagerStoryboard from "./widget/control/pager.storyboard"
// import * as radiosStoryboard from "./widget/control/radios.storyboard"
// import * as searchboxStoryboard from "./widget/control/searchbox.storyboard"
// import * as tabsStoryboard from "./widget/control/tabs.storyboard"
// import * as textareaStoryboard from "./widget/control/textarea.storyboard"
// import * as textboxStoryboard from "./widget/control/textbox.storyboard"

// import * as busyStoryboard from "./widget/indicator/busy.storyboard"
// import * as iconStoryboard from "./widget/indicator/icon.storyboard"

export type Storyboard = {
  freshState: (_: Story) => Story
  view: (state: Story) => VNode<Story>
}

const storyboards: Storyboard[] = [
  // fieldStoryboard,
  // fieldsetStoryboard,
  // panelStoryboard,
  // popperStoryboard,
  // // tableStoryboard,

  buttonStoryboard,
  cancelButtonStoryboard,

  checkboxStoryboard,

  // TODO:
  // checklistStoryboard,

  datePickerStoryboard,
  // dropdownStoryboard,
  // fileStoryboard,
  // listStoryboard,
  // multiselectStoryboard,
  // numberboxStoryboard,
  // pagerStoryboard,
  // radiosStoryboard,
  // searchboxStoryboard,
  // tabsStoryboard,
  // textareaStoryboard,
  // textboxStoryboard,

  // iconStoryboard,
  // busyStoryboard,
]

const storyboardView = (state: Story): VNode<Story> =>
  h("div", { class: "uy-storyboard" }, [
    h("div", { class: "uy-storyboard-shelf" }, [
      h("div", { class: "uy-storyboard-sidebar" }, [
        h("div", {}, [
          h("label", {}, [
            h("input", {
              type: "checkbox",
              checked: state.showingNormal,
              onclick: (state, event) => ({
                ...state,
                showingNormal: (event.target as HTMLInputElement).checked,
              }),
            }),
            text("normal"),
          ]),
        ]),
        h("div", {}, [
          h("label", {}, [
            h("input", {
              type: "checkbox",
              checked: state.showingDisabled,
              onclick: (state, event) => ({
                ...state,
                showingDisabled: (event.target as HTMLInputElement).checked,
              }),
            }),
            text("disabled"),
          ]),
        ]),
        h("div", { class: "uy-storyboard-switcher" }, [
          h("ul", {}, [
            h("li", {}, h("p", {}, text("All"))),
            h("li", {}, h("p", {}, text("Buttons"))),
          ]),
        ]),
      ]),
    ]),
    h("div", { class: "uy-storyboard-showcase" }, storyboards.map((x) => x.view(state))),
  ])

// const getHandlers = (state: Story): Transform<Story, Event>[] => {
//   const ids = state.searchboxResultsIDs as Map<string, Transform<Story, Event>>
//   return Array.from(ids).map(([_, f]) => f)
// }

const runApp = (): void => {
  // TODO:
  // const freshState = <S extends UyHelper>(state: State<S>): State<S> => ({
  //   ...state,
  //   uyInsiders: new Map(),
  //   uyMousedownHandlers: new Map([
  //     [
  //       "detectOutsideAction",
  //       (state: State<S>, event: Payload<Event>): StateFormat<S> => {
  //         const detectionsOutside: Transform<S, Event>[] = Array.from(state.uyInsiders).map(
  //           ([insider, f]: [string, Transform<S>]): Transform<S, Event> => {
  //             return onOutside(`#${insider}`, (state) => uyInsidersRemove("uyInsiders")(insider, f(state)))
  //           }
  //         )
  //         return handleUsing(detectionsOutside)(state, event)
  //       },
  //     ],
  //   ]),
  // })

  app<Story>({
    init: storyboards
      .map((x) => x.freshState)
      .reduce((state, f) => f(state), {
        showingNormal: true,
        showingLocked: false,
        showingDisabled: true,
      } as Story),
    // init: {
    //   showingNormal: true,
    //   showingLocked: false,
    //   showingDisabled: true,
    // },
    // subscriptions: (_state: Story): Subscriber<Story>[] => {
    //   return [uyMouseDownSubscription(getHandlers)]
    // },
    view: storyboardView,
    node: document.getElementById("app")!,
  })
}

runApp()
