// identity :: a -> a
const identity = (x: any): any => x

// ifExists :: (Nullable a, Nullable b) => (a -> b) -> a -> b
const ifExists = (f: Function) => (x: any): any => (x != null ? f(x) : null)

// ifThen :: (a, Nullable b) => (a -> Bool) -> (a -> b) -> a -> b
const ifThen = (f: Function) => (g: Function) => (x: any): any => f(x) ? g(x) : null

// tap :: (a -> IO ()) -> a -> a
const tap = (f: Function) => (x: any): any => ((f(x), x))

// toggle :: Bool -> (a -> b) -> (c -> d) -> (b | d)
const toggle = (cond: boolean) => (f: Function) => (g: Function): any => (cond ? f() : g())

// uncurry2 :: (a -> b -> c) -> (a, b) -> c
const uncurry2 = (f: Function) => (x: any, y: any): any => f(x)(y)

export { ifExists, ifThen, identity, tap, toggle, uncurry2 }
