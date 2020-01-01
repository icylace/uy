// TODO:

import { app } from "../node_modules/hyperapp/src/index.js"

import { box } from "./uy/uy.js"

import { storyboard } from "./uy/storyboard.js"

// -----------------------------------------------------------------------------

/* *

const goToPage = newPage => state => {
  if (state.indicators.searching) return state

  const newState = {
    ...state,
    indicators: {
      ...state.indicators,
      searching: true,
    },
    filters: {
      ...state.filters,
      offset: newPage * state.data.itemsPerPage,
    },
    data: {
      ...state.data,
      page: newPage,
    },
  }
  return [newState, refresh(newState.filters, updateData)]
}

const updateData = (searchResults, itemsTotal) => state => ({
  ...state,
  indicators: {
    ...state.indicators,
    searching: false,
  },
  data: {
    ...state.data,
    searchResults,
    itemsTotal,
  },
})

// -----------------------------------------------------------------------------

/* */

// TODO:

const freshState = () => {
  // const itemsPerPage = 5
  // const page = 0
  return {
    checkbox: { value: false },
    checkboxField: { value: false },

    // indicators: {
    //   searching: false,
    // },
    // filters: {
    //   contentTypes: ["solution", "sol_approval"],
    //   // solutionStatuses: [2, 3, 4, 5, 6, 7, 36, 37, 38, 39, 40],
    //   solutionStatuses: [36, 37, 38, 39, 40],
    //   sectionStatusesForAssignment: [13, 14, 43],
    //   solutionNumber: "",
    //   clarityProjectNumber: "",
    //   projectName: "",
    //   createdAtOnOrAfter: "2019-11-01",
    //   createdAtBefore: "",
    //   changedAtOnOrAfter: "",
    //   changedAtBefore: "",
    //   createdByRealName: "",
    //   createdByUsername: "",
    //   assignedToRealName: "",
    //   assignedToUsername: "",

    //   orderColumn: "changedAt",
    //   sortAscending: false,
    //   limit: itemsPerPage,
    //   offset: 0,
    // },
    // data: {
    //   searchResults: [],
    //   itemsTotal: 0,
    //   itemsPerPage,
    //   page,
    // },
  }
}

// -----------------------------------------------------------------------------

// const linkFromMarkup = markup => {}

// const order = (state, orderColumn) => {
//   if (state.indicators.searching) return state

//   if (orderColumn == null) {
//     const newFilters = {
//       ...state,
//       indicators: {
//         ...state.indicators,
//         searching: true,
//       },
//       filters: {
//         ...state.filters,
//         sortAscending: !state.filters.sortAscending,
//       },
//     }
//     return [newFilters, refresh(newFilters.filters, updateData)]
//   }

//   const newFilters = {
//     ...state,
//     indicators: {
//       ...state.indicators,
//       searching: true,
//     },
//     filters: {
//       ...state.filters,
//       orderColumn,
//       sortAscending: orderColumn === state.filters.orderColumn ? !state.filters.sortAscending : true,
//     },
//   }
//   return [newFilters, refresh(newFilters.filters, updateData)]
// }

// const targetColumn = event => event.target.dataset.column

// const handleHeader = [order, targetColumn]

// -----------------------------------------------------------------------------

const appView = state =>
  box("app-report-lab", [
    storyboard(state),

    // TODO:

    // state.indicators.searching ? box("report-searching", [spinner()]) : null,

    // tabs({ tabs: [], updater: () => {} }, state),

    // checklist,
    // datePicker,
    // fieldset,
    // multiSelect,
    // pager,
    // radios,
    // rawChecklist,
    // rawDatePicker,
    // rawMultiSelect,
    // rawRadios,
    // rawSelect,
    // rawTextBox,
    // select,
    // spinner,
    // table,
    // tabs,
    // textbox,

    // datePicker({ title: "TEST" }, state.filters.createdAtOnOrAfter),

    // multiSelect(
    //   {
    //     title: "Solution Status",
    //     options: Object.fromEntries(
    //       [
    //         // SolutionStatus.Creation,
    //         SolutionStatus.Draft,
    //         SolutionStatus.Submitted,
    //         SolutionStatus.DRTiering,
    //         SolutionStatus.Design,
    //         SolutionStatus.DesignComplete,
    //         SolutionStatus.ARB,
    //         SolutionStatus.PreliminaryApproval,
    //         SolutionStatus.Approved,
    //         SolutionStatus.ApprovedARBNotRequired,
    //         SolutionStatus.OnHold,
    //         SolutionStatus.Cancelled,
    //       ].map(x => [x, SolutionStatus.show(x)]),
    //     ),
    //   },
    //   state.filters.solutionStatuses,
    // ),

    // select(
    //   {
    //     title: "Content Type",
    //     options: [
    //       option("Appliance", "sol_appliance"),
    //       option("Application", "sol_application"),
    //       option("ARB QA", "sol_arbqa"),
    //       option("Assignment", "sol_approval"),
    //       option("Basic page", "page"),
    //       option("Book page", "book"),
    //       option("Citrix", "sol_citrix"),
    //       option("Database", "sol_db"),
    //       option("Datacenter", "sol_dc"),
    //       option("Decommission", "sol_deco"),
    //       option("Desktop", "sol_desktop"),
    //       option("Device", "sol_device"),
    //       option("Directory", "sol_ad"),
    //       option("Disaster Recovery", "sol_dr"),
    //       option("End User Location", "sol_loc"),
    //       option("FAQ", "faq"),
    //       option("Follow-up", "sol_followup"),
    //       option("Help", "help"),
    //       option("Holiday", "holiday"),
    //       option("Infrastructure Impact Assessment", "infra_impact"),
    //       option("Interface", "sol_interface"),
    //       option("Maintenance Window", "maintenance_window"),
    //       option("Meeting", "sol_meeting"),
    //       option("Network", "sol_network"),
    //       option("Patching", "sol_patching"),
    //       option("PHI Security", "sol_phi"),
    //       option("PMO QA", "sol_pmoqa"),
    //       option("Related Files", "sol_files"),
    //       option("Security Engineering", "sol_security"),
    //       option("Server", "sol_server"),
    //       option("Server Backup", "sc_backup"),
    //       option("Server Commissioning Build", "sc_build"),
    //       option("Server Commissioning Build Order", "sc_build_order"),
    //       option("Server Commissioning Build Task", "sc_build_task"),
    //       option("Server Commissioning Task", "sc_task"),
    //       option("Solution", "solution"),
    //       option("Storage", "sol_storage"),
    //       option("Storage Standard", "storage_standard"),
    //       option("Team", "team"),
    //       option("Vendor", "sol_vendor"),
    //     ],
    //   },
    //   state.filters.contentTypes,
    // ),

    // select(
    //   {
    //     title: "Solution Status",
    //     options: [
    //       // SolutionStatus.Creation,
    //       SolutionStatus.Draft,
    //       SolutionStatus.Submitted,
    //       SolutionStatus.DRTiering,
    //       SolutionStatus.Design,
    //       SolutionStatus.DesignComplete,
    //       SolutionStatus.ARB,
    //       SolutionStatus.PreliminaryApproval,
    //       SolutionStatus.Approved,
    //       SolutionStatus.ApprovedARBNotRequired,
    //       SolutionStatus.OnHold,
    //       SolutionStatus.Cancelled,
    //     ].map(x => option(SolutionStatus.show(x), x)),
    //   },
    //   state.filters.solutionStatuses,
    // ),

    // select(
    //   {
    //     title: "Section Status (only for Assignments)",
    //     options: [
    //       // AssignmentStatus.Creation,
    //       AssignmentStatus.Draft,
    //       AssignmentStatus.Complete,
    //       AssignmentStatus.Constraint,
    //     ].map(x => option(AssignmentStatus.show(x), x)),
    //   },
    //   state.filters.sectionStatusesForAssignment,
    // ),

    // textbox({ title: "Solution Number" }, state.filters.solutionNumber),

    // fieldset({ class: "uy-fieldset -reset", title: "Creator" }, [
    //   textbox({ title: "by real name" }, state.filters.createdByRealName),
    // ]),

    // fieldset({ title: "Assignment-Specific Fields" }, [
    //   fieldset({ class: "uy-fieldset -reset", title: "Assignee" }, [
    //     textbox({ title: "by real name" }, state.filters.assignedToRealName),
    //   ]),
    // ]),

    // table(
    //   {
    //     class: "uy-table",
    //     style: { marginTop: "1em" },
    //     headers: [
    //       "#",
    //       [{ class: "sortable", "data-column": "solutionNumberName", onclick: handleHeader }, "Solution Number"],
    //       [{ class: "sortable", "data-column": "nodeID", onclick: handleHeader }, "Solution Node ID"],
    //       [{ class: "sortable", "data-column": "contentTypeName", onclick: handleHeader }, "Content Type"],
    //       [{ class: "sortable", "data-column": "section", onclick: handleHeader }, "Section"],
    //       [{ class: "sortable", "data-column": "sectionStatusName", onclick: handleHeader }, "Section Status"],
    //       [
    //         { class: "sortable", "data-column": "clarityProjectNumberName", onclick: handleHeader },
    //         "Clarity PPM Project Number",
    //       ],
    //       [{ class: "sortable", "data-column": "projectName", onclick: handleHeader }, "Project Name"],
    //       [{ class: "sortable", "data-column": "solutionStatusName", onclick: handleHeader }, "Solution Status"],
    //       [{ class: "sortable", "data-column": "percentComplete", onclick: handleHeader }, "Percent Complete"],
    //       [{ class: "sortable", "data-column": "creatorUserRealName", onclick: handleHeader }, "Created By"],
    //       [{ class: "sortable", "data-column": "createdAt", onclick: handleHeader }, "Created On"],
    //       [{ class: "sortable", "data-column": "changedAt", onclick: handleHeader }, "Last Updated"],
    //     ],
    //     orderColumn: state.filters.orderColumn,
    //     sortAscending: state.filters.sortAscending,
    //   },

    //   state.data.searchResults.length
    //     ? state.data.searchResults.map((x, i) => [
    //         state.data.page * state.data.itemsPerPage + i + 1,
    //         x.solutionNumber ? linkFromMarkup(x.solutionNumber) : null,
    //         x.nodeID ? h("a", { href: `/node/${x.nodeID}` }, x.nodeID) : null,
    //         x.type ? x.type : null,
    //         x.section ? x.section : null,
    //         x.sectionStatus ? x.sectionStatus : null,
    //         x.clarityProjectNumber ? linkFromMarkup(x.clarityProjectNumber) : null,
    //         x.projectName ? x.projectName : null,
    //         x.solutionStatus ? x.solutionStatus : null,
    //         x.percentComplete ? x.percentComplete : null,
    //         x.creatorUser ? linkFromMarkup(x.creatorUser) : null,
    //         x.createdAt ? x.createdAt : null,
    //         x.changedAt ? x.changedAt : null,
    //       ])
    //     : [[[{ class: "report-no-results", colspan: 13 }, [h("p", {}, [h("em", {}, "no results")])]]]],
    // ),

    // h("div", { class: "uy-pager-container report-pager" }, [
    //   // pager({
    //   //   itemsTotal: state.data.itemsTotal,
    //   //   itemsPerPage: state.data.itemsPerPage,
    //   //   page: state.data.page,
    //   //   pageRange: 5,
    //   //   updater: goToPage,
    //   // }),
    //   state.indicators.searching ? box("report-paging", [spinner()]) : null,
    //   rawSelect(
    //     {
    //       style: { marginLeft: "4em" },
    //       title: "Items per page",
    //       options: {
    //         25: "25",
    //         50: "50",
    //         100: "100",
    //       },
    //       updater: (state, value) => ({
    //         ...state,
    //         filters: {
    //           ...state.filters,
    //           limit: value,
    //         },
    //       }),
    //     },
    //     state.filters.limit,
    //   ),
    // ]),
  ])

const runApp = () => {
  const elApp = document.querySelector("#app-uy-storyboard")
  if (!elApp) return

  app({
    init: freshState(),
    view: appView,
    node: elApp,
  })
}

// export { runApp }

runApp()
