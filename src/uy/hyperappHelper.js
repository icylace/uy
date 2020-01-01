import { app, h } from "../../../node_modules/hyperapp/src/index.js"

// https://unpkg.com/@hyperapp/events@0.0.3/src/index.js
const targetChecked = event => event.target.checked

// https://unpkg.com/@hyperapp/events@0.0.3/src/index.js
const targetValue = event => event.target.value

export { app, h, targetChecked, targetValue }
