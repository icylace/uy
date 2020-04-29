var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
/**
 * Creates a function with `data-first` and `data-last` signatures.
 *
 * `purry` is a dynamic function and it's not type safe. It should be wrapped by a function that have proper typings.
 * Refer to the example below for correct usage.
 *
 * @param fn the function to purry.
 * @param args the arguments
 * @signature R.purry(fn, arguments);
 * @example-raw
 *    function _findIndex(array, fn) {
 *      for (let i = 0; i < array.length; i++) {
 *        if (fn(array[i])) {
 *          return i;
 *        }
 *      }
 *      return -1;
 *    }
 *
 *    // data-first
 *    function findIndex<T>(array: T[], fn: (item: T) => boolean): number;
 *
 *    // data-last
 *    function findIndex<T>(fn: (item: T) => boolean): (array: T[]) => number;
 *
 *    function findIndex() {
 *      return R.purry(_findIndex, arguments);
 *    }
 * @category Function
 */
function purry(fn, args, lazy) {
    var diff = fn.length - args.length;
    var arrayArgs = Array.from(args);
    if (diff === 0) {
        return fn.apply(void 0, arrayArgs);
    }
    if (diff === 1) {
        var ret = function (data) { return fn.apply(void 0, __spreadArrays([data], arrayArgs)); };
        if (lazy || fn.lazy) {
            ret.lazy = lazy || fn.lazy;
            ret.lazyArgs = args;
        }
        return ret;
    }
    throw new Error('Wrong number of arguments');
}

var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function addProp() {
    return purry(_addProp, arguments);
}
function _addProp(obj, prop, value) {
    var _a;
    return __assign(__assign({}, obj), (_a = {}, _a[prop] = value, _a));
}

function anyPass() {
    return purry(_anyPass, arguments);
}
function _anyPass(data, fns) {
    return fns.some(function (fn) { return fn(data); });
}

function chunk() {
    return purry(_chunk, arguments);
}
function _chunk(array, size) {
    var ret = [];
    var current = null;
    array.forEach(function (x) {
        if (!current) {
            current = [];
            ret.push(current);
        }
        current.push(x);
        if (current.length === size) {
            current = null;
        }
    });
    return ret;
}

function clamp() {
    return purry(_clamp, arguments);
}
function _clamp(value, limits) {
    if (limits.min != null) {
        if (limits.min > value) {
            return limits.min;
        }
    }
    if (limits.max != null) {
        if (limits.max < value) {
            return limits.max;
        }
    }
    return value;
}

// from https://github.com/ramda/ramda/blob/master/source/type.js
/**
 * Gives a single-word string description of the (native) type of a value, returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not attempt to distinguish user Object types any further, reporting them all as 'Object'.
 * @param val
 * @signature
 *    R.type(obj)
 * @example
 *    R.type({}); //=> "Object"
 *    R.type(1); //=> "Number"
 *    R.type(false); //=> "Boolean"
 *    R.type('s'); //=> "String"
 *    R.type(null); //=> "Null"
 *    R.type([]); //=> "Array"
 *    R.type(/[A-z]/); //=> "RegExp"
 *    R.type(() => {}); //=> "Function"
 *    R.type(undefined); //=> "Undefined"
 * @category Type
 */
function type(val) {
    return val === null
        ? 'Null'
        : val === undefined
            ? 'Undefined'
            : Object.prototype.toString.call(val).slice(8, -1);
}

// from https://github.com/ramda/ramda/blob/master/source/internal/_clone.js
function _cloneRegExp(pattern) {
    return new RegExp(pattern.source, (pattern.global ? 'g' : '') +
        (pattern.ignoreCase ? 'i' : '') +
        (pattern.multiline ? 'm' : '') +
        (pattern.sticky ? 'y' : '') +
        (pattern.unicode ? 'u' : ''));
}
function _clone(value, refFrom, refTo, deep) {
    function copy(copiedValue) {
        var len = refFrom.length;
        var idx = 0;
        while (idx < len) {
            if (value === refFrom[idx]) {
                return refTo[idx];
            }
            idx += 1;
        }
        refFrom[idx + 1] = value;
        refTo[idx + 1] = copiedValue;
        // tslint:disable-next-line:forin
        for (var key in value) {
            copiedValue[key] = deep
                ? _clone(value[key], refFrom, refTo, true)
                : value[key];
        }
        return copiedValue;
    }
    switch (type(value)) {
        case 'Object':
            return copy({});
        case 'Array':
            return copy([]);
        case 'Date':
            return new Date(value.valueOf());
        case 'RegExp':
            return _cloneRegExp(value);
        default:
            return value;
    }
}
/**
 * Creates a deep copy of the value. Supported types: `Array`, `Object`, `Number`, `String`, `Boolean`, `Date`, `RegExp`. Functions are assigned by reference rather than copied.
 * @param value the object to clone
 * @category Object
 * @signature R.clone(value)
 * @example R.clone({foo: 'bar'}) // {foo: 'bar'}
 */
function clone(value) {
    return value != null && typeof value.clone === 'function'
        ? value.clone()
        : _clone(value, [], [], true);
}

/**
 * Filter out all falsey values. The values `false`, `null`, `0`, `""`, `undefined`, and `NaN` are falsey.
 * @param items the array to compact
 * @signature
 *    R.compact(array)
 * @example
 *    R.compact([0, 1, false, 2, '', 3]) // => [1, 2, 3]
 * @category Array
 * @pipeable
 */
function compact(items) {
    // TODO: Make lazy version
    return items.filter(function (x) { return !!x; });
}

function concat() {
    return purry(_concat, arguments);
}
function _concat(arr1, arr2) {
    return arr1.concat(arr2);
}

function pipe(value) {
    var operations = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        operations[_i - 1] = arguments[_i];
    }
    var ret = value;
    var lazyOps = operations.map(function (op) {
        var _a = op, lazy = _a.lazy, lazyArgs = _a.lazyArgs;
        if (lazy) {
            var fn = lazy.apply(void 0, lazyArgs);
            fn.indexed = lazy.indexed;
            fn.single = lazy.single;
            fn.index = 0;
            fn.items = [];
            return fn;
        }
        return null;
    });
    var opIdx = 0;
    while (opIdx < operations.length) {
        var op = operations[opIdx];
        var lazyOp = lazyOps[opIdx];
        if (!lazyOp) {
            ret = op(ret);
            opIdx++;
            continue;
        }
        var lazySeq = [];
        for (var j = opIdx; j < operations.length; j++) {
            if (lazyOps[j]) {
                lazySeq.push(lazyOps[j]);
                if (lazyOps[j].single) {
                    break;
                }
            }
            else {
                break;
            }
        }
        var acc = [];
        for (var j = 0; j < ret.length; j++) {
            var item = ret[j];
            if (_processItem({ item: item, acc: acc, lazySeq: lazySeq })) {
                break;
            }
        }
        var lastLazySeq = lazySeq[lazySeq.length - 1];
        if (lastLazySeq.single) {
            ret = acc[0];
        }
        else {
            ret = acc;
        }
        opIdx += lazySeq.length;
    }
    return ret;
}
function _processItem(_a) {
    var item = _a.item, lazySeq = _a.lazySeq, acc = _a.acc;
    if (lazySeq.length === 0) {
        acc.push(item);
        return false;
    }
    var lazyResult = { done: false, hasNext: false };
    var isDone = false;
    for (var i = 0; i < lazySeq.length; i++) {
        var lazyFn = lazySeq[i];
        var indexed = lazyFn.indexed;
        var index = lazyFn.index;
        var items = lazyFn.items;
        items.push(item);
        lazyResult = indexed ? lazyFn(item, index, items) : lazyFn(item);
        lazyFn.index++;
        if (lazyResult.hasNext) {
            if (lazyResult.hasMany) {
                var nextValues = lazyResult.next;
                for (var _i = 0, nextValues_1 = nextValues; _i < nextValues_1.length; _i++) {
                    var subItem = nextValues_1[_i];
                    var subResult = _processItem({
                        item: subItem,
                        acc: acc,
                        lazySeq: lazySeq.slice(i + 1),
                    });
                    if (subResult) {
                        return true;
                    }
                }
                return false;
            }
            else {
                item = lazyResult.next;
            }
        }
        if (!lazyResult.hasNext) {
            break;
        }
        // process remaining functions in the pipe
        // but don't process remaining elements in the input array
        if (lazyResult.done) {
            isDone = true;
        }
    }
    if (lazyResult.hasNext) {
        acc.push(item);
    }
    if (isDone) {
        return true;
    }
    return false;
}

var __spreadArrays$1 = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
function createPipe() {
    var operations = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        operations[_i] = arguments[_i];
    }
    return function (value) { return pipe.apply(void 0, __spreadArrays$1([value], operations)); };
}

function _reduceLazy(array, lazy, indexed) {
    return array.reduce(function (acc, item, index) {
        var result = indexed ? lazy(item, index, array) : lazy(item);
        if (result.hasMany === true) {
            acc.push.apply(acc, result.next);
        }
        else if (result.hasNext === true) {
            acc.push(result.next);
        }
        return acc;
    }, []);
}

function difference() {
    return purry(_difference, arguments, difference.lazy);
}
function _difference(array, other) {
    var lazy = difference.lazy(other);
    return _reduceLazy(array, lazy);
}
(function (difference) {
    function lazy(other) {
        return function (value) {
            var set = new Set(other);
            if (!set.has(value)) {
                return {
                    done: false,
                    hasNext: true,
                    next: value,
                };
            }
            return {
                done: false,
                hasNext: false,
            };
        };
    }
    difference.lazy = lazy;
})(difference || (difference = {}));

function drop() {
    return purry(_drop, arguments, drop.lazy);
}
function _drop(array, n) {
    return _reduceLazy(array, drop.lazy(n));
}
(function (drop) {
    function lazy(n) {
        var left = n;
        return function (value) {
            if (left > 0) {
                left--;
                return {
                    done: false,
                    hasNext: false,
                };
            }
            return {
                done: false,
                hasNext: true,
                next: value,
            };
        };
    }
    drop.lazy = lazy;
})(drop || (drop = {}));

var __spreadArrays$2 = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
function dropLast() {
    return purry(_dropLast, arguments);
}
function _dropLast(array, n) {
    var copy = __spreadArrays$2(array);
    copy.splice(-n);
    return copy;
}

// from https://github.com/epoberezkin/fast-deep-equal/blob/master/index.js
var isArray = Array.isArray;
var keyList = Object.keys;
var hasProp = Object.prototype.hasOwnProperty;
function equals() {
    return purry(_equals, arguments);
}
function _equals(a, b) {
    if (a === b) {
        return true;
    }
    if (a && b && typeof a === 'object' && typeof b === 'object') {
        var arrA = isArray(a);
        var arrB = isArray(b);
        var i = void 0;
        var length = void 0;
        var key = void 0;
        if (arrA && arrB) {
            length = a.length;
            if (length !== b.length) {
                return false;
            }
            for (i = length; i-- !== 0;) {
                if (!equals(a[i], b[i])) {
                    return false;
                }
            }
            return true;
        }
        if (arrA !== arrB) {
            return false;
        }
        var dateA = a instanceof Date;
        var dateB = b instanceof Date;
        if (dateA !== dateB) {
            return false;
        }
        if (dateA && dateB) {
            return a.getTime() === b.getTime();
        }
        var regexpA = a instanceof RegExp;
        var regexpB = b instanceof RegExp;
        if (regexpA !== regexpB) {
            return false;
        }
        if (regexpA && regexpB) {
            return a.toString() === b.toString();
        }
        var keys = keyList(a);
        length = keys.length;
        if (length !== keyList(b).length) {
            return false;
        }
        for (i = length; i-- !== 0;) {
            if (!hasProp.call(b, keys[i])) {
                return false;
            }
        }
        for (i = length; i-- !== 0;) {
            key = keys[i];
            if (!equals(a[key], b[key])) {
                return false;
            }
        }
        return true;
    }
    return a !== a && b !== b;
}

var _toLazyIndexed = function (fn) {
    fn.indexed = true;
    return fn;
};

function filter() {
    return purry(_filter(false), arguments, filter.lazy);
}
var _filter = function (indexed) { return function (array, fn) {
    return _reduceLazy(array, indexed ? filter.lazyIndexed(fn) : filter.lazy(fn), indexed);
}; };
var _lazy = function (indexed) { return function (fn) {
    return function (value, index, array) {
        var valid = indexed ? fn(value, index, array) : fn(value);
        if (!!valid === true) {
            return {
                done: false,
                hasNext: true,
                next: value,
            };
        }
        return {
            done: false,
            hasNext: false,
        };
    };
}; };
(function (filter) {
    function indexed() {
        return purry(_filter(true), arguments, filter.lazyIndexed);
    }
    filter.indexed = indexed;
    filter.lazy = _lazy(false);
    filter.lazyIndexed = _toLazyIndexed(_lazy(true));
})(filter || (filter = {}));

var _toSingle = function (fn) {
    fn.single = true;
    return fn;
};

function find() {
    return purry(_find(false), arguments, find.lazy);
}
var _find = function (indexed) { return function (array, fn) {
    if (indexed) {
        return array.find(fn);
    }
    return array.find(function (x) { return fn(x); });
}; };
var _lazy$1 = function (indexed) { return function (fn) {
    return function (value, index, array) {
        var valid = indexed ? fn(value, index, array) : fn(value);
        return {
            done: valid,
            hasNext: valid,
            next: value,
        };
    };
}; };
(function (find) {
    function indexed() {
        return purry(_find(true), arguments, find.lazyIndexed);
    }
    find.indexed = indexed;
    find.lazy = _toSingle(_lazy$1(false));
    find.lazyIndexed = _toSingle(_toLazyIndexed(_lazy$1(true)));
})(find || (find = {}));

function findIndex() {
    return purry(_findIndex(false), arguments, findIndex.lazy);
}
var _findIndex = function (indexed) { return function (array, fn) {
    if (indexed) {
        return array.findIndex(fn);
    }
    return array.findIndex(function (x) { return fn(x); });
}; };
var _lazy$2 = function (indexed) { return function (fn) {
    var i = 0;
    return function (value, index, array) {
        var valid = indexed ? fn(value, index, array) : fn(value);
        if (valid) {
            return {
                done: true,
                hasNext: true,
                next: i,
            };
        }
        i++;
        return {
            done: false,
            hasNext: false,
        };
    };
}; };
(function (findIndex) {
    function indexed() {
        return purry(_findIndex(true), arguments, findIndex.lazyIndexed);
    }
    findIndex.indexed = indexed;
    findIndex.lazy = _toSingle(_lazy$2(false));
    findIndex.lazyIndexed = _toSingle(_toLazyIndexed(_lazy$2(true)));
})(findIndex || (findIndex = {}));

function first() {
    return purry(_first, arguments, first.lazy);
}
function _first(array) {
    return array[0];
}
(function (first) {
    function lazy() {
        return function (value) {
            return {
                done: true,
                hasNext: true,
                next: value,
            };
        };
    }
    first.lazy = lazy;
    (function (lazy) {
        lazy.single = true;
    })(lazy = first.lazy || (first.lazy = {}));
})(first || (first = {}));

function flatten() {
    return purry(_flatten, arguments, flatten.lazy);
}
function _flatten(items) {
    return _reduceLazy(items, flatten.lazy());
}
(function (flatten) {
    function lazy() {
        return function (next) {
            if (Array.isArray(next)) {
                return {
                    done: false,
                    hasNext: true,
                    hasMany: true,
                    next: next,
                };
            }
            return {
                done: false,
                hasNext: true,
                next: next,
            };
        };
    }
    flatten.lazy = lazy;
})(flatten || (flatten = {}));

function flatMap() {
    return purry(_flatMap, arguments, flatMap.lazy);
}
function _flatMap(array, fn) {
    return flatten(array.map(function (item) { return fn(item); }));
}
(function (flatMap) {
    function lazy(fn) {
        return function (value) {
            var next = fn(value);
            if (Array.isArray(next)) {
                return {
                    done: false,
                    hasNext: true,
                    hasMany: true,
                    next: next,
                };
            }
            return {
                done: false,
                hasNext: true,
                next: next,
            };
        };
    }
    flatMap.lazy = lazy;
})(flatMap || (flatMap = {}));

function flattenDeep() {
    return purry(_flattenDeep, arguments, flattenDeep.lazy);
}
function _flattenDeep(items) {
    return _reduceLazy(items, flattenDeep.lazy());
}
function _flattenDeepValue(value) {
    if (!Array.isArray(value)) {
        return value;
    }
    var ret = [];
    value.forEach(function (item) {
        if (Array.isArray(item)) {
            ret.push.apply(ret, flattenDeep(item));
        }
        else {
            ret.push(item);
        }
    });
    return ret;
}
(function (flattenDeep) {
    function lazy() {
        return function (value) {
            var next = _flattenDeepValue(value);
            if (Array.isArray(next)) {
                return {
                    done: false,
                    hasNext: true,
                    hasMany: true,
                    next: next,
                };
            }
            return {
                done: false,
                hasNext: true,
                next: next,
            };
        };
    }
    flattenDeep.lazy = lazy;
})(flattenDeep || (flattenDeep = {}));

function forEach() {
    return purry(_forEach(false), arguments, forEach.lazy);
}
var _forEach = function (indexed) { return function (array, fn) {
    return _reduceLazy(array, indexed ? forEach.lazyIndexed(fn) : forEach.lazy(fn), indexed);
}; };
var _lazy$3 = function (indexed) { return function (fn) {
    return function (value, index, array) {
        if (indexed) {
            fn(value, index, array);
        }
        else {
            fn(value);
        }
        return {
            done: false,
            hasNext: true,
            next: value,
        };
    };
}; };
(function (forEach) {
    function indexed() {
        return purry(_forEach(true), arguments, forEach.lazyIndexed);
    }
    forEach.indexed = indexed;
    forEach.lazy = _lazy$3(false);
    forEach.lazyIndexed = _toLazyIndexed(_lazy$3(true));
})(forEach || (forEach = {}));

function forEachObj() {
    return purry(_forEachObj(false), arguments);
}
var _forEachObj = function (indexed) { return function (object, fn) {
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            var val = object[key];
            if (indexed)
                fn(val, key, object);
            else
                fn(val);
        }
    }
    return object;
}; };
(function (forEachObj) {
    function indexed() {
        return purry(_forEachObj(true), arguments);
    }
    forEachObj.indexed = indexed;
})(forEachObj || (forEachObj = {}));

/**
 * Splits a collection into sets, grouped by the result of running each value through `fn`.
 * @param fn the grouping function
 * @signature
 *    R.groupBy(fn)(array)
 * @example
 *    R.pipe(['one', 'two', 'three'], R.groupBy(x => x.length)) // => {3: ['one', 'two'], 5: ['three']}
 * @data_last
 * @indexed
 * @category Array
 */
function groupBy() {
    return purry(_groupBy(false), arguments);
}
var _groupBy = function (indexed) { return function (array, fn) {
    var ret = {};
    array.forEach(function (item, index) {
        var value = indexed ? fn(item, index, array) : fn(item);
        var key = String(value);
        if (!ret[key]) {
            ret[key] = [];
        }
        ret[key].push(item);
    });
    return ret;
}; };
(function (groupBy) {
    function indexed() {
        return purry(_groupBy(true), arguments);
    }
    groupBy.indexed = indexed;
})(groupBy || (groupBy = {}));

function identity(value) {
    return value;
}

function indexBy() {
    return purry(_indexBy(false), arguments);
}
var _indexBy = function (indexed) { return function (array, fn) {
    return array.reduce(function (ret, item, index) {
        var value = indexed ? fn(item, index, array) : fn(item);
        var key = String(value);
        ret[key] = item;
        return ret;
    }, {});
}; };
(function (indexBy) {
    function indexed() {
        return purry(_indexBy(true), arguments);
    }
    indexBy.indexed = indexed;
})(indexBy || (indexBy = {}));

function intersection() {
    return purry(_intersection, arguments, intersection.lazy);
}
function _intersection(array, other) {
    var lazy = intersection.lazy(other);
    return _reduceLazy(array, lazy);
}
(function (intersection) {
    function lazy(other) {
        return function (value) {
            var set = new Set(other);
            if (set.has(value)) {
                return {
                    done: false,
                    hasNext: true,
                    next: value,
                };
            }
            return {
                done: false,
                hasNext: false,
            };
        };
    }
    intersection.lazy = lazy;
})(intersection || (intersection = {}));

/**
 * Gets the last element of `array`.
 * @param array the array
 * @signature
 *    R.last(array)
 * @example
 *    R.last([1, 2, 3]) // => 3
 *    R.last([]) // => undefined
 * @category Array
 */
function last(array) {
    return array[array.length - 1];
}

function map() {
    return purry(_map(false), arguments, map.lazy);
}
var _map = function (indexed) { return function (array, fn) {
    return _reduceLazy(array, indexed ? map.lazyIndexed(fn) : map.lazy(fn), indexed);
}; };
var _lazy$4 = function (indexed) { return function (fn) {
    return function (value, index, array) {
        return {
            done: false,
            hasNext: true,
            next: indexed ? fn(value, index, array) : fn(value),
        };
    };
}; };
(function (map) {
    function indexed() {
        return purry(_map(true), arguments, map.lazyIndexed);
    }
    map.indexed = indexed;
    map.lazy = _lazy$4(false);
    map.lazyIndexed = _toLazyIndexed(_lazy$4(true));
})(map || (map = {}));

function mapKeys(arg1, arg2) {
    if (arguments.length === 1) {
        return function (data) { return _mapKeys(data, arg1); };
    }
    return _mapKeys(arg1, arg2);
}
function _mapKeys(obj, fn) {
    return Object.keys(obj).reduce(function (acc, key) {
        acc[fn(key, obj[key])] = obj[key];
        return acc;
    }, {});
}

function merge() {
    return purry(_merge, arguments);
}
function _merge(a, b) {
    // tslint:disable-next-line:prefer-object-spread
    return Object.assign({}, a, b);
}

var __assign$1 = (undefined && undefined.__assign) || function () {
    __assign$1 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$1.apply(this, arguments);
};
function mergeAll(items) {
    return items.reduce(function (acc, x) { return (__assign$1(__assign$1({}, acc), x)); }, {});
}

/**
 * A function that returns always `undefined`.
 * @signature
 *    R.noop()
 * @example
 *    onSomething(R.noop)
 * @category Function
 */
var noop = function () { return undefined; };

function objOf() {
    return purry(_objOf, arguments);
}
function _objOf(value, key) {
    var _a;
    return _a = {}, _a[key] = value, _a;
}

function omit() {
    return purry(_omit, arguments);
}
function _omit(object, names) {
    var set = new Set(names);
    return Object.entries(object).reduce(function (acc, _a) {
        var name = _a[0], value = _a[1];
        if (!set.has(name)) {
            acc[name] = value;
        }
        return acc;
    }, {});
}

/**
 * Creates a function that is restricted to invoking `func` once. Repeat calls to the function return the value of the first invocation.
 * @param fn the function to wrap
 * @signature R.once(fn)
 * @example
 * const initialize = R.once(createApplication);
 * initialize();
 * initialize();
 * // => `createApplication` is invoked once
 * @category Function
 */
function once(fn) {
    var called = false;
    var ret;
    return function () {
        if (!called) {
            ret = fn();
            called = true;
        }
        return ret;
    };
}

function pathOr() {
    return purry(_pathOr, arguments);
}
function _pathOr(object, path, defaultValue) {
    var current = object;
    for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
        var prop = path_1[_i];
        if (current == null || current[prop] == null) {
            return defaultValue;
        }
        current = current[prop];
    }
    return current;
}

function pick() {
    return purry(_pick, arguments);
}
function _pick(object, names) {
    if (object == null) {
        return {};
    }
    return names.reduce(function (acc, name) {
        acc[name] = object[name];
        return acc;
    }, {});
}

/**
 * Gets the value of the given property.
 * @param name the property name
 * @signature R.prop(prop)(object)
 * @example
 *    R.pipe({foo: 'bar'}, R.prop('foo')) // => 'bar'
 * @data_last
 * @category Object
 */
function prop(name) {
    return function (obj) { return obj[name]; };
}

function range() {
    return purry(_range, arguments);
}
function _range(start, end) {
    var ret = [];
    for (var i = start; i < end; i++) {
        ret.push(i);
    }
    return ret;
}

/**
 * Random a non-cryptographic random string from characters a-zA-Z0-9.
 * @param length the length of the random string
 * @signature randomString(length)
 * @example
 *    randomString(5) // => aB92J
 * @category String
 */
function randomString(length) {
    var characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomChar = function () {
        return characterSet[Math.floor(Math.random() * characterSet.length)];
    };
    return range(0, length).reduce(function (text) { return text + randomChar(); }, '');
}

function reduce() {
    return purry(_reduce(false), arguments);
}
var _reduce = function (indexed) { return function (items, fn, initialValue) {
    return items.reduce(function (acc, item, index) {
        return indexed ? fn(acc, item, index, items) : fn(acc, item);
    }, initialValue);
}; };
(function (reduce) {
    function indexed() {
        return purry(_reduce(true), arguments);
    }
    reduce.indexed = indexed;
})(reduce || (reduce = {}));

function reject() {
    return purry(_reject(false), arguments, reject.lazy);
}
var _reject = function (indexed) { return function (array, fn) {
    return _reduceLazy(array, indexed ? reject.lazyIndexed(fn) : reject.lazy(fn), indexed);
}; };
var _lazy$5 = function (indexed) { return function (fn) {
    return function (value, index, array) {
        var valid = indexed ? fn(value, index, array) : fn(value);
        if (!valid === true) {
            return {
                done: false,
                hasNext: true,
                next: value,
            };
        }
        return {
            done: false,
            hasNext: false,
        };
    };
}; };
(function (reject) {
    function indexed() {
        return purry(_reject(true), arguments, reject.lazyIndexed);
    }
    reject.indexed = indexed;
    reject.lazy = _lazy$5(false);
    reject.lazyIndexed = _toLazyIndexed(_lazy$5(true));
})(reject || (reject = {}));

function reverse() {
    return purry(_reverse, arguments);
}
function _reverse(array) {
    return array.slice().reverse();
}

var __assign$2 = (undefined && undefined.__assign) || function () {
    __assign$2 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$2.apply(this, arguments);
};
function set() {
    return purry(_set, arguments);
}
function _set(obj, prop, value) {
    var _a;
    return __assign$2(__assign$2({}, obj), (_a = {}, _a[prop] = value, _a));
}

var __spreadArrays$3 = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
function sort() {
    return purry(_sort, arguments);
}
function _sort(items, cmp) {
    var ret = __spreadArrays$3(items);
    ret.sort(cmp);
    return ret;
}

var __spreadArrays$4 = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
function sortBy() {
    return purry(_sortBy, arguments);
}
function _sortBy(array, fn) {
    var copied = __spreadArrays$4(array);
    return copied.sort(function (a, b) {
        var aa = fn(a);
        var bb = fn(b);
        return aa < bb ? -1 : aa > bb ? 1 : 0;
    });
}

var __spreadArrays$5 = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
function splitAt() {
    return purry(_splitAt, arguments);
}
function _splitAt(array, index) {
    var copy = __spreadArrays$5(array);
    var tail = copy.splice(index);
    return [copy, tail];
}

function splitWhen() {
    return purry(_splitWhen, arguments);
}
function _splitWhen(array, fn) {
    for (var i = 0; i < array.length; i++) {
        if (fn(array[i])) {
            return splitAt(array, i);
        }
    }
    return [array, []];
}

function take() {
    return purry(_take, arguments, take.lazy);
}
function _take(array, n) {
    return _reduceLazy(array, take.lazy(n));
}
(function (take) {
    function lazy(n) {
        return function (value) {
            if (n === 0) {
                return {
                    done: true,
                    hasNext: false,
                };
            }
            n--;
            if (n === 0) {
                return {
                    done: true,
                    hasNext: true,
                    next: value,
                };
            }
            return {
                done: false,
                hasNext: true,
                next: value,
            };
        };
    }
    take.lazy = lazy;
})(take || (take = {}));

function takeWhile() {
    return purry(_takeWhile, arguments);
}
function _takeWhile(array, fn) {
    var ret = [];
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var item = array_1[_i];
        if (!fn(item)) {
            break;
        }
        ret.push(item);
    }
    return ret;
}

function times() {
    return purry(_times, arguments);
}
function _times(count, fn) {
    if (count < 0) {
        throw new RangeError('n must be a non-negative number');
    }
    var res = [];
    for (var i = 0; i < count; i++) {
        res.push(fn(i));
    }
    return res;
}

/**
 * Returns an array of key/values of the enumerable properties of an object.
 * @param object
 * @signature
 *    R.toPairs(object)
 * @example
 *    R.toPairs({ a: 1, b: 2, c: 3 }) // => [['a', 1], ['b', 2], ['c', 3]]
 * @category Object
 */
function toPairs(object) {
    return Object.entries(object);
}

function uniq() {
    return purry(_uniq, arguments, uniq.lazy);
}
function _uniq(array) {
    return _reduceLazy(array, uniq.lazy());
}
(function (uniq) {
    function lazy() {
        var set = new Set();
        return function (value) {
            if (set.has(value)) {
                return {
                    done: false,
                    hasNext: false,
                };
            }
            set.add(value);
            return {
                done: false,
                hasNext: true,
                next: value,
            };
        };
    }
    uniq.lazy = lazy;
})(uniq || (uniq = {}));

function uniqBy() {
    return purry(_uniqBy, arguments, lazyUniqBy);
}
function _uniqBy(array, transformer) {
    return _reduceLazy(array, lazyUniqBy(transformer));
}
function lazyUniqBy(transformer) {
    var set = new Set();
    return function (value) {
        var appliedItem = transformer(value);
        if (set.has(appliedItem)) {
            return {
                done: false,
                hasNext: false,
            };
        }
        set.add(appliedItem);
        return {
            done: false,
            hasNext: true,
            next: value,
        };
    };
}

export { addProp, anyPass, chunk, clamp, clone, compact, concat, createPipe, difference, drop, dropLast, equals, filter, find, findIndex, first, flatMap, flatten, flattenDeep, forEach, forEachObj, groupBy, identity, indexBy, intersection, last, map, mapKeys, merge, mergeAll, noop, objOf, omit, once, pathOr, pick, pipe, prop, purry, randomString, range, reduce, reject, reverse, set, sort, sortBy, splitAt, splitWhen, take, takeWhile, times, toPairs, type, uniq, uniqBy };
