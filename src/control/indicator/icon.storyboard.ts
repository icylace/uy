import type { Story } from "../../types"

import { icon, panel, row } from "../../../lib/main"

const freshState = (state: Story): Story => state

const icon1 = () => icon({ fas: true, "fa-filter": true })
const icon2 = () => icon({ fas: true, "fa-file-download": true })
const icon3 = () => icon({ fas: true, "fa-chart-bar": true })
const icon4 = () => icon({ fas: true, "fa-search": true })
const icon5 = () => icon({ fas: true, "fa-spinner": true, "fa-pulse": true })
const icon6 = () => icon({ fas: true, "fa-angle-double-left": true })
const icon7 = () => icon({ fas: true, "fa-angle-left": true })
const icon8 = () => icon({ fas: true, "fa-angle-right": true })
const icon9 = () => icon({ fas: true, "fa-angle-double-right": true })

const view =
  panel("uy-control-storyboard", [
    row([icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8, icon9]),
  ])

export { freshState, view }
