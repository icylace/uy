// import './style.css'

// const app = document.querySelector<HTMLDivElement>('#app')!

// app.innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `

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

import * as buttonStoryboard from "./control/button/button.storyboard"
import * as cancelButtonStoryboard from "./control/button/cancelButton.storyboard"

// import * as boardStoryboard from "./control/container/board.storyboard"
import * as fieldStoryboard from "./control/container/field.storyboard"
import * as fieldsetStoryboard from "./control/container/fieldset.storyboard"
// import * as overlayStoryboard from "./control/container/overlay.storyboard"
import * as popupStoryboard from "./control/container/popup.storyboard"
// import * as tableStoryboard from "./control/container/table.storyboard"
import * as uiStoryboard from "./control/container/ui.storyboard"

// import * as iconStoryboard from "./control/indicator/icon.storyboard"
// import * as spinnerStoryboard from "./control/indicator/spinner.storyboard"

import * as checkboxStoryboard from "./control/inputter/checkbox.storyboard"
import * as checklistStoryboard from "./control/inputter/checklist.storyboard"
import * as datePickerStoryboard from "./control/inputter/datePicker.storyboard"
import * as dropdownStoryboard from "./control/inputter/dropdown.storyboard"
import * as fileStoryboard from "./control/inputter/file.storyboard"
import * as listStoryboard from "./control/inputter/list.storyboard"
import * as multiselectStoryboard from "./control/inputter/multiselect.storyboard"
import * as numberboxStoryboard from "./control/inputter/numberbox.storyboard"
import * as pagerStoryboard from "./control/inputter/pager.storyboard"
import * as radiosStoryboard from "./control/inputter/radios.storyboard"
import * as searchboxStoryboard from "./control/inputter/searchbox.storyboard"
import * as tabsStoryboard from "./control/inputter/tabs.storyboard"
import * as textareaStoryboard from "./control/inputter/textarea.storyboard"
import * as textboxStoryboard from "./control/inputter/textbox.storyboard"

export type Storyboard = {
  freshState: (_: Story) => Story
  view: (state: Story) => VNode<Story>
}

const storyboards: Storyboard[] = [
  // boardStoryboard,
  fieldStoryboard,
  fieldsetStoryboard,
  // overlayStoryboard,
  popupStoryboard,
  // tableStoryboard,
  uiStoryboard,

  buttonStoryboard,
  cancelButtonStoryboard,

  checkboxStoryboard,
  checklistStoryboard,
  datePickerStoryboard,
  dropdownStoryboard,
  fileStoryboard,
  listStoryboard,
  multiselectStoryboard,
  numberboxStoryboard,
  pagerStoryboard,
  radiosStoryboard,
  searchboxStoryboard,
  tabsStoryboard,
  textareaStoryboard,
  textboxStoryboard,

  // iconStoryboard,
  // spinnerStoryboard,
]

const storyboardView = (state: Story): VNode<Story> =>
  h("div", { class: "uy-storyboard" }, [
    h("div", { class: "uy-storyboard-shelf" }, [
      h("div", { class: "uy-storyboard-sidebar" }, [
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
        h("div", { class: "uy-storyboard-switcher" }, [
          h("ul", {}, [
            h("li", {}, [
              h("p", {}, text("All")),
            ]),
            h("li", {}, [
              h("p", {}, text("Buttons")),
            ]),
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
