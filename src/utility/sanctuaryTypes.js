const S = window.sanctuary
const $ = window.sanctuaryDef

const { Pair, all, fromPairs, map, pairs, pipe } = S.unchecked

// -----------------------------------------------------------------------------

const hasOwn = prop => obj => Object.prototype.hasOwnProperty.call (obj, prop)

const hasProps = props => obj => props.length && props.every (prop => hasOwn (prop) (obj))

/* eslint-disable eqeqeq, valid-typeof */

const required = type => prop => obj =>
  hasOwn (prop) (obj)
    ? obj[prop] != undefined && typeof obj[prop] === type
    : false

const optional = type => prop => obj =>
  hasOwn (prop) (obj)
    ? obj[prop] == undefined || typeof obj[prop] === type
    : true

const optionalArray = prop => obj =>
  hasOwn (prop) (obj)
    ? obj[prop] == undefined || (typeof obj[prop] === "object" && Array.isArray (obj[prop]))
    : true

/* eslint-enable eqeqeq, valid-typeof */

const requiredArray = prop => obj => required ("object") (prop) (obj) && Array.isArray (obj[prop])
const requiredBool = required ("boolean")
const requiredFunction = required ("function")
const requiredNumber = required ("number")
const requiredObject = required ("object")
const requiredString = required ("string")

const optionalBool = optional ("boolean")
const optionalFunction = optional ("function")
const optionalObject = optional ("object")
const optionalNumber = optional ("number")
const optionalString = optional ("string")

const having =
  xr => obj =>
    pipe ([
      pairs,
      all (([prop, check]) => check (prop) (obj)),
    ]) (xr)

// -----------------------------------------------------------------------------

// Nullary :: String -> [Type] -> (a -> Bool) -> String -> Type
const Nullary = url => parents => f => name => $.NullaryType (name) (url) (parents) (f)

const Type = {}

// -----------------------------------------------------------------------------

Type.ClassAttr = Nullary ("") ([]) (x => typeof x === "object" || typeof x === "string")
Type.NumberOrString = Nullary ("") ([]) (x => typeof x === "number" || typeof x === "string")
Type.State = Nullary ("https://github.com/jorgebucaran/hyperapp") ([$.Object]) (_ => true)

Type.VNode =
  Nullary
    ("https://github.com/jorgebucaran/hyperapp/blob/cf6c7451473ae49647526c3781338a6ab39cfc7f/src/index.js#L373")
    ([])
    (x =>
      x == null ||
      typeof x === "number" ||
      typeof x === "string" ||
      (typeof x === "object" && having ({
        children: requiredArray,
        key: optionalString,
        name: requiredString,
        node: optionalObject,
        props: requiredObject,
        type: optionalNumber,
      }) (x))
    )

// -----------------------------------------------------------------------------

// Record :: (a -> Bool) -> String -> Type
const Record = Nullary ("") ([$.Object])

Type.ComponentOptions = Record (having ({ disabled: optionalBool, locked: optionalBool }))

// Component :: (a -> Bool) -> String -> Type
const Component = Nullary ("") ([Type.ComponentOptions ("ComponentOptions")])

Type.PopupOptions = Component (having ({ id: requiredString }))
Type.TableOptions = Component (having ({
  headers: optionalArray,
  orderColumn: optionalString,
  sortDescending: optionalBool,
}))

// -----------------------------------------------------------------------------

Type.ControlOptions = Component (_ => true)

// Control :: (a -> Bool) -> String -> Type
const Control = Nullary ("") ([Type.ControlOptions ("ControlOptions")])

Type.LabeledControlOptions = Control (having ({ label: requiredString }))
Type.ButtonOptions = Control (having ({ update: requiredFunction }))
Type.ChecklistOptions = Control (having ({ render: requiredFunction }))
Type.DropdownOptions = Control (having ({ options: requiredObject }))
Type.ListOptions = Control (having ({
  headers: optionalArray,
  updateItem: optionalFunction,
}))
Type.MultiselectOptions = Control (having ({
  options: requiredObject,
  usingColumnMode: requiredBool,
}))
Type.PagerOptions = Control (having ({
  itemsPerPage: requiredNumber,
  pageRange: requiredNumber,
}))
Type.RadiosOptions = Control (having ({ options: requiredObject }))
Type.SearchboxOptions = Control (having ({ search: requiredFunction }))
Type.TabsOptions = Control (having ({
  itemsFooter: optionalArray,
  itemsHeader: optionalArray,
  tabList: requiredArray,
}))

// -----------------------------------------------------------------------------

// TODO:
// Type.ControlData = Record (having ({ value: requiredString }))
Type.ControlData = Record (hasProps (["value"]))

// ControlData ::(a -> Bool) -> String -> Type
const ControlData = Nullary ("") ([Type.ComponentOptions ("ControlData")])

Type.SearchboxData = ControlData (having ({
  focused: requiredBool,
  searching: requiredBool,
  results: requiredArray,
}))

Type.PagerData = Record (having ({ itemsTotal: requiredNumber }))

// -----------------------------------------------------------------------------

const finalizeType = ([t, f]) => Pair (t) (f (t))

const Types = fromPairs (map (finalizeType) (pairs (Type)))

export { Types }
