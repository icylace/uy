function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toArray(arr) {
  return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var attr = (function (name) {
  return {
    get: function get(obj) {
      return !obj[name] && typeof obj.get === 'function' ? obj.get(name) : obj[name];
    },
    mod: function mod(f) {
      return function (obj) {
        var _arguments = arguments;
        return function () {
          for (var _len = _arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            params[_key - 1] = _arguments[_key];
          }
          if (typeof obj.set === 'function') {
            return obj.set(name, f(obj[name] || obj.get(name)));
          } else if (Array.isArray(obj)) {
            return obj.slice(0, name).concat(f.apply(void 0, [obj[name]].concat(params))).concat(obj.slice(name + 1));
          } else {
            return _objectSpread({}, obj, _defineProperty({}, name, f.apply(void 0, [obj[name]].concat(params))));
          }
        }();
      };
    },
    traversal: false
  };
});

var keys = function keys(obj) {
  return obj ? typeof obj.keys === 'function' ? obj.keys() : Object.keys(obj) : [];
};
var setter = function setter(constructor) {
  switch (constructor) {
    case Map:
      return function (obj, key, value) {
        obj.set(key, value);
        return obj;
      };
    case Set:
      return function (obj, _, value) {
        return obj.add(value);
      };
    case Object:
      return function (obj, key, value) {
        obj[key] = value;
        return obj;
      };
  }
};
var getter = function getter(constructor) {
  switch (constructor) {
    case Map:
      return function (obj, key) {
        return obj.get(key);
      };
    case Set:
      return function (_, key) {
        return key;
      };
    case Object:
      return function (obj, key) {
        return obj[key];
      };
  }
};
var toFP = function toFP(_ref) {
  var native = _ref.native,
      overrides = _ref.overrides;
  return function (f) {
    for (var _len = arguments.length, fixedArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      fixedArgs[_key - 1] = arguments[_key];
    }
    return function (coll) {
      var fxn = into(f);
      if (typeof coll === 'undefined' || coll === null) {
        return coll;
      }
      if (typeof coll[native] === 'function') {
        return coll[native].apply(coll, [fxn].concat(fixedArgs));
      } else {
        var Constructor = Object.getPrototypeOf(coll).constructor;
        var override = overrides[Constructor];
        if (override) {
          return override(Constructor, getter(Constructor), setter(Constructor)).apply(void 0, [coll, fxn].concat(fixedArgs));
        }
      }
    };
  };
};
var filter = function () {
  var _overrides;
  var iteratorFilter = function iteratorFilter(Constructor, get, set) {
    return function (obj, pred) {
      var acc = new Constructor();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;
      try {
        for (var _iterator = keys(obj)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;
          var value = get(obj, key);
          if (pred(value, key)) {
            set(acc, key, value);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
      return acc;
    };
  };
  return toFP({
    native: 'filter',
    overrides: (_overrides = {}, _defineProperty(_overrides, Object, iteratorFilter), _defineProperty(_overrides, Map, iteratorFilter), _defineProperty(_overrides, Set, iteratorFilter), _overrides)
  });
}();
var map = function () {
  var _overrides2;
  var iteratorMap = function iteratorMap(Constructor, get, set) {
    return function (obj, f) {
      var acc = new Constructor();
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;
      try {
        for (var _iterator2 = keys(obj)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var key = _step2.value;
          set(acc, key, f(get(obj, key), key));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
      return acc;
    };
  };
  return toFP({
    native: 'map',
    overrides: (_overrides2 = {}, _defineProperty(_overrides2, Object, iteratorMap), _defineProperty(_overrides2, Map, iteratorMap), _defineProperty(_overrides2, Set, iteratorMap), _defineProperty(_overrides2, Promise, function () {
      return function (promise, f) {
        return promise.then(f);
      };
    }), _overrides2)
  });
}();
var find = function () {
  var _overrides3;
  var iteratorFind = function iteratorFind(_, get, __) {
    return function (obj, f) {
      var result;
      if (!obj) {
        return result;
      }
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;
      try {
        for (var _iterator3 = keys(obj)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var key = _step3.value;
          var value = get(obj, key);
          if (f(value, key)) {
            return value;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    };
  };
  return toFP({
    native: 'find',
    overrides: (_overrides3 = {}, _defineProperty(_overrides3, Object, iteratorFind), _defineProperty(_overrides3, Map, iteratorFind), _defineProperty(_overrides3, Set, iteratorFind), _overrides3)
  });
}();
var some = function () {
  var _overrides4;
  var iteratorSome = function iteratorSome(_, get, __) {
    return function (obj, pred) {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;
      try {
        for (var _iterator4 = keys(obj)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var key = _step4.value;
          if (pred(get(obj, key), key)) {
            return true;
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
      return false;
    };
  };
  return toFP({
    native: 'some',
    overrides: (_overrides4 = {}, _defineProperty(_overrides4, Object, iteratorSome), _defineProperty(_overrides4, Map, iteratorSome), _defineProperty(_overrides4, Set, iteratorSome), _overrides4)
  });
}();
var reduce = function () {
  var _overrides5;
  var iteratorReduce = function iteratorReduce(Constructor, get, _) {
    return function (obj, f, base) {
      var acc = new Constructor();
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;
      try {
        for (var _iterator5 = keys(obj)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var key = _step5.value;
          f(acc, get(obj, key), key);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
      return base;
    };
  };
  return toFP({
    native: 'reduce',
    overrides: (_overrides5 = {}, _defineProperty(_overrides5, Object, iteratorReduce), _defineProperty(_overrides5, Map, iteratorReduce), _defineProperty(_overrides5, Set, iteratorReduce), _overrides5)
  });
}();
var every = function every(arr) {
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;
  try {
    for (var _iterator6 = arr[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var elem = _step6.value;
      if (!elem) {
        return false;
      }
    }
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
        _iterator6.return();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }
  return true;
};
var cons = function cons(x) {
  return function (xs) {
    return _toConsumableArray(xs).concat([x]);
  };
};
var unshift = function unshift(x) {
  return function (xs) {
    return [x].concat(_toConsumableArray(xs));
  };
};
var first = function first(xs) {
  return xs[0];
};
var rest = function rest(_ref2) {
  var _ref3 = _toArray(_ref2),
      x = _ref3[0],
      xs = _ref3.slice(1);
  return xs;
};
var push = cons;
var concat = function concat(xs) {
  return function (ys) {
    return _toConsumableArray(ys).concat(_toConsumableArray(xs));
  };
};
var append = concat;
var prepend = function prepend(ys) {
  return function (xs) {
    return _toConsumableArray(ys).concat(_toConsumableArray(xs));
  };
};

var compile = function compile(lens) {
  return ['string', 'number'].includes(_typeof(lens)) ? attr(lens) : _objectSpread({
    traversal: false,
    optional: false
  }, lens);
};
var compose = (function () {
  for (var _len = arguments.length, lenses = new Array(_len), _key = 0; _key < _len; _key++) {
    lenses[_key] = arguments[_key];
  }
  return lenses.length === 1 ? compile(lenses[0]) : {
    get: function get(obj) {
      return lenses.map(compile).reduce(function (_ref, lens) {
        var traverser = _ref.traverser,
            state = _ref.state,
            shortCircuited = _ref.shortCircuited;
        var nextState = shortCircuited ? null : traverser(lens.get)(state);
        return {
          state: nextState,
          traverser: lens.traversal ? function (f) {
            return map(traverser(f));
          } : traverser,
          shortCircuited: shortCircuited || lens.optional && (nextState === null || nextState === undefined)
        };
      }, {
        state: obj,
        traverser: function traverser(x) {
          return x;
        },
        shortCircuited: false
      }).state;
    },
    mod: function mod(f) {
      return function (obj) {
        var aux;
        for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          params[_key2 - 1] = arguments[_key2];
        }
        return aux = function aux(object, lenses) {
          var _lenses, first$$1, rest$$1;
          return _lenses = _toArray(lenses), first$$1 = _lenses[0], rest$$1 = _lenses.slice(1), rest$$1.length === 0 ? first$$1.mod(f).apply(void 0, [object].concat(params)) : first$$1.mod(function (obj) {
            return aux(obj, rest$$1);
          }).apply(void 0, [object].concat(params));
        }, aux(obj, lenses.map(compile));
      };
    }
  };
});

var get = function get() {
  return compose.apply(void 0, arguments).get;
};

var has = function has(pattern) {
  return function (obj) {
    return pattern && _typeof(pattern) === 'object' ? !!obj && every(Object.keys(pattern).map(function (key) {
      return has(get(key)(pattern))(bindingGet(key)(obj));
    })) : typeof pattern === 'function' ? pattern(obj) : pattern === obj;
  };
};
var greaterThan = function greaterThan(a) {
  return function (b) {
    return b > a;
  };
};
var lessThan = function lessThan(a) {
  return function (b) {
    return b < a;
  };
};
var greaterThanEq = function greaterThanEq(a) {
  return function (b) {
    return b >= a;
  };
};
var lessThanEq = function lessThanEq(a) {
  return function (b) {
    return b <= a;
  };
};
var toggle = function toggle(bool) {
  return !bool;
};
var returns = function returns(val) {
  return function (f) {
    return f() === val;
  };
};
var bindingGet = function bindingGet(key) {
  return function (pattern) {
    var v;
    return v = get(key)(pattern), typeof v === 'function' ? v.bind(pattern) : v;
  };
};
var isObject = function isObject(x) {
  return _typeof(x) === 'object' && !Array.isArray(x) && x !== null;
};
var isValue = function isValue(x) {
  return x !== null && x !== undefined;
};

var into = function into(f) {
  return typeof f === 'function' ? f : _typeof(f) === 'object' ? has(f) : get(f);
};

var identity = function identity(a) {
  return a;
};
var flip = function flip(f) {
  return function (a) {
    return function (b) {
      return f(b)(a);
    };
  };
};
var always = function always(a) {
  return function (b) {
    return a;
  };
};
var not = function not(f) {
  return function () {
    return !into(f).apply(void 0, arguments);
  };
};
var and = function and() {
  for (var _len = arguments.length, fs = new Array(_len), _key = 0; _key < _len; _key++) {
    fs[_key] = arguments[_key];
  }
  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return fs.reduce(function (acc, f) {
      return acc && f.apply(void 0, args);
    }, true);
  };
};
var or = function or() {
  for (var _len3 = arguments.length, fs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    fs[_key3] = arguments[_key3];
  }
  return function () {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return fs.reduce(function (acc, f) {
      return acc || f.apply(void 0, args);
    }, false);
  };
};
var curry = function curry(n) {
  return function (f) {
    return _curry(n, f);
  };
};
function _curry(n, f) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  return function (arg) {
    return n ? _curry(n, f, cons(arg)(args)) : f.apply(void 0, _toConsumableArray(args));
  };
}

var add = function add(a) {
  return function (b) {
    return a + b;
  };
};
var sub = function sub(a) {
  return function (b) {
    return b - a;
  };
};
var inc = function inc(num) {
  return num + 1;
};
var dec = function dec(num) {
  return num - 1;
};

var includes = function includes(snippet) {
  return function (text) {
    return text.includes(snippet);
  };
};
var includesi = function includesi(snippet) {
  return function (text) {
    return text.toLowerCase().includes(snippet.toLowerCase());
  };
};

var foldOf = function foldOf(f) {
  return function (field) {
    var getter = into(field);
    return function (acc, curr) {
      return f(acc, curr, getter);
    };
  };
};
var maxOf = foldOf(function (acc, curr, getter) {
  return getter(curr) > getter(acc) ? curr : acc;
});
var minOf = foldOf(function (acc, curr, getter) {
  return getter(curr) < getter(acc) ? curr : acc;
});
var findOf = foldOf(function (acc, curr, getter) {
  return getter(acc) ? acc : getter(curr) ? curr : null;
});
var sumOf = foldOf(function (acc, curr, getter) {
  return getter(curr) + (typeof acc === 'number' ? acc : getter(acc));
});
var productOf = foldOf(function (acc, curr, getter) {
  return getter(curr) * (typeof acc === 'number' ? acc : getter(acc));
});

var mod = function mod() {
  return compose.apply(void 0, arguments).mod;
};
var set$1 = function set() {
  for (var _len = arguments.length, lenses = new Array(_len), _key = 0; _key < _len; _key++) {
    lenses[_key] = arguments[_key];
  }
  return function (newValue) {
    return compose.apply(void 0, lenses).mod(always(newValue));
  };
};

var matching = function matching(pred) {
  var predFxn = into(pred);
  return {
    get: filter(predFxn),
    mod: function mod(f) {
      return map(function (n) {
        return predFxn(n) ? f(n) : n;
      });
    },
    traversal: true
  };
};

var all = function all() {
  return {
    get: identity,
    mod: map,
    traversal: true
  };
};
var all$1 = Object.assign(all, all());

var unless = (function (pred) {
  return matching(not(pred));
});

var updateAll = function updateAll() {
  for (var _len = arguments.length, updaters = new Array(_len), _key = 0; _key < _len; _key++) {
    updaters[_key] = arguments[_key];
  }
  return function (state) {
    return updaters.reduce(function (currState, transformer) {
      return transformer(currState);
    }, state);
  };
};

var withOf = function withOf(f) {
  f.of = f;
  return f;
};
var foldBy = function foldBy(reducer) {
  return function (field) {
    return compile({
      get: reduce(reducer(field)),
      mod: function mod(f) {
        return function (obj) {
          var matching = reduce(reducer(field))(obj);
          return map(function (item) {
            return item === matching ? f(item) : item;
          })(obj);
        };
      }
    });
  };
};
var findBy = withOf(foldBy(findOf));
var maxBy = withOf(foldBy(maxOf));
var minBy = withOf(foldBy(minOf));

var maybe = (function (name) {
  var base = attr(name);
  return compile({
    get: function get(obj) {
      return obj && base.get(obj);
    },
    mod: function mod(f) {
      return function (obj) {
        return obj && base.get(obj) ? base.mod(f)(obj) : obj;
      };
    },
    optional: true
  });
});

var valueOr = function valueOr(def) {
  return compile({
    get: function get(val) {
      return isValue(val) ? val : def;
    },
    mod: function mod(fn) {
      return function (val) {
        return isValue(val) ? fn(val) : fn(def);
      };
    }
  });
};

var fill = function fill(filling) {
  return function (obj) {
    var out = _objectSpread({}, obj);
    Object.entries(filling).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];
      out[key] = isValue(out[key]) ? out[key] : value;
      if (out.hasOwnProperty(key)) {
        if (isObject(out[key]) && isObject(value)) {
          out[key] = fill(value)(obj[key]);
        }
      }
    });
    return out;
  };
};

export { add, all$1 as all, always, and, append, concat, cons, curry, dec, every, fill, filter, find, findBy, findOf, first, flip, foldBy, foldOf, get, greaterThan, greaterThanEq, has, identity, inc, includes, includesi, into, isObject, isValue, compile as lens, lessThan, lessThanEq, map, matching, maxBy, maxOf, maybe, minBy, minOf, mod, not, or, prepend, productOf, push, reduce, rest, returns, set$1 as set, some, sub, sumOf, toggle, unless, unshift, updateAll, valueOr };
