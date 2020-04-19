import { Types } from "./sanctuaryTypes.js"

const { create, env } = window.sanctuary
const $ = window.sanctuaryDef
const type = window.sanctuaryTypeIdentifiers
const Z = window.sanctuaryTypeClasses

const S = create ({
  checkTypes: !!(window.uy && window.uy.inDevelopment),
  env: [...env, ...Object.values (Types)],
})

// Based on:
// https://dokidokidriven.wordpress.com/2019/03/13/defining-type-checked-functions-in-sanctuary/
// https://dokidokidriven.wordpress.com/2019/01/12/defining-custom-types-in-sanctuary/
const fn = $.create ({
  checkTypes: !!(window.uy && window.uy.inDevelopment),
  env: S.env,
})

// -----------------------------------------------------------------------------

const { elem, map, splitOnRegex, test } = S

const customTypes = {
  Bool: $.Boolean,
  Int: $.Integer,
  ...Types,
}

// https://github.com/sanctuary-js/sanctuary-def/blob/874a7eeb66b725b38a26119b495f26a0488d4719/index.js#L2814
const unaryTypes = ["Array", "Array1", "Descending", "Identity", "JsSet", "Maybe", "Nullable", "StrMap"]
const binaryTypes = ["Array2", "Either", "JsMap", "Pair"]

const markedAsArray = test (/^\[.*\]$/g)
const markedAsFunction = test (/^\((.*->.*)*\)$/g)

// TODO:
// const markedAsPair = test(/^\(.*,.*\)$/g)
// const markedAsTuple = test(/^\((.*,.*)*\)$/g)
// const markedAsNesting = test(/^\(.*\)$/g)

const definitionFor = type => customTypes[type] || $[type]

const parseType = type => {
  if (markedAsArray (type)) {
    return $.Array (parseType (type.slice (1, -1)))
  } else if (markedAsFunction (type)) {
    // TODO:
    return $.AnyFunction
  }

  const constructors = splitOnRegex (/\s+/g) (type)
  const first = constructors[0]
  const firstDef = definitionFor (first)

  if (elem (first) (unaryTypes)) {
    return firstDef (parseType (constructors[1]))
  } else if (elem (first) (binaryTypes)) {
    return firstDef (parseType (constructors[1])) (parseType (constructors[2]))
  }

  return firstDef
}

const token = x => new RegExp (`[ ]*${x}[ ]*`, "g")

const constrained = x => token ("=>").test (x)

const parseSignature = signature => {
  if (constrained (signature)) {
    const [constraints, types] = splitOnRegex (token ("=>")) (signature)
    // TODO:
    // - parse constraints
    console.log (constraints)
    // return [constraints, types]
    return [{}, types]
  }
  return [{}, signature]
}

const def = annotation => f => {
  const [identifier, signature] = splitOnRegex (token ("::")) (annotation)
  const [constraints, types] = parseSignature (signature)
  const typeDefs = map (parseType) (splitOnRegex (token ("->")) (types))
  return fn (identifier) (constraints) (typeDefs) (f)
}

// -----------------------------------------------------------------------------

// unary :: (a -> b) -> (a, ...c) -> b
const unary = f => x => f (x)

// pairAsArray2 :: Pair a b -> Array2 a b
const pairAsArray2 = ([k, v]) => [k, v]

export { $, def, fn, pairAsArray2, S, type, unary, Z }
