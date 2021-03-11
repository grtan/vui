(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
	typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VUI = {}, global.Vue));
}(this, (function (exports, Vue) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, basedir, module) {
		return module = {
			path: basedir,
			exports: {},
			require: function (path, base) {
				return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
			}
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global_1 =
	  /* global globalThis -- safe */
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var nativePropertyIsEnumerable$1 = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor$4 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$4 && !nativePropertyIsEnumerable$1.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	var f$7 = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$4(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable$1;

	var objectPropertyIsEnumerable = {
		f: f$7
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString$1 = {}.toString;

	var classofRaw = function (it) {
	  return toString$1.call(it).slice(8, -1);
	};

	var split = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings



	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has$1 = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$3 = global_1.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document$3) && isObject(document$3.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$3.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	var f$6 = descriptors ? nativeGetOwnPropertyDescriptor$2 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor$2(O, P);
	  } catch (error) { /* empty */ }
	  if (has$1(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$6
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails(detection)
	    : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';

	var isForced_1 = isForced;

	var path = {};

	var aFunction$1 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	// optional / simple context binding
	var functionBindContext = function (fn, that, length) {
	  aFunction$1(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 0: return function () {
	      return fn.call(that);
	    };
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var nativeDefineProperty$1 = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	var f$5 = descriptors ? nativeDefineProperty$1 : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty$1(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var objectDefineProperty = {
		f: f$5
	};

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;






	var wrapConstructor = function (NativeConstructor) {
	  var Wrapper = function (a, b, c) {
	    if (this instanceof NativeConstructor) {
	      switch (arguments.length) {
	        case 0: return new NativeConstructor();
	        case 1: return new NativeConstructor(a);
	        case 2: return new NativeConstructor(a, b);
	      } return new NativeConstructor(a, b, c);
	    } return NativeConstructor.apply(this, arguments);
	  };
	  Wrapper.prototype = NativeConstructor.prototype;
	  return Wrapper;
	};

	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var PROTO = options.proto;

	  var nativeSource = GLOBAL ? global_1 : STATIC ? global_1[TARGET] : (global_1[TARGET] || {}).prototype;

	  var target = GLOBAL ? path : path[TARGET] || (path[TARGET] = {});
	  var targetPrototype = target.prototype;

	  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
	  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

	  for (key in source) {
	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contains in native
	    USE_NATIVE = !FORCED && nativeSource && has$1(nativeSource, key);

	    targetProperty = target[key];

	    if (USE_NATIVE) if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$3(nativeSource, key);
	      nativeProperty = descriptor && descriptor.value;
	    } else nativeProperty = nativeSource[key];

	    // export native or implementation
	    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

	    if (USE_NATIVE && typeof targetProperty === typeof sourceProperty) continue;

	    // bind timers to global for call from export context
	    if (options.bind && USE_NATIVE) resultProperty = functionBindContext(sourceProperty, global_1);
	    // wrap global constructors for prevent changs in this version
	    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
	    // make static versions for prototype methods
	    else if (PROTO && typeof sourceProperty == 'function') resultProperty = functionBindContext(Function.call, sourceProperty);
	    // default case
	    else resultProperty = sourceProperty;

	    // add a flag to not completely full polyfills
	    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty(resultProperty, 'sham', true);
	    }

	    target[key] = resultProperty;

	    if (PROTO) {
	      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
	      if (!has$1(path, VIRTUAL_PROTOTYPE)) {
	        createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
	      }
	      // export virtual prototype methods
	      path[VIRTUAL_PROTOTYPE][key] = sourceProperty;
	      // export real prototype methods
	      if (options.real && targetPrototype && !targetPrototype[key]) {
	        createNonEnumerableProperty(targetPrototype, key, sourceProperty);
	      }
	    }
	  }
	};

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	var isArray$3 = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.es/ecma262/#sec-tointeger
	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min$2 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength = function (argument) {
	  return argument > 0 ? min$2(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	var isPure = true;

	var setGlobal = function (key, value) {
	  try {
	    createNonEnumerableProperty(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  } return value;
	};

	var SHARED = '__core-js_shared__';
	var store$1 = global_1[SHARED] || setGlobal(SHARED, {});

	var sharedStore = store$1;

	var shared = createCommonjsModule(function (module) {
	(module.exports = function (key, value) {
	  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.9.1',
	  mode: 'pure' ,
	  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var engineIsNode = classofRaw(global_1.process) == 'process';

	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
	    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

	var process$3 = global_1.process;
	var versions = process$3 && process$3.versions;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  version = match[0] + match[1];
	} else if (engineUserAgent) {
	  match = engineUserAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = engineUserAgent.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}

	var engineV8Version = version && +version;

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  /* global Symbol -- required for testing */
	  return !Symbol.sham &&
	    // Chrome 38 Symbol has incorrect toString conversion
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    (engineIsNode ? engineV8Version === 38 : engineV8Version > 37 && engineV8Version < 41);
	});

	var useSymbolAsUid = nativeSymbol
	  /* global Symbol -- safe */
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var WellKnownSymbolsStore$1 = shared('wks');
	var Symbol$1 = global_1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

	var wellKnownSymbol = function (name) {
	  if (!has$1(WellKnownSymbolsStore$1, name) || !(nativeSymbol || typeof WellKnownSymbolsStore$1[name] == 'string')) {
	    if (nativeSymbol && has$1(Symbol$1, name)) {
	      WellKnownSymbolsStore$1[name] = Symbol$1[name];
	    } else {
	      WellKnownSymbolsStore$1[name] = createWellKnownSymbol('Symbol.' + name);
	    }
	  } return WellKnownSymbolsStore$1[name];
	};

	var SPECIES$5 = wellKnownSymbol('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate = function (originalArray, length) {
	  var C;
	  if (isArray$3(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray$3(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES$5];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var SPECIES$4 = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return engineV8Version >= 51 || !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$4] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
	var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray$3(O);
	};

	var FORCED$4 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.es/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	_export({ target: 'Array', proto: true, forced: FORCED$4 }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  concat: function concat(arg) {
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = toLength(E.length);
	        if (n + len > MAX_SAFE_INTEGER$1) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER$1) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var max$2 = Math.max;
	var min$1 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max$2(integer + length, 0) : min$1(integer, length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$2 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare -- NaN check
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod$2(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$2(false)
	};

	var hiddenKeys$1 = {};

	var indexOf$3 = arrayIncludes.indexOf;


	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has$1(hiddenKeys$1, key) && has$1(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has$1(O, key = names[i++])) {
	    ~indexOf$3(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var html = getBuiltIn('document', 'documentElement');

	var keys$3 = shared('keys');

	var sharedKey = function (key) {
	  return keys$3[key] || (keys$3[key] = uid(key));
	};

	var GT = '>';
	var LT = '<';
	var PROTOTYPE$1 = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO$1 = sharedKey('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    /* global ActiveXObject -- old IE */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys$1[IE_PROTO$1] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE$1] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	var hiddenKeys = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys);
	};

	var objectGetOwnPropertyNames = {
		f: f$4
	};

	var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNames.f;

	var toString = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return nativeGetOwnPropertyNames$1(it);
	  } catch (error) {
	    return windowNames.slice();
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var f$3 = function getOwnPropertyNames(it) {
	  return windowNames && toString.call(it) == '[object Window]'
	    ? getWindowNames(it)
	    : nativeGetOwnPropertyNames$1(toIndexedObject(it));
	};

	var objectGetOwnPropertyNamesExternal = {
		f: f$3
	};

	var f$2 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f$2
	};

	var redefine = function (target, key, value, options) {
	  if (options && options.enumerable) target[key] = value;
	  else createNonEnumerableProperty(target, key, value);
	};

	var f$1 = wellKnownSymbol;

	var wellKnownSymbolWrapped = {
		f: f$1
	};

	var defineProperty$4 = objectDefineProperty.f;

	var defineWellKnownSymbol = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!has$1(Symbol, NAME)) defineProperty$4(Symbol, NAME, {
	    value: wellKnownSymbolWrapped.f(NAME)
	  });
	};

	var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
	var test = {};

	test[TO_STRING_TAG$3] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof = toStringTagSupport ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString = toStringTagSupport ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};

	var defineProperty$3 = objectDefineProperty.f;





	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');

	var setToStringTag = function (it, TAG, STATIC, SET_METHOD) {
	  if (it) {
	    var target = STATIC ? it : it.prototype;
	    if (!has$1(target, TO_STRING_TAG$1)) {
	      defineProperty$3(target, TO_STRING_TAG$1, { configurable: true, value: TAG });
	    }
	    if (SET_METHOD && !toStringTagSupport) {
	      createNonEnumerableProperty(target, 'toString', objectToString);
	    }
	  }
	};

	var functionToString = Function.toString;

	// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
	if (typeof sharedStore.inspectSource != 'function') {
	  sharedStore.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource = sharedStore.inspectSource;

	var WeakMap$1 = global_1.WeakMap;

	var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource(WeakMap$1));

	var WeakMap = global_1.WeakMap;
	var set$1, get, has;

	var enforce = function (it) {
	  return has(it) ? get(it) : set$1(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (nativeWeakMap) {
	  var store = sharedStore.state || (sharedStore.state = new WeakMap());
	  var wmget = store.get;
	  var wmhas = store.has;
	  var wmset = store.set;
	  set$1 = function (it, metadata) {
	    metadata.facade = it;
	    wmset.call(store, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store, it) || {};
	  };
	  has = function (it) {
	    return wmhas.call(store, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys$1[STATE] = true;
	  set$1 = function (it, metadata) {
	    metadata.facade = it;
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return has$1(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return has$1(it, STATE);
	  };
	}

	var internalState = {
	  set: set$1,
	  get: get,
	  has: has,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var push = [].push;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
	var createMethod$1 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var IS_FILTER_OUT = TYPE == 7;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = functionBindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push.call(target, value); // filter
	        } else switch (TYPE) {
	          case 4: return false;             // every
	          case 7: push.call(target, value); // filterOut
	        }
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.es/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$1(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod$1(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod$1(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod$1(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod$1(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod$1(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$1(6),
	  // `Array.prototype.filterOut` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterOut: createMethod$1(7)
	};

	var $forEach = arrayIteration.forEach;

	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
	var setInternalState$3 = internalState.set;
	var getInternalState$3 = internalState.getterFor(SYMBOL);
	var ObjectPrototype$1 = Object[PROTOTYPE];
	var $Symbol = global_1.Symbol;
	var $stringify$1 = getBuiltIn('JSON', 'stringify');
	var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var nativeDefineProperty = objectDefineProperty.f;
	var nativeGetOwnPropertyNames = objectGetOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable = objectPropertyIsEnumerable.f;
	var AllSymbols = shared('symbols');
	var ObjectPrototypeSymbols = shared('op-symbols');
	var StringToSymbolRegistry = shared('string-to-symbol-registry');
	var SymbolToStringRegistry = shared('symbol-to-string-registry');
	var WellKnownSymbolsStore = shared('wks');
	var QObject = global_1.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDescriptor = descriptors && fails(function () {
	  return objectCreate(nativeDefineProperty({}, 'a', {
	    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype$1, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype$1[P];
	  nativeDefineProperty(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype$1) {
	    nativeDefineProperty(ObjectPrototype$1, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty;

	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE]);
	  setInternalState$3(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!descriptors) symbol.description = description;
	  return symbol;
	};

	var isSymbol = useSymbolAsUid ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return Object(it) instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype$1) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject(O);
	  var key = toPrimitive(P, true);
	  anObject(Attributes);
	  if (has$1(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!has$1(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (has$1(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject(O);
	  var properties = toIndexedObject(Properties);
	  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
	  $forEach(keys, function (key) {
	    if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPrimitive(V, true);
	  var enumerable = nativePropertyIsEnumerable.call(this, P);
	  if (this === ObjectPrototype$1 && has$1(AllSymbols, P) && !has$1(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !has$1(this, P) || !has$1(AllSymbols, P) || has$1(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject(O);
	  var key = toPrimitive(P, true);
	  if (it === ObjectPrototype$1 && has$1(AllSymbols, key) && !has$1(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
	  if (descriptor && has$1(AllSymbols, key) && !(has$1(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (!has$1(AllSymbols, key) && !has$1(hiddenKeys$1, key)) result.push(key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$1;
	  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (has$1(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has$1(ObjectPrototype$1, key))) {
	      result.push(AllSymbols[key]);
	    }
	  });
	  return result;
	};

	// `Symbol` constructor
	// https://tc39.es/ecma262/#sec-symbol-constructor
	if (!nativeSymbol) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var tag = uid(description);
	    var setter = function (value) {
	      if (this === ObjectPrototype$1) setter.call(ObjectPrototypeSymbols, value);
	      if (has$1(this, HIDDEN) && has$1(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
	    };
	    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype$1, tag, { configurable: true, set: setter });
	    return wrap(tag, description);
	  };

	  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
	    return getInternalState$3(this).tag;
	  });

	  redefine($Symbol, 'withoutSetter', function (description) {
	    return wrap(uid(description), description);
	  });

	  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
	  objectDefineProperty.f = $defineProperty;
	  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
	  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

	  wellKnownSymbolWrapped.f = function (name) {
	    return wrap(wellKnownSymbol(name), name);
	  };

	  if (descriptors) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState$3(this).description;
	      }
	    });
	  }
	}

	_export({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
	  Symbol: $Symbol
	});

	$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
	  defineWellKnownSymbol(name);
	});

	_export({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
	  // `Symbol.for` method
	  // https://tc39.es/ecma262/#sec-symbol.for
	  'for': function (key) {
	    var string = String(key);
	    if (has$1(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.es/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
	    if (has$1(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors }, {
	  // `Object.create` method
	  // https://tc39.es/ecma262/#sec-object.create
	  create: $create,
	  // `Object.defineProperty` method
	  // https://tc39.es/ecma262/#sec-object.defineproperty
	  defineProperty: $defineProperty,
	  // `Object.defineProperties` method
	  // https://tc39.es/ecma262/#sec-object.defineproperties
	  defineProperties: $defineProperties,
	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	_export({ target: 'Object', stat: true, forced: fails(function () { objectGetOwnPropertySymbols.f(1); }) }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return objectGetOwnPropertySymbols.f(toObject(it));
	  }
	});

	// `JSON.stringify` method behavior with symbols
	// https://tc39.es/ecma262/#sec-json.stringify
	if ($stringify$1) {
	  var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
	    var symbol = $Symbol();
	    // MS Edge converts symbol values to JSON as {}
	    return $stringify$1([symbol]) != '[null]'
	      // WebKit converts symbol values to JSON as null
	      || $stringify$1({ a: symbol }) != '{}'
	      // V8 throws on boxed symbols
	      || $stringify$1(Object(symbol)) != '{}';
	  });

	  _export({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
	    // eslint-disable-next-line no-unused-vars -- required for `.length`
	    stringify: function stringify(it, replacer, space) {
	      var args = [it];
	      var index = 1;
	      var $replacer;
	      while (arguments.length > index) args.push(arguments[index++]);
	      $replacer = replacer;
	      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	      if (!isArray$3(replacer)) replacer = function (key, value) {
	        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	        if (!isSymbol(value)) return value;
	      };
	      args[1] = replacer;
	      return $stringify$1.apply(null, args);
	    }
	  });
	}

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
	if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
	  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	}
	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag($Symbol, SYMBOL);

	hiddenKeys$1[HIDDEN] = true;

	// `Symbol.asyncIterator` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.asynciterator
	defineWellKnownSymbol('asyncIterator');

	// `Symbol.hasInstance` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.hasinstance
	defineWellKnownSymbol('hasInstance');

	// `Symbol.isConcatSpreadable` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.isconcatspreadable
	defineWellKnownSymbol('isConcatSpreadable');

	// `Symbol.iterator` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.iterator
	defineWellKnownSymbol('iterator');

	// `Symbol.match` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.match
	defineWellKnownSymbol('match');

	// `Symbol.matchAll` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.matchall
	defineWellKnownSymbol('matchAll');

	// `Symbol.replace` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.replace
	defineWellKnownSymbol('replace');

	// `Symbol.search` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.search
	defineWellKnownSymbol('search');

	// `Symbol.species` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.species
	defineWellKnownSymbol('species');

	// `Symbol.split` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.split
	defineWellKnownSymbol('split');

	// `Symbol.toPrimitive` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.toprimitive
	defineWellKnownSymbol('toPrimitive');

	// `Symbol.toStringTag` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.tostringtag
	defineWellKnownSymbol('toStringTag');

	// `Symbol.unscopables` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.unscopables
	defineWellKnownSymbol('unscopables');

	// JSON[@@toStringTag] property
	// https://tc39.es/ecma262/#sec-json-@@tostringtag
	setToStringTag(global_1.JSON, 'JSON', true);

	var symbol$2 = path.Symbol;

	// `Symbol.asyncDispose` well-known symbol
	// https://github.com/tc39/proposal-using-statement
	defineWellKnownSymbol('asyncDispose');

	// `Symbol.dispose` well-known symbol
	// https://github.com/tc39/proposal-using-statement
	defineWellKnownSymbol('dispose');

	// `Symbol.observable` well-known symbol
	// https://github.com/tc39/proposal-observable
	defineWellKnownSymbol('observable');

	// `Symbol.patternMatch` well-known symbol
	// https://github.com/tc39/proposal-pattern-matching
	defineWellKnownSymbol('patternMatch');

	// TODO: remove from `core-js@4`


	defineWellKnownSymbol('replaceAll');

	// TODO: Remove from `core-js@4`


	var symbol$1 = symbol$2;

	var symbol = symbol$1;

	// `String.prototype.{ codePointAt, at }` methods implementation
	var createMethod = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible($this));
	    var position = toInteger(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING ? S.charAt(position) : first
	        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod(true)
	};

	var correctPrototypeGetter = !fails(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO = sharedKey('IE_PROTO');
	var ObjectPrototype = Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has$1(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype : null;
	};

	var ITERATOR$5 = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS$1 = false;

	var returnThis$2 = function () { return this; };

	// `%IteratorPrototype%` object
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
	  }
	}

	var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails(function () {
	  var test = {};
	  // FF44- legacy iterators case
	  return IteratorPrototype$2[ITERATOR$5].call(test) !== test;
	});

	if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	if ((NEW_ITERATOR_PROTOTYPE) && !has$1(IteratorPrototype$2, ITERATOR$5)) {
	  createNonEnumerableProperty(IteratorPrototype$2, ITERATOR$5, returnThis$2);
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype$2,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
	};

	var iterators = {};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





	var returnThis$1 = function () { return this; };

	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
	  iterators[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var aPossiblePrototype = function (it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  } return it;
	};

	/* eslint-disable no-proto -- safe */



	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var IteratorPrototype = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$4 = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis = function () { return this; };

	var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    } return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$4]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
	      iterators[TO_STRING_TAG] = returnThis;
	    }
	  }

	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;
	    defaultIterator = function values() { return nativeIterator.call(this); };
	  }

	  // define iterator
	  if ((FORCED) && IterablePrototype[ITERATOR$4] !== defaultIterator) {
	    createNonEnumerableProperty(IterablePrototype, ITERATOR$4, defaultIterator);
	  }
	  iterators[NAME] = defaultIterator;

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
	  }

	  return methods;
	};

	var charAt = stringMultibyte.charAt;



	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$2 = internalState.set;
	var getInternalState$2 = internalState.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState$2(this, {
	    type: STRING_ITERATOR,
	    string: String(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState$2(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return { value: undefined, done: true };
	  point = charAt(string, index);
	  state.index += point.length;
	  return { value: point, done: false };
	});

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$1 = internalState.set;
	var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
	// https://tc39.es/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.es/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.es/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.es/ecma262/#sec-createarrayiterator
	defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState$1(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$1(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return { value: undefined, done: true };
	  }
	  if (kind == 'keys') return { value: index, done: false };
	  if (kind == 'values') return { value: target[index], done: false };
	  return { value: [index, target[index]], done: false };
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.es/ecma262/#sec-createmappedargumentsobject
	iterators.Arguments = iterators.Array;

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global_1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  if (CollectionPrototype && classof(CollectionPrototype) !== TO_STRING_TAG) {
	    createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
	  }
	  iterators[COLLECTION_NAME] = iterators.Array;
	}

	var iterator$2 = wellKnownSymbolWrapped.f('iterator');

	var iterator$1 = iterator$2;

	var iterator = iterator$1;

	function _typeof$2(obj) {
	  "@babel/helpers - typeof";

	  if (typeof symbol === "function" && typeof iterator === "symbol") {
	    _typeof$2 = function _typeof(obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof$2 = function _typeof(obj) {
	      return obj && typeof symbol === "function" && obj.constructor === symbol && obj !== symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof$2(obj);
	}

	var $find = arrayIteration.find;


	var FIND = 'find';
	var SKIPS_HOLES = true;

	// Shouldn't skip holes
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

	// `Array.prototype.find` method
	// https://tc39.es/ecma262/#sec-array.prototype.find
	_export({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var entryVirtual = function (CONSTRUCTOR) {
	  return path[CONSTRUCTOR + 'Prototype'];
	};

	var find$2 = entryVirtual('Array').find;

	var ArrayPrototype$7 = Array.prototype;

	var find_1 = function (it) {
	  var own = it.find;
	  return it === ArrayPrototype$7 || (it instanceof Array && own === ArrayPrototype$7.find) ? find$2 : own;
	};

	var find$1 = find_1;

	var find = find$1;

	/**
	 * Copyright 2016 Google Inc. All Rights Reserved.
	 *
	 * Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.
	 *
	 *  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
	 *
	 */
	(function() {

	// Exit early if we're not running in a browser.
	if (typeof window !== 'object') {
	  return;
	}

	// Exit early if all IntersectionObserver and IntersectionObserverEntry
	// features are natively supported.
	if ('IntersectionObserver' in window &&
	    'IntersectionObserverEntry' in window &&
	    'intersectionRatio' in window.IntersectionObserverEntry.prototype) {

	  // Minimal polyfill for Edge 15's lack of `isIntersecting`
	  // See: https://github.com/w3c/IntersectionObserver/issues/211
	  if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
	    Object.defineProperty(window.IntersectionObserverEntry.prototype,
	      'isIntersecting', {
	      get: function () {
	        return this.intersectionRatio > 0;
	      }
	    });
	  }
	  return;
	}

	/**
	 * Returns the embedding frame element, if any.
	 * @param {!Document} doc
	 * @return {!Element}
	 */
	function getFrameElement(doc) {
	  try {
	    return doc.defaultView && doc.defaultView.frameElement || null;
	  } catch (e) {
	    // Ignore the error.
	    return null;
	  }
	}

	/**
	 * A local reference to the root document.
	 */
	var document = (function(startDoc) {
	  var doc = startDoc;
	  var frame = getFrameElement(doc);
	  while (frame) {
	    doc = frame.ownerDocument;
	    frame = getFrameElement(doc);
	  }
	  return doc;
	})(window.document);

	/**
	 * An IntersectionObserver registry. This registry exists to hold a strong
	 * reference to IntersectionObserver instances currently observing a target
	 * element. Without this registry, instances without another reference may be
	 * garbage collected.
	 */
	var registry = [];

	/**
	 * The signal updater for cross-origin intersection. When not null, it means
	 * that the polyfill is configured to work in a cross-origin mode.
	 * @type {function(DOMRect|ClientRect, DOMRect|ClientRect)}
	 */
	var crossOriginUpdater = null;

	/**
	 * The current cross-origin intersection. Only used in the cross-origin mode.
	 * @type {DOMRect|ClientRect}
	 */
	var crossOriginRect = null;


	/**
	 * Creates the global IntersectionObserverEntry constructor.
	 * https://w3c.github.io/IntersectionObserver/#intersection-observer-entry
	 * @param {Object} entry A dictionary of instance properties.
	 * @constructor
	 */
	function IntersectionObserverEntry(entry) {
	  this.time = entry.time;
	  this.target = entry.target;
	  this.rootBounds = ensureDOMRect(entry.rootBounds);
	  this.boundingClientRect = ensureDOMRect(entry.boundingClientRect);
	  this.intersectionRect = ensureDOMRect(entry.intersectionRect || getEmptyRect());
	  this.isIntersecting = !!entry.intersectionRect;

	  // Calculates the intersection ratio.
	  var targetRect = this.boundingClientRect;
	  var targetArea = targetRect.width * targetRect.height;
	  var intersectionRect = this.intersectionRect;
	  var intersectionArea = intersectionRect.width * intersectionRect.height;

	  // Sets intersection ratio.
	  if (targetArea) {
	    // Round the intersection ratio to avoid floating point math issues:
	    // https://github.com/w3c/IntersectionObserver/issues/324
	    this.intersectionRatio = Number((intersectionArea / targetArea).toFixed(4));
	  } else {
	    // If area is zero and is intersecting, sets to 1, otherwise to 0
	    this.intersectionRatio = this.isIntersecting ? 1 : 0;
	  }
	}


	/**
	 * Creates the global IntersectionObserver constructor.
	 * https://w3c.github.io/IntersectionObserver/#intersection-observer-interface
	 * @param {Function} callback The function to be invoked after intersection
	 *     changes have queued. The function is not invoked if the queue has
	 *     been emptied by calling the `takeRecords` method.
	 * @param {Object=} opt_options Optional configuration options.
	 * @constructor
	 */
	function IntersectionObserver(callback, opt_options) {

	  var options = opt_options || {};

	  if (typeof callback != 'function') {
	    throw new Error('callback must be a function');
	  }

	  if (
	    options.root &&
	    options.root.nodeType != 1 &&
	    options.root.nodeType != 9
	  ) {
	    throw new Error('root must be a Document or Element');
	  }

	  // Binds and throttles `this._checkForIntersections`.
	  this._checkForIntersections = throttle(
	      this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);

	  // Private properties.
	  this._callback = callback;
	  this._observationTargets = [];
	  this._queuedEntries = [];
	  this._rootMarginValues = this._parseRootMargin(options.rootMargin);

	  // Public properties.
	  this.thresholds = this._initThresholds(options.threshold);
	  this.root = options.root || null;
	  this.rootMargin = this._rootMarginValues.map(function(margin) {
	    return margin.value + margin.unit;
	  }).join(' ');

	  /** @private @const {!Array<!Document>} */
	  this._monitoringDocuments = [];
	  /** @private @const {!Array<function()>} */
	  this._monitoringUnsubscribes = [];
	}


	/**
	 * The minimum interval within which the document will be checked for
	 * intersection changes.
	 */
	IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100;


	/**
	 * The frequency in which the polyfill polls for intersection changes.
	 * this can be updated on a per instance basis and must be set prior to
	 * calling `observe` on the first target.
	 */
	IntersectionObserver.prototype.POLL_INTERVAL = null;

	/**
	 * Use a mutation observer on the root element
	 * to detect intersection changes.
	 */
	IntersectionObserver.prototype.USE_MUTATION_OBSERVER = true;


	/**
	 * Sets up the polyfill in the cross-origin mode. The result is the
	 * updater function that accepts two arguments: `boundingClientRect` and
	 * `intersectionRect` - just as these fields would be available to the
	 * parent via `IntersectionObserverEntry`. This function should be called
	 * each time the iframe receives intersection information from the parent
	 * window, e.g. via messaging.
	 * @return {function(DOMRect|ClientRect, DOMRect|ClientRect)}
	 */
	IntersectionObserver._setupCrossOriginUpdater = function() {
	  if (!crossOriginUpdater) {
	    /**
	     * @param {DOMRect|ClientRect} boundingClientRect
	     * @param {DOMRect|ClientRect} intersectionRect
	     */
	    crossOriginUpdater = function(boundingClientRect, intersectionRect) {
	      if (!boundingClientRect || !intersectionRect) {
	        crossOriginRect = getEmptyRect();
	      } else {
	        crossOriginRect = convertFromParentRect(boundingClientRect, intersectionRect);
	      }
	      registry.forEach(function(observer) {
	        observer._checkForIntersections();
	      });
	    };
	  }
	  return crossOriginUpdater;
	};


	/**
	 * Resets the cross-origin mode.
	 */
	IntersectionObserver._resetCrossOriginUpdater = function() {
	  crossOriginUpdater = null;
	  crossOriginRect = null;
	};


	/**
	 * Starts observing a target element for intersection changes based on
	 * the thresholds values.
	 * @param {Element} target The DOM element to observe.
	 */
	IntersectionObserver.prototype.observe = function(target) {
	  var isTargetAlreadyObserved = this._observationTargets.some(function(item) {
	    return item.element == target;
	  });

	  if (isTargetAlreadyObserved) {
	    return;
	  }

	  if (!(target && target.nodeType == 1)) {
	    throw new Error('target must be an Element');
	  }

	  this._registerInstance();
	  this._observationTargets.push({element: target, entry: null});
	  this._monitorIntersections(target.ownerDocument);
	  this._checkForIntersections();
	};


	/**
	 * Stops observing a target element for intersection changes.
	 * @param {Element} target The DOM element to observe.
	 */
	IntersectionObserver.prototype.unobserve = function(target) {
	  this._observationTargets =
	      this._observationTargets.filter(function(item) {
	        return item.element != target;
	      });
	  this._unmonitorIntersections(target.ownerDocument);
	  if (this._observationTargets.length == 0) {
	    this._unregisterInstance();
	  }
	};


	/**
	 * Stops observing all target elements for intersection changes.
	 */
	IntersectionObserver.prototype.disconnect = function() {
	  this._observationTargets = [];
	  this._unmonitorAllIntersections();
	  this._unregisterInstance();
	};


	/**
	 * Returns any queue entries that have not yet been reported to the
	 * callback and clears the queue. This can be used in conjunction with the
	 * callback to obtain the absolute most up-to-date intersection information.
	 * @return {Array} The currently queued entries.
	 */
	IntersectionObserver.prototype.takeRecords = function() {
	  var records = this._queuedEntries.slice();
	  this._queuedEntries = [];
	  return records;
	};


	/**
	 * Accepts the threshold value from the user configuration object and
	 * returns a sorted array of unique threshold values. If a value is not
	 * between 0 and 1 and error is thrown.
	 * @private
	 * @param {Array|number=} opt_threshold An optional threshold value or
	 *     a list of threshold values, defaulting to [0].
	 * @return {Array} A sorted list of unique and valid threshold values.
	 */
	IntersectionObserver.prototype._initThresholds = function(opt_threshold) {
	  var threshold = opt_threshold || [0];
	  if (!Array.isArray(threshold)) threshold = [threshold];

	  return threshold.sort().filter(function(t, i, a) {
	    if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
	      throw new Error('threshold must be a number between 0 and 1 inclusively');
	    }
	    return t !== a[i - 1];
	  });
	};


	/**
	 * Accepts the rootMargin value from the user configuration object
	 * and returns an array of the four margin values as an object containing
	 * the value and unit properties. If any of the values are not properly
	 * formatted or use a unit other than px or %, and error is thrown.
	 * @private
	 * @param {string=} opt_rootMargin An optional rootMargin value,
	 *     defaulting to '0px'.
	 * @return {Array<Object>} An array of margin objects with the keys
	 *     value and unit.
	 */
	IntersectionObserver.prototype._parseRootMargin = function(opt_rootMargin) {
	  var marginString = opt_rootMargin || '0px';
	  var margins = marginString.split(/\s+/).map(function(margin) {
	    var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
	    if (!parts) {
	      throw new Error('rootMargin must be specified in pixels or percent');
	    }
	    return {value: parseFloat(parts[1]), unit: parts[2]};
	  });

	  // Handles shorthand.
	  margins[1] = margins[1] || margins[0];
	  margins[2] = margins[2] || margins[0];
	  margins[3] = margins[3] || margins[1];

	  return margins;
	};


	/**
	 * Starts polling for intersection changes if the polling is not already
	 * happening, and if the page's visibility state is visible.
	 * @param {!Document} doc
	 * @private
	 */
	IntersectionObserver.prototype._monitorIntersections = function(doc) {
	  var win = doc.defaultView;
	  if (!win) {
	    // Already destroyed.
	    return;
	  }
	  if (this._monitoringDocuments.indexOf(doc) != -1) {
	    // Already monitoring.
	    return;
	  }

	  // Private state for monitoring.
	  var callback = this._checkForIntersections;
	  var monitoringInterval = null;
	  var domObserver = null;

	  // If a poll interval is set, use polling instead of listening to
	  // resize and scroll events or DOM mutations.
	  if (this.POLL_INTERVAL) {
	    monitoringInterval = win.setInterval(callback, this.POLL_INTERVAL);
	  } else {
	    addEvent(win, 'resize', callback, true);
	    addEvent(doc, 'scroll', callback, true);
	    if (this.USE_MUTATION_OBSERVER && 'MutationObserver' in win) {
	      domObserver = new win.MutationObserver(callback);
	      domObserver.observe(doc, {
	        attributes: true,
	        childList: true,
	        characterData: true,
	        subtree: true
	      });
	    }
	  }

	  this._monitoringDocuments.push(doc);
	  this._monitoringUnsubscribes.push(function() {
	    // Get the window object again. When a friendly iframe is destroyed, it
	    // will be null.
	    var win = doc.defaultView;

	    if (win) {
	      if (monitoringInterval) {
	        win.clearInterval(monitoringInterval);
	      }
	      removeEvent(win, 'resize', callback, true);
	    }

	    removeEvent(doc, 'scroll', callback, true);
	    if (domObserver) {
	      domObserver.disconnect();
	    }
	  });

	  // Also monitor the parent.
	  var rootDoc =
	    (this.root && (this.root.ownerDocument || this.root)) || document;
	  if (doc != rootDoc) {
	    var frame = getFrameElement(doc);
	    if (frame) {
	      this._monitorIntersections(frame.ownerDocument);
	    }
	  }
	};


	/**
	 * Stops polling for intersection changes.
	 * @param {!Document} doc
	 * @private
	 */
	IntersectionObserver.prototype._unmonitorIntersections = function(doc) {
	  var index = this._monitoringDocuments.indexOf(doc);
	  if (index == -1) {
	    return;
	  }

	  var rootDoc =
	    (this.root && (this.root.ownerDocument || this.root)) || document;

	  // Check if any dependent targets are still remaining.
	  var hasDependentTargets =
	      this._observationTargets.some(function(item) {
	        var itemDoc = item.element.ownerDocument;
	        // Target is in this context.
	        if (itemDoc == doc) {
	          return true;
	        }
	        // Target is nested in this context.
	        while (itemDoc && itemDoc != rootDoc) {
	          var frame = getFrameElement(itemDoc);
	          itemDoc = frame && frame.ownerDocument;
	          if (itemDoc == doc) {
	            return true;
	          }
	        }
	        return false;
	      });
	  if (hasDependentTargets) {
	    return;
	  }

	  // Unsubscribe.
	  var unsubscribe = this._monitoringUnsubscribes[index];
	  this._monitoringDocuments.splice(index, 1);
	  this._monitoringUnsubscribes.splice(index, 1);
	  unsubscribe();

	  // Also unmonitor the parent.
	  if (doc != rootDoc) {
	    var frame = getFrameElement(doc);
	    if (frame) {
	      this._unmonitorIntersections(frame.ownerDocument);
	    }
	  }
	};


	/**
	 * Stops polling for intersection changes.
	 * @param {!Document} doc
	 * @private
	 */
	IntersectionObserver.prototype._unmonitorAllIntersections = function() {
	  var unsubscribes = this._monitoringUnsubscribes.slice(0);
	  this._monitoringDocuments.length = 0;
	  this._monitoringUnsubscribes.length = 0;
	  for (var i = 0; i < unsubscribes.length; i++) {
	    unsubscribes[i]();
	  }
	};


	/**
	 * Scans each observation target for intersection changes and adds them
	 * to the internal entries queue. If new entries are found, it
	 * schedules the callback to be invoked.
	 * @private
	 */
	IntersectionObserver.prototype._checkForIntersections = function() {
	  if (!this.root && crossOriginUpdater && !crossOriginRect) {
	    // Cross origin monitoring, but no initial data available yet.
	    return;
	  }

	  var rootIsInDom = this._rootIsInDom();
	  var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();

	  this._observationTargets.forEach(function(item) {
	    var target = item.element;
	    var targetRect = getBoundingClientRect(target);
	    var rootContainsTarget = this._rootContainsTarget(target);
	    var oldEntry = item.entry;
	    var intersectionRect = rootIsInDom && rootContainsTarget &&
	        this._computeTargetAndRootIntersection(target, targetRect, rootRect);

	    var rootBounds = null;
	    if (!this._rootContainsTarget(target)) {
	      rootBounds = getEmptyRect();
	    } else if (!crossOriginUpdater || this.root) {
	      rootBounds = rootRect;
	    }

	    var newEntry = item.entry = new IntersectionObserverEntry({
	      time: now(),
	      target: target,
	      boundingClientRect: targetRect,
	      rootBounds: rootBounds,
	      intersectionRect: intersectionRect
	    });

	    if (!oldEntry) {
	      this._queuedEntries.push(newEntry);
	    } else if (rootIsInDom && rootContainsTarget) {
	      // If the new entry intersection ratio has crossed any of the
	      // thresholds, add a new entry.
	      if (this._hasCrossedThreshold(oldEntry, newEntry)) {
	        this._queuedEntries.push(newEntry);
	      }
	    } else {
	      // If the root is not in the DOM or target is not contained within
	      // root but the previous entry for this target had an intersection,
	      // add a new record indicating removal.
	      if (oldEntry && oldEntry.isIntersecting) {
	        this._queuedEntries.push(newEntry);
	      }
	    }
	  }, this);

	  if (this._queuedEntries.length) {
	    this._callback(this.takeRecords(), this);
	  }
	};


	/**
	 * Accepts a target and root rect computes the intersection between then
	 * following the algorithm in the spec.
	 * TODO(philipwalton): at this time clip-path is not considered.
	 * https://w3c.github.io/IntersectionObserver/#calculate-intersection-rect-algo
	 * @param {Element} target The target DOM element
	 * @param {Object} targetRect The bounding rect of the target.
	 * @param {Object} rootRect The bounding rect of the root after being
	 *     expanded by the rootMargin value.
	 * @return {?Object} The final intersection rect object or undefined if no
	 *     intersection is found.
	 * @private
	 */
	IntersectionObserver.prototype._computeTargetAndRootIntersection =
	    function(target, targetRect, rootRect) {
	  // If the element isn't displayed, an intersection can't happen.
	  if (window.getComputedStyle(target).display == 'none') return;

	  var intersectionRect = targetRect;
	  var parent = getParentNode(target);
	  var atRoot = false;

	  while (!atRoot && parent) {
	    var parentRect = null;
	    var parentComputedStyle = parent.nodeType == 1 ?
	        window.getComputedStyle(parent) : {};

	    // If the parent isn't displayed, an intersection can't happen.
	    if (parentComputedStyle.display == 'none') return null;

	    if (parent == this.root || parent.nodeType == /* DOCUMENT */ 9) {
	      atRoot = true;
	      if (parent == this.root || parent == document) {
	        if (crossOriginUpdater && !this.root) {
	          if (!crossOriginRect ||
	              crossOriginRect.width == 0 && crossOriginRect.height == 0) {
	            // A 0-size cross-origin intersection means no-intersection.
	            parent = null;
	            parentRect = null;
	            intersectionRect = null;
	          } else {
	            parentRect = crossOriginRect;
	          }
	        } else {
	          parentRect = rootRect;
	        }
	      } else {
	        // Check if there's a frame that can be navigated to.
	        var frame = getParentNode(parent);
	        var frameRect = frame && getBoundingClientRect(frame);
	        var frameIntersect =
	            frame &&
	            this._computeTargetAndRootIntersection(frame, frameRect, rootRect);
	        if (frameRect && frameIntersect) {
	          parent = frame;
	          parentRect = convertFromParentRect(frameRect, frameIntersect);
	        } else {
	          parent = null;
	          intersectionRect = null;
	        }
	      }
	    } else {
	      // If the element has a non-visible overflow, and it's not the <body>
	      // or <html> element, update the intersection rect.
	      // Note: <body> and <html> cannot be clipped to a rect that's not also
	      // the document rect, so no need to compute a new intersection.
	      var doc = parent.ownerDocument;
	      if (parent != doc.body &&
	          parent != doc.documentElement &&
	          parentComputedStyle.overflow != 'visible') {
	        parentRect = getBoundingClientRect(parent);
	      }
	    }

	    // If either of the above conditionals set a new parentRect,
	    // calculate new intersection data.
	    if (parentRect) {
	      intersectionRect = computeRectIntersection(parentRect, intersectionRect);
	    }
	    if (!intersectionRect) break;
	    parent = parent && getParentNode(parent);
	  }
	  return intersectionRect;
	};


	/**
	 * Returns the root rect after being expanded by the rootMargin value.
	 * @return {ClientRect} The expanded root rect.
	 * @private
	 */
	IntersectionObserver.prototype._getRootRect = function() {
	  var rootRect;
	  if (this.root && !isDoc(this.root)) {
	    rootRect = getBoundingClientRect(this.root);
	  } else {
	    // Use <html>/<body> instead of window since scroll bars affect size.
	    var doc = isDoc(this.root) ? this.root : document;
	    var html = doc.documentElement;
	    var body = doc.body;
	    rootRect = {
	      top: 0,
	      left: 0,
	      right: html.clientWidth || body.clientWidth,
	      width: html.clientWidth || body.clientWidth,
	      bottom: html.clientHeight || body.clientHeight,
	      height: html.clientHeight || body.clientHeight
	    };
	  }
	  return this._expandRectByRootMargin(rootRect);
	};


	/**
	 * Accepts a rect and expands it by the rootMargin value.
	 * @param {DOMRect|ClientRect} rect The rect object to expand.
	 * @return {ClientRect} The expanded rect.
	 * @private
	 */
	IntersectionObserver.prototype._expandRectByRootMargin = function(rect) {
	  var margins = this._rootMarginValues.map(function(margin, i) {
	    return margin.unit == 'px' ? margin.value :
	        margin.value * (i % 2 ? rect.width : rect.height) / 100;
	  });
	  var newRect = {
	    top: rect.top - margins[0],
	    right: rect.right + margins[1],
	    bottom: rect.bottom + margins[2],
	    left: rect.left - margins[3]
	  };
	  newRect.width = newRect.right - newRect.left;
	  newRect.height = newRect.bottom - newRect.top;

	  return newRect;
	};


	/**
	 * Accepts an old and new entry and returns true if at least one of the
	 * threshold values has been crossed.
	 * @param {?IntersectionObserverEntry} oldEntry The previous entry for a
	 *    particular target element or null if no previous entry exists.
	 * @param {IntersectionObserverEntry} newEntry The current entry for a
	 *    particular target element.
	 * @return {boolean} Returns true if a any threshold has been crossed.
	 * @private
	 */
	IntersectionObserver.prototype._hasCrossedThreshold =
	    function(oldEntry, newEntry) {

	  // To make comparing easier, an entry that has a ratio of 0
	  // but does not actually intersect is given a value of -1
	  var oldRatio = oldEntry && oldEntry.isIntersecting ?
	      oldEntry.intersectionRatio || 0 : -1;
	  var newRatio = newEntry.isIntersecting ?
	      newEntry.intersectionRatio || 0 : -1;

	  // Ignore unchanged ratios
	  if (oldRatio === newRatio) return;

	  for (var i = 0; i < this.thresholds.length; i++) {
	    var threshold = this.thresholds[i];

	    // Return true if an entry matches a threshold or if the new ratio
	    // and the old ratio are on the opposite sides of a threshold.
	    if (threshold == oldRatio || threshold == newRatio ||
	        threshold < oldRatio !== threshold < newRatio) {
	      return true;
	    }
	  }
	};


	/**
	 * Returns whether or not the root element is an element and is in the DOM.
	 * @return {boolean} True if the root element is an element and is in the DOM.
	 * @private
	 */
	IntersectionObserver.prototype._rootIsInDom = function() {
	  return !this.root || containsDeep(document, this.root);
	};


	/**
	 * Returns whether or not the target element is a child of root.
	 * @param {Element} target The target element to check.
	 * @return {boolean} True if the target element is a child of root.
	 * @private
	 */
	IntersectionObserver.prototype._rootContainsTarget = function(target) {
	  var rootDoc =
	    (this.root && (this.root.ownerDocument || this.root)) || document;
	  return (
	    containsDeep(rootDoc, target) &&
	    (!this.root || rootDoc == target.ownerDocument)
	  );
	};


	/**
	 * Adds the instance to the global IntersectionObserver registry if it isn't
	 * already present.
	 * @private
	 */
	IntersectionObserver.prototype._registerInstance = function() {
	  if (registry.indexOf(this) < 0) {
	    registry.push(this);
	  }
	};


	/**
	 * Removes the instance from the global IntersectionObserver registry.
	 * @private
	 */
	IntersectionObserver.prototype._unregisterInstance = function() {
	  var index = registry.indexOf(this);
	  if (index != -1) registry.splice(index, 1);
	};


	/**
	 * Returns the result of the performance.now() method or null in browsers
	 * that don't support the API.
	 * @return {number} The elapsed time since the page was requested.
	 */
	function now() {
	  return window.performance && performance.now && performance.now();
	}


	/**
	 * Throttles a function and delays its execution, so it's only called at most
	 * once within a given time period.
	 * @param {Function} fn The function to throttle.
	 * @param {number} timeout The amount of time that must pass before the
	 *     function can be called again.
	 * @return {Function} The throttled function.
	 */
	function throttle(fn, timeout) {
	  var timer = null;
	  return function () {
	    if (!timer) {
	      timer = setTimeout(function() {
	        fn();
	        timer = null;
	      }, timeout);
	    }
	  };
	}


	/**
	 * Adds an event handler to a DOM node ensuring cross-browser compatibility.
	 * @param {Node} node The DOM node to add the event handler to.
	 * @param {string} event The event name.
	 * @param {Function} fn The event handler to add.
	 * @param {boolean} opt_useCapture Optionally adds the even to the capture
	 *     phase. Note: this only works in modern browsers.
	 */
	function addEvent(node, event, fn, opt_useCapture) {
	  if (typeof node.addEventListener == 'function') {
	    node.addEventListener(event, fn, opt_useCapture || false);
	  }
	  else if (typeof node.attachEvent == 'function') {
	    node.attachEvent('on' + event, fn);
	  }
	}


	/**
	 * Removes a previously added event handler from a DOM node.
	 * @param {Node} node The DOM node to remove the event handler from.
	 * @param {string} event The event name.
	 * @param {Function} fn The event handler to remove.
	 * @param {boolean} opt_useCapture If the event handler was added with this
	 *     flag set to true, it should be set to true here in order to remove it.
	 */
	function removeEvent(node, event, fn, opt_useCapture) {
	  if (typeof node.removeEventListener == 'function') {
	    node.removeEventListener(event, fn, opt_useCapture || false);
	  }
	  else if (typeof node.detatchEvent == 'function') {
	    node.detatchEvent('on' + event, fn);
	  }
	}


	/**
	 * Returns the intersection between two rect objects.
	 * @param {Object} rect1 The first rect.
	 * @param {Object} rect2 The second rect.
	 * @return {?Object|?ClientRect} The intersection rect or undefined if no
	 *     intersection is found.
	 */
	function computeRectIntersection(rect1, rect2) {
	  var top = Math.max(rect1.top, rect2.top);
	  var bottom = Math.min(rect1.bottom, rect2.bottom);
	  var left = Math.max(rect1.left, rect2.left);
	  var right = Math.min(rect1.right, rect2.right);
	  var width = right - left;
	  var height = bottom - top;

	  return (width >= 0 && height >= 0) && {
	    top: top,
	    bottom: bottom,
	    left: left,
	    right: right,
	    width: width,
	    height: height
	  } || null;
	}


	/**
	 * Shims the native getBoundingClientRect for compatibility with older IE.
	 * @param {Element} el The element whose bounding rect to get.
	 * @return {DOMRect|ClientRect} The (possibly shimmed) rect of the element.
	 */
	function getBoundingClientRect(el) {
	  var rect;

	  try {
	    rect = el.getBoundingClientRect();
	  } catch (err) {
	    // Ignore Windows 7 IE11 "Unspecified error"
	    // https://github.com/w3c/IntersectionObserver/pull/205
	  }

	  if (!rect) return getEmptyRect();

	  // Older IE
	  if (!(rect.width && rect.height)) {
	    rect = {
	      top: rect.top,
	      right: rect.right,
	      bottom: rect.bottom,
	      left: rect.left,
	      width: rect.right - rect.left,
	      height: rect.bottom - rect.top
	    };
	  }
	  return rect;
	}


	/**
	 * Returns an empty rect object. An empty rect is returned when an element
	 * is not in the DOM.
	 * @return {ClientRect} The empty rect.
	 */
	function getEmptyRect() {
	  return {
	    top: 0,
	    bottom: 0,
	    left: 0,
	    right: 0,
	    width: 0,
	    height: 0
	  };
	}


	/**
	 * Ensure that the result has all of the necessary fields of the DOMRect.
	 * Specifically this ensures that `x` and `y` fields are set.
	 *
	 * @param {?DOMRect|?ClientRect} rect
	 * @return {?DOMRect}
	 */
	function ensureDOMRect(rect) {
	  // A `DOMRect` object has `x` and `y` fields.
	  if (!rect || 'x' in rect) {
	    return rect;
	  }
	  // A IE's `ClientRect` type does not have `x` and `y`. The same is the case
	  // for internally calculated Rect objects. For the purposes of
	  // `IntersectionObserver`, it's sufficient to simply mirror `left` and `top`
	  // for these fields.
	  return {
	    top: rect.top,
	    y: rect.top,
	    bottom: rect.bottom,
	    left: rect.left,
	    x: rect.left,
	    right: rect.right,
	    width: rect.width,
	    height: rect.height
	  };
	}


	/**
	 * Inverts the intersection and bounding rect from the parent (frame) BCR to
	 * the local BCR space.
	 * @param {DOMRect|ClientRect} parentBoundingRect The parent's bound client rect.
	 * @param {DOMRect|ClientRect} parentIntersectionRect The parent's own intersection rect.
	 * @return {ClientRect} The local root bounding rect for the parent's children.
	 */
	function convertFromParentRect(parentBoundingRect, parentIntersectionRect) {
	  var top = parentIntersectionRect.top - parentBoundingRect.top;
	  var left = parentIntersectionRect.left - parentBoundingRect.left;
	  return {
	    top: top,
	    left: left,
	    height: parentIntersectionRect.height,
	    width: parentIntersectionRect.width,
	    bottom: top + parentIntersectionRect.height,
	    right: left + parentIntersectionRect.width
	  };
	}


	/**
	 * Checks to see if a parent element contains a child element (including inside
	 * shadow DOM).
	 * @param {Node} parent The parent element.
	 * @param {Node} child The child element.
	 * @return {boolean} True if the parent node contains the child node.
	 */
	function containsDeep(parent, child) {
	  var node = child;
	  while (node) {
	    if (node == parent) return true;

	    node = getParentNode(node);
	  }
	  return false;
	}


	/**
	 * Gets the parent node of an element or its host element if the parent node
	 * is a shadow root.
	 * @param {Node} node The node whose parent to get.
	 * @return {Node|null} The parent node or null if no parent exists.
	 */
	function getParentNode(node) {
	  var parent = node.parentNode;

	  if (node.nodeType == /* DOCUMENT */ 9 && node != document) {
	    // If this node is a document node, look for the embedding frame.
	    return getFrameElement(node);
	  }

	  // If the parent has element that is assigned through shadow root slot
	  if (parent && parent.assignedSlot) {
	    parent = parent.assignedSlot.parentNode;
	  }

	  if (parent && parent.nodeType == 11 && parent.host) {
	    // If the parent is a shadow root, return the host element.
	    return parent.host;
	  }

	  return parent;
	}

	/**
	 * Returns true if `node` is a Document.
	 * @param {!Node} node
	 * @returns {boolean}
	 */
	function isDoc(node) {
	  return node && node.nodeType === 9;
	}


	// Exposes the constructors globally.
	window.IntersectionObserver = IntersectionObserver;
	window.IntersectionObserverEntry = IntersectionObserverEntry;

	}());

	function unbind$5(el) {
	  if (!el._appear) return;

	  el._appear.observer.unobserve(el);

	  delete el._appear;
	}

	function inserted$5(el, binding) {
	  var _binding$modifiers;

	  var modifiers = (_binding$modifiers = binding.modifiers) !== null && _binding$modifiers !== void 0 ? _binding$modifiers : {};
	  var value = binding.value;

	  var _ref = _typeof$2(value) === 'object' ? value : {
	    handler: value,
	    options: {}
	  },
	      handler = _ref.handler,
	      options = _ref.options;

	  var observer = new IntersectionObserver(function (entries) {
	    if (!el._appear) return;
	    var isIntersecting = Boolean(find(entries).call(entries, function (entry) {
	      return entry.isIntersecting;
	    }));

	    if (handler && isIntersecting) {
	      handler(); // 判断 isIntersecting 的值，可见时才调用处理函数

	      if (modifiers.once) unbind$5(el); // 判断 isIntersecting 的值，可见时执行一次后才取消监听
	    }
	  }, options);
	  el._appear = {
	    observer: observer
	  };
	  observer.observe(el);
	}

	var directive$5 = {
	  inserted: inserted$5,
	  unbind: unbind$5,
	  install: function install(Vue) {
	    Vue.directive('vui-appear', directive$5);
	  }
	};

	var $includes = arrayIncludes.includes;


	// `Array.prototype.includes` method
	// https://tc39.es/ecma262/#sec-array.prototype.includes
	_export({ target: 'Array', proto: true }, {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var includes$4 = entryVirtual('Array').includes;

	var MATCH$1 = wellKnownSymbol('match');

	// `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	var notARegexp = function (it) {
	  if (isRegexp(it)) {
	    throw TypeError("The method doesn't accept regular expressions");
	  } return it;
	};

	var MATCH = wellKnownSymbol('match');

	var correctIsRegexpLogic = function (METHOD_NAME) {
	  var regexp = /./;
	  try {
	    '/./'[METHOD_NAME](regexp);
	  } catch (error1) {
	    try {
	      regexp[MATCH] = false;
	      return '/./'[METHOD_NAME](regexp);
	    } catch (error2) { /* empty */ }
	  } return false;
	};

	// `String.prototype.includes` method
	// https://tc39.es/ecma262/#sec-string.prototype.includes
	_export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('includes') }, {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~String(requireObjectCoercible(this))
	      .indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var includes$3 = entryVirtual('String').includes;

	var ArrayPrototype$6 = Array.prototype;
	var StringPrototype = String.prototype;

	var includes$2 = function (it) {
	  var own = it.includes;
	  if (it === ArrayPrototype$6 || (it instanceof Array && own === ArrayPrototype$6.includes)) return includes$4;
	  if (typeof it === 'string' || it === StringPrototype || (it instanceof String && own === StringPrototype.includes)) {
	    return includes$3;
	  } return own;
	};

	var includes$1 = includes$2;

	var includes = includes$1;

	var slice$5 = [].slice;
	var factories = {};

	var construct$3 = function (C, argsLength, args) {
	  if (!(argsLength in factories)) {
	    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
	    // eslint-disable-next-line no-new-func -- we have no proper alternatives, IE8- only
	    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
	  } return factories[argsLength](C, args);
	};

	// `Function.prototype.bind` method implementation
	// https://tc39.es/ecma262/#sec-function.prototype.bind
	var functionBind = Function.bind || function bind(that /* , ...args */) {
	  var fn = aFunction$1(this);
	  var partArgs = slice$5.call(arguments, 1);
	  var boundFunction = function bound(/* args... */) {
	    var args = partArgs.concat(slice$5.call(arguments));
	    return this instanceof boundFunction ? construct$3(fn, args.length, args) : fn.apply(that, args);
	  };
	  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
	  return boundFunction;
	};

	var nativeConstruct = getBuiltIn('Reflect', 'construct');

	// `Reflect.construct` method
	// https://tc39.es/ecma262/#sec-reflect.construct
	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	var NEW_TARGET_BUG = fails(function () {
	  function F() { /* empty */ }
	  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
	});
	var ARGS_BUG = !fails(function () {
	  nativeConstruct(function () { /* empty */ });
	});
	var FORCED$3 = NEW_TARGET_BUG || ARGS_BUG;

	_export({ target: 'Reflect', stat: true, forced: FORCED$3, sham: FORCED$3 }, {
	  construct: function construct(Target, args /* , newTarget */) {
	    aFunction$1(Target);
	    anObject(args);
	    var newTarget = arguments.length < 3 ? Target : aFunction$1(arguments[2]);
	    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
	    if (Target == newTarget) {
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch (args.length) {
	        case 0: return new Target();
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (functionBind.apply(Target, $args))();
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto = newTarget.prototype;
	    var instance = objectCreate(isObject(proto) ? proto : Object.prototype);
	    var result = Function.apply.call(Target, instance, args);
	    return isObject(result) ? result : instance;
	  }
	});

	var construct$2 = path.Reflect.construct;

	var construct$1 = construct$2;

	var construct = construct$1;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	_export({ target: 'Object', stat: true, sham: !descriptors }, {
	  create: objectCreate
	});

	var Object$1 = path.Object;

	var create$2 = function create(P, D) {
	  return Object$1.create(P, D);
	};

	var create$1 = create$2;

	var create = create$1;

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	_export({ target: 'Object', stat: true }, {
	  setPrototypeOf: objectSetPrototypeOf
	});

	var setPrototypeOf$2 = path.Object.setPrototypeOf;

	var setPrototypeOf$1 = setPrototypeOf$2;

	var setPrototypeOf = setPrototypeOf$1;

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	var _typeof_1 = createCommonjsModule(function (module) {
	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  if (typeof symbol === "function" && typeof iterator === "symbol") {
	    module.exports = _typeof = function _typeof(obj) {
	      return typeof obj;
	    };

	    module.exports["default"] = module.exports, module.exports.__esModule = true;
	  } else {
	    module.exports = _typeof = function _typeof(obj) {
	      return obj && typeof symbol === "function" && obj.constructor === symbol && obj !== symbol.prototype ? "symbol" : typeof obj;
	    };

	    module.exports["default"] = module.exports, module.exports.__esModule = true;
	  }

	  return _typeof(obj);
	}

	module.exports = _typeof;
	module.exports["default"] = module.exports, module.exports.__esModule = true;
	});

	var _typeof$1 = /*@__PURE__*/getDefaultExportFromCjs(_typeof_1);

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof$1(call) === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	var FAILS_ON_PRIMITIVES$2 = fails(function () { objectGetPrototypeOf(1); });

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$2, sham: !correctPrototypeGetter }, {
	  getPrototypeOf: function getPrototypeOf(it) {
	    return objectGetPrototypeOf(toObject(it));
	  }
	});

	var getPrototypeOf$2 = path.Object.getPrototypeOf;

	var getPrototypeOf$1 = getPrototypeOf$2;

	var getPrototypeOf = getPrototypeOf$1;

	function _getPrototypeOf(o) {
	  _getPrototypeOf = setPrototypeOf ? getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation.

	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */

	function __decorate(decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	}

	/**
	  * vue-class-component v7.2.6
	  * (c) 2015-present Evan You
	  * @license MIT
	  */

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

	function _defineProperty$1(obj, key, value) {
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

	function _toConsumableArray$1(arr) {
	  return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _nonIterableSpread$1();
	}

	function _arrayWithoutHoles$1(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	    return arr2;
	  }
	}

	function _iterableToArray$1(iter) {
	  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
	}

	function _nonIterableSpread$1() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance");
	}

	// The rational behind the verbose Reflect-feature check below is the fact that there are polyfills
	// which add an implementation for Reflect.defineMetadata but not for Reflect.getOwnMetadataKeys.
	// Without this check consumers will encounter hard to track down runtime errors.
	function reflectionIsSupported() {
	  return typeof Reflect !== 'undefined' && Reflect.defineMetadata && Reflect.getOwnMetadataKeys;
	}
	function copyReflectionMetadata(to, from) {
	  forwardMetadata(to, from);
	  Object.getOwnPropertyNames(from.prototype).forEach(function (key) {
	    forwardMetadata(to.prototype, from.prototype, key);
	  });
	  Object.getOwnPropertyNames(from).forEach(function (key) {
	    forwardMetadata(to, from, key);
	  });
	}

	function forwardMetadata(to, from, propertyKey) {
	  var metaKeys = propertyKey ? Reflect.getOwnMetadataKeys(from, propertyKey) : Reflect.getOwnMetadataKeys(from);
	  metaKeys.forEach(function (metaKey) {
	    var metadata = propertyKey ? Reflect.getOwnMetadata(metaKey, from, propertyKey) : Reflect.getOwnMetadata(metaKey, from);

	    if (propertyKey) {
	      Reflect.defineMetadata(metaKey, metadata, to, propertyKey);
	    } else {
	      Reflect.defineMetadata(metaKey, metadata, to);
	    }
	  });
	}

	var fakeArray = {
	  __proto__: []
	};
	var hasProto = fakeArray instanceof Array;
	function createDecorator(factory) {
	  return function (target, key, index) {
	    var Ctor = typeof target === 'function' ? target : target.constructor;

	    if (!Ctor.__decorators__) {
	      Ctor.__decorators__ = [];
	    }

	    if (typeof index !== 'number') {
	      index = undefined;
	    }

	    Ctor.__decorators__.push(function (options) {
	      return factory(options, key, index);
	    });
	  };
	}
	function isPrimitive(value) {
	  var type = _typeof(value);

	  return value == null || type !== 'object' && type !== 'function';
	}

	function collectDataFromConstructor(vm, Component) {
	  // override _init to prevent to init as Vue instance
	  var originalInit = Component.prototype._init;

	  Component.prototype._init = function () {
	    var _this = this;

	    // proxy to actual vm
	    var keys = Object.getOwnPropertyNames(vm); // 2.2.0 compat (props are no longer exposed as self properties)

	    if (vm.$options.props) {
	      for (var key in vm.$options.props) {
	        if (!vm.hasOwnProperty(key)) {
	          keys.push(key);
	        }
	      }
	    }

	    keys.forEach(function (key) {
	      Object.defineProperty(_this, key, {
	        get: function get() {
	          return vm[key];
	        },
	        set: function set(value) {
	          vm[key] = value;
	        },
	        configurable: true
	      });
	    });
	  }; // should be acquired class property values


	  var data = new Component(); // restore original _init to avoid memory leak (#209)

	  Component.prototype._init = originalInit; // create plain data object

	  var plainData = {};
	  Object.keys(data).forEach(function (key) {
	    if (data[key] !== undefined) {
	      plainData[key] = data[key];
	    }
	  });

	  return plainData;
	}

	var $internalHooks = ['data', 'beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeDestroy', 'destroyed', 'beforeUpdate', 'updated', 'activated', 'deactivated', 'render', 'errorCaptured', 'serverPrefetch' // 2.6
	];
	function componentFactory(Component) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  options.name = options.name || Component._componentTag || Component.name; // prototype props.

	  var proto = Component.prototype;
	  Object.getOwnPropertyNames(proto).forEach(function (key) {
	    if (key === 'constructor') {
	      return;
	    } // hooks


	    if ($internalHooks.indexOf(key) > -1) {
	      options[key] = proto[key];
	      return;
	    }

	    var descriptor = Object.getOwnPropertyDescriptor(proto, key);

	    if (descriptor.value !== void 0) {
	      // methods
	      if (typeof descriptor.value === 'function') {
	        (options.methods || (options.methods = {}))[key] = descriptor.value;
	      } else {
	        // typescript decorated data
	        (options.mixins || (options.mixins = [])).push({
	          data: function data() {
	            return _defineProperty$1({}, key, descriptor.value);
	          }
	        });
	      }
	    } else if (descriptor.get || descriptor.set) {
	      // computed properties
	      (options.computed || (options.computed = {}))[key] = {
	        get: descriptor.get,
	        set: descriptor.set
	      };
	    }
	  });
	  (options.mixins || (options.mixins = [])).push({
	    data: function data() {
	      return collectDataFromConstructor(this, Component);
	    }
	  }); // decorate options

	  var decorators = Component.__decorators__;

	  if (decorators) {
	    decorators.forEach(function (fn) {
	      return fn(options);
	    });
	    delete Component.__decorators__;
	  } // find super


	  var superProto = Object.getPrototypeOf(Component.prototype);
	  var Super = superProto instanceof Vue__default['default'] ? superProto.constructor : Vue__default['default'];
	  var Extended = Super.extend(options);
	  forwardStaticMembers(Extended, Component, Super);

	  if (reflectionIsSupported()) {
	    copyReflectionMetadata(Extended, Component);
	  }

	  return Extended;
	}
	var shouldIgnore = {
	  prototype: true,
	  arguments: true,
	  callee: true,
	  caller: true
	};

	function forwardStaticMembers(Extended, Original, Super) {
	  // We have to use getOwnPropertyNames since Babel registers methods as non-enumerable
	  Object.getOwnPropertyNames(Original).forEach(function (key) {
	    // Skip the properties that should not be overwritten
	    if (shouldIgnore[key]) {
	      return;
	    } // Some browsers does not allow reconfigure built-in properties


	    var extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);

	    if (extendedDescriptor && !extendedDescriptor.configurable) {
	      return;
	    }

	    var descriptor = Object.getOwnPropertyDescriptor(Original, key); // If the user agent does not support `__proto__` or its family (IE <= 10),
	    // the sub class properties may be inherited properties from the super class in TypeScript.
	    // We need to exclude such properties to prevent to overwrite
	    // the component options object which stored on the extended constructor (See #192).
	    // If the value is a referenced value (object or function),
	    // we can check equality of them and exclude it if they have the same reference.
	    // If it is a primitive value, it will be forwarded for safety.

	    if (!hasProto) {
	      // Only `cid` is explicitly exluded from property forwarding
	      // because we cannot detect whether it is a inherited property or not
	      // on the no `__proto__` environment even though the property is reserved.
	      if (key === 'cid') {
	        return;
	      }

	      var superDescriptor = Object.getOwnPropertyDescriptor(Super, key);

	      if (!isPrimitive(descriptor.value) && superDescriptor && superDescriptor.value === descriptor.value) {
	        return;
	      }
	    } // Warn if the users manually declare reserved properties

	    Object.defineProperty(Extended, key, descriptor);
	  });
	}

	function Component(options) {
	  if (typeof options === 'function') {
	    return componentFactory(options);
	  }

	  return function (Component) {
	    return componentFactory(Component, options);
	  };
	}

	Component.registerHooks = function registerHooks(keys) {
	  $internalHooks.push.apply($internalHooks, _toConsumableArray$1(keys));
	};

	(undefined && undefined.__spreadArrays) || function () {
	    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
	    for (var r = Array(s), k = 0, i = 0; i < il; i++)
	        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
	            r[k] = a[j];
	    return r;
	};

	/** @see {@link https://github.com/vuejs/vue-class-component/blob/master/src/reflect.ts} */
	var reflectMetadataIsSupported = typeof Reflect !== 'undefined' && typeof Reflect.getMetadata !== 'undefined';
	function applyMetadata(options, target, key) {
	    if (reflectMetadataIsSupported) {
	        if (!Array.isArray(options) &&
	            typeof options !== 'function' &&
	            !options.hasOwnProperty('type') &&
	            typeof options.type === 'undefined') {
	            var type = Reflect.getMetadata('design:type', target, key);
	            if (type !== Object) {
	                options.type = type;
	            }
	        }
	    }
	}

	/**
	 * decorator of a prop
	 * @param  options the options for the prop
	 * @return PropertyDecorator | void
	 */
	function Prop(options) {
	    if (options === void 0) { options = {}; }
	    return function (target, key) {
	        applyMetadata(options, target, key);
	        createDecorator(function (componentOptions, k) {
	            (componentOptions.props || (componentOptions.props = {}))[k] = options;
	        })(target, key);
	    };
	}

	/**
	 * decorator of a watch function
	 * @param  path the path or the expression to observe
	 * @param  WatchOption
	 * @return MethodDecorator
	 */
	function Watch(path, options) {
	    if (options === void 0) { options = {}; }
	    var _a = options.deep, deep = _a === void 0 ? false : _a, _b = options.immediate, immediate = _b === void 0 ? false : _b;
	    return createDecorator(function (componentOptions, handler) {
	        if (typeof componentOptions.watch !== 'object') {
	            componentOptions.watch = Object.create(null);
	        }
	        var watch = componentOptions.watch;
	        if (typeof watch[path] === 'object' && !Array.isArray(watch[path])) {
	            watch[path] = [watch[path]];
	        }
	        else if (typeof watch[path] === 'undefined') {
	            watch[path] = [];
	        }
	        watch[path].push({ handler: handler, deep: deep, immediate: immediate });
	    });
	}

	function _createSuper$a(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$a(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$a() { if (typeof Reflect === "undefined" || !construct) return false; if (construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var VComponent$a = /*#__PURE__*/function (_Vue) {
	  _inherits(VComponent, _Vue);

	  var _super = _createSuper$a(VComponent);

	  function VComponent() {
	    _classCallCheck(this, VComponent);

	    return _super.apply(this, arguments);
	  }

	  return VComponent;
	}(Vue__default['default']);

	__decorate([Prop({
	  type: String,
	  default: 'square'
	})], VComponent$a.prototype, "type", void 0);

	__decorate([Prop({
	  type: String,
	  default: 'regular'
	})], VComponent$a.prototype, "size", void 0);

	__decorate([Prop({
	  type: String,
	  default: ''
	})], VComponent$a.prototype, "src", void 0);

	__decorate([Prop({
	  type: String,
	  default: 'cover'
	})], VComponent$a.prototype, "fit", void 0);

	VComponent$a = __decorate([Component({
	  name: 'VuiAvatar'
	})], VComponent$a);
	var script$a = VComponent$a;

	function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
	/* server only */
	, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
	  if (typeof shadowMode !== 'boolean') {
	    createInjectorSSR = createInjector;
	    createInjector = shadowMode;
	    shadowMode = false;
	  } // Vue.extend constructor export interop.


	  var options = typeof script === 'function' ? script.options : script; // render functions

	  if (template && template.render) {
	    options.render = template.render;
	    options.staticRenderFns = template.staticRenderFns;
	    options._compiled = true; // functional template

	    if (isFunctionalTemplate) {
	      options.functional = true;
	    }
	  } // scopedId


	  if (scopeId) {
	    options._scopeId = scopeId;
	  }

	  var hook;

	  if (moduleIdentifier) {
	    // server build
	    hook = function hook(context) {
	      // 2.3 injection
	      context = context || // cached call
	      this.$vnode && this.$vnode.ssrContext || // stateful
	      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
	      // 2.2 with runInNewContext: true

	      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
	        context = __VUE_SSR_CONTEXT__;
	      } // inject component styles


	      if (style) {
	        style.call(this, createInjectorSSR(context));
	      } // register component module identifier for async chunk inference


	      if (context && context._registeredComponents) {
	        context._registeredComponents.add(moduleIdentifier);
	      }
	    }; // used by ssr in case component is cached and beforeCreate
	    // never gets called


	    options._ssrRegister = hook;
	  } else if (style) {
	    hook = shadowMode ? function (context) {
	      style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
	    } : function (context) {
	      style.call(this, createInjector(context));
	    };
	  }

	  if (hook) {
	    if (options.functional) {
	      // register for functional component in vue file
	      var originalRender = options.render;

	      options.render = function renderWithStyleInjection(h, context) {
	        hook.call(context);
	        return originalRender(h, context);
	      };
	    } else {
	      // inject component registration as beforeCreate hook
	      var existing = options.beforeCreate;
	      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
	    }
	  }

	  return script;
	}

	var normalizeComponent_1 = normalizeComponent;

	var __vue_script__$a = script$a;
	/* template */

	var __vue_render__$a = function __vue_render__() {
	  var _context, _context2;

	  var _obj;

	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c("div", {
	    class: ["vui-avatar", (_obj = {}, _obj["vui-avatar--" + _vm.type] = includes(_context = ["circle"]).call(_context, _vm.type), _obj["vui-avatar--" + _vm.size] = includes(_context2 = ["big", "small", "mini"]).call(_context2, _vm.size), _obj["vui-avatar--text"] = !_vm.src, _obj)]
	  }, [_vm.src ? _c("img", {
	    staticClass: "vui-avatar__img",
	    style: {
	      "object-fit": _vm.fit
	    },
	    attrs: {
	      src: _vm.src
	    }
	  }) : _vm._t("default")], 2);
	};

	var __vue_staticRenderFns__$a = [];
	__vue_render__$a._withStripped = true;
	/* style */

	var __vue_inject_styles__$a = undefined;
	/* scoped */

	var __vue_scope_id__$a = undefined;
	/* module identifier */

	var __vue_module_identifier__$a = undefined;
	/* functional template */

	var __vue_is_functional_template__$a = false;
	/* style inject */

	/* style inject SSR */

	/* style inject shadow dom */

	var __vue_component__$a = /*#__PURE__*/normalizeComponent_1({
	  render: __vue_render__$a,
	  staticRenderFns: __vue_staticRenderFns__$a
	}, __vue_inject_styles__$a, __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, false, undefined, undefined, undefined);

	var Avatar = __vue_component__$a;

	Avatar.install = function (vue) {
	  vue.component('VuiAvatar', __vue_component__$a);
	};

	var namespace = 'vui';
	var size = 'regular';
	var zIndex = 999;
	function update(config) {
	  var _config$size, _config$zIndex;

	  size = (_config$size = config.size) !== null && _config$size !== void 0 ? _config$size : size;
	  zIndex = (_config$zIndex = config.zIndex) !== null && _config$zIndex !== void 0 ? _config$zIndex : zIndex;
	}

	function _createSuper$9(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$9(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$9() { if (typeof Reflect === "undefined" || !construct) return false; if (construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var VComponent$9 = /*#__PURE__*/function (_Vue) {
	  _inherits(VComponent, _Vue);

	  var _super = _createSuper$9(VComponent);

	  function VComponent() {
	    _classCallCheck(this, VComponent);

	    return _super.apply(this, arguments);
	  }

	  return VComponent;
	}(Vue__default['default']);

	__decorate([Prop({
	  type: String,
	  default: 'regular'
	})], VComponent$9.prototype, "type", void 0);

	__decorate([Prop({
	  type: String,
	  default: 'regular'
	})], VComponent$9.prototype, "hue", void 0);

	__decorate([Prop({
	  type: String,
	  default: function _default() {
	    return size;
	  }
	})], VComponent$9.prototype, "size", void 0);

	__decorate([Prop({
	  type: String,
	  default: 'regular'
	})], VComponent$9.prototype, "corner", void 0);

	__decorate([Prop({
	  type: Boolean,
	  default: false
	})], VComponent$9.prototype, "block", void 0);

	__decorate([Prop({
	  type: Boolean,
	  default: false
	})], VComponent$9.prototype, "disabled", void 0);

	__decorate([Prop({
	  type: String,
	  default: ''
	})], VComponent$9.prototype, "icon", void 0);

	__decorate([Prop({
	  type: String,
	  default: 'before'
	})], VComponent$9.prototype, "iconPosition", void 0);

	VComponent$9 = __decorate([Component({
	  name: 'VuiButton'
	})], VComponent$9);
	var script$9 = VComponent$9;

	var __vue_script__$9 = script$9;
	/* template */

	var __vue_render__$9 = function __vue_render__() {
	  var _context, _context2, _context3, _context4;

	  var _obj;

	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c("button", {
	    class: ["vui-button", (_obj = {}, _obj["vui-button--" + _vm.type] = includes(_context = ["gorgeous", "plain", "gradient", "text"]).call(_context, _vm.type), _obj["vui-button--" + _vm.hue] = includes(_context2 = ["primary", "success", "fail"]).call(_context2, _vm.hue), _obj["vui-button--" + _vm.size] = includes(_context3 = ["big", "small", "mini"]).call(_context3, _vm.size), _obj["vui-button--" + _vm.corner] = includes(_context4 = ["round", "circle"]).call(_context4, _vm.corner), _obj["vui-button--block"] = _vm.block, _obj)],
	    attrs: {
	      disabled: _vm.disabled
	    },
	    on: {
	      click: function click($event) {
	        !_vm.disabled && _vm.$emit("click");
	      }
	    }
	  }, [_vm.icon && _vm.iconPosition === "before" ? _c("div", [_vm._v("icon")]) : _vm._e(), _vm._v(" "), _vm._t("default"), _vm._v(" "), _vm.icon && _vm.iconPosition === "after" ? _c("div", [_vm._v("icon")]) : _vm._e()], 2);
	};

	var __vue_staticRenderFns__$9 = [];
	__vue_render__$9._withStripped = true;
	/* style */

	var __vue_inject_styles__$9 = undefined;
	/* scoped */

	var __vue_scope_id__$9 = undefined;
	/* module identifier */

	var __vue_module_identifier__$9 = undefined;
	/* functional template */

	var __vue_is_functional_template__$9 = false;
	/* style inject */

	/* style inject SSR */

	/* style inject shadow dom */

	var __vue_component__$9 = /*#__PURE__*/normalizeComponent_1({
	  render: __vue_render__$9,
	  staticRenderFns: __vue_staticRenderFns__$9
	}, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, false, undefined, undefined, undefined);

	var Button = __vue_component__$9;

	Button.install = function (Vue) {
	  Vue.component('VuiButton', __vue_component__$9);
	};

	function Config (options) {
	  update(options);

	  if (options.type === 'pc') {
	    document.documentElement.classList.add('vuipc');
	  } else {
	    document.documentElement.classList.remove('vuipc');
	  }
	}

	var FAILS_ON_PRIMITIVES$1 = fails(function () { objectKeys(1); });

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1 }, {
	  keys: function keys(it) {
	    return objectKeys(toObject(it));
	  }
	});

	var keys$2 = path.Object.keys;

	var keys$1 = keys$2;

	var keys = keys$1;

	var getOwnPropertySymbols$2 = path.Object.getOwnPropertySymbols;

	var getOwnPropertySymbols$1 = getOwnPropertySymbols$2;

	var getOwnPropertySymbols = getOwnPropertySymbols$1;

	var $filter = arrayIteration.filter;


	var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('filter');

	// `Array.prototype.filter` method
	// https://tc39.es/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var filter$2 = entryVirtual('Array').filter;

	var ArrayPrototype$5 = Array.prototype;

	var filter_1 = function (it) {
	  var own = it.filter;
	  return it === ArrayPrototype$5 || (it instanceof Array && own === ArrayPrototype$5.filter) ? filter$2 : own;
	};

	var filter$1 = filter_1;

	var filter = filter$1;

	var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;


	var FAILS_ON_PRIMITIVES = fails(function () { nativeGetOwnPropertyDescriptor(1); });
	var FORCED$2 = !descriptors || FAILS_ON_PRIMITIVES;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	_export({ target: 'Object', stat: true, forced: FORCED$2, sham: !descriptors }, {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
	    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
	  }
	});

	var getOwnPropertyDescriptor_1 = createCommonjsModule(function (module) {
	var Object = path.Object;

	var getOwnPropertyDescriptor = module.exports = function getOwnPropertyDescriptor(it, key) {
	  return Object.getOwnPropertyDescriptor(it, key);
	};

	if (Object.getOwnPropertyDescriptor.sham) getOwnPropertyDescriptor.sham = true;
	});

	var getOwnPropertyDescriptor$2 = getOwnPropertyDescriptor_1;

	var getOwnPropertyDescriptor$1 = getOwnPropertyDescriptor$2;

	// all object keys, includes non-enumerable and symbols
	var ownKeys$3 = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	// `Object.getOwnPropertyDescriptors` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
	_export({ target: 'Object', stat: true, sham: !descriptors }, {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = toIndexedObject(object);
	    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	    var keys = ownKeys$3(O);
	    var result = {};
	    var index = 0;
	    var key, descriptor;
	    while (keys.length > index) {
	      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
	      if (descriptor !== undefined) createProperty(result, key, descriptor);
	    }
	    return result;
	  }
	});

	var getOwnPropertyDescriptors$2 = path.Object.getOwnPropertyDescriptors;

	var getOwnPropertyDescriptors$1 = getOwnPropertyDescriptors$2;

	var getOwnPropertyDescriptors = getOwnPropertyDescriptors$1;

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	_export({ target: 'Object', stat: true, forced: !descriptors, sham: !descriptors }, {
	  defineProperty: objectDefineProperty.f
	});

	var defineProperty_1 = createCommonjsModule(function (module) {
	var Object = path.Object;

	var defineProperty = module.exports = function defineProperty(it, key, desc) {
	  return Object.defineProperty(it, key, desc);
	};

	if (Object.defineProperty.sham) defineProperty.sham = true;
	});

	var defineProperty$2 = defineProperty_1;

	var defineProperty$1 = defineProperty$2;

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    defineProperty$1(obj, key, {
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

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;

	    defineProperty$1(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	function ownKeys$2(object, enumerableOnly) { var keys$1 = keys(object); if (getOwnPropertySymbols) { var symbols = getOwnPropertySymbols(object); if (enumerableOnly) symbols = filter(symbols).call(symbols, function (sym) { return getOwnPropertyDescriptor$1(object, sym).enumerable; }); keys$1.push.apply(keys$1, symbols); } return keys$1; }

	function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (getOwnPropertyDescriptors) { Object.defineProperties(target, getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, getOwnPropertyDescriptor$1(source, key)); }); } } return target; }

	function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !construct) return false; if (construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var VComponent$8 = /*#__PURE__*/function (_Vue) {
	  _inherits(VComponent, _Vue);

	  var _super = _createSuper$8(VComponent);

	  function VComponent() {
	    _classCallCheck(this, VComponent);

	    return _super.apply(this, arguments);
	  }

	  _createClass(VComponent, [{
	    key: "sizeProp",
	    get: function get() {
	      return this.type === 'slide-hz' ? 'width' : 'height';
	    }
	  }, {
	    key: "listeners",
	    get: function get() {
	      var _this = this;

	      return _objectSpread$2(_objectSpread$2(_objectSpread$2(_objectSpread$2({}, this.$listeners), this.$listeners.appear && {
	        appear: function appear() {
	          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	          }

	          if (_this.$listeners.appear instanceof Array) {
	            _this.$listeners.appear.forEach(function (fn) {
	              return fn.apply(void 0, args);
	            });
	          } else {
	            var _this$$listeners;

	            (_this$$listeners = _this.$listeners).appear.apply(_this$$listeners, args);
	          }

	          _this.onEnter(args[0]);
	        }
	      }), this.$listeners['after-appear'] && {
	        'after-appear': function afterAppear() {
	          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	            args[_key2] = arguments[_key2];
	          }

	          if (_this.$listeners['after-appear'] instanceof Array) {
	            _this.$listeners['after-appear'].forEach(function (fn) {
	              return fn.apply(void 0, args);
	            });
	          } else {
	            var _this$$listeners2;

	            (_this$$listeners2 = _this.$listeners)['after-appear'].apply(_this$$listeners2, args);
	          }

	          _this.onAfterEnter(args[0]);
	        }
	      }), {
	        enter: function enter() {
	          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	            args[_key3] = arguments[_key3];
	          }

	          if (_this.$listeners.enter instanceof Array) {
	            _this.$listeners.enter.forEach(function (fn) {
	              return fn.apply(void 0, args);
	            });
	          } else if (_this.$listeners.enter) {
	            var _this$$listeners3;

	            (_this$$listeners3 = _this.$listeners).enter.apply(_this$$listeners3, args);
	          }

	          _this.onEnter(args[0]);
	        },
	        'after-enter': function afterEnter() {
	          for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	            args[_key4] = arguments[_key4];
	          }

	          if (_this.$listeners['after-enter'] instanceof Array) {
	            _this.$listeners['after-enter'].forEach(function (fn) {
	              return fn.apply(void 0, args);
	            });
	          } else if (_this.$listeners['after-enter']) {
	            var _this$$listeners4;

	            (_this$$listeners4 = _this.$listeners)['after-enter'].apply(_this$$listeners4, args);
	          }

	          _this.onAfterEnter(args[0]);
	        },
	        leave: function leave() {
	          for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	            args[_key5] = arguments[_key5];
	          }

	          if (_this.$listeners.leave instanceof Array) {
	            _this.$listeners.leave.forEach(function (fn) {
	              return fn.apply(void 0, args);
	            });
	          } else if (_this.$listeners.leave) {
	            var _this$$listeners5;

	            (_this$$listeners5 = _this.$listeners).leave.apply(_this$$listeners5, args);
	          }

	          _this.onLeave(args[0]);
	        },
	        'after-leave': function afterLeave() {
	          for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	            args[_key6] = arguments[_key6];
	          }

	          if (_this.$listeners['after-leave'] instanceof Array) {
	            _this.$listeners['after-leave'].forEach(function (fn) {
	              return fn.apply(void 0, args);
	            });
	          } else if (_this.$listeners['after-leave']) {
	            var _this$$listeners6;

	            (_this$$listeners6 = _this.$listeners)['after-leave'].apply(_this$$listeners6, args);
	          }

	          _this.onAfterLeave(args[0]);
	        }
	      });
	    }
	    /**
	     * vue过渡enter顺序
	     * 执行beforeEnter钩子->添加enter,enter-active类并插入元素到dom树->执行enter钩子->下一帧去掉enter类并添加enter-to类
	     * 执行beforeEnter钩子->添加enter,enter-active类并插入元素到dom树->执行enter钩子  是在同一个事件循环中同步执行的
	     *
	     * vue过渡leave顺序
	     * 执行beforeLeave钩子->添加leave,leave-active类->执行leave钩子->下一帧去掉leave类并添加leave-to类
	     */

	  }, {
	    key: "onEnter",
	    value: function onEnter(el) {
	      var _context;

	      // 非slide过渡或者正在过渡
	      if (this.disabled || !includes(_context = ['slide-hz', 'slide-vt']).call(_context, this.type) || this.originalStyle) {
	        return;
	      } // 获取初始style中的尺寸


	      this.originalStyle = {
	        priority: el.style.getPropertyPriority(this.sizeProp),
	        value: el.style.getPropertyValue(this.sizeProp)
	      }; // 禁止过渡

	      el.classList.add("vui-transition__disabled");
	      el.classList.remove("vui-transition-".concat(this.type, "-enter")); // 设置尺寸为明确的数字，以便后续过渡

	      el.style.setProperty(this.sizeProp, "".concat(el.getBoundingClientRect()[this.sizeProp], "px"));
	      el.classList.add("vui-transition-".concat(this.type, "-enter")); // 确保重新渲染

	      el.getBoundingClientRect(); // 恢复过渡

	      el.classList.remove("vui-transition__disabled");
	    }
	  }, {
	    key: "onAfterEnter",
	    value: function onAfterEnter(el) {
	      var _context2;

	      if (this.disabled || !includes(_context2 = ['slide-hz', 'slide-vt']).call(_context2, this.type)) {
	        return;
	      } // 恢复初始style尺寸


	      el.style.setProperty(this.sizeProp, this.originalStyle.value, this.originalStyle.priority);
	      this.originalStyle = undefined;
	    }
	  }, {
	    key: "onLeave",
	    value: function onLeave(el) {
	      var _context3;

	      if (this.disabled || !includes(_context3 = ['slide-hz', 'slide-vt']).call(_context3, this.type) || this.originalStyle) {
	        return;
	      }

	      this.originalStyle = {
	        priority: el.style.getPropertyPriority(this.sizeProp),
	        value: el.style.getPropertyValue(this.sizeProp)
	      };
	      el.style.setProperty(this.sizeProp, "".concat(el.getBoundingClientRect()[this.sizeProp], "px"));
	    }
	  }, {
	    key: "onAfterLeave",
	    value: function onAfterLeave(el) {
	      var _context4;

	      if (this.disabled || !includes(_context4 = ['slide-hz', 'slide-vt']).call(_context4, this.type)) {
	        return;
	      }

	      el.style.setProperty(this.sizeProp, this.originalStyle.value, this.originalStyle.priority);
	      this.originalStyle = undefined;
	    }
	  }]);

	  return VComponent;
	}(Vue__default['default']);

	__decorate([Prop({
	  type: String,
	  default: 'fade'
	})], VComponent$8.prototype, "type", void 0);

	__decorate([Prop({
	  type: Boolean,
	  default: false
	})], VComponent$8.prototype, "disabled", void 0);

	__decorate([Prop({
	  type: Boolean,
	  default: false
	})], VComponent$8.prototype, "multiple", void 0);

	VComponent$8 = __decorate([Component({
	  name: 'VuiTransition',
	  inheritAttrs: false
	})], VComponent$8);
	var script$8 = VComponent$8;

	var __vue_script__$8 = script$8;
	/* template */

	var __vue_render__$8 = function __vue_render__() {
	  var _context;

	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return !_vm.multiple ? _c("div", {
	    staticClass: "vui-transition"
	  }, [_c("transition", _vm._g(_vm._b({
	    attrs: {
	      name: _vm.disabled ? "vui_notransition" : includes(_context = ["fade", "zoom", "popup-left", "popup-right", "popup-top", "popup-bottom", "slide-vt", "slide-hz"]).call(_context, _vm.type) ? "vui-transition-" + _vm.type : _vm.type
	    }
	  }, "transition", _vm.$attrs, false), _vm.listeners), [_vm._t("default")], 2)], 1) : _c("transition-group", _vm._g(_vm._b({
	    staticClass: "vui-transition",
	    attrs: {
	      name: _vm.disabled ? "vui_notransition" : "vui-transition-" + _vm.type,
	      tag: "div"
	    }
	  }, "transition-group", _vm.$attrs, false), _vm.listeners), [_vm._t("default")], 2);
	};

	var __vue_staticRenderFns__$8 = [];
	__vue_render__$8._withStripped = true;
	/* style */

	var __vue_inject_styles__$8 = undefined;
	/* scoped */

	var __vue_scope_id__$8 = undefined;
	/* module identifier */

	var __vue_module_identifier__$8 = undefined;
	/* functional template */

	var __vue_is_functional_template__$8 = false;
	/* style inject */

	/* style inject SSR */

	/* style inject shadow dom */

	var __vue_component__$8 = /*#__PURE__*/normalizeComponent_1({
	  render: __vue_render__$8,
	  staticRenderFns: __vue_staticRenderFns__$8
	}, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, false, undefined, undefined, undefined);

	var Transition = __vue_component__$8;

	Transition.install = function (Vue) {
	  Vue.component('VuiTransition', __vue_component__$8);
	};

	var ITERATOR$3 = wellKnownSymbol('iterator');
	var ArrayPrototype$4 = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod = function (it) {
	  return it !== undefined && (iterators.Array === it || ArrayPrototype$4[ITERATOR$3] === it);
	};

	var ITERATOR$2 = wellKnownSymbol('iterator');

	var getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$2]
	    || it['@@iterator']
	    || iterators[classof(it)];
	};

	var iteratorClose = function (iterator) {
	  var returnMethod = iterator['return'];
	  if (returnMethod !== undefined) {
	    return anObject(returnMethod.call(iterator)).value;
	  }
	};

	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var iterate = function (iterable, unboundFunction, options) {
	  var that = options && options.that;
	  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
	  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
	  var INTERRUPTED = !!(options && options.INTERRUPTED);
	  var fn = functionBindContext(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
	  var iterator, iterFn, index, length, result, next, step;

	  var stop = function (condition) {
	    if (iterator) iteratorClose(iterator);
	    return new Result(true, condition);
	  };

	  var callFn = function (value) {
	    if (AS_ENTRIES) {
	      anObject(value);
	      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
	    } return INTERRUPTED ? fn(value, stop) : fn(value);
	  };

	  if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod(iterable);
	    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod(iterFn)) {
	      for (index = 0, length = toLength(iterable.length); length > index; index++) {
	        result = callFn(iterable[index]);
	        if (result && result instanceof Result) return result;
	      } return new Result(false);
	    }
	    iterator = iterFn.call(iterable);
	  }

	  next = iterator.next;
	  while (!(step = next.call(iterator)).done) {
	    try {
	      result = callFn(step.value);
	    } catch (error) {
	      iteratorClose(iterator);
	      throw error;
	    }
	    if (typeof result == 'object' && result && result instanceof Result) return result;
	  } return new Result(false);
	};

	var $AggregateError = function AggregateError(errors, message) {
	  var that = this;
	  if (!(that instanceof $AggregateError)) return new $AggregateError(errors, message);
	  if (objectSetPrototypeOf) {
	    // eslint-disable-next-line unicorn/error-message -- expected
	    that = objectSetPrototypeOf(new Error(undefined), objectGetPrototypeOf(that));
	  }
	  if (message !== undefined) createNonEnumerableProperty(that, 'message', String(message));
	  var errorsArray = [];
	  iterate(errors, errorsArray.push, { that: errorsArray });
	  createNonEnumerableProperty(that, 'errors', errorsArray);
	  return that;
	};

	$AggregateError.prototype = objectCreate(Error.prototype, {
	  constructor: createPropertyDescriptor(5, $AggregateError),
	  message: createPropertyDescriptor(5, ''),
	  name: createPropertyDescriptor(5, 'AggregateError')
	});

	// `AggregateError` constructor
	// https://tc39.es/ecma262/#sec-aggregate-error-constructor
	_export({ global: true }, {
	  AggregateError: $AggregateError
	});

	var nativePromiseConstructor = global_1.Promise;

	var redefineAll = function (target, src, options) {
	  for (var key in src) {
	    if (options && options.unsafe && target[key]) target[key] = src[key];
	    else redefine(target, key, src[key], options);
	  } return target;
	};

	var SPECIES$3 = wellKnownSymbol('species');

	var setSpecies = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty.f;

	  if (descriptors && Constructor && !Constructor[SPECIES$3]) {
	    defineProperty(Constructor, SPECIES$3, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var anInstance = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) {
	    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
	  } return it;
	};

	var ITERATOR$1 = wellKnownSymbol('iterator');
	var SAFE_CLOSING = false;

	try {
	  var called = 0;
	  var iteratorWithReturn = {
	    next: function () {
	      return { done: !!called++ };
	    },
	    'return': function () {
	      SAFE_CLOSING = true;
	    }
	  };
	  iteratorWithReturn[ITERATOR$1] = function () {
	    return this;
	  };
	  // eslint-disable-next-line no-throw-literal -- required for testing
	  Array.from(iteratorWithReturn, function () { throw 2; });
	} catch (error) { /* empty */ }

	var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    object[ITERATOR$1] = function () {
	      return {
	        next: function () {
	          return { done: ITERATION_SUPPORT = true };
	        }
	      };
	    };
	    exec(object);
	  } catch (error) { /* empty */ }
	  return ITERATION_SUPPORT;
	};

	var SPECIES$2 = wellKnownSymbol('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-speciesconstructor
	var speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES$2]) == undefined ? defaultConstructor : aFunction$1(S);
	};

	var engineIsIos = /(iphone|ipod|ipad).*applewebkit/i.test(engineUserAgent);

	var location = global_1.location;
	var set = global_1.setImmediate;
	var clear = global_1.clearImmediate;
	var process$2 = global_1.process;
	var MessageChannel = global_1.MessageChannel;
	var Dispatch = global_1.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;

	var run = function (id) {
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};

	var runner = function (id) {
	  return function () {
	    run(id);
	  };
	};

	var listener = function (event) {
	  run(event.data);
	};

	var post = function (id) {
	  // old engines have not location.origin
	  global_1.postMessage(id + '', location.protocol + '//' + location.host);
	};

	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!set || !clear) {
	  set = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func -- spec requirement
	      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clear = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (engineIsNode) {
	    defer = function (id) {
	      process$2.nextTick(runner(id));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(runner(id));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  // except iOS - https://github.com/zloirock/core-js/issues/624
	  } else if (MessageChannel && !engineIsIos) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = functionBindContext(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (
	    global_1.addEventListener &&
	    typeof postMessage == 'function' &&
	    !global_1.importScripts &&
	    location && location.protocol !== 'file:' &&
	    !fails(post)
	  ) {
	    defer = post;
	    global_1.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
	    defer = function (id) {
	      html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(runner(id), 0);
	    };
	  }
	}

	var task$1 = {
	  set: set,
	  clear: clear
	};

	var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(engineUserAgent);

	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var macrotask = task$1.set;




	var MutationObserver = global_1.MutationObserver || global_1.WebKitMutationObserver;
	var document$2 = global_1.document;
	var process$1 = global_1.process;
	var Promise$1 = global_1.Promise;
	// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
	var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global_1, 'queueMicrotask');
	var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

	var flush, head, last, notify$1, toggle, node, promise$5, then;

	// modern engines have queueMicrotask method
	if (!queueMicrotask) {
	  flush = function () {
	    var parent, fn;
	    if (engineIsNode && (parent = process$1.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (error) {
	        if (head) notify$1();
	        else last = undefined;
	        throw error;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
	  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
	  if (!engineIsIos && !engineIsNode && !engineIsWebosWebkit && MutationObserver && document$2) {
	    toggle = true;
	    node = document$2.createTextNode('');
	    new MutationObserver(flush).observe(node, { characterData: true });
	    notify$1 = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    promise$5 = Promise$1.resolve(undefined);
	    then = promise$5.then;
	    notify$1 = function () {
	      then.call(promise$5, flush);
	    };
	  // Node.js without promises
	  } else if (engineIsNode) {
	    notify$1 = function () {
	      process$1.nextTick(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify$1 = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global_1, flush);
	    };
	  }
	}

	var microtask = queueMicrotask || function (fn) {
	  var task = { fn: fn, next: undefined };
	  if (last) last.next = task;
	  if (!head) {
	    head = task;
	    notify$1();
	  } last = task;
	};

	var PromiseCapability = function (C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction$1(resolve);
	  this.reject = aFunction$1(reject);
	};

	// 25.4.1.5 NewPromiseCapability(C)
	var f = function (C) {
	  return new PromiseCapability(C);
	};

	var newPromiseCapability$1 = {
		f: f
	};

	var promiseResolve = function (C, x) {
	  anObject(C);
	  if (isObject(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability$1.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var hostReportErrors = function (a, b) {
	  var console = global_1.console;
	  if (console && console.error) {
	    arguments.length === 1 ? console.error(a) : console.error(a, b);
	  }
	};

	var perform = function (exec) {
	  try {
	    return { error: false, value: exec() };
	  } catch (error) {
	    return { error: true, value: error };
	  }
	};

	var task = task$1.set;











	var SPECIES$1 = wellKnownSymbol('species');
	var PROMISE = 'Promise';
	var getInternalState = internalState.get;
	var setInternalState = internalState.set;
	var getInternalPromiseState = internalState.getterFor(PROMISE);
	var PromiseConstructor = nativePromiseConstructor;
	var TypeError$1 = global_1.TypeError;
	var document$1 = global_1.document;
	var process = global_1.process;
	getBuiltIn('fetch');
	var newPromiseCapability = newPromiseCapability$1.f;
	var newGenericPromiseCapability = newPromiseCapability;
	var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global_1.dispatchEvent);
	var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
	var UNHANDLED_REJECTION = 'unhandledrejection';
	var REJECTION_HANDLED = 'rejectionhandled';
	var PENDING = 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	var HANDLED = 1;
	var UNHANDLED = 2;
	var Internal, OwnPromiseCapability, PromiseWrapper;

	var FORCED$1 = isForced_1(PROMISE, function () {
	  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
	  if (!GLOBAL_CORE_JS_PROMISE) {
	    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	    // We can't detect it synchronously, so just check versions
	    if (engineV8Version === 66) return true;
	    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    if (!engineIsNode && !NATIVE_REJECTION_EVENT) return true;
	  }
	  // We need Promise#finally in the pure version for preventing prototype pollution
	  if (!PromiseConstructor.prototype['finally']) return true;
	  // We can't use @@species feature detection in V8 since it causes
	  // deoptimization and performance degradation
	  // https://github.com/zloirock/core-js/issues/679
	  if (engineV8Version >= 51 && /native code/.test(PromiseConstructor)) return false;
	  // Detect correctness of subclassing with @@species support
	  var promise = PromiseConstructor.resolve(1);
	  var FakePromise = function (exec) {
	    exec(function () { /* empty */ }, function () { /* empty */ });
	  };
	  var constructor = promise.constructor = {};
	  constructor[SPECIES$1] = FakePromise;
	  return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
	});

	var INCORRECT_ITERATION$1 = FORCED$1 || !checkCorrectnessOfIteration(function (iterable) {
	  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
	});

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};

	var notify = function (state, isReject) {
	  if (state.notified) return;
	  state.notified = true;
	  var chain = state.reactions;
	  microtask(function () {
	    var value = state.value;
	    var ok = state.state == FULFILLED;
	    var index = 0;
	    // variable length - can't use forEach
	    while (chain.length > index) {
	      var reaction = chain[index++];
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (state.rejection === UNHANDLED) onHandleUnhandled(state);
	            state.rejection = HANDLED;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // can throw
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError$1('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (error) {
	        if (domain && !exited) domain.exit();
	        reject(error);
	      }
	    }
	    state.reactions = [];
	    state.notified = false;
	    if (isReject && !state.rejection) onUnhandled(state);
	  });
	};

	var dispatchEvent = function (name, promise, reason) {
	  var event, handler;
	  if (DISPATCH_EVENT) {
	    event = document$1.createEvent('Event');
	    event.promise = promise;
	    event.reason = reason;
	    event.initEvent(name, false, true);
	    global_1.dispatchEvent(event);
	  } else event = { promise: promise, reason: reason };
	  if (!NATIVE_REJECTION_EVENT && (handler = global_1['on' + name])) handler(event);
	  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
	};

	var onUnhandled = function (state) {
	  task.call(global_1, function () {
	    var promise = state.facade;
	    var value = state.value;
	    var IS_UNHANDLED = isUnhandled(state);
	    var result;
	    if (IS_UNHANDLED) {
	      result = perform(function () {
	        if (engineIsNode) {
	          process.emit('unhandledRejection', value, promise);
	        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      state.rejection = engineIsNode || isUnhandled(state) ? UNHANDLED : HANDLED;
	      if (result.error) throw result.value;
	    }
	  });
	};

	var isUnhandled = function (state) {
	  return state.rejection !== HANDLED && !state.parent;
	};

	var onHandleUnhandled = function (state) {
	  task.call(global_1, function () {
	    var promise = state.facade;
	    if (engineIsNode) {
	      process.emit('rejectionHandled', promise);
	    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
	  });
	};

	var bind = function (fn, state, unwrap) {
	  return function (value) {
	    fn(state, value, unwrap);
	  };
	};

	var internalReject = function (state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  state.value = value;
	  state.state = REJECTED;
	  notify(state, true);
	};

	var internalResolve = function (state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  try {
	    if (state.facade === value) throw TypeError$1("Promise can't be resolved itself");
	    var then = isThenable(value);
	    if (then) {
	      microtask(function () {
	        var wrapper = { done: false };
	        try {
	          then.call(value,
	            bind(internalResolve, wrapper, state),
	            bind(internalReject, wrapper, state)
	          );
	        } catch (error) {
	          internalReject(wrapper, error, state);
	        }
	      });
	    } else {
	      state.value = value;
	      state.state = FULFILLED;
	      notify(state, false);
	    }
	  } catch (error) {
	    internalReject({ done: false }, error, state);
	  }
	};

	// constructor polyfill
	if (FORCED$1) {
	  // 25.4.3.1 Promise(executor)
	  PromiseConstructor = function Promise(executor) {
	    anInstance(this, PromiseConstructor, PROMISE);
	    aFunction$1(executor);
	    Internal.call(this);
	    var state = getInternalState(this);
	    try {
	      executor(bind(internalResolve, state), bind(internalReject, state));
	    } catch (error) {
	      internalReject(state, error);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  Internal = function Promise(executor) {
	    setInternalState(this, {
	      type: PROMISE,
	      done: false,
	      notified: false,
	      parent: false,
	      reactions: [],
	      rejection: false,
	      state: PENDING,
	      value: undefined
	    });
	  };
	  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
	    // `Promise.prototype.then` method
	    // https://tc39.es/ecma262/#sec-promise.prototype.then
	    then: function then(onFulfilled, onRejected) {
	      var state = getInternalPromiseState(this);
	      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = engineIsNode ? process.domain : undefined;
	      state.parent = true;
	      state.reactions.push(reaction);
	      if (state.state != PENDING) notify(state, false);
	      return reaction.promise;
	    },
	    // `Promise.prototype.catch` method
	    // https://tc39.es/ecma262/#sec-promise.prototype.catch
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    var state = getInternalState(promise);
	    this.promise = promise;
	    this.resolve = bind(internalResolve, state);
	    this.reject = bind(internalReject, state);
	  };
	  newPromiseCapability$1.f = newPromiseCapability = function (C) {
	    return C === PromiseConstructor || C === PromiseWrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	}

	_export({ global: true, wrap: true, forced: FORCED$1 }, {
	  Promise: PromiseConstructor
	});

	setToStringTag(PromiseConstructor, PROMISE, false, true);
	setSpecies(PROMISE);

	PromiseWrapper = getBuiltIn(PROMISE);

	// statics
	_export({ target: PROMISE, stat: true, forced: FORCED$1 }, {
	  // `Promise.reject` method
	  // https://tc39.es/ecma262/#sec-promise.reject
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    capability.reject.call(undefined, r);
	    return capability.promise;
	  }
	});

	_export({ target: PROMISE, stat: true, forced: isPure  }, {
	  // `Promise.resolve` method
	  // https://tc39.es/ecma262/#sec-promise.resolve
	  resolve: function resolve(x) {
	    return promiseResolve(this === PromiseWrapper ? PromiseConstructor : this, x);
	  }
	});

	_export({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION$1 }, {
	  // `Promise.all` method
	  // https://tc39.es/ecma262/#sec-promise.all
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction$1(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        $promiseResolve.call(C, promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  },
	  // `Promise.race` method
	  // https://tc39.es/ecma262/#sec-promise.race
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction$1(C.resolve);
	      iterate(iterable, function (promise) {
	        $promiseResolve.call(C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	// `Promise.allSettled` method
	// https://tc39.es/ecma262/#sec-promise.allsettled
	_export({ target: 'Promise', stat: true }, {
	  allSettled: function allSettled(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1.f(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var promiseResolve = aFunction$1(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        promiseResolve.call(C, promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = { status: 'fulfilled', value: value };
	          --remaining || resolve(values);
	        }, function (error) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = { status: 'rejected', reason: error };
	          --remaining || resolve(values);
	        });
	      });
	      --remaining || resolve(values);
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	var PROMISE_ANY_ERROR = 'No one promise resolved';

	// `Promise.any` method
	// https://tc39.es/ecma262/#sec-promise.any
	_export({ target: 'Promise', stat: true }, {
	  any: function any(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1.f(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var promiseResolve = aFunction$1(C.resolve);
	      var errors = [];
	      var counter = 0;
	      var remaining = 1;
	      var alreadyResolved = false;
	      iterate(iterable, function (promise) {
	        var index = counter++;
	        var alreadyRejected = false;
	        errors.push(undefined);
	        remaining++;
	        promiseResolve.call(C, promise).then(function (value) {
	          if (alreadyRejected || alreadyResolved) return;
	          alreadyResolved = true;
	          resolve(value);
	        }, function (error) {
	          if (alreadyRejected || alreadyResolved) return;
	          alreadyRejected = true;
	          errors[index] = error;
	          --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
	        });
	      });
	      --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
	var NON_GENERIC = !!nativePromiseConstructor && fails(function () {
	  nativePromiseConstructor.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
	});

	// `Promise.prototype.finally` method
	// https://tc39.es/ecma262/#sec-promise.prototype.finally
	_export({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
	  'finally': function (onFinally) {
	    var C = speciesConstructor(this, getBuiltIn('Promise'));
	    var isFunction = typeof onFinally == 'function';
	    return this.then(
	      isFunction ? function (x) {
	        return promiseResolve(C, onFinally()).then(function () { return x; });
	      } : onFinally,
	      isFunction ? function (e) {
	        return promiseResolve(C, onFinally()).then(function () { throw e; });
	      } : onFinally
	    );
	  }
	});

	var promise$4 = path.Promise;

	// `Promise.try` method
	// https://github.com/tc39/proposal-promise-try
	_export({ target: 'Promise', stat: true }, {
	  'try': function (callbackfn) {
	    var promiseCapability = newPromiseCapability$1.f(this);
	    var result = perform(callbackfn);
	    (result.error ? promiseCapability.reject : promiseCapability.resolve)(result.value);
	    return promiseCapability.promise;
	  }
	});

	// TODO: Remove from `core-js@4`




	var promise$3 = promise$4;

	var promise$2 = promise$3;

	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	  try {
	    var info = gen[key](arg);
	    var value = info.value;
	  } catch (error) {
	    reject(error);
	    return;
	  }

	  if (info.done) {
	    resolve(value);
	  } else {
	    promise$2.resolve(value).then(_next, _throw);
	  }
	}

	function _asyncToGenerator(fn) {
	  return function () {
	    var self = this,
	        args = arguments;
	    return new promise$2(function (resolve, reject) {
	      var gen = fn.apply(self, args);

	      function _next(value) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
	      }

	      function _throw(err) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
	      }

	      _next(undefined);
	    });
	  };
	}

	var runtime_1 = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var runtime = (function (exports) {

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined$1; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  function define(obj, key, value) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	    return obj[key];
	  }
	  try {
	    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
	    define({}, "");
	  } catch (err) {
	    define = function(obj, key, value) {
	      return obj[key] = value;
	    };
	  }

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  exports.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunction.displayName = define(
	    GeneratorFunctionPrototype,
	    toStringTagSymbol,
	    "GeneratorFunction"
	  );

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      define(prototype, method, function(arg) {
	        return this._invoke(method, arg);
	      });
	    });
	  }

	  exports.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  exports.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      define(genFun, toStringTagSymbol, "GeneratorFunction");
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  exports.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator, PromiseImpl) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return PromiseImpl.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return PromiseImpl.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration.
	          result.value = unwrapped;
	          resolve(result);
	        }, function(error) {
	          // If a rejected Promise was yielded, throw the rejection back
	          // into the async generator function so it can be handled there.
	          return invoke("throw", error, resolve, reject);
	        });
	      }
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new PromiseImpl(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };
	  exports.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
	    if (PromiseImpl === void 0) PromiseImpl = Promise;

	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList),
	      PromiseImpl
	    );

	    return exports.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;

	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);

	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined$1) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        // Note: ["return"] must be used for ES3 parsing compatibility.
	        if (delegate.iterator["return"]) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined$1;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined$1;
	      }

	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  define(Gp, toStringTagSymbol, "Generator");

	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  exports.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined$1;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  exports.values = values;

	  function doneResult() {
	    return { value: undefined$1, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined$1;
	      this.done = false;
	      this.delegate = null;

	      this.method = "next";
	      this.arg = undefined$1;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined$1;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined$1;
	        }

	        return !! caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined$1;
	      }

	      return ContinueSentinel;
	    }
	  };

	  // Regardless of whether this script is executing as a CommonJS module
	  // or not, return the runtime object so that we can declare the variable
	  // regeneratorRuntime in the outer scope, which allows this module to be
	  // injected easily by `bin/regenerator --include-runtime script.js`.
	  return exports;

	}(
	  // If this script is executing as a CommonJS module, use module.exports
	  // as the regeneratorRuntime namespace. Otherwise create a new empty
	  // object. Either way, the resulting object will be used to initialize
	  // the regeneratorRuntime variable at the top of this file.
	  module.exports 
	));

	try {
	  regeneratorRuntime = runtime;
	} catch (accidentalStrictMode) {
	  // This module should not be running in strict mode, so the above
	  // assignment should always work unless something is misconfigured. Just
	  // in case runtime.js accidentally runs in strict mode, we can escape
	  // strict mode using a global Function call. This could conceivably fail
	  // if a Content Security Policy forbids using Function, but in that case
	  // the proper solution is to fix the accidental strict mode problem. If
	  // you've misconfigured your bundler to force strict mode and applied a
	  // CSP to forbid Function, and you're not willing to fix either of those
	  // problems, please detail your unique predicament in a GitHub issue.
	  Function("r", "regeneratorRuntime = r")(runtime);
	}
	});

	var regenerator = runtime_1;

	var promise$1 = promise$4;

	var promise = promise$1;

	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('slice');

	var SPECIES = wellKnownSymbol('species');
	var nativeSlice = [].slice;
	var max$1 = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.es/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject(this);
	    var length = toLength(O.length);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray$3(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
	      if (typeof Constructor == 'function' && (Constructor === Array || isArray$3(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject(Constructor)) {
	        Constructor = Constructor[SPECIES];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === Array || Constructor === undefined) {
	        return nativeSlice.call(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});

	var slice$4 = entryVirtual('Array').slice;

	var ArrayPrototype$3 = Array.prototype;

	var slice_1 = function (it) {
	  var own = it.slice;
	  return it === ArrayPrototype$3 || (it instanceof Array && own === ArrayPrototype$3.slice) ? slice$4 : own;
	};

	var slice$3 = slice_1;

	var slice$2 = slice$3;

	var arrayMethodIsStrict = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var $indexOf = arrayIncludes.indexOf;


	var nativeIndexOf = [].indexOf;

	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
	var STRICT_METHOD = arrayMethodIsStrict('indexOf');

	// `Array.prototype.indexOf` method
	// https://tc39.es/ecma262/#sec-array.prototype.indexof
	_export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD }, {
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? nativeIndexOf.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var indexOf$2 = entryVirtual('Array').indexOf;

	var ArrayPrototype$2 = Array.prototype;

	var indexOf_1 = function (it) {
	  var own = it.indexOf;
	  return it === ArrayPrototype$2 || (it instanceof Array && own === ArrayPrototype$2.indexOf) ? indexOf$2 : own;
	};

	var indexOf$1 = indexOf_1;

	var indexOf = indexOf$1;

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

	var max = Math.max;
	var min = Math.min;
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

	// `Array.prototype.splice` method
	// https://tc39.es/ecma262/#sec-array.prototype.splice
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
	  splice: function splice(start, deleteCount /* , ...items */) {
	    var O = toObject(this);
	    var len = toLength(O.length);
	    var actualStart = toAbsoluteIndex(start, len);
	    var argumentsLength = arguments.length;
	    var insertCount, actualDeleteCount, A, k, from, to;
	    if (argumentsLength === 0) {
	      insertCount = actualDeleteCount = 0;
	    } else if (argumentsLength === 1) {
	      insertCount = 0;
	      actualDeleteCount = len - actualStart;
	    } else {
	      insertCount = argumentsLength - 2;
	      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
	    }
	    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
	      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
	    }
	    A = arraySpeciesCreate(O, actualDeleteCount);
	    for (k = 0; k < actualDeleteCount; k++) {
	      from = actualStart + k;
	      if (from in O) createProperty(A, k, O[from]);
	    }
	    A.length = actualDeleteCount;
	    if (insertCount < actualDeleteCount) {
	      for (k = actualStart; k < len - actualDeleteCount; k++) {
	        from = k + actualDeleteCount;
	        to = k + insertCount;
	        if (from in O) O[to] = O[from];
	        else delete O[to];
	      }
	      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
	    } else if (insertCount > actualDeleteCount) {
	      for (k = len - actualDeleteCount; k > actualStart; k--) {
	        from = k + actualDeleteCount - 1;
	        to = k + insertCount - 1;
	        if (from in O) O[to] = O[from];
	        else delete O[to];
	      }
	    }
	    for (k = 0; k < insertCount; k++) {
	      O[k + actualStart] = arguments[k + 2];
	    }
	    O.length = len - actualDeleteCount + insertCount;
	    return A;
	  }
	});

	var splice$2 = entryVirtual('Array').splice;

	var ArrayPrototype$1 = Array.prototype;

	var splice_1 = function (it) {
	  var own = it.splice;
	  return it === ArrayPrototype$1 || (it instanceof Array && own === ArrayPrototype$1.splice) ? splice$2 : own;
	};

	var splice$1 = splice_1;

	var splice = splice$1;

	function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !construct) return false; if (construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var layers = [];

	var VComponent$7 = /*#__PURE__*/function (_Vue) {
	  _inherits(VComponent, _Vue);

	  var _super = _createSuper$7(VComponent);

	  function VComponent() {
	    var _this;

	    _classCallCheck(this, VComponent);

	    _this = _super.apply(this, arguments); // 遮罩层z-index

	    _this.layerZIndex = zIndex; // 内容层z-index

	    _this.contentZIndex = zIndex; // 隐藏遮罩层

	    _this.hideLayer = true; // 显示的时间

	    _this.showTime = Date.now(); // 是否按的back键

	    _this.back = false;
	    _this.show = _this.value;
	    return _this;
	  }

	  _createClass(VComponent, [{
	    key: "onValueChange",
	    value: function () {
	      var _onValueChange = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
	        var _this2 = this;

	        var close;
	        return regenerator.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                if (this.value) {
	                  _context.next = 7;
	                  break;
	                }

	                _context.next = 3;
	                return new promise(function (resolve) {
	                  _this2.beforeClose(function () {
	                    var close = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	                    resolve(close);
	                  });
	                });

	              case 3:
	                close = _context.sent;

	                if (close) {
	                  // 允许关闭
	                  this.show = false;
	                } else {
	                  // 如果是按的返回键
	                  this.back && history.forward();
	                  this.$emit('input', true);
	                }

	                _context.next = 8;
	                break;

	              case 7:
	                this.show = true;

	              case 8:
	              case "end":
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));

	      function onValueChange() {
	        return _onValueChange.apply(this, arguments);
	      }

	      return onValueChange;
	    }()
	  }, {
	    key: "onShowChange",
	    value: function () {
	      var _onShowChange = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(value) {
	        var preLayer, index, _preLayer, stateName, _history$state;

	        return regenerator.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                // 遮罩层的处理
	                if (value) {
	                  // 应用最新的zIndex
	                  this.layerZIndex = zIndex;
	                  this.contentZIndex = zIndex; // 如果下面有蒙层，则隐藏当前蒙层

	                  this.hideLayer = !!layers.length; // 增加全局zIndex，这里至少要加2，因为后续显示的蒙层dom可能在当前显示蒙层dom的前面

	                  update({
	                    zIndex: zIndex + 2
	                  });

	                  if (layers.length) {
	                    preLayer = layers[layers.length - 1]; // 将顶层蒙层下一层的zIndex加1以遮盖其内容

	                    preLayer.layerZIndex = preLayer.contentZIndex + 1;
	                    preLayer.hideLayer = false; // 重置下面的蒙层

	                    slice$2(layers).call(layers, 0, -1).forEach(function (layer) {
	                      layer.layerZIndex = layer.contentZIndex;
	                      layer.hideLayer = true;
	                    });
	                  }

	                  if (!includes(layers).call(layers, this)) {
	                    layers.push(this);
	                  }
	                } else {
	                  // 如果是顶层蒙层
	                  if (!this.hideLayer) {
	                    index = indexOf(layers).call(layers, this);

	                    if (index) {
	                      // 如果下面还有蒙层，则显示下一层蒙层
	                      _preLayer = layers[index - 1];
	                      this.hideLayer = true;
	                      _preLayer.hideLayer = false;
	                      _preLayer.layerZIndex = _preLayer.contentZIndex + 1;
	                    } else {
	                      // 恢复z-index
	                      this.layerZIndex = this.contentZIndex;
	                    }
	                  }
	                } // 历史记录的处理


	                if (this.pushState) {
	                  stateName = "".concat(this.$options.name, "-showTime");

	                  if (value) {
	                    // 记录组件显示的时间
	                    this.showTime = Date.now();
	                    history.pushState(_defineProperty({}, stateName, this.showTime), '');
	                    window.addEventListener('popstate', this.onPopState);
	                  } else {
	                    window.removeEventListener('popstate', this.onPopState);

	                    if (((_history$state = history.state) === null || _history$state === void 0 ? void 0 : _history$state[stateName]) === this.showTime) {
	                      // 当历史记录对应当前组件时才后退，防止影响其他蒙层或者页面历史记录
	                      history.back();
	                    }
	                  }
	                }

	              case 2:
	              case "end":
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this);
	      }));

	      function onShowChange(_x) {
	        return _onShowChange.apply(this, arguments);
	      }

	      return onShowChange;
	    }()
	  }, {
	    key: "onAfterEnter",
	    value: function onAfterEnter() {
	      var index = indexOf(layers).call(layers, this); // 如果是顶层蒙层


	      if (index === layers.length - 1) {
	        // 显示当前蒙层
	        this.hideLayer = false; // 重置下面的蒙层

	        slice$2(layers).call(layers, 0, -1).forEach(function (layer) {
	          layer.layerZIndex = layer.contentZIndex;
	          layer.hideLayer = true;
	        });
	      }
	    }
	  }, {
	    key: "onAfterLeave",
	    value: function onAfterLeave() {
	      var index = indexOf(layers).call(layers, this); // 重置下一层蒙层


	      if (index) {
	        layers[index - 1].layerZIndex = layers[index - 1].contentZIndex;
	      } // 移除当前组件


	      splice(layers).call(layers, index, 1);
	    }
	  }, {
	    key: "onClick",
	    value: function () {
	      var _onClick = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3() {
	        return regenerator.wrap(function _callee3$(_context3) {
	          while (1) {
	            switch (_context3.prev = _context3.next) {
	              case 0:
	                if (this.closeOnClickOverlayer) {
	                  _context3.next = 2;
	                  break;
	                }

	                return _context3.abrupt("return");

	              case 2:
	                this.$emit('input', false);

	              case 3:
	              case "end":
	                return _context3.stop();
	            }
	          }
	        }, _callee3, this);
	      }));

	      function onClick() {
	        return _onClick.apply(this, arguments);
	      }

	      return onClick;
	    }()
	  }, {
	    key: "onPopState",
	    value: function () {
	      var _onPopState = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(_ref) {
	        var state, showTime;
	        return regenerator.wrap(function _callee4$(_context4) {
	          while (1) {
	            switch (_context4.prev = _context4.next) {
	              case 0:
	                state = _ref.state;
	                showTime = state === null || state === void 0 ? void 0 : state["".concat(this.$options.name, "-showTime")]; // 如果当前历史记录是在蒙层组件显示后创建的

	                if (!(showTime && showTime >= this.showTime)) {
	                  _context4.next = 4;
	                  break;
	                }

	                return _context4.abrupt("return");

	              case 4:
	                // 返回或者新建历史记录
	                this.back = true;
	                this.$emit('input', false);

	              case 6:
	              case "end":
	                return _context4.stop();
	            }
	          }
	        }, _callee4, this);
	      }));

	      function onPopState(_x2) {
	        return _onPopState.apply(this, arguments);
	      }

	      return onPopState;
	    }()
	  }, {
	    key: "mounted",
	    value: function mounted() {
	      // 将根dom节点移到body下
	      document.body.appendChild(this.$el);
	    }
	  }, {
	    key: "beforeDestroy",
	    value: function beforeDestroy() {
	      this.show && this.onShowChange(false);
	      this.$el.parentNode.removeChild(this.$el);
	    }
	  }]);

	  return VComponent;
	}(Vue__default['default']);

	__decorate([Prop({
	  type: Boolean,
	  default: false
	})], VComponent$7.prototype, "value", void 0);

	__decorate([Prop({
	  type: Boolean,
	  default: false
	})], VComponent$7.prototype, "light", void 0);

	__decorate([Prop({
	  type: Boolean,
	  default: true
	})], VComponent$7.prototype, "pushState", void 0);

	__decorate([Prop({
	  type: Boolean,
	  default: true
	})], VComponent$7.prototype, "closeOnClickOverlayer", void 0);

	__decorate([Prop({
	  type: Function,
	  default: function _default(close) {
	    close();
	  }
	})], VComponent$7.prototype, "beforeClose", void 0);

	__decorate([Watch('value')], VComponent$7.prototype, "onValueChange", null);

	__decorate([Watch('show', {
	  immediate: true
	})], VComponent$7.prototype, "onShowChange", null);

	VComponent$7 = __decorate([Component({
	  name: 'VuiOverlayer',
	  inheritAttrs: false,
	  components: {
	    VuiTransition: Transition
	  }
	})], VComponent$7);
	var script$7 = VComponent$7;

	/* script */
	var __vue_script__$7 = script$7;
	/* template */

	var __vue_render__$7 = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c("div", {
	    staticClass: "vui-overlayer"
	  }, [_c("vui-transition", _vm._b({
	    on: {
	      "after-enter": _vm.onAfterEnter,
	      "after-leave": _vm.onAfterLeave
	    }
	  }, "vui-transition", _vm.$attrs, false), [_c("div", {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: _vm.show,
	      expression: "show"
	    }],
	    class: ["vui-overlayer__layer", {
	      "vui-overlayer__layer--hide": _vm.hideLayer,
	      "vui-overlayer__layer--light": _vm.light
	    }],
	    style: {
	      zIndex: _vm.layerZIndex
	    },
	    on: {
	      click: _vm.onClick,
	      touchmove: function touchmove($event) {
	        return $event.preventDefault();
	      }
	    }
	  })]), _vm._v(" "), _c("div", {
	    staticClass: "vui-overlayer__content",
	    style: {
	      zIndex: _vm.contentZIndex
	    }
	  }, [_vm._t("default", null, {
	    show: _vm.show
	  })], 2)], 1);
	};

	var __vue_staticRenderFns__$7 = [];
	__vue_render__$7._withStripped = true;
	/* style */

	var __vue_inject_styles__$7 = undefined;
	/* scoped */

	var __vue_scope_id__$7 = undefined;
	/* module identifier */

	var __vue_module_identifier__$7 = undefined;
	/* functional template */

	var __vue_is_functional_template__$7 = false;
	/* style inject */

	/* style inject SSR */

	/* style inject shadow dom */

	var __vue_component__$7 = /*#__PURE__*/normalizeComponent_1({
	  render: __vue_render__$7,
	  staticRenderFns: __vue_staticRenderFns__$7
	}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, false, undefined, undefined, undefined);

	var Overlayer = __vue_component__$7;

	Overlayer.install = function (Vue) {
	  Vue.component('VuiOverlayer', __vue_component__$7);
	};

	function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !construct) return false; if (construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var VComponent$6 = /*#__PURE__*/function (_Vue) {
	  _inherits(VComponent, _Vue);

	  var _super = _createSuper$6(VComponent);

	  function VComponent() {
	    _classCallCheck(this, VComponent);

	    return _super.apply(this, arguments);
	  }

	  return VComponent;
	}(Vue__default['default']);

	__decorate([Prop({
	  type: Boolean,
	  default: false
	})], VComponent$6.prototype, "value", void 0);

	__decorate([Prop({
	  type: Boolean,
	  default: false
	})], VComponent$6.prototype, "showClose", void 0);

	__decorate([Prop({
	  type: String,
	  default: ''
	})], VComponent$6.prototype, "title", void 0);

	VComponent$6 = __decorate([Component({
	  name: 'VuiDialog',
	  inheritAttrs: false,
	  components: {
	    VuiTransition: Transition,
	    VuiOverlayer: Overlayer
	  }
	})], VComponent$6);
	var script$6 = VComponent$6;

	/* script */
	var __vue_script__$6 = script$6;
	/* template */

	var __vue_render__$6 = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c("vui-overlayer", _vm._g(_vm._b({
	    staticClass: "vui-dialog",
	    attrs: {
	      value: _vm.value
	    },
	    scopedSlots: _vm._u([{
	      key: "default",
	      fn: function fn(slotProps) {
	        return [_c("vui-transition", _vm._b({
	          attrs: {
	            type: "popup-bottom"
	          }
	        }, "vui-transition", _vm.$attrs, false), [_c("div", {
	          directives: [{
	            name: "show",
	            rawName: "v-show",
	            value: slotProps.show,
	            expression: "slotProps.show"
	          }],
	          staticClass: "vui-dialog__wrapper"
	        }, [_vm.showClose ? _c("div", {
	          staticClass: "vui-dialog__close",
	          on: {
	            click: function click($event) {
	              return _vm.$emit("input", false);
	            }
	          }
	        }, [_vm._v("X")]) : _vm._e(), _vm._v(" "), _vm.title || _vm.$slots.header ? _c("div", {
	          staticClass: "vui-dialog__header"
	        }, [_vm._t("header", [_vm._v("\n          " + _vm._s(_vm.title) + "\n        ")])], 2) : _vm._e(), _vm._v(" "), _c("div", {
	          staticClass: "vui-dialog__content"
	        }, [_vm._t("default")], 2), _vm._v(" "), _vm.$slots.footer ? _c("div", {
	          staticClass: "vui-dialog__footer"
	        }, [_vm._t("footer")], 2) : _vm._e()])])];
	      }
	    }], null, true)
	  }, "vui-overlayer", _vm.$attrs, false), _vm.$listeners));
	};

	var __vue_staticRenderFns__$6 = [];
	__vue_render__$6._withStripped = true;
	/* style */

	var __vue_inject_styles__$6 = undefined;
	/* scoped */

	var __vue_scope_id__$6 = undefined;
	/* module identifier */

	var __vue_module_identifier__$6 = undefined;
	/* functional template */

	var __vue_is_functional_template__$6 = false;
	/* style inject */

	/* style inject SSR */

	/* style inject shadow dom */

	var __vue_component__$6 = /*#__PURE__*/normalizeComponent_1({
	  render: __vue_render__$6,
	  staticRenderFns: __vue_staticRenderFns__$6
	}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, false, undefined, undefined, undefined);

	var nativeAssign = Object.assign;
	var defineProperty = Object.defineProperty;

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	var objectAssign = !nativeAssign || fails(function () {
	  // should have correct order of operations (Edge bug)
	  if (descriptors && nativeAssign({ b: 1 }, nativeAssign(defineProperty({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), { b: 2 })).b !== 1) return true;
	  // should work with symbols and should have deterministic property order (V8 bug)
	  var A = {};
	  var B = {};
	  /* global Symbol -- required for testing */
	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
	  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
	  var T = toObject(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  var propertyIsEnumerable = objectPropertyIsEnumerable.f;
	  while (argumentsLength > index) {
	    var S = indexedObject(arguments[index++]);
	    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
	    }
	  } return T;
	} : nativeAssign;

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	_export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
	  assign: objectAssign
	});

	var assign$2 = path.Object.assign;

	var assign$1 = assign$2;

	var assign = assign$1;

	function ownKeys$1(object, enumerableOnly) { var keys$1 = keys(object); if (getOwnPropertySymbols) { var symbols = getOwnPropertySymbols(object); if (enumerableOnly) symbols = filter(symbols).call(symbols, function (sym) { return getOwnPropertyDescriptor$1(object, sym).enumerable; }); keys$1.push.apply(keys$1, symbols); } return keys$1; }

	function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (getOwnPropertyDescriptors) { Object.defineProperties(target, getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, getOwnPropertyDescriptor$1(source, key)); }); } } return target; }
	function dialog(option) {
	  var options = assign({
	    allowHtml: false,
	    showCancelButton: true,
	    showConfirmButton: true,
	    cancelButtonText: '取消',
	    confirmButtonText: '确定',
	    beforeClose: function beforeClose(action, close) {
	      close();
	    }
	  }, option);

	  var Component = Vue__default['default'].extend({
	    name: 'VuiDialogPlugin',
	    components: {
	      VuiDialog: __vue_component__$6,
	      VuiButton: __vue_component__$9
	    },
	    render: function render() {
	      var _this = this;

	      var h = arguments[0];
	      return h("vui-dialog", {
	        "attrs": {
	          "appear": true,
	          "showClose": options.showClose,
	          "pushState": options.pushState,
	          "closeOnClickOverlayer": options.closeOnClickOverlayer,
	          "beforeClose": this.beforeClose
	        },
	        "class": options.className,
	        "model": {
	          value: _this.show,
	          callback: function callback($$v) {
	            _this.show = $$v;
	          }
	        }
	      }, [options.title ? h("template", {
	        "slot": "header"
	      }, [options.allowHtml ? h("div", {
	        "domProps": {
	          "innerHTML": options.title
	        }
	      }) : options.title]) : null, h("template", {
	        "slot": "default"
	      }, [options.allowHtml ? h("div", {
	        "domProps": {
	          "innerHTML": options.content
	        }
	      }) : options.content]), options.showCancelButton || options.showConfirmButton ? h("template", {
	        "slot": "footer"
	      }, [options.showCancelButton ? h("vui-button", {
	        "attrs": {
	          "hue": "primary",
	          "corner": "round",
	          "size": "big"
	        },
	        "on": _objectSpread$1({}, {
	          click: function click() {
	            return _this.onButtonClick('cancel');
	          }
	        })
	      }, [options.cancelButtonText]) : null, options.showConfirmButton ? h("vui-button", {
	        "attrs": {
	          "type": "gradient",
	          "hue": "primary",
	          "corner": "round",
	          "size": "big"
	        },
	        "on": _objectSpread$1({}, {
	          click: function click() {
	            return _this.onButtonClick('confirm');
	          }
	        })
	      }, [options.confirmButtonText]) : null]) : null]);
	    },
	    data: function data() {
	      var data = {
	        show: true,
	        action: 'other'
	      };
	      return data;
	    },
	    methods: {
	      onButtonClick: function onButtonClick(action) {
	        this.action = action;
	        this.show = false;
	      },
	      beforeClose: function beforeClose(callback) {
	        var _this2 = this;

	        options.beforeClose(this.action, function () {
	          var close = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	          callback(close); // 关闭时销毁组件

	          if (close) {
	            setTimeout(function () {
	              _this2.$destroy();
	            }, 500);
	          }
	        });
	        this.action = 'other';
	      }
	    }
	  });
	  var vm = new Component();
	  vm.$mount(document.body.appendChild(document.createElement('div')));
	  return function () {
	    vm.show = false;
	  };
	}
	function alert(option) {
	  return dialog(_objectSpread$1(_objectSpread$1({}, option), {}, {
	    showCancelButton: false,
	    showConfirmButton: true
	  }));
	}
	function confirm(option) {
	  return dialog(_objectSpread$1(_objectSpread$1({}, option), {}, {
	    showCancelButton: true,
	    showConfirmButton: true
	  }));
	}

	// 扩展vue
	function extendVue(vue, prop, value) {
	  var _vue$prototype$$vui;

	  vue.$vui = vue.prototype.$vui = (_vue$prototype$$vui = vue.prototype.$vui) !== null && _vue$prototype$$vui !== void 0 ? _vue$prototype$$vui : {};
	  vue.prototype.$vui[prop] = value;
	}

	var Dialog = __vue_component__$6;
	Dialog.dialog = dialog;
	Dialog.alert = alert;
	Dialog.confirm = confirm;

	Dialog.install = function (Vue) {
	  Vue.component('VuiDialog', Dialog);
	  extendVue(Vue, 'dialog', dialog);
	  extendVue(Vue, 'alert', alert);
	  extendVue(Vue, 'confirm', confirm);
	};

	function unbind$4(el) {
	  if (!el._disappear) return;

	  el._disappear.observer.unobserve(el);

	  delete el._disappear;
	}

	function inserted$4(el, binding) {
	  var _binding$modifiers;

	  var modifiers = (_binding$modifiers = binding.modifiers) !== null && _binding$modifiers !== void 0 ? _binding$modifiers : {};
	  var value = binding.value;

	  var _ref = _typeof$2(value) === 'object' ? value : {
	    handler: value,
	    options: {}
	  },
	      handler = _ref.handler,
	      options = _ref.options;

	  var observer = new IntersectionObserver(function (entries) {
	    var isIntersecting = Boolean(find(entries).call(entries, function (entry) {
	      return entry.isIntersecting;
	    }));
	    if (!el._disappear) return;
	    if (handler && el._disappear.init) !isIntersecting && handler();
	    if (el._disappear.init && modifiers.once) !isIntersecting && unbind$4(el);else el._disappear.init = true;
	  }, options);
	  el._disappear = {
	    init: false,
	    observer: observer
	  };
	  observer.observe(el);
	}

	var directive$4 = {
	  inserted: inserted$4,
	  unbind: unbind$4,
	  install: function install(Vue) {
	    Vue.directive('vui-disappear', directive$4);
	  }
	};

	var name = "".concat(namespace, "Time");
	var replace;
	var previousTime; // 上一次时间

	var replaceTime; // replace前的历史记录的访问时间

	var plugin = {
	  install: function install(Vue, router) {
	    if (replace) {
	      return;
	    } // 先初始化$vui，防止应用初始化渲染时$vui为undefined，导致$vui.historyAction报错


	    extendVue(Vue, 'historyAction', undefined); // replace时history.state会被重置成null，所以要劫持（但仍无法解决location.replace的问题）

	    replace = router.replace.bind(router);

	    router.replace = function () {
	      var _history$state$name, _history, _history$state;

	      replaceTime = (_history$state$name = (_history = history) === null || _history === void 0 ? void 0 : (_history$state = _history.state) === null || _history$state === void 0 ? void 0 : _history$state[name]) !== null && _history$state$name !== void 0 ? _history$state$name : Date.now();
	      return replace.apply(void 0, arguments);
	    };

	    router.afterEach(function () {
	      var _history2, _history2$state;

	      var action; // 操作：新建、前进、后退、刷新还是replace

	      switch (true) {
	        // replace，老版本vue-router replace时会清除原来的history.state，新版本会保留
	        case !!replaceTime:
	          action = 'replace';
	          history.replaceState(assign({}, history.state || {}, _defineProperty({}, name, replaceTime)), '');
	          break;
	        // 新建历史记录

	        case !((_history2 = history) !== null && _history2 !== void 0 && (_history2$state = _history2.state) !== null && _history2$state !== void 0 && _history2$state[name]):
	          action = 'new';
	          history.replaceState(assign({}, history.state || {}, _defineProperty({}, name, Date.now())), '');
	          break;
	        // 刷新，不会清除history.state

	        case !previousTime || history.state[name] === previousTime:
	          action = 'refresh';
	          break;
	        // 后退

	        case history.state[name] < previousTime:
	          action = 'back';
	          break;
	        // 前进

	        default:
	          action = 'forward';
	      }

	      extendVue(Vue, 'historyAction', action);
	      previousTime = history.state[name];
	      replaceTime = 0;
	    });
	  }
	};

	function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !construct) return false; if (construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var VComponent$5 = /*#__PURE__*/function (_Vue) {
	  _inherits(VComponent, _Vue);

	  var _super = _createSuper$5(VComponent);

	  function VComponent() {
	    _classCallCheck(this, VComponent);

	    return _super.apply(this, arguments);
	  }

	  return VComponent;
	}(Vue__default['default']);

	__decorate([Prop({
	  type: String,
	  required: true
	})], VComponent$5.prototype, "name", void 0);

	__decorate([Prop({
	  type: Boolean,
	  default: false
	})], VComponent$5.prototype, "disabled", void 0);

	VComponent$5 = __decorate([Component({
	  name: 'VuiIcon'
	})], VComponent$5);
	var script$5 = VComponent$5;

	(function inject(svg) {
	  if (document.body) {
	    document.body.insertAdjacentHTML('afterbegin', svg);
	  } else {
	    document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
	      document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
	      inject(svg);
	    });
	  }
	})("<svg class=\"vui-icon__symbols\" width=\"0\" height=\"0\" style=\"position:absolute\"><symbol viewBox=\"0 0 72 72\" id=\"vui-icon-back\"><path d=\"M48.747 15.263a2.5 2.5 0 10-3.546-3.526L23.727 33.33a2.5 2.5 0 000 3.526l21.474 21.591a2.5 2.5 0 103.546-3.526L29.026 35.092l19.72-19.83z\" fill=\"#000\" fill-rule=\"nonzero\"/></symbol><symbol viewBox=\"0 0 72 72\" id=\"vui-icon-commentaries\"><path d=\"M24.5 28a1.5 1.5 0 110-3h24a1.5 1.5 0 110 3h-24zm0 10a1.5 1.5 0 110-3h12a1.5 1.5 0 110 3h-12zM16 15a3 3 0 00-3 3V55.642a1 1 0 001.637.77L23.603 49H57a3 3 0 003-3V18a3 3 0 00-3-3H16z\" fill=\"#000\" fill-rule=\"evenodd\"/></symbol><symbol viewBox=\"0 0 72 72\" id=\"vui-icon-delete\"><path d=\"M39.754 36.412l14.23 14.23a3 3 0 11-4.243 4.242l-14.23-14.23-14.229 14.23a3 3 0 11-4.243-4.243l14.23-14.23-13.93-13.929a3 3 0 014.243-4.243l13.93 13.93 13.93-13.93a3 3 0 114.242 4.243l-13.93 13.93z\" fill=\"#000\" fill-rule=\"nonzero\"/></symbol><symbol viewBox=\"0 0 72 72\" id=\"vui-icon-delete-circle\"><path d=\"M32.606 37.2l-7.903 7.903a2.4 2.4 0 003.394 3.394L36 40.594l7.903 7.903a2.4 2.4 0 003.394-3.394L39.394 37.2l7.903-7.903a2.4 2.4 0 00-3.394-3.394L36 33.806l-7.903-7.903a2.4 2.4 0 00-3.394 3.394l7.903 7.903zM36 62.4c-13.918 0-25.2-11.282-25.2-25.2S22.082 12 36 12s25.2 11.282 25.2 25.2S49.918 62.4 36 62.4z\" fill=\"#000\" fill-rule=\"evenodd\"/></symbol><symbol viewBox=\"0 0 72 72\" id=\"vui-icon-download\"><path d=\"M33.85 40.754V13.5a2.5 2.5 0 115 0v27.255l11.288-11.227a2.5 2.5 0 013.526 3.545L38.114 48.54a2.5 2.5 0 01-3.526 0L19.037 33.073a2.5 2.5 0 113.526-3.545L33.85 40.754zm24.254 13.993a2.5 2.5 0 110 5H14.5a2.5 2.5 0 110-5h43.604z\" fill=\"#000\" fill-rule=\"nonzero\"/></symbol><symbol viewBox=\"0 0 72 72\" id=\"vui-icon-good\"><path d=\"M35.385 30.58h23.344c.703 0 1.399.292 1.908.856.554.616.715 1.49.565 2.304l-4.255 23.146a2.994 2.994 0 01-2.95 2.45H22.525a3 3 0 01-3-3V31.28c0-.458.124-.907.358-1.301 6.086-10.223 9.786-16.017 11.1-17.382.1-.105.38-.228.663-.227.283 0 .57.128.64.156 1.969.81 6.36 4.21 3.099 18.055zm-25.112 2.544a2.544 2.544 0 012.544-2.544h.199a2.544 2.544 0 012.544 2.544v23.67a2.544 2.544 0 01-2.544 2.543h-.2a2.544 2.544 0 01-2.543-2.543v-23.67z\" fill=\"#000\" fill-rule=\"evenodd\"/></symbol><symbol viewBox=\"0 0 72 72\" id=\"vui-icon-history\"><path d=\"M47.197 42.803a2.4 2.4 0 01-3.394 3.394l-9-9A2.4 2.4 0 0134.1 35.5v-13a2.4 2.4 0 114.8 0v12.006l8.297 8.297zM58 35.5C58 23.626 48.374 14 36.5 14S15 23.626 15 35.5 24.626 57 36.5 57 58 47.374 58 35.5zm5 0C63 50.136 51.136 62 36.5 62S10 50.136 10 35.5 21.864 9 36.5 9 63 20.864 63 35.5z\" fill=\"#000\" fill-rule=\"nonzero\"/></symbol><symbol viewBox=\"0 0 72 72\" id=\"vui-icon-like\"><path d=\"M44.516 46.675c4.619-4.618 8.176-8.415 10.097-10.868 3.705-4.73 3.671-10.889-.148-14.709-3.963-3.963-10.38-4.14-14-.434-.14.143-.285.301-.434.47a19.366 19.366 0 00-1.288 1.646 2.5 2.5 0 01-4.123 0 19.309 19.309 0 00-1.288-1.645c-.149-.17-.294-.327-.434-.47-3.62-3.707-10.037-3.53-14 .433-3.82 3.82-3.854 9.978-.148 14.709 1.921 2.453 5.478 6.25 10.097 10.868a466.64 466.64 0 007.835 7.644 466.637 466.637 0 007.834-7.644zm-7.629-29.504c5.621-5.755 15.233-5.49 21.113.392 5.696 5.697 5.745 14.692.55 21.327-2.084 2.66-5.742 6.564-10.498 11.32a474.072 474.072 0 01-9.065 8.815 3.346 3.346 0 01-4.61.002 474.12 474.12 0 01-9.066-8.816c-4.756-4.757-8.414-8.66-10.498-11.321-5.196-6.634-5.147-15.63.55-21.328 5.88-5.88 15.492-6.146 21.112-.39.069.07.137.141.206.215.069-.074.137-.145.206-.216z\" fill=\"#000\" fill-rule=\"nonzero\"/></symbol><symbol viewBox=\"0 0 72 72\" id=\"vui-icon-loading\"><g fill=\"none\" fill-rule=\"evenodd\"><path d=\"M0 0h72v72H0z\"/><g transform=\"translate(6 6)\" fill=\"#9F9F9F\"><circle fill-opacity=\".12\" cx=\"46.971\" cy=\"13.029\" r=\"6\"/><circle fill-opacity=\".25\" cx=\"54\" cy=\"30\" r=\"6\"/><circle fill-opacity=\".38\" cx=\"46.971\" cy=\"46.971\" r=\"6\"/><circle fill-opacity=\".5\" cx=\"30\" cy=\"54\" r=\"6\"/><circle fill-opacity=\".62\" cx=\"13.029\" cy=\"46.971\" r=\"6\"/><circle fill-opacity=\".75\" cx=\"6\" cy=\"30\" r=\"6\"/><circle fill-opacity=\".88\" cx=\"13.029\" cy=\"13.029\" r=\"6\"/><circle cx=\"30\" cy=\"6\" r=\"6\"/></g></g></symbol><symbol viewBox=\"0 0 72 72\" id=\"vui-icon-lock\"><path d=\"M52.553 35.5H19.5v18.785h33.053V35.5zm-31.053-5v-6.561C21.5 15.964 27.964 9.5 35.938 9.5c7.975 0 14.44 6.464 14.44 14.439V30.5h4.346a2.829 2.829 0 012.829 2.829v23.126a2.83 2.83 0 01-2.83 2.83H17.329a2.83 2.83 0 01-2.829-2.829V33.329a2.83 2.83 0 012.829-2.829H21.5zm5 0h18.878v-6.561c0-5.213-4.226-9.439-9.44-9.439-5.212 0-9.438 4.226-9.438 9.439V30.5zm7 12.5v3.116a2.5 2.5 0 105 0V43a2.5 2.5 0 10-5 0z\" fill=\"#000\" fill-rule=\"nonzero\"/></symbol><symbol viewBox=\"0 0 72 72\" id=\"vui-icon-low\"><path d=\"M35.385 41.126h23.344c.703 0 1.399-.292 1.908-.856.554-.616.715-1.491.565-2.304L56.947 14.82a2.994 2.994 0 00-2.95-2.451H22.525a3 3 0 00-3 3v25.058c0 .458.124.907.358 1.3 6.086 10.224 9.786 16.018 11.1 17.383.1.105.38.228.663.227.283-.001.57-.128.64-.156 1.969-.811 6.36-4.211 3.099-18.055zm-25.112-2.544a2.544 2.544 0 002.544 2.544h.199a2.544 2.544 0 002.544-2.544v-23.67a2.544 2.544 0 00-2.544-2.543h-.2a2.544 2.544 0 00-2.543 2.543v23.67z\" fill=\"#000\" fill-rule=\"evenodd\"/></symbol><symbol viewBox=\"0 0 72 72\" id=\"vui-icon-maximize\"><path d=\"M20.545 53.228h9.456a2.5 2.5 0 110 5H14.5a2.5 2.5 0 01-2.5-2.5V40a2.5 2.5 0 115 0v9.704l11.75-11.764a2.5 2.5 0 013.538 3.534L20.545 53.228zM49.692 17H40a2.5 2.5 0 110-5h15.5a2.5 2.5 0 012.5 2.5v15.729a2.5 2.5 0 11-5 0v-9.466L41.477 32.3a2.5 2.5 0 01-3.538-3.534L49.692 17z\" fill=\"#000\" fill-rule=\"nonzero\"/></symbol><symbol viewBox=\"0 0 72 72\" id=\"vui-icon-message\"><path d=\"M42.237 34.958a3.274 3.274 0 110-6.549 3.274 3.274 0 010 6.549m-13.262 0a3.124 3.124 0 110-6.25 3.125 3.125 0 110 6.25m29.044-2.263C58.02 20.713 48.165 11 36.01 11 23.854 11 14 20.713 14 32.695c0 11.982 9.854 21.696 22.01 21.696h.001v6.016c0 .469.52.753.912.496 1.533-1.004 4.873-3.336 9.016-7.112 5.271-4.804 7.452-7.785 7.452-7.785l-.005-.004c2.901-3.675 4.633-8.29 4.633-13.307\" fill=\"#252525\" fill-rule=\"evenodd\"/></symbol><symbol viewBox=\"0 0 72 72\" id=\"vui-icon-minimization\"><path d=\"M23.78 43H15.5a2.5 2.5 0 110-5H31a2.5 2.5 0 012.5 2.5v15.729a2.5 2.5 0 11-5 0v-10.88L16.269 57.594a2.5 2.5 0 11-3.538-3.534L23.78 43zm21.352-14.271H55a2.5 2.5 0 110 5H39.5a2.5 2.5 0 01-2.5-2.5V15.5a2.5 2.5 0 115 0v9.29l12.043-12.057a2.5 2.5 0 113.538 3.534L45.13 28.729z\" fill=\"#000\" fill-rule=\"nonzero\"/></symbol><symbol viewBox=\"0 0 72 72\" id=\"vui-icon-more\"><path d=\"M38.61 20.61a3.872 3.872 0 11-5.476-5.477 3.872 3.872 0 015.476 5.477m0 17.449a3.872 3.872 0 11-5.476-5.477 3.872 3.872 0 015.476 5.477m0 18.665a3.872 3.872 0 11-5.476-5.477 3.872 3.872 0 015.476 5.477\" fill=\"#000\" fill-rule=\"evenodd\"/></symbol><symbol viewBox=\"0 0 72 72\" id=\"vui-icon-phone\"><path d=\"M27.884 44.107s-.38-.376-.495-.492c-6.561-6.679-11.762-14.672-14.246-22.618a3.143 3.143 0 011.323-3.592l7.774-4.92a3.135 3.135 0 014.119.686l4.629 5.761a3.133 3.133 0 01.177 3.683l-3.795 5.783a3.16 3.16 0 000 3.448c1.69 2.614 3.432 4.821 5.402 6.797l.043.043c1.98 1.97 4.19 3.71 6.807 5.4a3.16 3.16 0 003.444 0l5.795-3.796a3.134 3.134 0 013.679.175l5.767 4.626a3.135 3.135 0 01.686 4.123L54.07 56.98a3.143 3.143 0 01-3.59 1.32c-7.936-2.475-15.921-7.655-22.597-14.192\" fill=\"#252525\" fill-rule=\"evenodd\"/></symbol><symbol viewBox=\"0 0 72 72\" id=\"vui-icon-read\"><path d=\"M36 52c-12.703 0-23-7.163-23-15.515C13 27.163 23.297 20 36 20s23 7.163 23 16.485C59 44.837 48.703 52 36 52zm0-9a7 7 0 100-14 7 7 0 000 14z\" fill=\"#000\" fill-rule=\"evenodd\"/></symbol><symbol viewBox=\"0 0 72 72\" id=\"vui-icon-refresh\"><path d=\"M56.32 20.55l-.065-6.915a2.5 2.5 0 015-.048l.117 12.376a2.5 2.5 0 01-2.475 2.524l-12.376.12a2.5 2.5 0 11-.048-5l5.844-.057A20.409 20.409 0 0036.448 16C25.155 16 16 25.155 16 36.448c0 11.293 9.155 20.448 20.448 20.448 10.11 0 18.662-7.386 20.203-17.27a20.62 20.62 0 00.245-3.178 2.5 2.5 0 115 0c0 1.33-.102 2.65-.305 3.948-1.919 12.31-12.56 21.5-25.143 21.5C22.393 61.896 11 50.503 11 36.448S22.393 11 36.448 11c7.851 0 15.1 3.585 19.873 9.55z\" fill=\"#000\" fill-rule=\"nonzero\"/></symbol><symbol viewBox=\"0 0 72 72\" id=\"vui-icon-scan\"><path d=\"M45.5 13h10c2.322 0 4.5 2.043 4.5 4.5v7a2.5 2.5 0 11-5 0V19a1 1 0 00-1-1H19a1 1 0 00-1 1v5.5a2.5 2.5 0 11-5 0v-7c0-2.662 2.139-4.5 4.5-4.5h28zm.5 42.05c.162-.033.329-.05.5-.05H54a1 1 0 001-1v-6.5a2.5 2.5 0 115 0v7c0 2.998-1.762 5.5-4.5 5.5h-9c-.171 0-.338-.017-.5-.05-.162.033-.329.05-.5.05h-28c-1.965 0-4.5-1.896-4.5-4.5v-8a2.5 2.5 0 115 0V54a1 1 0 001 1h26.5c.171 0 .338.017.5.05zM15.5 39a2.5 2.5 0 110-5h42a2.5 2.5 0 110 5h-42z\" fill=\"#000\" fill-rule=\"nonzero\"/></symbol><symbol viewBox=\"0 0 72 72\" id=\"vui-icon-search\"><g fill=\"none\" fill-rule=\"evenodd\"><path d=\"M0 0h72v72H0z\"/><path d=\"M48.026 42.915l8.563 8.563a3 3 0 11-4.243 4.242l-8.417-8.417A17.921 17.921 0 0133 51c-9.941 0-18-8.059-18-18s8.059-18 18-18 18 8.059 18 18c0 3.664-1.094 7.071-2.974 9.915zM33 45c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12z\" fill=\"#000\"/></g></symbol><symbol viewBox=\"0 0 72 72\" id=\"vui-icon-setting\"><path d=\"M60.214 28.198a2.5 2.5 0 011.738 1.89 26.86 26.86 0 010 10.894 2.5 2.5 0 01-1.738 1.89 8.495 8.495 0 00-4.976 3.91 8.505 8.505 0 00-.901 6.261 2.5 2.5 0 01-.766 2.445 26.708 26.708 0 01-9.44 5.456 2.5 2.5 0 01-2.503-.56 8.496 8.496 0 00-5.873-2.352 8.5 8.5 0 00-5.874 2.352 2.5 2.5 0 01-2.503.56 26.717 26.717 0 01-9.44-5.456 2.5 2.5 0 01-.766-2.445 8.503 8.503 0 00-.9-6.26 8.5 8.5 0 00-4.977-3.91 2.5 2.5 0 01-1.738-1.891 26.86 26.86 0 010-10.893 2.5 2.5 0 011.738-1.89 8.505 8.505 0 004.977-3.913 8.502 8.502 0 00.9-6.259 2.5 2.5 0 01.766-2.445 26.717 26.717 0 019.44-5.456 2.5 2.5 0 012.503.56 8.498 8.498 0 005.874 2.351 8.5 8.5 0 005.874-2.351 2.5 2.5 0 012.503-.56 26.713 26.713 0 019.439 5.456 2.5 2.5 0 01.765 2.445 8.502 8.502 0 00.902 6.259 8.501 8.501 0 004.976 3.912zm-9.306-1.412a13.479 13.479 0 01-1.714-8.353 21.71 21.71 0 00-5.344-3.09 13.475 13.475 0 01-8.095 2.694c-2.966 0-5.783-.964-8.095-2.694a21.715 21.715 0 00-5.344 3.09 13.478 13.478 0 01-1.714 8.354 13.481 13.481 0 01-6.384 5.663 21.891 21.891 0 000 6.17 13.478 13.478 0 016.384 5.663 13.477 13.477 0 011.713 8.354 21.715 21.715 0 005.345 3.09 13.474 13.474 0 018.095-2.695c2.965 0 5.782.965 8.094 2.695a21.705 21.705 0 005.345-3.09 13.48 13.48 0 011.714-8.354 13.471 13.471 0 016.383-5.663 21.891 21.891 0 000-6.17 13.476 13.476 0 01-6.383-5.664zm-10.561 8.749a4.592 4.592 0 10-9.185 0 4.593 4.593 0 009.185 0zm5 0a9.592 9.592 0 01-9.592 9.592c-5.298 0-9.593-4.294-9.593-9.592 0-5.298 4.295-9.592 9.593-9.592a9.592 9.592 0 019.592 9.592z\" fill=\"#000\" fill-rule=\"nonzero\"/></symbol><symbol viewBox=\"0 0 72 72\" id=\"vui-icon-share\"><path d=\"M52.16 26h-9.633C36.16 26 31 31.16 31 37.528V43.5a2.5 2.5 0 11-5 0v-5.972C26 28.399 33.399 21 42.527 21h9.633l-4.25-4.228a2.5 2.5 0 113.527-3.545l8.544 8.5a2.5 2.5 0 010 3.545l-8.544 8.5a2.5 2.5 0 11-3.526-3.545L52.16 26zM17 55h38V42.218a2.5 2.5 0 115 0V57.5a2.5 2.5 0 01-2.5 2.5h-43a2.5 2.5 0 01-2.5-2.5v-43a2.5 2.5 0 012.5-2.5h13a2.5 2.5 0 110 5H17v38z\" fill=\"#000\" fill-rule=\"nonzero\"/></symbol><symbol viewBox=\"0 0 72 72\" id=\"vui-icon-silent\"><path d=\"M55.48 35.617l6.865 9.792a2.5 2.5 0 01-4.094 2.87l-5.785-8.252-6.167 9.023a2.5 2.5 0 11-4.127-2.821l7.227-10.576-7.21-10.285a2.5 2.5 0 014.094-2.87l6.13 8.745 5.82-8.515a2.5 2.5 0 114.128 2.82l-6.88 10.07zM19.24 24.03l12.72-13.26c1.558-1.626 4.303-.522 4.303 1.73v46.439c0 2.252-2.745 3.356-4.304 1.73l-13.351-13.93h-6.759A2.849 2.849 0 019 43.89V26.88a2.85 2.85 0 012.85-2.851h7.39zm2.87 4.23a2.5 2.5 0 01-1.804.77H14v12.71h5.674a2.5 2.5 0 011.805.77l9.784 10.207V18.717l-9.152 9.542z\" fill=\"#000\" fill-rule=\"nonzero\"/></symbol><symbol viewBox=\"0 0 72 72\" id=\"vui-icon-sound\"><path d=\"M19.241 24.029l12.718-13.26c1.56-1.626 4.304-.522 4.304 1.73v46.439c0 2.252-2.745 3.356-4.304 1.73l-13.351-13.93H11.85A2.85 2.85 0 019 43.89V26.88a2.851 2.851 0 012.85-2.851h7.391zm35.53 28.406a2.5 2.5 0 11-3.333-3.726c3.689-3.301 5.833-7.97 5.833-12.99 0-5.02-2.145-9.69-5.835-12.99a2.5 2.5 0 013.333-3.727c4.738 4.236 7.502 10.255 7.502 16.717 0 6.462-2.763 12.479-7.5 16.716zm-10.125-6.39a2.5 2.5 0 11-2.459-4.353c2.174-1.228 3.534-3.478 3.534-5.972 0-2.496-1.361-4.747-3.537-5.975a2.5 2.5 0 112.46-4.354c3.72 2.101 6.077 6 6.077 10.329 0 4.327-2.356 8.225-6.075 10.325zM22.112 28.26a2.5 2.5 0 01-1.805.77H14v12.71h5.674a2.5 2.5 0 011.805.77l9.784 10.207V18.718l-9.151 9.541z\" fill=\"#000\" fill-rule=\"nonzero\"/></symbol><symbol viewBox=\"0 0 72 72\" id=\"vui-icon-unlock\"><path d=\"M52.553 36.5H19.5v18.785h33.053V36.5zm-31.053-5v-6.561c0-7.975 6.464-14.439 14.438-14.439a14.442 14.442 0 0113.97 10.779 2.5 2.5 0 01-4.837 1.264 9.443 9.443 0 00-9.133-7.043c-5.212 0-9.438 4.226-9.438 9.439V31.5h28.224a2.829 2.829 0 012.829 2.829v23.126a2.83 2.83 0 01-2.83 2.83H17.329a2.83 2.83 0 01-2.829-2.829V34.329a2.83 2.83 0 012.829-2.829H21.5z\" fill=\"#000\" fill-rule=\"nonzero\"/></symbol></svg>");

	/* script */
	var __vue_script__$5 = script$5;
	/* template */

	var __vue_render__$5 = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c("svg", {
	    staticClass: "vui-icon",
	    attrs: {
	      "aria-hidden": "true",
	      "data-disabled": _vm.disabled
	    }
	  }, [_c("use", {
	    attrs: {
	      "xlink:href": "#vui-icon-" + _vm.name,
	      href: "#vui-icon-" + _vm.name
	    }
	  })]);
	};

	var __vue_staticRenderFns__$5 = [];
	__vue_render__$5._withStripped = true;
	/* style */

	var __vue_inject_styles__$5 = undefined;
	/* scoped */

	var __vue_scope_id__$5 = undefined;
	/* module identifier */

	var __vue_module_identifier__$5 = undefined;
	/* functional template */

	var __vue_is_functional_template__$5 = false;
	/* style inject */

	/* style inject SSR */

	/* style inject shadow dom */

	var __vue_component__$5 = /*#__PURE__*/normalizeComponent_1({
	  render: __vue_render__$5,
	  staticRenderFns: __vue_staticRenderFns__$5
	}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, false, undefined, undefined, undefined);

	var Icon = __vue_component__$5;

	Icon.install = function (Vue) {
	  Vue.component('VuiIcon', __vue_component__$5);
	};

	// `Array.isArray` method
	// https://tc39.es/ecma262/#sec-array.isarray
	_export({ target: 'Array', stat: true }, {
	  isArray: isArray$3
	});

	var isArray$2 = path.Array.isArray;

	var isArray$1 = isArray$2;

	var isArray = isArray$1;

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) {
	    arr2[i] = arr[i];
	  }

	  return arr2;
	}

	function _arrayWithoutHoles(arr) {
	  if (isArray(arr)) return _arrayLikeToArray(arr);
	}

	var ITERATOR = wellKnownSymbol('iterator');

	var isIterable$1 = function (it) {
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    // eslint-disable-next-line no-prototype-builtins -- safe
	    || iterators.hasOwnProperty(classof(O));
	};

	var isIterable_1 = isIterable$1;

	var isIterable = isIterable_1;

	// call something on iterator step with safe closing on error
	var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (error) {
	    iteratorClose(iterator);
	    throw error;
	  }
	};

	// `Array.from` method implementation
	// https://tc39.es/ecma262/#sec-array.from
	var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	  var O = toObject(arrayLike);
	  var C = typeof this == 'function' ? this : Array;
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  var iteratorMethod = getIteratorMethod(O);
	  var index = 0;
	  var length, result, step, iterator, next, value;
	  if (mapping) mapfn = functionBindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
	  // if the target is not iterable or it's an array with the default iterator - use a simple case
	  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
	    iterator = iteratorMethod.call(O);
	    next = iterator.next;
	    result = new C();
	    for (;!(step = next.call(iterator)).done; index++) {
	      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
	      createProperty(result, index, value);
	    }
	  } else {
	    length = toLength(O.length);
	    result = new C(length);
	    for (;length > index; index++) {
	      value = mapping ? mapfn(O[index], index) : O[index];
	      createProperty(result, index, value);
	    }
	  }
	  result.length = index;
	  return result;
	};

	var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
	  Array.from(iterable);
	});

	// `Array.from` method
	// https://tc39.es/ecma262/#sec-array.from
	_export({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
	  from: arrayFrom
	});

	var from_1$2 = path.Array.from;

	var from_1$1 = from_1$2;

	var from_1 = from_1$1;

	function _iterableToArray(iter) {
	  if (typeof symbol !== "undefined" && isIterable(Object(iter))) return from_1(iter);
	}

	var slice$1 = slice_1;

	var slice = slice$1;

	function _unsupportedIterableToArray(o, minLen) {
	  var _context;

	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray(o, minLen);

	  var n = slice(_context = Object.prototype.toString.call(o)).call(_context, 8, -1);

	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return from_1(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	function _toConsumableArray(arr) {
	  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
	}

	var $stringify = getBuiltIn('JSON', 'stringify');
	var re = /[\uD800-\uDFFF]/g;
	var low = /^[\uD800-\uDBFF]$/;
	var hi = /^[\uDC00-\uDFFF]$/;

	var fix = function (match, offset, string) {
	  var prev = string.charAt(offset - 1);
	  var next = string.charAt(offset + 1);
	  if ((low.test(match) && !hi.test(next)) || (hi.test(match) && !low.test(prev))) {
	    return '\\u' + match.charCodeAt(0).toString(16);
	  } return match;
	};

	var FORCED = fails(function () {
	  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
	    || $stringify('\uDEAD') !== '"\\udead"';
	});

	if ($stringify) {
	  // `JSON.stringify` method
	  // https://tc39.es/ecma262/#sec-json.stringify
	  // https://github.com/tc39/proposal-well-formed-stringify
	  _export({ target: 'JSON', stat: true, forced: FORCED }, {
	    // eslint-disable-next-line no-unused-vars -- required for `.length`
	    stringify: function stringify(it, replacer, space) {
	      var result = $stringify.apply(null, arguments);
	      return typeof result == 'string' ? result.replace(re, fix) : result;
	    }
	  });
	}

	if (!path.JSON) path.JSON = { stringify: JSON.stringify };

	// eslint-disable-next-line no-unused-vars -- required for `.length`
	var stringify$2 = function stringify(it, replacer, space) {
	  return path.JSON.stringify.apply(null, arguments);
	};

	var stringify$1 = stringify$2;

	var stringify = stringify$1;

	var concat$2 = entryVirtual('Array').concat;

	var ArrayPrototype = Array.prototype;

	var concat_1 = function (it) {
	  var own = it.concat;
	  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.concat) ? concat$2 : own;
	};

	var concat$1 = concat_1;

	var concat = concat$1;

	var photoswipe = createCommonjsModule(function (module, exports) {
	/*! PhotoSwipe - v4.1.3 - 2019-01-08
	* http://photoswipe.com
	* Copyright (c) 2019 Dmitry Semenov; */
	(function (root, factory) { 
		{
			module.exports = factory();
		}
	})(commonjsGlobal, function () {
		var PhotoSwipe = function(template, UiClass, items, options){

	/*>>framework-bridge*/
	/**
	 *
	 * Set of generic functions used by gallery.
	 * 
	 * You're free to modify anything here as long as functionality is kept.
	 * 
	 */
	var framework = {
		features: null,
		bind: function(target, type, listener, unbind) {
			var methodName = (unbind ? 'remove' : 'add') + 'EventListener';
			type = type.split(' ');
			for(var i = 0; i < type.length; i++) {
				if(type[i]) {
					target[methodName]( type[i], listener, false);
				}
			}
		},
		isArray: function(obj) {
			return (obj instanceof Array);
		},
		createEl: function(classes, tag) {
			var el = document.createElement(tag || 'div');
			if(classes) {
				el.className = classes;
			}
			return el;
		},
		getScrollY: function() {
			var yOffset = window.pageYOffset;
			return yOffset !== undefined ? yOffset : document.documentElement.scrollTop;
		},
		unbind: function(target, type, listener) {
			framework.bind(target,type,listener,true);
		},
		removeClass: function(el, className) {
			var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
			el.className = el.className.replace(reg, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, ''); 
		},
		addClass: function(el, className) {
			if( !framework.hasClass(el,className) ) {
				el.className += (el.className ? ' ' : '') + className;
			}
		},
		hasClass: function(el, className) {
			return el.className && new RegExp('(^|\\s)' + className + '(\\s|$)').test(el.className);
		},
		getChildByClass: function(parentEl, childClassName) {
			var node = parentEl.firstChild;
			while(node) {
				if( framework.hasClass(node, childClassName) ) {
					return node;
				}
				node = node.nextSibling;
			}
		},
		arraySearch: function(array, value, key) {
			var i = array.length;
			while(i--) {
				if(array[i][key] === value) {
					return i;
				} 
			}
			return -1;
		},
		extend: function(o1, o2, preventOverwrite) {
			for (var prop in o2) {
				if (o2.hasOwnProperty(prop)) {
					if(preventOverwrite && o1.hasOwnProperty(prop)) {
						continue;
					}
					o1[prop] = o2[prop];
				}
			}
		},
		easing: {
			sine: {
				out: function(k) {
					return Math.sin(k * (Math.PI / 2));
				},
				inOut: function(k) {
					return - (Math.cos(Math.PI * k) - 1) / 2;
				}
			},
			cubic: {
				out: function(k) {
					return --k * k * k + 1;
				}
			}
			/*
				elastic: {
					out: function ( k ) {

						var s, a = 0.1, p = 0.4;
						if ( k === 0 ) return 0;
						if ( k === 1 ) return 1;
						if ( !a || a < 1 ) { a = 1; s = p / 4; }
						else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
						return ( a * Math.pow( 2, - 10 * k) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) + 1 );

					},
				},
				back: {
					out: function ( k ) {
						var s = 1.70158;
						return --k * k * ( ( s + 1 ) * k + s ) + 1;
					}
				}
			*/
		},

		/**
		 * 
		 * @return {object}
		 * 
		 * {
		 *  raf : request animation frame function
		 *  caf : cancel animation frame function
		 *  transfrom : transform property key (with vendor), or null if not supported
		 *  oldIE : IE8 or below
		 * }
		 * 
		 */
		detectFeatures: function() {
			if(framework.features) {
				return framework.features;
			}
			var helperEl = framework.createEl(),
				helperStyle = helperEl.style,
				vendor = '',
				features = {};

			// IE8 and below
			features.oldIE = document.all && !document.addEventListener;

			features.touch = 'ontouchstart' in window;

			if(window.requestAnimationFrame) {
				features.raf = window.requestAnimationFrame;
				features.caf = window.cancelAnimationFrame;
			}

			features.pointerEvent = !!(window.PointerEvent) || navigator.msPointerEnabled;

			// fix false-positive detection of old Android in new IE
			// (IE11 ua string contains "Android 4.0")
			
			if(!features.pointerEvent) { 

				var ua = navigator.userAgent;

				// Detect if device is iPhone or iPod and if it's older than iOS 8
				// http://stackoverflow.com/a/14223920
				// 
				// This detection is made because of buggy top/bottom toolbars
				// that don't trigger window.resize event.
				// For more info refer to _isFixedPosition variable in core.js

				if (/iP(hone|od)/.test(navigator.platform)) {
					var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
					if(v && v.length > 0) {
						v = parseInt(v[1], 10);
						if(v >= 1 && v < 8 ) {
							features.isOldIOSPhone = true;
						}
					}
				}

				// Detect old Android (before KitKat)
				// due to bugs related to position:fixed
				// http://stackoverflow.com/questions/7184573/pick-up-the-android-version-in-the-browser-by-javascript
				
				var match = ua.match(/Android\s([0-9\.]*)/);
				var androidversion =  match ? match[1] : 0;
				androidversion = parseFloat(androidversion);
				if(androidversion >= 1 ) {
					if(androidversion < 4.4) {
						features.isOldAndroid = true; // for fixed position bug & performance
					}
					features.androidVersion = androidversion; // for touchend bug
				}	
				features.isMobileOpera = /opera mini|opera mobi/i.test(ua);

				// p.s. yes, yes, UA sniffing is bad, propose your solution for above bugs.
			}
			
			var styleChecks = ['transform', 'perspective', 'animationName'],
				vendors = ['', 'webkit','Moz','ms','O'],
				styleCheckItem,
				styleName;

			for(var i = 0; i < 4; i++) {
				vendor = vendors[i];

				for(var a = 0; a < 3; a++) {
					styleCheckItem = styleChecks[a];

					// uppercase first letter of property name, if vendor is present
					styleName = vendor + (vendor ? 
											styleCheckItem.charAt(0).toUpperCase() + styleCheckItem.slice(1) : 
											styleCheckItem);
				
					if(!features[styleCheckItem] && styleName in helperStyle ) {
						features[styleCheckItem] = styleName;
					}
				}

				if(vendor && !features.raf) {
					vendor = vendor.toLowerCase();
					features.raf = window[vendor+'RequestAnimationFrame'];
					if(features.raf) {
						features.caf = window[vendor+'CancelAnimationFrame'] || 
										window[vendor+'CancelRequestAnimationFrame'];
					}
				}
			}
				
			if(!features.raf) {
				var lastTime = 0;
				features.raf = function(fn) {
					var currTime = new Date().getTime();
					var timeToCall = Math.max(0, 16 - (currTime - lastTime));
					var id = window.setTimeout(function() { fn(currTime + timeToCall); }, timeToCall);
					lastTime = currTime + timeToCall;
					return id;
				};
				features.caf = function(id) { clearTimeout(id); };
			}

			// Detect SVG support
			features.svg = !!document.createElementNS && 
							!!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;

			framework.features = features;

			return features;
		}
	};

	framework.detectFeatures();

	// Override addEventListener for old versions of IE
	if(framework.features.oldIE) {

		framework.bind = function(target, type, listener, unbind) {
			
			type = type.split(' ');

			var methodName = (unbind ? 'detach' : 'attach') + 'Event',
				evName,
				_handleEv = function() {
					listener.handleEvent.call(listener);
				};

			for(var i = 0; i < type.length; i++) {
				evName = type[i];
				if(evName) {

					if(typeof listener === 'object' && listener.handleEvent) {
						if(!unbind) {
							listener['oldIE' + evName] = _handleEv;
						} else {
							if(!listener['oldIE' + evName]) {
								return false;
							}
						}

						target[methodName]( 'on' + evName, listener['oldIE' + evName]);
					} else {
						target[methodName]( 'on' + evName, listener);
					}

				}
			}
		};
		
	}

	/*>>framework-bridge*/

	/*>>core*/
	//function(template, UiClass, items, options)

	var self = this;

	/**
	 * Static vars, don't change unless you know what you're doing.
	 */
	var DOUBLE_TAP_RADIUS = 25, 
		NUM_HOLDERS = 3;

	/**
	 * Options
	 */
	var _options = {
		allowPanToNext:true,
		spacing: 0.12,
		bgOpacity: 1,
		mouseUsed: false,
		loop: true,
		pinchToClose: true,
		closeOnScroll: true,
		closeOnVerticalDrag: true,
		verticalDragRange: 0.75,
		hideAnimationDuration: 333,
		showAnimationDuration: 333,
		showHideOpacity: false,
		focus: true,
		escKey: true,
		arrowKeys: true,
		mainScrollEndFriction: 0.35,
		panEndFriction: 0.35,
		isClickableElement: function(el) {
	        return el.tagName === 'A';
	    },
	    getDoubleTapZoom: function(isMouseClick, item) {
	    	if(isMouseClick) {
	    		return 1;
	    	} else {
	    		return item.initialZoomLevel < 0.7 ? 1 : 1.33;
	    	}
	    },
	    maxSpreadZoom: 1.33,
		modal: true,

		// not fully implemented yet
		scaleMode: 'fit' // TODO
	};
	framework.extend(_options, options);


	/**
	 * Private helper variables & functions
	 */

	var _getEmptyPoint = function() { 
			return {x:0,y:0}; 
		};

	var _isOpen,
		_isDestroying,
		_closedByScroll,
		_currentItemIndex,
		_containerStyle,
		_containerShiftIndex,
		_currPanDist = _getEmptyPoint(),
		_startPanOffset = _getEmptyPoint(),
		_panOffset = _getEmptyPoint(),
		_upMoveEvents, // drag move, drag end & drag cancel events array
		_downEvents, // drag start events array
		_globalEventHandlers,
		_viewportSize = {},
		_currZoomLevel,
		_startZoomLevel,
		_translatePrefix,
		_translateSufix,
		_updateSizeInterval,
		_itemsNeedUpdate,
		_currPositionIndex = 0,
		_offset = {},
		_slideSize = _getEmptyPoint(), // size of slide area, including spacing
		_itemHolders,
		_prevItemIndex,
		_indexDiff = 0, // difference of indexes since last content update
		_dragStartEvent,
		_dragMoveEvent,
		_dragEndEvent,
		_dragCancelEvent,
		_transformKey,
		_pointerEventEnabled,
		_isFixedPosition = true,
		_likelyTouchDevice,
		_modules = [],
		_requestAF,
		_cancelAF,
		_initalClassName,
		_initalWindowScrollY,
		_oldIE,
		_currentWindowScrollY,
		_features,
		_windowVisibleSize = {},
		_renderMaxResolution = false,
		_orientationChangeTimeout,


		// Registers PhotoSWipe module (History, Controller ...)
		_registerModule = function(name, module) {
			framework.extend(self, module.publicMethods);
			_modules.push(name);
		},

		_getLoopedId = function(index) {
			var numSlides = _getNumItems();
			if(index > numSlides - 1) {
				return index - numSlides;
			} else  if(index < 0) {
				return numSlides + index;
			}
			return index;
		},
		
		// Micro bind/trigger
		_listeners = {},
		_listen = function(name, fn) {
			if(!_listeners[name]) {
				_listeners[name] = [];
			}
			return _listeners[name].push(fn);
		},
		_shout = function(name) {
			var listeners = _listeners[name];

			if(listeners) {
				var args = Array.prototype.slice.call(arguments);
				args.shift();

				for(var i = 0; i < listeners.length; i++) {
					listeners[i].apply(self, args);
				}
			}
		},

		_getCurrentTime = function() {
			return new Date().getTime();
		},
		_applyBgOpacity = function(opacity) {
			_bgOpacity = opacity;
			self.bg.style.opacity = opacity * _options.bgOpacity;
		},

		_applyZoomTransform = function(styleObj,x,y,zoom,item) {
			if(!_renderMaxResolution || (item && item !== self.currItem) ) {
				zoom = zoom / (item ? item.fitRatio : self.currItem.fitRatio);	
			}
				
			styleObj[_transformKey] = _translatePrefix + x + 'px, ' + y + 'px' + _translateSufix + ' scale(' + zoom + ')';
		},
		_applyCurrentZoomPan = function( allowRenderResolution ) {
			if(_currZoomElementStyle) {

				if(allowRenderResolution) {
					if(_currZoomLevel > self.currItem.fitRatio) {
						if(!_renderMaxResolution) {
							_setImageSize(self.currItem, false, true);
							_renderMaxResolution = true;
						}
					} else {
						if(_renderMaxResolution) {
							_setImageSize(self.currItem);
							_renderMaxResolution = false;
						}
					}
				}
				

				_applyZoomTransform(_currZoomElementStyle, _panOffset.x, _panOffset.y, _currZoomLevel);
			}
		},
		_applyZoomPanToItem = function(item) {
			if(item.container) {

				_applyZoomTransform(item.container.style, 
									item.initialPosition.x, 
									item.initialPosition.y, 
									item.initialZoomLevel,
									item);
			}
		},
		_setTranslateX = function(x, elStyle) {
			elStyle[_transformKey] = _translatePrefix + x + 'px, 0px' + _translateSufix;
		},
		_moveMainScroll = function(x, dragging) {

			if(!_options.loop && dragging) {
				var newSlideIndexOffset = _currentItemIndex + (_slideSize.x * _currPositionIndex - x) / _slideSize.x,
					delta = Math.round(x - _mainScrollPos.x);

				if( (newSlideIndexOffset < 0 && delta > 0) || 
					(newSlideIndexOffset >= _getNumItems() - 1 && delta < 0) ) {
					x = _mainScrollPos.x + delta * _options.mainScrollEndFriction;
				} 
			}
			
			_mainScrollPos.x = x;
			_setTranslateX(x, _containerStyle);
		},
		_calculatePanOffset = function(axis, zoomLevel) {
			var m = _midZoomPoint[axis] - _offset[axis];
			return _startPanOffset[axis] + _currPanDist[axis] + m - m * ( zoomLevel / _startZoomLevel );
		},
		
		_equalizePoints = function(p1, p2) {
			p1.x = p2.x;
			p1.y = p2.y;
			if(p2.id) {
				p1.id = p2.id;
			}
		},
		_roundPoint = function(p) {
			p.x = Math.round(p.x);
			p.y = Math.round(p.y);
		},

		_mouseMoveTimeout = null,
		_onFirstMouseMove = function() {
			// Wait until mouse move event is fired at least twice during 100ms
			// We do this, because some mobile browsers trigger it on touchstart
			if(_mouseMoveTimeout ) { 
				framework.unbind(document, 'mousemove', _onFirstMouseMove);
				framework.addClass(template, 'pswp--has_mouse');
				_options.mouseUsed = true;
				_shout('mouseUsed');
			}
			_mouseMoveTimeout = setTimeout(function() {
				_mouseMoveTimeout = null;
			}, 100);
		},

		_bindEvents = function() {
			framework.bind(document, 'keydown', self);

			if(_features.transform) {
				// don't bind click event in browsers that don't support transform (mostly IE8)
				framework.bind(self.scrollWrap, 'click', self);
			}
			

			if(!_options.mouseUsed) {
				framework.bind(document, 'mousemove', _onFirstMouseMove);
			}

			framework.bind(window, 'resize scroll orientationchange', self);

			_shout('bindEvents');
		},

		_unbindEvents = function() {
			framework.unbind(window, 'resize scroll orientationchange', self);
			framework.unbind(window, 'scroll', _globalEventHandlers.scroll);
			framework.unbind(document, 'keydown', self);
			framework.unbind(document, 'mousemove', _onFirstMouseMove);

			if(_features.transform) {
				framework.unbind(self.scrollWrap, 'click', self);
			}

			if(_isDragging) {
				framework.unbind(window, _upMoveEvents, self);
			}

			clearTimeout(_orientationChangeTimeout);

			_shout('unbindEvents');
		},
		
		_calculatePanBounds = function(zoomLevel, update) {
			var bounds = _calculateItemSize( self.currItem, _viewportSize, zoomLevel );
			if(update) {
				_currPanBounds = bounds;
			}
			return bounds;
		},
		
		_getMinZoomLevel = function(item) {
			if(!item) {
				item = self.currItem;
			}
			return item.initialZoomLevel;
		},
		_getMaxZoomLevel = function(item) {
			if(!item) {
				item = self.currItem;
			}
			return item.w > 0 ? _options.maxSpreadZoom : 1;
		},

		// Return true if offset is out of the bounds
		_modifyDestPanOffset = function(axis, destPanBounds, destPanOffset, destZoomLevel) {
			if(destZoomLevel === self.currItem.initialZoomLevel) {
				destPanOffset[axis] = self.currItem.initialPosition[axis];
				return true;
			} else {
				destPanOffset[axis] = _calculatePanOffset(axis, destZoomLevel); 

				if(destPanOffset[axis] > destPanBounds.min[axis]) {
					destPanOffset[axis] = destPanBounds.min[axis];
					return true;
				} else if(destPanOffset[axis] < destPanBounds.max[axis] ) {
					destPanOffset[axis] = destPanBounds.max[axis];
					return true;
				}
			}
			return false;
		},

		_setupTransforms = function() {

			if(_transformKey) {
				// setup 3d transforms
				var allow3dTransform = _features.perspective && !_likelyTouchDevice;
				_translatePrefix = 'translate' + (allow3dTransform ? '3d(' : '(');
				_translateSufix = _features.perspective ? ', 0px)' : ')';	
				return;
			}

			// Override zoom/pan/move functions in case old browser is used (most likely IE)
			// (so they use left/top/width/height, instead of CSS transform)
		
			_transformKey = 'left';
			framework.addClass(template, 'pswp--ie');

			_setTranslateX = function(x, elStyle) {
				elStyle.left = x + 'px';
			};
			_applyZoomPanToItem = function(item) {

				var zoomRatio = item.fitRatio > 1 ? 1 : item.fitRatio,
					s = item.container.style,
					w = zoomRatio * item.w,
					h = zoomRatio * item.h;

				s.width = w + 'px';
				s.height = h + 'px';
				s.left = item.initialPosition.x + 'px';
				s.top = item.initialPosition.y + 'px';

			};
			_applyCurrentZoomPan = function() {
				if(_currZoomElementStyle) {

					var s = _currZoomElementStyle,
						item = self.currItem,
						zoomRatio = item.fitRatio > 1 ? 1 : item.fitRatio,
						w = zoomRatio * item.w,
						h = zoomRatio * item.h;

					s.width = w + 'px';
					s.height = h + 'px';


					s.left = _panOffset.x + 'px';
					s.top = _panOffset.y + 'px';
				}
				
			};
		},

		_onKeyDown = function(e) {
			var keydownAction = '';
			if(_options.escKey && e.keyCode === 27) { 
				keydownAction = 'close';
			} else if(_options.arrowKeys) {
				if(e.keyCode === 37) {
					keydownAction = 'prev';
				} else if(e.keyCode === 39) { 
					keydownAction = 'next';
				}
			}

			if(keydownAction) {
				// don't do anything if special key pressed to prevent from overriding default browser actions
				// e.g. in Chrome on Mac cmd+arrow-left returns to previous page
				if( !e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey ) {
					if(e.preventDefault) {
						e.preventDefault();
					} else {
						e.returnValue = false;
					} 
					self[keydownAction]();
				}
			}
		},

		_onGlobalClick = function(e) {
			if(!e) {
				return;
			}

			// don't allow click event to pass through when triggering after drag or some other gesture
			if(_moved || _zoomStarted || _mainScrollAnimating || _verticalDragInitiated) {
				e.preventDefault();
				e.stopPropagation();
			}
		},

		_updatePageScrollOffset = function() {
			self.setScrollOffset(0, framework.getScrollY());		
		};
		


		



	// Micro animation engine
	var _animations = {},
		_numAnimations = 0,
		_stopAnimation = function(name) {
			if(_animations[name]) {
				if(_animations[name].raf) {
					_cancelAF( _animations[name].raf );
				}
				_numAnimations--;
				delete _animations[name];
			}
		},
		_registerStartAnimation = function(name) {
			if(_animations[name]) {
				_stopAnimation(name);
			}
			if(!_animations[name]) {
				_numAnimations++;
				_animations[name] = {};
			}
		},
		_stopAllAnimations = function() {
			for (var prop in _animations) {

				if( _animations.hasOwnProperty( prop ) ) {
					_stopAnimation(prop);
				} 
				
			}
		},
		_animateProp = function(name, b, endProp, d, easingFn, onUpdate, onComplete) {
			var startAnimTime = _getCurrentTime(), t;
			_registerStartAnimation(name);

			var animloop = function(){
				if ( _animations[name] ) {
					
					t = _getCurrentTime() - startAnimTime; // time diff
					//b - beginning (start prop)
					//d - anim duration

					if ( t >= d ) {
						_stopAnimation(name);
						onUpdate(endProp);
						if(onComplete) {
							onComplete();
						}
						return;
					}
					onUpdate( (endProp - b) * easingFn(t/d) + b );

					_animations[name].raf = _requestAF(animloop);
				}
			};
			animloop();
		};
		


	var publicMethods = {

		// make a few local variables and functions public
		shout: _shout,
		listen: _listen,
		viewportSize: _viewportSize,
		options: _options,

		isMainScrollAnimating: function() {
			return _mainScrollAnimating;
		},
		getZoomLevel: function() {
			return _currZoomLevel;
		},
		getCurrentIndex: function() {
			return _currentItemIndex;
		},
		isDragging: function() {
			return _isDragging;
		},	
		isZooming: function() {
			return _isZooming;
		},
		setScrollOffset: function(x,y) {
			_offset.x = x;
			_currentWindowScrollY = _offset.y = y;
			_shout('updateScrollOffset', _offset);
		},
		applyZoomPan: function(zoomLevel,panX,panY,allowRenderResolution) {
			_panOffset.x = panX;
			_panOffset.y = panY;
			_currZoomLevel = zoomLevel;
			_applyCurrentZoomPan( allowRenderResolution );
		},

		init: function() {

			if(_isOpen || _isDestroying) {
				return;
			}

			var i;

			self.framework = framework; // basic functionality
			self.template = template; // root DOM element of PhotoSwipe
			self.bg = framework.getChildByClass(template, 'pswp__bg');

			_initalClassName = template.className;
			_isOpen = true;
					
			_features = framework.detectFeatures();
			_requestAF = _features.raf;
			_cancelAF = _features.caf;
			_transformKey = _features.transform;
			_oldIE = _features.oldIE;
			
			self.scrollWrap = framework.getChildByClass(template, 'pswp__scroll-wrap');
			self.container = framework.getChildByClass(self.scrollWrap, 'pswp__container');

			_containerStyle = self.container.style; // for fast access

			// Objects that hold slides (there are only 3 in DOM)
			self.itemHolders = _itemHolders = [
				{el:self.container.children[0] , wrap:0, index: -1},
				{el:self.container.children[1] , wrap:0, index: -1},
				{el:self.container.children[2] , wrap:0, index: -1}
			];

			// hide nearby item holders until initial zoom animation finishes (to avoid extra Paints)
			_itemHolders[0].el.style.display = _itemHolders[2].el.style.display = 'none';

			_setupTransforms();

			// Setup global events
			_globalEventHandlers = {
				resize: self.updateSize,

				// Fixes: iOS 10.3 resize event
				// does not update scrollWrap.clientWidth instantly after resize
				// https://github.com/dimsemenov/PhotoSwipe/issues/1315
				orientationchange: function() {
					clearTimeout(_orientationChangeTimeout);
					_orientationChangeTimeout = setTimeout(function() {
						if(_viewportSize.x !== self.scrollWrap.clientWidth) {
							self.updateSize();
						}
					}, 500);
				},
				scroll: _updatePageScrollOffset,
				keydown: _onKeyDown,
				click: _onGlobalClick
			};

			// disable show/hide effects on old browsers that don't support CSS animations or transforms, 
			// old IOS, Android and Opera mobile. Blackberry seems to work fine, even older models.
			var oldPhone = _features.isOldIOSPhone || _features.isOldAndroid || _features.isMobileOpera;
			if(!_features.animationName || !_features.transform || oldPhone) {
				_options.showAnimationDuration = _options.hideAnimationDuration = 0;
			}

			// init modules
			for(i = 0; i < _modules.length; i++) {
				self['init' + _modules[i]]();
			}
			
			// init
			if(UiClass) {
				var ui = self.ui = new UiClass(self, framework);
				ui.init();
			}

			_shout('firstUpdate');
			_currentItemIndex = _currentItemIndex || _options.index || 0;
			// validate index
			if( isNaN(_currentItemIndex) || _currentItemIndex < 0 || _currentItemIndex >= _getNumItems() ) {
				_currentItemIndex = 0;
			}
			self.currItem = _getItemAt( _currentItemIndex );

			
			if(_features.isOldIOSPhone || _features.isOldAndroid) {
				_isFixedPosition = false;
			}
			
			template.setAttribute('aria-hidden', 'false');
			if(_options.modal) {
				if(!_isFixedPosition) {
					template.style.position = 'absolute';
					template.style.top = framework.getScrollY() + 'px';
				} else {
					template.style.position = 'fixed';
				}
			}

			if(_currentWindowScrollY === undefined) {
				_shout('initialLayout');
				_currentWindowScrollY = _initalWindowScrollY = framework.getScrollY();
			}
			
			// add classes to root element of PhotoSwipe
			var rootClasses = 'pswp--open ';
			if(_options.mainClass) {
				rootClasses += _options.mainClass + ' ';
			}
			if(_options.showHideOpacity) {
				rootClasses += 'pswp--animate_opacity ';
			}
			rootClasses += _likelyTouchDevice ? 'pswp--touch' : 'pswp--notouch';
			rootClasses += _features.animationName ? ' pswp--css_animation' : '';
			rootClasses += _features.svg ? ' pswp--svg' : '';
			framework.addClass(template, rootClasses);

			self.updateSize();

			// initial update
			_containerShiftIndex = -1;
			_indexDiff = null;
			for(i = 0; i < NUM_HOLDERS; i++) {
				_setTranslateX( (i+_containerShiftIndex) * _slideSize.x, _itemHolders[i].el.style);
			}

			if(!_oldIE) {
				framework.bind(self.scrollWrap, _downEvents, self); // no dragging for old IE
			}	

			_listen('initialZoomInEnd', function() {
				self.setContent(_itemHolders[0], _currentItemIndex-1);
				self.setContent(_itemHolders[2], _currentItemIndex+1);

				_itemHolders[0].el.style.display = _itemHolders[2].el.style.display = 'block';

				if(_options.focus) {
					// focus causes layout, 
					// which causes lag during the animation, 
					// that's why we delay it untill the initial zoom transition ends
					template.focus();
				}
				 

				_bindEvents();
			});

			// set content for center slide (first time)
			self.setContent(_itemHolders[1], _currentItemIndex);
			
			self.updateCurrItem();

			_shout('afterInit');

			if(!_isFixedPosition) {

				// On all versions of iOS lower than 8.0, we check size of viewport every second.
				// 
				// This is done to detect when Safari top & bottom bars appear, 
				// as this action doesn't trigger any events (like resize). 
				// 
				// On iOS8 they fixed this.
				// 
				// 10 Nov 2014: iOS 7 usage ~40%. iOS 8 usage 56%.
				
				_updateSizeInterval = setInterval(function() {
					if(!_numAnimations && !_isDragging && !_isZooming && (_currZoomLevel === self.currItem.initialZoomLevel)  ) {
						self.updateSize();
					}
				}, 1000);
			}

			framework.addClass(template, 'pswp--visible');
		},

		// Close the gallery, then destroy it
		close: function() {
			if(!_isOpen) {
				return;
			}

			_isOpen = false;
			_isDestroying = true;
			_shout('close');
			_unbindEvents();

			_showOrHide(self.currItem, null, true, self.destroy);
		},

		// destroys the gallery (unbinds events, cleans up intervals and timeouts to avoid memory leaks)
		destroy: function() {
			_shout('destroy');

			if(_showOrHideTimeout) {
				clearTimeout(_showOrHideTimeout);
			}
			
			template.setAttribute('aria-hidden', 'true');
			template.className = _initalClassName;

			if(_updateSizeInterval) {
				clearInterval(_updateSizeInterval);
			}

			framework.unbind(self.scrollWrap, _downEvents, self);

			// we unbind scroll event at the end, as closing animation may depend on it
			framework.unbind(window, 'scroll', self);

			_stopDragUpdateLoop();

			_stopAllAnimations();

			_listeners = null;
		},

		/**
		 * Pan image to position
		 * @param {Number} x     
		 * @param {Number} y     
		 * @param {Boolean} force Will ignore bounds if set to true.
		 */
		panTo: function(x,y,force) {
			if(!force) {
				if(x > _currPanBounds.min.x) {
					x = _currPanBounds.min.x;
				} else if(x < _currPanBounds.max.x) {
					x = _currPanBounds.max.x;
				}

				if(y > _currPanBounds.min.y) {
					y = _currPanBounds.min.y;
				} else if(y < _currPanBounds.max.y) {
					y = _currPanBounds.max.y;
				}
			}
			
			_panOffset.x = x;
			_panOffset.y = y;
			_applyCurrentZoomPan();
		},
		
		handleEvent: function (e) {
			e = e || window.event;
			if(_globalEventHandlers[e.type]) {
				_globalEventHandlers[e.type](e);
			}
		},


		goTo: function(index) {

			index = _getLoopedId(index);

			var diff = index - _currentItemIndex;
			_indexDiff = diff;

			_currentItemIndex = index;
			self.currItem = _getItemAt( _currentItemIndex );
			_currPositionIndex -= diff;
			
			_moveMainScroll(_slideSize.x * _currPositionIndex);
			

			_stopAllAnimations();
			_mainScrollAnimating = false;

			self.updateCurrItem();
		},
		next: function() {
			self.goTo( _currentItemIndex + 1);
		},
		prev: function() {
			self.goTo( _currentItemIndex - 1);
		},

		// update current zoom/pan objects
		updateCurrZoomItem: function(emulateSetContent) {
			if(emulateSetContent) {
				_shout('beforeChange', 0);
			}

			// itemHolder[1] is middle (current) item
			if(_itemHolders[1].el.children.length) {
				var zoomElement = _itemHolders[1].el.children[0];
				if( framework.hasClass(zoomElement, 'pswp__zoom-wrap') ) {
					_currZoomElementStyle = zoomElement.style;
				} else {
					_currZoomElementStyle = null;
				}
			} else {
				_currZoomElementStyle = null;
			}
			
			_currPanBounds = self.currItem.bounds;	
			_startZoomLevel = _currZoomLevel = self.currItem.initialZoomLevel;

			_panOffset.x = _currPanBounds.center.x;
			_panOffset.y = _currPanBounds.center.y;

			if(emulateSetContent) {
				_shout('afterChange');
			}
		},


		invalidateCurrItems: function() {
			_itemsNeedUpdate = true;
			for(var i = 0; i < NUM_HOLDERS; i++) {
				if( _itemHolders[i].item ) {
					_itemHolders[i].item.needsUpdate = true;
				}
			}
		},

		updateCurrItem: function(beforeAnimation) {

			if(_indexDiff === 0) {
				return;
			}

			var diffAbs = Math.abs(_indexDiff),
				tempHolder;

			if(beforeAnimation && diffAbs < 2) {
				return;
			}


			self.currItem = _getItemAt( _currentItemIndex );
			_renderMaxResolution = false;
			
			_shout('beforeChange', _indexDiff);

			if(diffAbs >= NUM_HOLDERS) {
				_containerShiftIndex += _indexDiff + (_indexDiff > 0 ? -NUM_HOLDERS : NUM_HOLDERS);
				diffAbs = NUM_HOLDERS;
			}
			for(var i = 0; i < diffAbs; i++) {
				if(_indexDiff > 0) {
					tempHolder = _itemHolders.shift();
					_itemHolders[NUM_HOLDERS-1] = tempHolder; // move first to last

					_containerShiftIndex++;
					_setTranslateX( (_containerShiftIndex+2) * _slideSize.x, tempHolder.el.style);
					self.setContent(tempHolder, _currentItemIndex - diffAbs + i + 1 + 1);
				} else {
					tempHolder = _itemHolders.pop();
					_itemHolders.unshift( tempHolder ); // move last to first

					_containerShiftIndex--;
					_setTranslateX( _containerShiftIndex * _slideSize.x, tempHolder.el.style);
					self.setContent(tempHolder, _currentItemIndex + diffAbs - i - 1 - 1);
				}
				
			}

			// reset zoom/pan on previous item
			if(_currZoomElementStyle && Math.abs(_indexDiff) === 1) {

				var prevItem = _getItemAt(_prevItemIndex);
				if(prevItem.initialZoomLevel !== _currZoomLevel) {
					_calculateItemSize(prevItem , _viewportSize );
					_setImageSize(prevItem);
					_applyZoomPanToItem( prevItem ); 				
				}

			}

			// reset diff after update
			_indexDiff = 0;

			self.updateCurrZoomItem();

			_prevItemIndex = _currentItemIndex;

			_shout('afterChange');
			
		},



		updateSize: function(force) {
			
			if(!_isFixedPosition && _options.modal) {
				var windowScrollY = framework.getScrollY();
				if(_currentWindowScrollY !== windowScrollY) {
					template.style.top = windowScrollY + 'px';
					_currentWindowScrollY = windowScrollY;
				}
				if(!force && _windowVisibleSize.x === window.innerWidth && _windowVisibleSize.y === window.innerHeight) {
					return;
				}
				_windowVisibleSize.x = window.innerWidth;
				_windowVisibleSize.y = window.innerHeight;

				//template.style.width = _windowVisibleSize.x + 'px';
				template.style.height = _windowVisibleSize.y + 'px';
			}



			_viewportSize.x = self.scrollWrap.clientWidth;
			_viewportSize.y = self.scrollWrap.clientHeight;

			_updatePageScrollOffset();

			_slideSize.x = _viewportSize.x + Math.round(_viewportSize.x * _options.spacing);
			_slideSize.y = _viewportSize.y;

			_moveMainScroll(_slideSize.x * _currPositionIndex);

			_shout('beforeResize'); // even may be used for example to switch image sources


			// don't re-calculate size on inital size update
			if(_containerShiftIndex !== undefined) {

				var holder,
					item,
					hIndex;

				for(var i = 0; i < NUM_HOLDERS; i++) {
					holder = _itemHolders[i];
					_setTranslateX( (i+_containerShiftIndex) * _slideSize.x, holder.el.style);

					hIndex = _currentItemIndex+i-1;

					if(_options.loop && _getNumItems() > 2) {
						hIndex = _getLoopedId(hIndex);
					}

					// update zoom level on items and refresh source (if needsUpdate)
					item = _getItemAt( hIndex );

					// re-render gallery item if `needsUpdate`,
					// or doesn't have `bounds` (entirely new slide object)
					if( item && (_itemsNeedUpdate || item.needsUpdate || !item.bounds) ) {

						self.cleanSlide( item );
						
						self.setContent( holder, hIndex );

						// if "center" slide
						if(i === 1) {
							self.currItem = item;
							self.updateCurrZoomItem(true);
						}

						item.needsUpdate = false;

					} else if(holder.index === -1 && hIndex >= 0) {
						// add content first time
						self.setContent( holder, hIndex );
					}
					if(item && item.container) {
						_calculateItemSize(item, _viewportSize);
						_setImageSize(item);
						_applyZoomPanToItem( item );
					}
					
				}
				_itemsNeedUpdate = false;
			}	

			_startZoomLevel = _currZoomLevel = self.currItem.initialZoomLevel;
			_currPanBounds = self.currItem.bounds;

			if(_currPanBounds) {
				_panOffset.x = _currPanBounds.center.x;
				_panOffset.y = _currPanBounds.center.y;
				_applyCurrentZoomPan( true );
			}
			
			_shout('resize');
		},
		
		// Zoom current item to
		zoomTo: function(destZoomLevel, centerPoint, speed, easingFn, updateFn) {
			/*
				if(destZoomLevel === 'fit') {
					destZoomLevel = self.currItem.fitRatio;
				} else if(destZoomLevel === 'fill') {
					destZoomLevel = self.currItem.fillRatio;
				}
			*/

			if(centerPoint) {
				_startZoomLevel = _currZoomLevel;
				_midZoomPoint.x = Math.abs(centerPoint.x) - _panOffset.x ;
				_midZoomPoint.y = Math.abs(centerPoint.y) - _panOffset.y ;
				_equalizePoints(_startPanOffset, _panOffset);
			}

			var destPanBounds = _calculatePanBounds(destZoomLevel, false),
				destPanOffset = {};

			_modifyDestPanOffset('x', destPanBounds, destPanOffset, destZoomLevel);
			_modifyDestPanOffset('y', destPanBounds, destPanOffset, destZoomLevel);

			var initialZoomLevel = _currZoomLevel;
			var initialPanOffset = {
				x: _panOffset.x,
				y: _panOffset.y
			};

			_roundPoint(destPanOffset);

			var onUpdate = function(now) {
				if(now === 1) {
					_currZoomLevel = destZoomLevel;
					_panOffset.x = destPanOffset.x;
					_panOffset.y = destPanOffset.y;
				} else {
					_currZoomLevel = (destZoomLevel - initialZoomLevel) * now + initialZoomLevel;
					_panOffset.x = (destPanOffset.x - initialPanOffset.x) * now + initialPanOffset.x;
					_panOffset.y = (destPanOffset.y - initialPanOffset.y) * now + initialPanOffset.y;
				}

				if(updateFn) {
					updateFn(now);
				}

				_applyCurrentZoomPan( now === 1 );
			};

			if(speed) {
				_animateProp('customZoomTo', 0, 1, speed, easingFn || framework.easing.sine.inOut, onUpdate);
			} else {
				onUpdate(1);
			}
		}


	};


	/*>>core*/

	/*>>gestures*/
	/**
	 * Mouse/touch/pointer event handlers.
	 * 
	 * separated from @core.js for readability
	 */

	var MIN_SWIPE_DISTANCE = 30,
		DIRECTION_CHECK_OFFSET = 10; // amount of pixels to drag to determine direction of swipe

	var _gestureStartTime,
		_gestureCheckSpeedTime,

		// pool of objects that are used during dragging of zooming
		p = {}, // first point
		p2 = {}, // second point (for zoom gesture)
		delta = {},
		_currPoint = {},
		_startPoint = {},
		_currPointers = [],
		_startMainScrollPos = {},
		_releaseAnimData,
		_posPoints = [], // array of points during dragging, used to determine type of gesture
		_tempPoint = {},

		_isZoomingIn,
		_verticalDragInitiated,
		_oldAndroidTouchEndTimeout,
		_currZoomedItemIndex = 0,
		_centerPoint = _getEmptyPoint(),
		_lastReleaseTime = 0,
		_isDragging, // at least one pointer is down
		_isMultitouch, // at least two _pointers are down
		_zoomStarted, // zoom level changed during zoom gesture
		_moved,
		_dragAnimFrame,
		_mainScrollShifted,
		_currentPoints, // array of current touch points
		_isZooming,
		_startPointsDistance,
		_currPanBounds,
		_mainScrollPos = _getEmptyPoint(),
		_currZoomElementStyle,
		_mainScrollAnimating, // true, if animation after swipe gesture is running
		_midZoomPoint = _getEmptyPoint(),
		_currCenterPoint = _getEmptyPoint(),
		_direction,
		_isFirstMove,
		_opacityChanged,
		_bgOpacity,
		_wasOverInitialZoom,

		_isEqualPoints = function(p1, p2) {
			return p1.x === p2.x && p1.y === p2.y;
		},
		_isNearbyPoints = function(touch0, touch1) {
			return Math.abs(touch0.x - touch1.x) < DOUBLE_TAP_RADIUS && Math.abs(touch0.y - touch1.y) < DOUBLE_TAP_RADIUS;
		},
		_calculatePointsDistance = function(p1, p2) {
			_tempPoint.x = Math.abs( p1.x - p2.x );
			_tempPoint.y = Math.abs( p1.y - p2.y );
			return Math.sqrt(_tempPoint.x * _tempPoint.x + _tempPoint.y * _tempPoint.y);
		},
		_stopDragUpdateLoop = function() {
			if(_dragAnimFrame) {
				_cancelAF(_dragAnimFrame);
				_dragAnimFrame = null;
			}
		},
		_dragUpdateLoop = function() {
			if(_isDragging) {
				_dragAnimFrame = _requestAF(_dragUpdateLoop);
				_renderMovement();
			}
		},
		_canPan = function() {
			return !(_options.scaleMode === 'fit' && _currZoomLevel ===  self.currItem.initialZoomLevel);
		},
		
		// find the closest parent DOM element
		_closestElement = function(el, fn) {
		  	if(!el || el === document) {
		  		return false;
		  	}

		  	// don't search elements above pswp__scroll-wrap
		  	if(el.getAttribute('class') && el.getAttribute('class').indexOf('pswp__scroll-wrap') > -1 ) {
		  		return false;
		  	}

		  	if( fn(el) ) {
		  		return el;
		  	}

		  	return _closestElement(el.parentNode, fn);
		},

		_preventObj = {},
		_preventDefaultEventBehaviour = function(e, isDown) {
		    _preventObj.prevent = !_closestElement(e.target, _options.isClickableElement);

			_shout('preventDragEvent', e, isDown, _preventObj);
			return _preventObj.prevent;

		},
		_convertTouchToPoint = function(touch, p) {
			p.x = touch.pageX;
			p.y = touch.pageY;
			p.id = touch.identifier;
			return p;
		},
		_findCenterOfPoints = function(p1, p2, pCenter) {
			pCenter.x = (p1.x + p2.x) * 0.5;
			pCenter.y = (p1.y + p2.y) * 0.5;
		},
		_pushPosPoint = function(time, x, y) {
			if(time - _gestureCheckSpeedTime > 50) {
				var o = _posPoints.length > 2 ? _posPoints.shift() : {};
				o.x = x;
				o.y = y; 
				_posPoints.push(o);
				_gestureCheckSpeedTime = time;
			}
		},

		_calculateVerticalDragOpacityRatio = function() {
			var yOffset = _panOffset.y - self.currItem.initialPosition.y; // difference between initial and current position
			return 1 -  Math.abs( yOffset / (_viewportSize.y / 2)  );
		},

		
		// points pool, reused during touch events
		_ePoint1 = {},
		_ePoint2 = {},
		_tempPointsArr = [],
		_tempCounter,
		_getTouchPoints = function(e) {
			// clean up previous points, without recreating array
			while(_tempPointsArr.length > 0) {
				_tempPointsArr.pop();
			}

			if(!_pointerEventEnabled) {
				if(e.type.indexOf('touch') > -1) {

					if(e.touches && e.touches.length > 0) {
						_tempPointsArr[0] = _convertTouchToPoint(e.touches[0], _ePoint1);
						if(e.touches.length > 1) {
							_tempPointsArr[1] = _convertTouchToPoint(e.touches[1], _ePoint2);
						}
					}
					
				} else {
					_ePoint1.x = e.pageX;
					_ePoint1.y = e.pageY;
					_ePoint1.id = '';
					_tempPointsArr[0] = _ePoint1;//_ePoint1;
				}
			} else {
				_tempCounter = 0;
				// we can use forEach, as pointer events are supported only in modern browsers
				_currPointers.forEach(function(p) {
					if(_tempCounter === 0) {
						_tempPointsArr[0] = p;
					} else if(_tempCounter === 1) {
						_tempPointsArr[1] = p;
					}
					_tempCounter++;

				});
			}
			return _tempPointsArr;
		},

		_panOrMoveMainScroll = function(axis, delta) {

			var panFriction,
				newOffset = _panOffset[axis] + delta[axis],
				startOverDiff,
				dir = delta[axis] > 0,
				newMainScrollPosition = _mainScrollPos.x + delta.x,
				mainScrollDiff = _mainScrollPos.x - _startMainScrollPos.x,
				newPanPos,
				newMainScrollPos;

			// calculate fdistance over the bounds and friction
			if(newOffset > _currPanBounds.min[axis] || newOffset < _currPanBounds.max[axis]) {
				panFriction = _options.panEndFriction;
				// Linear increasing of friction, so at 1/4 of viewport it's at max value. 
				// Looks not as nice as was expected. Left for history.
				// panFriction = (1 - (_panOffset[axis] + delta[axis] + panBounds.min[axis]) / (_viewportSize[axis] / 4) );
			} else {
				panFriction = 1;
			}
			
			newOffset = _panOffset[axis] + delta[axis] * panFriction;

			// move main scroll or start panning
			if(_options.allowPanToNext || _currZoomLevel === self.currItem.initialZoomLevel) {


				if(!_currZoomElementStyle) {
					
					newMainScrollPos = newMainScrollPosition;

				} else if(_direction === 'h' && axis === 'x' && !_zoomStarted ) {
					
					if(dir) {
						if(newOffset > _currPanBounds.min[axis]) {
							panFriction = _options.panEndFriction;
							_currPanBounds.min[axis] - newOffset;
							startOverDiff = _currPanBounds.min[axis] - _startPanOffset[axis];
						}
						
						// drag right
						if( (startOverDiff <= 0 || mainScrollDiff < 0) && _getNumItems() > 1 ) {
							newMainScrollPos = newMainScrollPosition;
							if(mainScrollDiff < 0 && newMainScrollPosition > _startMainScrollPos.x) {
								newMainScrollPos = _startMainScrollPos.x;
							}
						} else {
							if(_currPanBounds.min.x !== _currPanBounds.max.x) {
								newPanPos = newOffset;
							}
							
						}

					} else {

						if(newOffset < _currPanBounds.max[axis] ) {
							panFriction =_options.panEndFriction;
							newOffset - _currPanBounds.max[axis];
							startOverDiff = _startPanOffset[axis] - _currPanBounds.max[axis];
						}

						if( (startOverDiff <= 0 || mainScrollDiff > 0) && _getNumItems() > 1 ) {
							newMainScrollPos = newMainScrollPosition;

							if(mainScrollDiff > 0 && newMainScrollPosition < _startMainScrollPos.x) {
								newMainScrollPos = _startMainScrollPos.x;
							}

						} else {
							if(_currPanBounds.min.x !== _currPanBounds.max.x) {
								newPanPos = newOffset;
							}
						}

					}


					//
				}

				if(axis === 'x') {

					if(newMainScrollPos !== undefined) {
						_moveMainScroll(newMainScrollPos, true);
						if(newMainScrollPos === _startMainScrollPos.x) {
							_mainScrollShifted = false;
						} else {
							_mainScrollShifted = true;
						}
					}

					if(_currPanBounds.min.x !== _currPanBounds.max.x) {
						if(newPanPos !== undefined) {
							_panOffset.x = newPanPos;
						} else if(!_mainScrollShifted) {
							_panOffset.x += delta.x * panFriction;
						}
					}

					return newMainScrollPos !== undefined;
				}

			}

			if(!_mainScrollAnimating) {
				
				if(!_mainScrollShifted) {
					if(_currZoomLevel > self.currItem.fitRatio) {
						_panOffset[axis] += delta[axis] * panFriction;
					
					}
				}

				
			}
			
		},

		// Pointerdown/touchstart/mousedown handler
		_onDragStart = function(e) {

			// Allow dragging only via left mouse button.
			// As this handler is not added in IE8 - we ignore e.which
			// 
			// http://www.quirksmode.org/js/events_properties.html
			// https://developer.mozilla.org/en-US/docs/Web/API/event.button
			if(e.type === 'mousedown' && e.button > 0  ) {
				return;
			}

			if(_initialZoomRunning) {
				e.preventDefault();
				return;
			}

			if(_oldAndroidTouchEndTimeout && e.type === 'mousedown') {
				return;
			}

			if(_preventDefaultEventBehaviour(e, true)) {
				e.preventDefault();
			}



			_shout('pointerDown');

			if(_pointerEventEnabled) {
				var pointerIndex = framework.arraySearch(_currPointers, e.pointerId, 'id');
				if(pointerIndex < 0) {
					pointerIndex = _currPointers.length;
				}
				_currPointers[pointerIndex] = {x:e.pageX, y:e.pageY, id: e.pointerId};
			}
			


			var startPointsList = _getTouchPoints(e),
				numPoints = startPointsList.length;

			_currentPoints = null;

			_stopAllAnimations();

			// init drag
			if(!_isDragging || numPoints === 1) {

				

				_isDragging = _isFirstMove = true;
				framework.bind(window, _upMoveEvents, self);

				_isZoomingIn = 
					_wasOverInitialZoom = 
					_opacityChanged = 
					_verticalDragInitiated = 
					_mainScrollShifted = 
					_moved = 
					_isMultitouch = 
					_zoomStarted = false;

				_direction = null;

				_shout('firstTouchStart', startPointsList);

				_equalizePoints(_startPanOffset, _panOffset);

				_currPanDist.x = _currPanDist.y = 0;
				_equalizePoints(_currPoint, startPointsList[0]);
				_equalizePoints(_startPoint, _currPoint);

				//_equalizePoints(_startMainScrollPos, _mainScrollPos);
				_startMainScrollPos.x = _slideSize.x * _currPositionIndex;

				_posPoints = [{
					x: _currPoint.x,
					y: _currPoint.y
				}];

				_gestureCheckSpeedTime = _gestureStartTime = _getCurrentTime();

				//_mainScrollAnimationEnd(true);
				_calculatePanBounds( _currZoomLevel, true );
				
				// Start rendering
				_stopDragUpdateLoop();
				_dragUpdateLoop();
				
			}

			// init zoom
			if(!_isZooming && numPoints > 1 && !_mainScrollAnimating && !_mainScrollShifted) {
				_startZoomLevel = _currZoomLevel;
				_zoomStarted = false; // true if zoom changed at least once

				_isZooming = _isMultitouch = true;
				_currPanDist.y = _currPanDist.x = 0;

				_equalizePoints(_startPanOffset, _panOffset);

				_equalizePoints(p, startPointsList[0]);
				_equalizePoints(p2, startPointsList[1]);

				_findCenterOfPoints(p, p2, _currCenterPoint);

				_midZoomPoint.x = Math.abs(_currCenterPoint.x) - _panOffset.x;
				_midZoomPoint.y = Math.abs(_currCenterPoint.y) - _panOffset.y;
				_startPointsDistance = _calculatePointsDistance(p, p2);
			}


		},

		// Pointermove/touchmove/mousemove handler
		_onDragMove = function(e) {

			e.preventDefault();

			if(_pointerEventEnabled) {
				var pointerIndex = framework.arraySearch(_currPointers, e.pointerId, 'id');
				if(pointerIndex > -1) {
					var p = _currPointers[pointerIndex];
					p.x = e.pageX;
					p.y = e.pageY; 
				}
			}

			if(_isDragging) {
				var touchesList = _getTouchPoints(e);
				if(!_direction && !_moved && !_isZooming) {

					if(_mainScrollPos.x !== _slideSize.x * _currPositionIndex) {
						// if main scroll position is shifted – direction is always horizontal
						_direction = 'h';
					} else {
						var diff = Math.abs(touchesList[0].x - _currPoint.x) - Math.abs(touchesList[0].y - _currPoint.y);
						// check the direction of movement
						if(Math.abs(diff) >= DIRECTION_CHECK_OFFSET) {
							_direction = diff > 0 ? 'h' : 'v';
							_currentPoints = touchesList;
						}
					}
					
				} else {
					_currentPoints = touchesList;
				}
			}	
		},
		// 
		_renderMovement =  function() {

			if(!_currentPoints) {
				return;
			}

			var numPoints = _currentPoints.length;

			if(numPoints === 0) {
				return;
			}

			_equalizePoints(p, _currentPoints[0]);

			delta.x = p.x - _currPoint.x;
			delta.y = p.y - _currPoint.y;

			if(_isZooming && numPoints > 1) {
				// Handle behaviour for more than 1 point

				_currPoint.x = p.x;
				_currPoint.y = p.y;
			
				// check if one of two points changed
				if( !delta.x && !delta.y && _isEqualPoints(_currentPoints[1], p2) ) {
					return;
				}

				_equalizePoints(p2, _currentPoints[1]);


				if(!_zoomStarted) {
					_zoomStarted = true;
					_shout('zoomGestureStarted');
				}
				
				// Distance between two points
				var pointsDistance = _calculatePointsDistance(p,p2);

				var zoomLevel = _calculateZoomLevel(pointsDistance);

				// slightly over the of initial zoom level
				if(zoomLevel > self.currItem.initialZoomLevel + self.currItem.initialZoomLevel / 15) {
					_wasOverInitialZoom = true;
				}

				// Apply the friction if zoom level is out of the bounds
				var zoomFriction = 1,
					minZoomLevel = _getMinZoomLevel(),
					maxZoomLevel = _getMaxZoomLevel();

				if ( zoomLevel < minZoomLevel ) {
					
					if(_options.pinchToClose && !_wasOverInitialZoom && _startZoomLevel <= self.currItem.initialZoomLevel) {
						// fade out background if zooming out
						var minusDiff = minZoomLevel - zoomLevel;
						var percent = 1 - minusDiff / (minZoomLevel / 1.2);

						_applyBgOpacity(percent);
						_shout('onPinchClose', percent);
						_opacityChanged = true;
					} else {
						zoomFriction = (minZoomLevel - zoomLevel) / minZoomLevel;
						if(zoomFriction > 1) {
							zoomFriction = 1;
						}
						zoomLevel = minZoomLevel - zoomFriction * (minZoomLevel / 3);
					}
					
				} else if ( zoomLevel > maxZoomLevel ) {
					// 1.5 - extra zoom level above the max. E.g. if max is x6, real max 6 + 1.5 = 7.5
					zoomFriction = (zoomLevel - maxZoomLevel) / ( minZoomLevel * 6 );
					if(zoomFriction > 1) {
						zoomFriction = 1;
					}
					zoomLevel = maxZoomLevel + zoomFriction * minZoomLevel;
				}

				if(zoomFriction < 0) {
					zoomFriction = 0;
				}

				// _centerPoint - The point in the middle of two pointers
				_findCenterOfPoints(p, p2, _centerPoint);
			
				// paning with two pointers pressed
				_currPanDist.x += _centerPoint.x - _currCenterPoint.x;
				_currPanDist.y += _centerPoint.y - _currCenterPoint.y;
				_equalizePoints(_currCenterPoint, _centerPoint);

				_panOffset.x = _calculatePanOffset('x', zoomLevel);
				_panOffset.y = _calculatePanOffset('y', zoomLevel);

				_isZoomingIn = zoomLevel > _currZoomLevel;
				_currZoomLevel = zoomLevel;
				_applyCurrentZoomPan();

			} else {

				// handle behaviour for one point (dragging or panning)

				if(!_direction) {
					return;
				}

				if(_isFirstMove) {
					_isFirstMove = false;

					// subtract drag distance that was used during the detection direction  

					if( Math.abs(delta.x) >= DIRECTION_CHECK_OFFSET) {
						delta.x -= _currentPoints[0].x - _startPoint.x;
					}
					
					if( Math.abs(delta.y) >= DIRECTION_CHECK_OFFSET) {
						delta.y -= _currentPoints[0].y - _startPoint.y;
					}
				}

				_currPoint.x = p.x;
				_currPoint.y = p.y;

				// do nothing if pointers position hasn't changed
				if(delta.x === 0 && delta.y === 0) {
					return;
				}

				if(_direction === 'v' && _options.closeOnVerticalDrag) {
					if(!_canPan()) {
						_currPanDist.y += delta.y;
						_panOffset.y += delta.y;

						var opacityRatio = _calculateVerticalDragOpacityRatio();

						_verticalDragInitiated = true;
						_shout('onVerticalDrag', opacityRatio);

						_applyBgOpacity(opacityRatio);
						_applyCurrentZoomPan();
						return ;
					}
				}

				_pushPosPoint(_getCurrentTime(), p.x, p.y);

				_moved = true;
				_currPanBounds = self.currItem.bounds;
				
				var mainScrollChanged = _panOrMoveMainScroll('x', delta);
				if(!mainScrollChanged) {
					_panOrMoveMainScroll('y', delta);

					_roundPoint(_panOffset);
					_applyCurrentZoomPan();
				}

			}

		},
		
		// Pointerup/pointercancel/touchend/touchcancel/mouseup event handler
		_onDragRelease = function(e) {

			if(_features.isOldAndroid ) {

				if(_oldAndroidTouchEndTimeout && e.type === 'mouseup') {
					return;
				}

				// on Android (v4.1, 4.2, 4.3 & possibly older) 
				// ghost mousedown/up event isn't preventable via e.preventDefault,
				// which causes fake mousedown event
				// so we block mousedown/up for 600ms
				if( e.type.indexOf('touch') > -1 ) {
					clearTimeout(_oldAndroidTouchEndTimeout);
					_oldAndroidTouchEndTimeout = setTimeout(function() {
						_oldAndroidTouchEndTimeout = 0;
					}, 600);
				}
				
			}

			_shout('pointerUp');

			if(_preventDefaultEventBehaviour(e, false)) {
				e.preventDefault();
			}

			var releasePoint;

			if(_pointerEventEnabled) {
				var pointerIndex = framework.arraySearch(_currPointers, e.pointerId, 'id');
				
				if(pointerIndex > -1) {
					releasePoint = _currPointers.splice(pointerIndex, 1)[0];

					if(navigator.msPointerEnabled) {
						var MSPOINTER_TYPES = {
							4: 'mouse', // event.MSPOINTER_TYPE_MOUSE
							2: 'touch', // event.MSPOINTER_TYPE_TOUCH 
							3: 'pen' // event.MSPOINTER_TYPE_PEN
						};
						releasePoint.type = MSPOINTER_TYPES[e.pointerType];

						if(!releasePoint.type) {
							releasePoint.type = e.pointerType || 'mouse';
						}
					} else {
						releasePoint.type = e.pointerType || 'mouse';
					}

				}
			}

			var touchList = _getTouchPoints(e),
				gestureType,
				numPoints = touchList.length;

			if(e.type === 'mouseup') {
				numPoints = 0;
			}

			// Do nothing if there were 3 touch points or more
			if(numPoints === 2) {
				_currentPoints = null;
				return true;
			}

			// if second pointer released
			if(numPoints === 1) {
				_equalizePoints(_startPoint, touchList[0]);
			}				


			// pointer hasn't moved, send "tap release" point
			if(numPoints === 0 && !_direction && !_mainScrollAnimating) {
				if(!releasePoint) {
					if(e.type === 'mouseup') {
						releasePoint = {x: e.pageX, y: e.pageY, type:'mouse'};
					} else if(e.changedTouches && e.changedTouches[0]) {
						releasePoint = {x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY, type:'touch'};
					}		
				}

				_shout('touchRelease', e, releasePoint);
			}

			// Difference in time between releasing of two last touch points (zoom gesture)
			var releaseTimeDiff = -1;

			// Gesture completed, no pointers left
			if(numPoints === 0) {
				_isDragging = false;
				framework.unbind(window, _upMoveEvents, self);

				_stopDragUpdateLoop();

				if(_isZooming) {
					// Two points released at the same time
					releaseTimeDiff = 0;
				} else if(_lastReleaseTime !== -1) {
					releaseTimeDiff = _getCurrentTime() - _lastReleaseTime;
				}
			}
			_lastReleaseTime = numPoints === 1 ? _getCurrentTime() : -1;
			
			if(releaseTimeDiff !== -1 && releaseTimeDiff < 150) {
				gestureType = 'zoom';
			} else {
				gestureType = 'swipe';
			}

			if(_isZooming && numPoints < 2) {
				_isZooming = false;

				// Only second point released
				if(numPoints === 1) {
					gestureType = 'zoomPointerUp';
				}
				_shout('zoomGestureEnded');
			}

			_currentPoints = null;
			if(!_moved && !_zoomStarted && !_mainScrollAnimating && !_verticalDragInitiated) {
				// nothing to animate
				return;
			}
		
			_stopAllAnimations();

			
			if(!_releaseAnimData) {
				_releaseAnimData = _initDragReleaseAnimationData();
			}
			
			_releaseAnimData.calculateSwipeSpeed('x');


			if(_verticalDragInitiated) {

				var opacityRatio = _calculateVerticalDragOpacityRatio();

				if(opacityRatio < _options.verticalDragRange) {
					self.close();
				} else {
					var initalPanY = _panOffset.y,
						initialBgOpacity = _bgOpacity;

					_animateProp('verticalDrag', 0, 1, 300, framework.easing.cubic.out, function(now) {
						
						_panOffset.y = (self.currItem.initialPosition.y - initalPanY) * now + initalPanY;

						_applyBgOpacity(  (1 - initialBgOpacity) * now + initialBgOpacity );
						_applyCurrentZoomPan();
					});

					_shout('onVerticalDrag', 1);
				}

				return;
			}


			// main scroll 
			if(  (_mainScrollShifted || _mainScrollAnimating) && numPoints === 0) {
				var itemChanged = _finishSwipeMainScrollGesture(gestureType, _releaseAnimData);
				if(itemChanged) {
					return;
				}
				gestureType = 'zoomPointerUp';
			}

			// prevent zoom/pan animation when main scroll animation runs
			if(_mainScrollAnimating) {
				return;
			}
			
			// Complete simple zoom gesture (reset zoom level if it's out of the bounds)  
			if(gestureType !== 'swipe') {
				_completeZoomGesture();
				return;
			}
		
			// Complete pan gesture if main scroll is not shifted, and it's possible to pan current image
			if(!_mainScrollShifted && _currZoomLevel > self.currItem.fitRatio) {
				_completePanGesture(_releaseAnimData);
			}
		},


		// Returns object with data about gesture
		// It's created only once and then reused
		_initDragReleaseAnimationData  = function() {
			// temp local vars
			var lastFlickDuration,
				tempReleasePos;

			// s = this
			var s = {
				lastFlickOffset: {},
				lastFlickDist: {},
				lastFlickSpeed: {},
				slowDownRatio:  {},
				slowDownRatioReverse:  {},
				speedDecelerationRatio:  {},
				speedDecelerationRatioAbs:  {},
				distanceOffset:  {},
				backAnimDestination: {},
				backAnimStarted: {},
				calculateSwipeSpeed: function(axis) {
					

					if( _posPoints.length > 1) {
						lastFlickDuration = _getCurrentTime() - _gestureCheckSpeedTime + 50;
						tempReleasePos = _posPoints[_posPoints.length-2][axis];
					} else {
						lastFlickDuration = _getCurrentTime() - _gestureStartTime; // total gesture duration
						tempReleasePos = _startPoint[axis];
					}
					s.lastFlickOffset[axis] = _currPoint[axis] - tempReleasePos;
					s.lastFlickDist[axis] = Math.abs(s.lastFlickOffset[axis]);
					if(s.lastFlickDist[axis] > 20) {
						s.lastFlickSpeed[axis] = s.lastFlickOffset[axis] / lastFlickDuration;
					} else {
						s.lastFlickSpeed[axis] = 0;
					}
					if( Math.abs(s.lastFlickSpeed[axis]) < 0.1 ) {
						s.lastFlickSpeed[axis] = 0;
					}
					
					s.slowDownRatio[axis] = 0.95;
					s.slowDownRatioReverse[axis] = 1 - s.slowDownRatio[axis];
					s.speedDecelerationRatio[axis] = 1;
				},

				calculateOverBoundsAnimOffset: function(axis, speed) {
					if(!s.backAnimStarted[axis]) {

						if(_panOffset[axis] > _currPanBounds.min[axis]) {
							s.backAnimDestination[axis] = _currPanBounds.min[axis];
							
						} else if(_panOffset[axis] < _currPanBounds.max[axis]) {
							s.backAnimDestination[axis] = _currPanBounds.max[axis];
						}

						if(s.backAnimDestination[axis] !== undefined) {
							s.slowDownRatio[axis] = 0.7;
							s.slowDownRatioReverse[axis] = 1 - s.slowDownRatio[axis];
							if(s.speedDecelerationRatioAbs[axis] < 0.05) {

								s.lastFlickSpeed[axis] = 0;
								s.backAnimStarted[axis] = true;

								_animateProp('bounceZoomPan'+axis,_panOffset[axis], 
									s.backAnimDestination[axis], 
									speed || 300, 
									framework.easing.sine.out, 
									function(pos) {
										_panOffset[axis] = pos;
										_applyCurrentZoomPan();
									}
								);

							}
						}
					}
				},

				// Reduces the speed by slowDownRatio (per 10ms)
				calculateAnimOffset: function(axis) {
					if(!s.backAnimStarted[axis]) {
						s.speedDecelerationRatio[axis] = s.speedDecelerationRatio[axis] * (s.slowDownRatio[axis] + 
													s.slowDownRatioReverse[axis] - 
													s.slowDownRatioReverse[axis] * s.timeDiff / 10);

						s.speedDecelerationRatioAbs[axis] = Math.abs(s.lastFlickSpeed[axis] * s.speedDecelerationRatio[axis]);
						s.distanceOffset[axis] = s.lastFlickSpeed[axis] * s.speedDecelerationRatio[axis] * s.timeDiff;
						_panOffset[axis] += s.distanceOffset[axis];

					}
				},

				panAnimLoop: function() {
					if ( _animations.zoomPan ) {
						_animations.zoomPan.raf = _requestAF(s.panAnimLoop);

						s.now = _getCurrentTime();
						s.timeDiff = s.now - s.lastNow;
						s.lastNow = s.now;
						
						s.calculateAnimOffset('x');
						s.calculateAnimOffset('y');

						_applyCurrentZoomPan();
						
						s.calculateOverBoundsAnimOffset('x');
						s.calculateOverBoundsAnimOffset('y');


						if (s.speedDecelerationRatioAbs.x < 0.05 && s.speedDecelerationRatioAbs.y < 0.05) {

							// round pan position
							_panOffset.x = Math.round(_panOffset.x);
							_panOffset.y = Math.round(_panOffset.y);
							_applyCurrentZoomPan();
							
							_stopAnimation('zoomPan');
							return;
						}
					}

				}
			};
			return s;
		},

		_completePanGesture = function(animData) {
			// calculate swipe speed for Y axis (paanning)
			animData.calculateSwipeSpeed('y');

			_currPanBounds = self.currItem.bounds;
			
			animData.backAnimDestination = {};
			animData.backAnimStarted = {};

			// Avoid acceleration animation if speed is too low
			if(Math.abs(animData.lastFlickSpeed.x) <= 0.05 && Math.abs(animData.lastFlickSpeed.y) <= 0.05 ) {
				animData.speedDecelerationRatioAbs.x = animData.speedDecelerationRatioAbs.y = 0;

				// Run pan drag release animation. E.g. if you drag image and release finger without momentum.
				animData.calculateOverBoundsAnimOffset('x');
				animData.calculateOverBoundsAnimOffset('y');
				return true;
			}

			// Animation loop that controls the acceleration after pan gesture ends
			_registerStartAnimation('zoomPan');
			animData.lastNow = _getCurrentTime();
			animData.panAnimLoop();
		},


		_finishSwipeMainScrollGesture = function(gestureType, _releaseAnimData) {
			var itemChanged;
			if(!_mainScrollAnimating) {
				_currZoomedItemIndex = _currentItemIndex;
			}


			
			var itemsDiff;

			if(gestureType === 'swipe') {
				var totalShiftDist = _currPoint.x - _startPoint.x,
					isFastLastFlick = _releaseAnimData.lastFlickDist.x < 10;

				// if container is shifted for more than MIN_SWIPE_DISTANCE, 
				// and last flick gesture was in right direction
				if(totalShiftDist > MIN_SWIPE_DISTANCE && 
					(isFastLastFlick || _releaseAnimData.lastFlickOffset.x > 20) ) {
					// go to prev item
					itemsDiff = -1;
				} else if(totalShiftDist < -MIN_SWIPE_DISTANCE && 
					(isFastLastFlick || _releaseAnimData.lastFlickOffset.x < -20) ) {
					// go to next item
					itemsDiff = 1;
				}
			}

			var nextCircle;

			if(itemsDiff) {
				
				_currentItemIndex += itemsDiff;

				if(_currentItemIndex < 0) {
					_currentItemIndex = _options.loop ? _getNumItems()-1 : 0;
					nextCircle = true;
				} else if(_currentItemIndex >= _getNumItems()) {
					_currentItemIndex = _options.loop ? 0 : _getNumItems()-1;
					nextCircle = true;
				}

				if(!nextCircle || _options.loop) {
					_indexDiff += itemsDiff;
					_currPositionIndex -= itemsDiff;
					itemChanged = true;
				}
				

				
			}

			var animateToX = _slideSize.x * _currPositionIndex;
			var animateToDist = Math.abs( animateToX - _mainScrollPos.x );
			var finishAnimDuration;


			if(!itemChanged && animateToX > _mainScrollPos.x !== _releaseAnimData.lastFlickSpeed.x > 0) {
				// "return to current" duration, e.g. when dragging from slide 0 to -1
				finishAnimDuration = 333; 
			} else {
				finishAnimDuration = Math.abs(_releaseAnimData.lastFlickSpeed.x) > 0 ? 
										animateToDist / Math.abs(_releaseAnimData.lastFlickSpeed.x) : 
										333;

				finishAnimDuration = Math.min(finishAnimDuration, 400);
				finishAnimDuration = Math.max(finishAnimDuration, 250);
			}

			if(_currZoomedItemIndex === _currentItemIndex) {
				itemChanged = false;
			}
			
			_mainScrollAnimating = true;
			
			_shout('mainScrollAnimStart');

			_animateProp('mainScroll', _mainScrollPos.x, animateToX, finishAnimDuration, framework.easing.cubic.out, 
				_moveMainScroll,
				function() {
					_stopAllAnimations();
					_mainScrollAnimating = false;
					_currZoomedItemIndex = -1;
					
					if(itemChanged || _currZoomedItemIndex !== _currentItemIndex) {
						self.updateCurrItem();
					}
					
					_shout('mainScrollAnimComplete');
				}
			);

			if(itemChanged) {
				self.updateCurrItem(true);
			}

			return itemChanged;
		},

		_calculateZoomLevel = function(touchesDistance) {
			return  1 / _startPointsDistance * touchesDistance * _startZoomLevel;
		},

		// Resets zoom if it's out of bounds
		_completeZoomGesture = function() {
			var destZoomLevel = _currZoomLevel,
				minZoomLevel = _getMinZoomLevel(),
				maxZoomLevel = _getMaxZoomLevel();

			if ( _currZoomLevel < minZoomLevel ) {
				destZoomLevel = minZoomLevel;
			} else if ( _currZoomLevel > maxZoomLevel ) {
				destZoomLevel = maxZoomLevel;
			}

			var destOpacity = 1,
				onUpdate,
				initialOpacity = _bgOpacity;

			if(_opacityChanged && !_isZoomingIn && !_wasOverInitialZoom && _currZoomLevel < minZoomLevel) {
				//_closedByScroll = true;
				self.close();
				return true;
			}

			if(_opacityChanged) {
				onUpdate = function(now) {
					_applyBgOpacity(  (destOpacity - initialOpacity) * now + initialOpacity );
				};
			}

			self.zoomTo(destZoomLevel, 0, 200,  framework.easing.cubic.out, onUpdate);
			return true;
		};


	_registerModule('Gestures', {
		publicMethods: {

			initGestures: function() {

				// helper function that builds touch/pointer/mouse events
				var addEventNames = function(pref, down, move, up, cancel) {
					_dragStartEvent = pref + down;
					_dragMoveEvent = pref + move;
					_dragEndEvent = pref + up;
					if(cancel) {
						_dragCancelEvent = pref + cancel;
					} else {
						_dragCancelEvent = '';
					}
				};

				_pointerEventEnabled = _features.pointerEvent;
				if(_pointerEventEnabled && _features.touch) {
					// we don't need touch events, if browser supports pointer events
					_features.touch = false;
				}

				if(_pointerEventEnabled) {
					if(navigator.msPointerEnabled) {
						// IE10 pointer events are case-sensitive
						addEventNames('MSPointer', 'Down', 'Move', 'Up', 'Cancel');
					} else {
						addEventNames('pointer', 'down', 'move', 'up', 'cancel');
					}
				} else if(_features.touch) {
					addEventNames('touch', 'start', 'move', 'end', 'cancel');
					_likelyTouchDevice = true;
				} else {
					addEventNames('mouse', 'down', 'move', 'up');	
				}

				_upMoveEvents = _dragMoveEvent + ' ' + _dragEndEvent  + ' ' +  _dragCancelEvent;
				_downEvents = _dragStartEvent;

				if(_pointerEventEnabled && !_likelyTouchDevice) {
					_likelyTouchDevice = (navigator.maxTouchPoints > 1) || (navigator.msMaxTouchPoints > 1);
				}
				// make variable public
				self.likelyTouchDevice = _likelyTouchDevice; 
				
				_globalEventHandlers[_dragStartEvent] = _onDragStart;
				_globalEventHandlers[_dragMoveEvent] = _onDragMove;
				_globalEventHandlers[_dragEndEvent] = _onDragRelease; // the Kraken

				if(_dragCancelEvent) {
					_globalEventHandlers[_dragCancelEvent] = _globalEventHandlers[_dragEndEvent];
				}

				// Bind mouse events on device with detected hardware touch support, in case it supports multiple types of input.
				if(_features.touch) {
					_downEvents += ' mousedown';
					_upMoveEvents += ' mousemove mouseup';
					_globalEventHandlers.mousedown = _globalEventHandlers[_dragStartEvent];
					_globalEventHandlers.mousemove = _globalEventHandlers[_dragMoveEvent];
					_globalEventHandlers.mouseup = _globalEventHandlers[_dragEndEvent];
				}

				if(!_likelyTouchDevice) {
					// don't allow pan to next slide from zoomed state on Desktop
					_options.allowPanToNext = false;
				}
			}

		}
	});


	/*>>gestures*/

	/*>>show-hide-transition*/
	/**
	 * show-hide-transition.js:
	 *
	 * Manages initial opening or closing transition.
	 *
	 * If you're not planning to use transition for gallery at all,
	 * you may set options hideAnimationDuration and showAnimationDuration to 0,
	 * and just delete startAnimation function.
	 * 
	 */


	var _showOrHideTimeout,
		_showOrHide = function(item, img, out, completeFn) {

			if(_showOrHideTimeout) {
				clearTimeout(_showOrHideTimeout);
			}

			_initialZoomRunning = true;
			_initialContentSet = true;
			
			// dimensions of small thumbnail {x:,y:,w:}.
			// Height is optional, as calculated based on large image.
			var thumbBounds; 
			if(item.initialLayout) {
				thumbBounds = item.initialLayout;
				item.initialLayout = null;
			} else {
				thumbBounds = _options.getThumbBoundsFn && _options.getThumbBoundsFn(_currentItemIndex);
			}

			var duration = out ? _options.hideAnimationDuration : _options.showAnimationDuration;

			var onComplete = function() {
				_stopAnimation('initialZoom');
				if(!out) {
					_applyBgOpacity(1);
					if(img) {
						img.style.display = 'block';
					}
					framework.addClass(template, 'pswp--animated-in');
					_shout('initialZoom' + (out ? 'OutEnd' : 'InEnd'));
				} else {
					self.template.removeAttribute('style');
					self.bg.removeAttribute('style');
				}

				if(completeFn) {
					completeFn();
				}
				_initialZoomRunning = false;
			};

			// if bounds aren't provided, just open gallery without animation
			if(!duration || !thumbBounds || thumbBounds.x === undefined) {

				_shout('initialZoom' + (out ? 'Out' : 'In') );

				_currZoomLevel = item.initialZoomLevel;
				_equalizePoints(_panOffset,  item.initialPosition );
				_applyCurrentZoomPan();

				template.style.opacity = out ? 0 : 1;
				_applyBgOpacity(1);

				if(duration) {
					setTimeout(function() {
						onComplete();
					}, duration);
				} else {
					onComplete();
				}

				return;
			}

			var startAnimation = function() {
				var closeWithRaf = _closedByScroll,
					fadeEverything = !self.currItem.src || self.currItem.loadError || _options.showHideOpacity;
				
				// apply hw-acceleration to image
				if(item.miniImg) {
					item.miniImg.style.webkitBackfaceVisibility = 'hidden';
				}

				if(!out) {
					_currZoomLevel = thumbBounds.w / item.w;
					_panOffset.x = thumbBounds.x;
					_panOffset.y = thumbBounds.y - _initalWindowScrollY;

					self[fadeEverything ? 'template' : 'bg'].style.opacity = 0.001;
					_applyCurrentZoomPan();
				}

				_registerStartAnimation('initialZoom');
				
				if(out && !closeWithRaf) {
					framework.removeClass(template, 'pswp--animated-in');
				}

				if(fadeEverything) {
					if(out) {
						framework[ (closeWithRaf ? 'remove' : 'add') + 'Class' ](template, 'pswp--animate_opacity');
					} else {
						setTimeout(function() {
							framework.addClass(template, 'pswp--animate_opacity');
						}, 30);
					}
				}

				_showOrHideTimeout = setTimeout(function() {

					_shout('initialZoom' + (out ? 'Out' : 'In') );
					

					if(!out) {

						// "in" animation always uses CSS transitions (instead of rAF).
						// CSS transition work faster here, 
						// as developer may also want to animate other things, 
						// like ui on top of sliding area, which can be animated just via CSS
						
						_currZoomLevel = item.initialZoomLevel;
						_equalizePoints(_panOffset,  item.initialPosition );
						_applyCurrentZoomPan();
						_applyBgOpacity(1);

						if(fadeEverything) {
							template.style.opacity = 1;
						} else {
							_applyBgOpacity(1);
						}

						_showOrHideTimeout = setTimeout(onComplete, duration + 20);
					} else {

						// "out" animation uses rAF only when PhotoSwipe is closed by browser scroll, to recalculate position
						var destZoomLevel = thumbBounds.w / item.w,
							initialPanOffset = {
								x: _panOffset.x,
								y: _panOffset.y
							},
							initialZoomLevel = _currZoomLevel,
							initalBgOpacity = _bgOpacity,
							onUpdate = function(now) {
								
								if(now === 1) {
									_currZoomLevel = destZoomLevel;
									_panOffset.x = thumbBounds.x;
									_panOffset.y = thumbBounds.y  - _currentWindowScrollY;
								} else {
									_currZoomLevel = (destZoomLevel - initialZoomLevel) * now + initialZoomLevel;
									_panOffset.x = (thumbBounds.x - initialPanOffset.x) * now + initialPanOffset.x;
									_panOffset.y = (thumbBounds.y - _currentWindowScrollY - initialPanOffset.y) * now + initialPanOffset.y;
								}
								
								_applyCurrentZoomPan();
								if(fadeEverything) {
									template.style.opacity = 1 - now;
								} else {
									_applyBgOpacity( initalBgOpacity - now * initalBgOpacity );
								}
							};

						if(closeWithRaf) {
							_animateProp('initialZoom', 0, 1, duration, framework.easing.cubic.out, onUpdate, onComplete);
						} else {
							onUpdate(1);
							_showOrHideTimeout = setTimeout(onComplete, duration + 20);
						}
					}
				
				}, out ? 25 : 90); // Main purpose of this delay is to give browser time to paint and
						// create composite layers of PhotoSwipe UI parts (background, controls, caption, arrows).
						// Which avoids lag at the beginning of scale transition.
			};
			startAnimation();

			
		};

	/*>>show-hide-transition*/

	/*>>items-controller*/
	/**
	*
	* Controller manages gallery items, their dimensions, and their content.
	* 
	*/

	var _items,
		_tempPanAreaSize = {},
		_imagesToAppendPool = [],
		_initialContentSet,
		_initialZoomRunning,
		_controllerDefaultOptions = {
			index: 0,
			errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
			forceProgressiveLoading: false, // TODO
			preload: [1,1],
			getNumItemsFn: function() {
				return _items.length;
			}
		};


	var _getItemAt,
		_getNumItems,
		_getZeroBounds = function() {
			return {
				center:{x:0,y:0}, 
				max:{x:0,y:0}, 
				min:{x:0,y:0}
			};
		},
		_calculateSingleItemPanBounds = function(item, realPanElementW, realPanElementH ) {
			var bounds = item.bounds;

			// position of element when it's centered
			bounds.center.x = Math.round((_tempPanAreaSize.x - realPanElementW) / 2);
			bounds.center.y = Math.round((_tempPanAreaSize.y - realPanElementH) / 2) + item.vGap.top;

			// maximum pan position
			bounds.max.x = (realPanElementW > _tempPanAreaSize.x) ? 
								Math.round(_tempPanAreaSize.x - realPanElementW) : 
								bounds.center.x;
			
			bounds.max.y = (realPanElementH > _tempPanAreaSize.y) ? 
								Math.round(_tempPanAreaSize.y - realPanElementH) + item.vGap.top : 
								bounds.center.y;
			
			// minimum pan position
			bounds.min.x = (realPanElementW > _tempPanAreaSize.x) ? 0 : bounds.center.x;
			bounds.min.y = (realPanElementH > _tempPanAreaSize.y) ? item.vGap.top : bounds.center.y;
		},
		_calculateItemSize = function(item, viewportSize, zoomLevel) {

			if (item.src && !item.loadError) {
				var isInitial = !zoomLevel;
				
				if(isInitial) {
					if(!item.vGap) {
						item.vGap = {top:0,bottom:0};
					}
					// allows overriding vertical margin for individual items
					_shout('parseVerticalMargin', item);
				}


				_tempPanAreaSize.x = viewportSize.x;
				_tempPanAreaSize.y = viewportSize.y - item.vGap.top - item.vGap.bottom;

				if (isInitial) {
					var hRatio = _tempPanAreaSize.x / item.w;
					var vRatio = _tempPanAreaSize.y / item.h;

					item.fitRatio = hRatio < vRatio ? hRatio : vRatio;
					//item.fillRatio = hRatio > vRatio ? hRatio : vRatio;

					var scaleMode = _options.scaleMode;

					if (scaleMode === 'orig') {
						zoomLevel = 1;
					} else if (scaleMode === 'fit') {
						zoomLevel = item.fitRatio;
					}

					if (zoomLevel > 1) {
						zoomLevel = 1;
					}

					item.initialZoomLevel = zoomLevel;
					
					if(!item.bounds) {
						// reuse bounds object
						item.bounds = _getZeroBounds(); 
					}
				}

				if(!zoomLevel) {
					return;
				}

				_calculateSingleItemPanBounds(item, item.w * zoomLevel, item.h * zoomLevel);

				if (isInitial && zoomLevel === item.initialZoomLevel) {
					item.initialPosition = item.bounds.center;
				}

				return item.bounds;
			} else {
				item.w = item.h = 0;
				item.initialZoomLevel = item.fitRatio = 1;
				item.bounds = _getZeroBounds();
				item.initialPosition = item.bounds.center;

				// if it's not image, we return zero bounds (content is not zoomable)
				return item.bounds;
			}
			
		},

		


		_appendImage = function(index, item, baseDiv, img, preventAnimation, keepPlaceholder) {
			

			if(item.loadError) {
				return;
			}

			if(img) {

				item.imageAppended = true;
				_setImageSize(item, img, (item === self.currItem && _renderMaxResolution) );
				
				baseDiv.appendChild(img);

				if(keepPlaceholder) {
					setTimeout(function() {
						if(item && item.loaded && item.placeholder) {
							item.placeholder.style.display = 'none';
							item.placeholder = null;
						}
					}, 500);
				}
			}
		},
		


		_preloadImage = function(item) {
			item.loading = true;
			item.loaded = false;
			var img = item.img = framework.createEl('pswp__img', 'img');
			var onComplete = function() {
				item.loading = false;
				item.loaded = true;

				if(item.loadComplete) {
					item.loadComplete(item);
				} else {
					item.img = null; // no need to store image object
				}
				img.onload = img.onerror = null;
				img = null;
			};
			img.onload = onComplete;
			img.onerror = function() {
				item.loadError = true;
				onComplete();
			};		

			img.src = item.src;// + '?a=' + Math.random();

			return img;
		},
		_checkForError = function(item, cleanUp) {
			if(item.src && item.loadError && item.container) {

				if(cleanUp) {
					item.container.innerHTML = '';
				}

				item.container.innerHTML = _options.errorMsg.replace('%url%',  item.src );
				return true;
				
			}
		},
		_setImageSize = function(item, img, maxRes) {
			if(!item.src) {
				return;
			}

			if(!img) {
				img = item.container.lastChild;
			}

			var w = maxRes ? item.w : Math.round(item.w * item.fitRatio),
				h = maxRes ? item.h : Math.round(item.h * item.fitRatio);
			
			if(item.placeholder && !item.loaded) {
				item.placeholder.style.width = w + 'px';
				item.placeholder.style.height = h + 'px';
			}

			img.style.width = w + 'px';
			img.style.height = h + 'px';
		},
		_appendImagesPool = function() {

			if(_imagesToAppendPool.length) {
				var poolItem;

				for(var i = 0; i < _imagesToAppendPool.length; i++) {
					poolItem = _imagesToAppendPool[i];
					if( poolItem.holder.index === poolItem.index ) {
						_appendImage(poolItem.index, poolItem.item, poolItem.baseDiv, poolItem.img, false, poolItem.clearPlaceholder);
					}
				}
				_imagesToAppendPool = [];
			}
		};
		


	_registerModule('Controller', {

		publicMethods: {

			lazyLoadItem: function(index) {
				index = _getLoopedId(index);
				var item = _getItemAt(index);

				if(!item || ((item.loaded || item.loading) && !_itemsNeedUpdate)) {
					return;
				}

				_shout('gettingData', index, item);

				if (!item.src) {
					return;
				}

				_preloadImage(item);
			},
			initController: function() {
				framework.extend(_options, _controllerDefaultOptions, true);
				self.items = _items = items;
				_getItemAt = self.getItemAt;
				_getNumItems = _options.getNumItemsFn; //self.getNumItems;
				if(_getNumItems() < 3) {
					_options.loop = false; // disable loop if less then 3 items
				}

				_listen('beforeChange', function(diff) {

					var p = _options.preload,
						isNext = diff === null ? true : (diff >= 0),
						preloadBefore = Math.min(p[0], _getNumItems() ),
						preloadAfter = Math.min(p[1], _getNumItems() ),
						i;


					for(i = 1; i <= (isNext ? preloadAfter : preloadBefore); i++) {
						self.lazyLoadItem(_currentItemIndex+i);
					}
					for(i = 1; i <= (isNext ? preloadBefore : preloadAfter); i++) {
						self.lazyLoadItem(_currentItemIndex-i);
					}
				});

				_listen('initialLayout', function() {
					self.currItem.initialLayout = _options.getThumbBoundsFn && _options.getThumbBoundsFn(_currentItemIndex);
				});

				_listen('mainScrollAnimComplete', _appendImagesPool);
				_listen('initialZoomInEnd', _appendImagesPool);



				_listen('destroy', function() {
					var item;
					for(var i = 0; i < _items.length; i++) {
						item = _items[i];
						// remove reference to DOM elements, for GC
						if(item.container) {
							item.container = null; 
						}
						if(item.placeholder) {
							item.placeholder = null;
						}
						if(item.img) {
							item.img = null;
						}
						if(item.preloader) {
							item.preloader = null;
						}
						if(item.loadError) {
							item.loaded = item.loadError = false;
						}
					}
					_imagesToAppendPool = null;
				});
			},


			getItemAt: function(index) {
				if (index >= 0) {
					return _items[index] !== undefined ? _items[index] : false;
				}
				return false;
			},

			allowProgressiveImg: function() {
				// 1. Progressive image loading isn't working on webkit/blink 
				//    when hw-acceleration (e.g. translateZ) is applied to IMG element.
				//    That's why in PhotoSwipe parent element gets zoom transform, not image itself.
				//    
				// 2. Progressive image loading sometimes blinks in webkit/blink when applying animation to parent element.
				//    That's why it's disabled on touch devices (mainly because of swipe transition)
				//    
				// 3. Progressive image loading sometimes doesn't work in IE (up to 11).

				// Don't allow progressive loading on non-large touch devices
				return _options.forceProgressiveLoading || !_likelyTouchDevice || _options.mouseUsed || screen.width > 1200; 
				// 1200 - to eliminate touch devices with large screen (like Chromebook Pixel)
			},

			setContent: function(holder, index) {

				if(_options.loop) {
					index = _getLoopedId(index);
				}

				var prevItem = self.getItemAt(holder.index);
				if(prevItem) {
					prevItem.container = null;
				}
		
				var item = self.getItemAt(index),
					img;
				
				if(!item) {
					holder.el.innerHTML = '';
					return;
				}

				// allow to override data
				_shout('gettingData', index, item);

				holder.index = index;
				holder.item = item;

				// base container DIV is created only once for each of 3 holders
				var baseDiv = item.container = framework.createEl('pswp__zoom-wrap'); 

				

				if(!item.src && item.html) {
					if(item.html.tagName) {
						baseDiv.appendChild(item.html);
					} else {
						baseDiv.innerHTML = item.html;
					}
				}

				_checkForError(item);

				_calculateItemSize(item, _viewportSize);
				
				if(item.src && !item.loadError && !item.loaded) {

					item.loadComplete = function(item) {

						// gallery closed before image finished loading
						if(!_isOpen) {
							return;
						}

						// check if holder hasn't changed while image was loading
						if(holder && holder.index === index ) {
							if( _checkForError(item, true) ) {
								item.loadComplete = item.img = null;
								_calculateItemSize(item, _viewportSize);
								_applyZoomPanToItem(item);

								if(holder.index === _currentItemIndex) {
									// recalculate dimensions
									self.updateCurrZoomItem();
								}
								return;
							}
							if( !item.imageAppended ) {
								if(_features.transform && (_mainScrollAnimating || _initialZoomRunning) ) {
									_imagesToAppendPool.push({
										item:item,
										baseDiv:baseDiv,
										img:item.img,
										index:index,
										holder:holder,
										clearPlaceholder:true
									});
								} else {
									_appendImage(index, item, baseDiv, item.img, _mainScrollAnimating || _initialZoomRunning, true);
								}
							} else {
								// remove preloader & mini-img
								if(!_initialZoomRunning && item.placeholder) {
									item.placeholder.style.display = 'none';
									item.placeholder = null;
								}
							}
						}

						item.loadComplete = null;
						item.img = null; // no need to store image element after it's added

						_shout('imageLoadComplete', index, item);
					};

					if(framework.features.transform) {
						
						var placeholderClassName = 'pswp__img pswp__img--placeholder'; 
						placeholderClassName += (item.msrc ? '' : ' pswp__img--placeholder--blank');

						var placeholder = framework.createEl(placeholderClassName, item.msrc ? 'img' : '');
						if(item.msrc) {
							placeholder.src = item.msrc;
						}
						
						_setImageSize(item, placeholder);

						baseDiv.appendChild(placeholder);
						item.placeholder = placeholder;

					}
					

					

					if(!item.loading) {
						_preloadImage(item);
					}


					if( self.allowProgressiveImg() ) {
						// just append image
						if(!_initialContentSet && _features.transform) {
							_imagesToAppendPool.push({
								item:item, 
								baseDiv:baseDiv, 
								img:item.img, 
								index:index, 
								holder:holder
							});
						} else {
							_appendImage(index, item, baseDiv, item.img, true, true);
						}
					}
					
				} else if(item.src && !item.loadError) {
					// image object is created every time, due to bugs of image loading & delay when switching images
					img = framework.createEl('pswp__img', 'img');
					img.style.opacity = 1;
					img.src = item.src;
					_setImageSize(item, img);
					_appendImage(index, item, baseDiv, img);
				}
				

				if(!_initialContentSet && index === _currentItemIndex) {
					_currZoomElementStyle = baseDiv.style;
					_showOrHide(item, (img ||item.img) );
				} else {
					_applyZoomPanToItem(item);
				}

				holder.el.innerHTML = '';
				holder.el.appendChild(baseDiv);
			},

			cleanSlide: function( item ) {
				if(item.img ) {
					item.img.onload = item.img.onerror = null;
				}
				item.loaded = item.loading = item.img = item.imageAppended = false;
			}

		}
	});

	/*>>items-controller*/

	/*>>tap*/
	/**
	 * tap.js:
	 *
	 * Displatches tap and double-tap events.
	 * 
	 */

	var tapTimer,
		tapReleasePoint = {},
		_dispatchTapEvent = function(origEvent, releasePoint, pointerType) {		
			var e = document.createEvent( 'CustomEvent' ),
				eDetail = {
					origEvent:origEvent, 
					target:origEvent.target, 
					releasePoint: releasePoint, 
					pointerType:pointerType || 'touch'
				};

			e.initCustomEvent( 'pswpTap', true, true, eDetail );
			origEvent.target.dispatchEvent(e);
		};

	_registerModule('Tap', {
		publicMethods: {
			initTap: function() {
				_listen('firstTouchStart', self.onTapStart);
				_listen('touchRelease', self.onTapRelease);
				_listen('destroy', function() {
					tapReleasePoint = {};
					tapTimer = null;
				});
			},
			onTapStart: function(touchList) {
				if(touchList.length > 1) {
					clearTimeout(tapTimer);
					tapTimer = null;
				}
			},
			onTapRelease: function(e, releasePoint) {
				if(!releasePoint) {
					return;
				}

				if(!_moved && !_isMultitouch && !_numAnimations) {
					var p0 = releasePoint;
					if(tapTimer) {
						clearTimeout(tapTimer);
						tapTimer = null;

						// Check if taped on the same place
						if ( _isNearbyPoints(p0, tapReleasePoint) ) {
							_shout('doubleTap', p0);
							return;
						}
					}

					if(releasePoint.type === 'mouse') {
						_dispatchTapEvent(e, releasePoint, 'mouse');
						return;
					}

					var clickedTagName = e.target.tagName.toUpperCase();
					// avoid double tap delay on buttons and elements that have class pswp__single-tap
					if(clickedTagName === 'BUTTON' || framework.hasClass(e.target, 'pswp__single-tap') ) {
						_dispatchTapEvent(e, releasePoint);
						return;
					}

					_equalizePoints(tapReleasePoint, p0);

					tapTimer = setTimeout(function() {
						_dispatchTapEvent(e, releasePoint);
						tapTimer = null;
					}, 300);
				}
			}
		}
	});

	/*>>tap*/

	/*>>desktop-zoom*/
	/**
	 *
	 * desktop-zoom.js:
	 *
	 * - Binds mousewheel event for paning zoomed image.
	 * - Manages "dragging", "zoomed-in", "zoom-out" classes.
	 *   (which are used for cursors and zoom icon)
	 * - Adds toggleDesktopZoom function.
	 * 
	 */

	var _wheelDelta;
		
	_registerModule('DesktopZoom', {

		publicMethods: {

			initDesktopZoom: function() {

				if(_oldIE) {
					// no zoom for old IE (<=8)
					return;
				}

				if(_likelyTouchDevice) {
					// if detected hardware touch support, we wait until mouse is used,
					// and only then apply desktop-zoom features
					_listen('mouseUsed', function() {
						self.setupDesktopZoom();
					});
				} else {
					self.setupDesktopZoom(true);
				}

			},

			setupDesktopZoom: function(onInit) {

				_wheelDelta = {};

				var events = 'wheel mousewheel DOMMouseScroll';
				
				_listen('bindEvents', function() {
					framework.bind(template, events,  self.handleMouseWheel);
				});

				_listen('unbindEvents', function() {
					if(_wheelDelta) {
						framework.unbind(template, events, self.handleMouseWheel);
					}
				});

				self.mouseZoomedIn = false;

				var hasDraggingClass,
					updateZoomable = function() {
						if(self.mouseZoomedIn) {
							framework.removeClass(template, 'pswp--zoomed-in');
							self.mouseZoomedIn = false;
						}
						if(_currZoomLevel < 1) {
							framework.addClass(template, 'pswp--zoom-allowed');
						} else {
							framework.removeClass(template, 'pswp--zoom-allowed');
						}
						removeDraggingClass();
					},
					removeDraggingClass = function() {
						if(hasDraggingClass) {
							framework.removeClass(template, 'pswp--dragging');
							hasDraggingClass = false;
						}
					};

				_listen('resize' , updateZoomable);
				_listen('afterChange' , updateZoomable);
				_listen('pointerDown', function() {
					if(self.mouseZoomedIn) {
						hasDraggingClass = true;
						framework.addClass(template, 'pswp--dragging');
					}
				});
				_listen('pointerUp', removeDraggingClass);

				if(!onInit) {
					updateZoomable();
				}
				
			},

			handleMouseWheel: function(e) {

				if(_currZoomLevel <= self.currItem.fitRatio) {
					if( _options.modal ) {

						if (!_options.closeOnScroll || _numAnimations || _isDragging) {
							e.preventDefault();
						} else if(_transformKey && Math.abs(e.deltaY) > 2) {
							// close PhotoSwipe
							// if browser supports transforms & scroll changed enough
							_closedByScroll = true;
							self.close();
						}

					}
					return true;
				}

				// allow just one event to fire
				e.stopPropagation();

				// https://developer.mozilla.org/en-US/docs/Web/Events/wheel
				_wheelDelta.x = 0;

				if('deltaX' in e) {
					if(e.deltaMode === 1 /* DOM_DELTA_LINE */) {
						// 18 - average line height
						_wheelDelta.x = e.deltaX * 18;
						_wheelDelta.y = e.deltaY * 18;
					} else {
						_wheelDelta.x = e.deltaX;
						_wheelDelta.y = e.deltaY;
					}
				} else if('wheelDelta' in e) {
					if(e.wheelDeltaX) {
						_wheelDelta.x = -0.16 * e.wheelDeltaX;
					}
					if(e.wheelDeltaY) {
						_wheelDelta.y = -0.16 * e.wheelDeltaY;
					} else {
						_wheelDelta.y = -0.16 * e.wheelDelta;
					}
				} else if('detail' in e) {
					_wheelDelta.y = e.detail;
				} else {
					return;
				}

				_calculatePanBounds(_currZoomLevel, true);

				var newPanX = _panOffset.x - _wheelDelta.x,
					newPanY = _panOffset.y - _wheelDelta.y;

				// only prevent scrolling in nonmodal mode when not at edges
				if (_options.modal ||
					(
					newPanX <= _currPanBounds.min.x && newPanX >= _currPanBounds.max.x &&
					newPanY <= _currPanBounds.min.y && newPanY >= _currPanBounds.max.y
					) ) {
					e.preventDefault();
				}

				// TODO: use rAF instead of mousewheel?
				self.panTo(newPanX, newPanY);
			},

			toggleDesktopZoom: function(centerPoint) {
				centerPoint = centerPoint || {x:_viewportSize.x/2 + _offset.x, y:_viewportSize.y/2 + _offset.y };

				var doubleTapZoomLevel = _options.getDoubleTapZoom(true, self.currItem);
				var zoomOut = _currZoomLevel === doubleTapZoomLevel;
				
				self.mouseZoomedIn = !zoomOut;

				self.zoomTo(zoomOut ? self.currItem.initialZoomLevel : doubleTapZoomLevel, centerPoint, 333);
				framework[ (!zoomOut ? 'add' : 'remove') + 'Class'](template, 'pswp--zoomed-in');
			}

		}
	});


	/*>>desktop-zoom*/

	/*>>history*/
	/**
	 *
	 * history.js:
	 *
	 * - Back button to close gallery.
	 * 
	 * - Unique URL for each slide: example.com/&pid=1&gid=3
	 *   (where PID is picture index, and GID and gallery index)
	 *   
	 * - Switch URL when slides change.
	 * 
	 */


	var _historyDefaultOptions = {
		history: true,
		galleryUID: 1
	};

	var _historyUpdateTimeout,
		_hashChangeTimeout,
		_hashAnimCheckTimeout,
		_hashChangedByScript,
		_hashChangedByHistory,
		_hashReseted,
		_initialHash,
		_historyChanged,
		_closedFromURL,
		_urlChangedOnce,
		_windowLoc,

		_supportsPushState,

		_getHash = function() {
			return _windowLoc.hash.substring(1);
		},
		_cleanHistoryTimeouts = function() {

			if(_historyUpdateTimeout) {
				clearTimeout(_historyUpdateTimeout);
			}

			if(_hashAnimCheckTimeout) {
				clearTimeout(_hashAnimCheckTimeout);
			}
		},

		// pid - Picture index
		// gid - Gallery index
		_parseItemIndexFromURL = function() {
			var hash = _getHash(),
				params = {};

			if(hash.length < 5) { // pid=1
				return params;
			}

			var i, vars = hash.split('&');
			for (i = 0; i < vars.length; i++) {
				if(!vars[i]) {
					continue;
				}
				var pair = vars[i].split('=');	
				if(pair.length < 2) {
					continue;
				}
				params[pair[0]] = pair[1];
			}
			if(_options.galleryPIDs) {
				// detect custom pid in hash and search for it among the items collection
				var searchfor = params.pid;
				params.pid = 0; // if custom pid cannot be found, fallback to the first item
				for(i = 0; i < _items.length; i++) {
					if(_items[i].pid === searchfor) {
						params.pid = i;
						break;
					}
				}
			} else {
				params.pid = parseInt(params.pid,10)-1;
			}
			if( params.pid < 0 ) {
				params.pid = 0;
			}
			return params;
		},
		_updateHash = function() {

			if(_hashAnimCheckTimeout) {
				clearTimeout(_hashAnimCheckTimeout);
			}


			if(_numAnimations || _isDragging) {
				// changing browser URL forces layout/paint in some browsers, which causes noticable lag during animation
				// that's why we update hash only when no animations running
				_hashAnimCheckTimeout = setTimeout(_updateHash, 500);
				return;
			}
			
			if(_hashChangedByScript) {
				clearTimeout(_hashChangeTimeout);
			} else {
				_hashChangedByScript = true;
			}


			var pid = (_currentItemIndex + 1);
			var item = _getItemAt( _currentItemIndex );
			if(item.hasOwnProperty('pid')) {
				// carry forward any custom pid assigned to the item
				pid = item.pid;
			}
			var newHash = _initialHash + '&'  +  'gid=' + _options.galleryUID + '&' + 'pid=' + pid;

			if(!_historyChanged) {
				if(_windowLoc.hash.indexOf(newHash) === -1) {
					_urlChangedOnce = true;
				}
				// first time - add new hisory record, then just replace
			}

			var newURL = _windowLoc.href.split('#')[0] + '#' +  newHash;

			if( _supportsPushState ) {

				if('#' + newHash !== window.location.hash) {
					history[_historyChanged ? 'replaceState' : 'pushState']('', document.title, newURL);
				}

			} else {
				if(_historyChanged) {
					_windowLoc.replace( newURL );
				} else {
					_windowLoc.hash = newHash;
				}
			}
			
			

			_historyChanged = true;
			_hashChangeTimeout = setTimeout(function() {
				_hashChangedByScript = false;
			}, 60);
		};



		

	_registerModule('History', {

		

		publicMethods: {
			initHistory: function() {

				framework.extend(_options, _historyDefaultOptions, true);

				if( !_options.history ) {
					return;
				}


				_windowLoc = window.location;
				_urlChangedOnce = false;
				_closedFromURL = false;
				_historyChanged = false;
				_initialHash = _getHash();
				_supportsPushState = ('pushState' in history);


				if(_initialHash.indexOf('gid=') > -1) {
					_initialHash = _initialHash.split('&gid=')[0];
					_initialHash = _initialHash.split('?gid=')[0];
				}
				

				_listen('afterChange', self.updateURL);
				_listen('unbindEvents', function() {
					framework.unbind(window, 'hashchange', self.onHashChange);
				});


				var returnToOriginal = function() {
					_hashReseted = true;
					if(!_closedFromURL) {

						if(_urlChangedOnce) {
							history.back();
						} else {

							if(_initialHash) {
								_windowLoc.hash = _initialHash;
							} else {
								if (_supportsPushState) {

									// remove hash from url without refreshing it or scrolling to top
									history.pushState('', document.title,  _windowLoc.pathname + _windowLoc.search );
								} else {
									_windowLoc.hash = '';
								}
							}
						}
						
					}

					_cleanHistoryTimeouts();
				};


				_listen('unbindEvents', function() {
					if(_closedByScroll) {
						// if PhotoSwipe is closed by scroll, we go "back" before the closing animation starts
						// this is done to keep the scroll position
						returnToOriginal();
					}
				});
				_listen('destroy', function() {
					if(!_hashReseted) {
						returnToOriginal();
					}
				});
				_listen('firstUpdate', function() {
					_currentItemIndex = _parseItemIndexFromURL().pid;
				});

				

				
				var index = _initialHash.indexOf('pid=');
				if(index > -1) {
					_initialHash = _initialHash.substring(0, index);
					if(_initialHash.slice(-1) === '&') {
						_initialHash = _initialHash.slice(0, -1);
					}
				}
				

				setTimeout(function() {
					if(_isOpen) { // hasn't destroyed yet
						framework.bind(window, 'hashchange', self.onHashChange);
					}
				}, 40);
				
			},
			onHashChange: function() {

				if(_getHash() === _initialHash) {

					_closedFromURL = true;
					self.close();
					return;
				}
				if(!_hashChangedByScript) {

					_hashChangedByHistory = true;
					self.goTo( _parseItemIndexFromURL().pid );
					_hashChangedByHistory = false;
				}
				
			},
			updateURL: function() {

				// Delay the update of URL, to avoid lag during transition, 
				// and to not to trigger actions like "refresh page sound" or "blinking favicon" to often
				
				_cleanHistoryTimeouts();
				

				if(_hashChangedByHistory) {
					return;
				}

				if(!_historyChanged) {
					_updateHash(); // first time
				} else {
					_historyUpdateTimeout = setTimeout(_updateHash, 800);
				}
			}
		
		}
	});


	/*>>history*/
		framework.extend(self, publicMethods); };
		return PhotoSwipe;
	});
	});

	var photoswipeUiDefault = createCommonjsModule(function (module, exports) {
	/*! PhotoSwipe Default UI - 4.1.3 - 2019-01-08
	* http://photoswipe.com
	* Copyright (c) 2019 Dmitry Semenov; */
	/**
	*
	* UI on top of main sliding area (caption, arrows, close button, etc.).
	* Built just using public methods/properties of PhotoSwipe.
	* 
	*/
	(function (root, factory) { 
		{
			module.exports = factory();
		}
	})(commonjsGlobal, function () {



	var PhotoSwipeUI_Default =
	 function(pswp, framework) {

		var ui = this;
		var _overlayUIUpdated = false,
			_controlsVisible = true,
			_fullscrenAPI,
			_controls,
			_captionContainer,
			_fakeCaptionContainer,
			_indexIndicator,
			_shareButton,
			_shareModal,
			_shareModalHidden = true,
			_initalCloseOnScrollValue,
			_isIdle,
			_listen,

			_loadingIndicator,
			_loadingIndicatorHidden,
			_loadingIndicatorTimeout,

			_galleryHasOneSlide,

			_options,
			_defaultUIOptions = {
				barsSize: {top:44, bottom:'auto'},
				closeElClasses: ['item', 'caption', 'zoom-wrap', 'ui', 'top-bar'], 
				timeToIdle: 4000, 
				timeToIdleOutside: 1000,
				loadingIndicatorDelay: 1000, // 2s
				
				addCaptionHTMLFn: function(item, captionEl /*, isFake */) {
					if(!item.title) {
						captionEl.children[0].innerHTML = '';
						return false;
					}
					captionEl.children[0].innerHTML = item.title;
					return true;
				},

				closeEl:true,
				captionEl: true,
				fullscreenEl: true,
				zoomEl: true,
				shareEl: true,
				counterEl: true,
				arrowEl: true,
				preloaderEl: true,

				tapToClose: false,
				tapToToggleControls: true,

				clickToCloseNonZoomable: true,

				shareButtons: [
					{id:'facebook', label:'Share on Facebook', url:'https://www.facebook.com/sharer/sharer.php?u={{url}}'},
					{id:'twitter', label:'Tweet', url:'https://twitter.com/intent/tweet?text={{text}}&url={{url}}'},
					{id:'pinterest', label:'Pin it', url:'http://www.pinterest.com/pin/create/button/'+
														'?url={{url}}&media={{image_url}}&description={{text}}'},
					{id:'download', label:'Download image', url:'{{raw_image_url}}', download:true}
				],
				getImageURLForShare: function( /* shareButtonData */ ) {
					return pswp.currItem.src || '';
				},
				getPageURLForShare: function( /* shareButtonData */ ) {
					return window.location.href;
				},
				getTextForShare: function( /* shareButtonData */ ) {
					return pswp.currItem.title || '';
				},
					
				indexIndicatorSep: ' / ',
				fitControlsWidth: 1200

			},
			_blockControlsTap;



		var _onControlsTap = function(e) {
				if(_blockControlsTap) {
					return true;
				}


				e = e || window.event;

				if(_options.timeToIdle && _options.mouseUsed && !_isIdle) {
					// reset idle timer
					_onIdleMouseMove();
				}


				var target = e.target || e.srcElement,
					uiElement,
					clickedClass = target.getAttribute('class') || '',
					found;

				for(var i = 0; i < _uiElements.length; i++) {
					uiElement = _uiElements[i];
					if(uiElement.onTap && clickedClass.indexOf('pswp__' + uiElement.name ) > -1 ) {
						uiElement.onTap();
						found = true;

					}
				}

				if(found) {
					if(e.stopPropagation) {
						e.stopPropagation();
					}
					_blockControlsTap = true;

					// Some versions of Android don't prevent ghost click event 
					// when preventDefault() was called on touchstart and/or touchend.
					// 
					// This happens on v4.3, 4.2, 4.1, 
					// older versions strangely work correctly, 
					// but just in case we add delay on all of them)	
					var tapDelay = framework.features.isOldAndroid ? 600 : 30;
					setTimeout(function() {
						_blockControlsTap = false;
					}, tapDelay);
				}

			},
			_fitControlsInViewport = function() {
				return !pswp.likelyTouchDevice || _options.mouseUsed || screen.width > _options.fitControlsWidth;
			},
			_togglePswpClass = function(el, cName, add) {
				framework[ (add ? 'add' : 'remove') + 'Class' ](el, 'pswp__' + cName);
			},

			// add class when there is just one item in the gallery
			// (by default it hides left/right arrows and 1ofX counter)
			_countNumItems = function() {
				var hasOneSlide = (_options.getNumItemsFn() === 1);

				if(hasOneSlide !== _galleryHasOneSlide) {
					_togglePswpClass(_controls, 'ui--one-slide', hasOneSlide);
					_galleryHasOneSlide = hasOneSlide;
				}
			},
			_toggleShareModalClass = function() {
				_togglePswpClass(_shareModal, 'share-modal--hidden', _shareModalHidden);
			},
			_toggleShareModal = function() {

				_shareModalHidden = !_shareModalHidden;
				
				
				if(!_shareModalHidden) {
					_toggleShareModalClass();
					setTimeout(function() {
						if(!_shareModalHidden) {
							framework.addClass(_shareModal, 'pswp__share-modal--fade-in');
						}
					}, 30);
				} else {
					framework.removeClass(_shareModal, 'pswp__share-modal--fade-in');
					setTimeout(function() {
						if(_shareModalHidden) {
							_toggleShareModalClass();
						}
					}, 300);
				}
				
				if(!_shareModalHidden) {
					_updateShareURLs();
				}
				return false;
			},

			_openWindowPopup = function(e) {
				e = e || window.event;
				var target = e.target || e.srcElement;

				pswp.shout('shareLinkClick', e, target);

				if(!target.href) {
					return false;
				}

				if( target.hasAttribute('download') ) {
					return true;
				}

				window.open(target.href, 'pswp_share', 'scrollbars=yes,resizable=yes,toolbar=no,'+
											'location=yes,width=550,height=420,top=100,left=' + 
											(window.screen ? Math.round(screen.width / 2 - 275) : 100)  );

				if(!_shareModalHidden) {
					_toggleShareModal();
				}
				
				return false;
			},
			_updateShareURLs = function() {
				var shareButtonOut = '',
					shareButtonData,
					shareURL,
					image_url,
					page_url,
					share_text;

				for(var i = 0; i < _options.shareButtons.length; i++) {
					shareButtonData = _options.shareButtons[i];

					image_url = _options.getImageURLForShare(shareButtonData);
					page_url = _options.getPageURLForShare(shareButtonData);
					share_text = _options.getTextForShare(shareButtonData);

					shareURL = shareButtonData.url.replace('{{url}}', encodeURIComponent(page_url) )
										.replace('{{image_url}}', encodeURIComponent(image_url) )
										.replace('{{raw_image_url}}', image_url )
										.replace('{{text}}', encodeURIComponent(share_text) );

					shareButtonOut += '<a href="' + shareURL + '" target="_blank" '+
										'class="pswp__share--' + shareButtonData.id + '"' +
										(shareButtonData.download ? 'download' : '') + '>' + 
										shareButtonData.label + '</a>';

					if(_options.parseShareButtonOut) {
						shareButtonOut = _options.parseShareButtonOut(shareButtonData, shareButtonOut);
					}
				}
				_shareModal.children[0].innerHTML = shareButtonOut;
				_shareModal.children[0].onclick = _openWindowPopup;

			},
			_hasCloseClass = function(target) {
				for(var  i = 0; i < _options.closeElClasses.length; i++) {
					if( framework.hasClass(target, 'pswp__' + _options.closeElClasses[i]) ) {
						return true;
					}
				}
			},
			_idleInterval,
			_idleTimer,
			_idleIncrement = 0,
			_onIdleMouseMove = function() {
				clearTimeout(_idleTimer);
				_idleIncrement = 0;
				if(_isIdle) {
					ui.setIdle(false);
				}
			},
			_onMouseLeaveWindow = function(e) {
				e = e ? e : window.event;
				var from = e.relatedTarget || e.toElement;
				if (!from || from.nodeName === 'HTML') {
					clearTimeout(_idleTimer);
					_idleTimer = setTimeout(function() {
						ui.setIdle(true);
					}, _options.timeToIdleOutside);
				}
			},
			_setupFullscreenAPI = function() {
				if(_options.fullscreenEl && !framework.features.isOldAndroid) {
					if(!_fullscrenAPI) {
						_fullscrenAPI = ui.getFullscreenAPI();
					}
					if(_fullscrenAPI) {
						framework.bind(document, _fullscrenAPI.eventK, ui.updateFullscreen);
						ui.updateFullscreen();
						framework.addClass(pswp.template, 'pswp--supports-fs');
					} else {
						framework.removeClass(pswp.template, 'pswp--supports-fs');
					}
				}
			},
			_setupLoadingIndicator = function() {
				// Setup loading indicator
				if(_options.preloaderEl) {
				
					_toggleLoadingIndicator(true);

					_listen('beforeChange', function() {

						clearTimeout(_loadingIndicatorTimeout);

						// display loading indicator with delay
						_loadingIndicatorTimeout = setTimeout(function() {

							if(pswp.currItem && pswp.currItem.loading) {

								if( !pswp.allowProgressiveImg() || (pswp.currItem.img && !pswp.currItem.img.naturalWidth)  ) {
									// show preloader if progressive loading is not enabled, 
									// or image width is not defined yet (because of slow connection)
									_toggleLoadingIndicator(false); 
									// items-controller.js function allowProgressiveImg
								}
								
							} else {
								_toggleLoadingIndicator(true); // hide preloader
							}

						}, _options.loadingIndicatorDelay);
						
					});
					_listen('imageLoadComplete', function(index, item) {
						if(pswp.currItem === item) {
							_toggleLoadingIndicator(true);
						}
					});

				}
			},
			_toggleLoadingIndicator = function(hide) {
				if( _loadingIndicatorHidden !== hide ) {
					_togglePswpClass(_loadingIndicator, 'preloader--active', !hide);
					_loadingIndicatorHidden = hide;
				}
			},
			_applyNavBarGaps = function(item) {
				var gap = item.vGap;

				if( _fitControlsInViewport() ) {
					
					var bars = _options.barsSize; 
					if(_options.captionEl && bars.bottom === 'auto') {
						if(!_fakeCaptionContainer) {
							_fakeCaptionContainer = framework.createEl('pswp__caption pswp__caption--fake');
							_fakeCaptionContainer.appendChild( framework.createEl('pswp__caption__center') );
							_controls.insertBefore(_fakeCaptionContainer, _captionContainer);
							framework.addClass(_controls, 'pswp__ui--fit');
						}
						if( _options.addCaptionHTMLFn(item, _fakeCaptionContainer, true) ) {

							var captionSize = _fakeCaptionContainer.clientHeight;
							gap.bottom = parseInt(captionSize,10) || 44;
						} else {
							gap.bottom = bars.top; // if no caption, set size of bottom gap to size of top
						}
					} else {
						gap.bottom = bars.bottom === 'auto' ? 0 : bars.bottom;
					}
					
					// height of top bar is static, no need to calculate it
					gap.top = bars.top;
				} else {
					gap.top = gap.bottom = 0;
				}
			},
			_setupIdle = function() {
				// Hide controls when mouse is used
				if(_options.timeToIdle) {
					_listen('mouseUsed', function() {
						
						framework.bind(document, 'mousemove', _onIdleMouseMove);
						framework.bind(document, 'mouseout', _onMouseLeaveWindow);

						_idleInterval = setInterval(function() {
							_idleIncrement++;
							if(_idleIncrement === 2) {
								ui.setIdle(true);
							}
						}, _options.timeToIdle / 2);
					});
				}
			},
			_setupHidingControlsDuringGestures = function() {

				// Hide controls on vertical drag
				_listen('onVerticalDrag', function(now) {
					if(_controlsVisible && now < 0.95) {
						ui.hideControls();
					} else if(!_controlsVisible && now >= 0.95) {
						ui.showControls();
					}
				});

				// Hide controls when pinching to close
				var pinchControlsHidden;
				_listen('onPinchClose' , function(now) {
					if(_controlsVisible && now < 0.9) {
						ui.hideControls();
						pinchControlsHidden = true;
					} else if(pinchControlsHidden && !_controlsVisible && now > 0.9) {
						ui.showControls();
					}
				});

				_listen('zoomGestureEnded', function() {
					pinchControlsHidden = false;
					if(pinchControlsHidden && !_controlsVisible) {
						ui.showControls();
					}
				});

			};



		var _uiElements = [
			{ 
				name: 'caption', 
				option: 'captionEl',
				onInit: function(el) {  
					_captionContainer = el; 
				} 
			},
			{ 
				name: 'share-modal', 
				option: 'shareEl',
				onInit: function(el) {  
					_shareModal = el;
				},
				onTap: function() {
					_toggleShareModal();
				} 
			},
			{ 
				name: 'button--share', 
				option: 'shareEl',
				onInit: function(el) { 
					_shareButton = el;
				},
				onTap: function() {
					_toggleShareModal();
				} 
			},
			{ 
				name: 'button--zoom', 
				option: 'zoomEl',
				onTap: pswp.toggleDesktopZoom
			},
			{ 
				name: 'counter', 
				option: 'counterEl',
				onInit: function(el) {  
					_indexIndicator = el;
				} 
			},
			{ 
				name: 'button--close', 
				option: 'closeEl',
				onTap: pswp.close
			},
			{ 
				name: 'button--arrow--left', 
				option: 'arrowEl',
				onTap: pswp.prev
			},
			{ 
				name: 'button--arrow--right', 
				option: 'arrowEl',
				onTap: pswp.next
			},
			{ 
				name: 'button--fs', 
				option: 'fullscreenEl',
				onTap: function() {  
					if(_fullscrenAPI.isFullscreen()) {
						_fullscrenAPI.exit();
					} else {
						_fullscrenAPI.enter();
					}
				} 
			},
			{ 
				name: 'preloader', 
				option: 'preloaderEl',
				onInit: function(el) {  
					_loadingIndicator = el;
				} 
			}

		];

		var _setupUIElements = function() {
			var item,
				classAttr,
				uiElement;

			var loopThroughChildElements = function(sChildren) {
				if(!sChildren) {
					return;
				}

				var l = sChildren.length;
				for(var i = 0; i < l; i++) {
					item = sChildren[i];
					classAttr = item.className;

					for(var a = 0; a < _uiElements.length; a++) {
						uiElement = _uiElements[a];

						if(classAttr.indexOf('pswp__' + uiElement.name) > -1  ) {

							if( _options[uiElement.option] ) { // if element is not disabled from options
								
								framework.removeClass(item, 'pswp__element--disabled');
								if(uiElement.onInit) {
									uiElement.onInit(item);
								}
								
								//item.style.display = 'block';
							} else {
								framework.addClass(item, 'pswp__element--disabled');
								//item.style.display = 'none';
							}
						}
					}
				}
			};
			loopThroughChildElements(_controls.children);

			var topBar =  framework.getChildByClass(_controls, 'pswp__top-bar');
			if(topBar) {
				loopThroughChildElements( topBar.children );
			}
		};


		

		ui.init = function() {

			// extend options
			framework.extend(pswp.options, _defaultUIOptions, true);

			// create local link for fast access
			_options = pswp.options;

			// find pswp__ui element
			_controls = framework.getChildByClass(pswp.scrollWrap, 'pswp__ui');

			// create local link
			_listen = pswp.listen;


			_setupHidingControlsDuringGestures();

			// update controls when slides change
			_listen('beforeChange', ui.update);

			// toggle zoom on double-tap
			_listen('doubleTap', function(point) {
				var initialZoomLevel = pswp.currItem.initialZoomLevel;
				if(pswp.getZoomLevel() !== initialZoomLevel) {
					pswp.zoomTo(initialZoomLevel, point, 333);
				} else {
					pswp.zoomTo(_options.getDoubleTapZoom(false, pswp.currItem), point, 333);
				}
			});

			// Allow text selection in caption
			_listen('preventDragEvent', function(e, isDown, preventObj) {
				var t = e.target || e.srcElement;
				if(
					t && 
					t.getAttribute('class') && e.type.indexOf('mouse') > -1 && 
					( t.getAttribute('class').indexOf('__caption') > 0 || (/(SMALL|STRONG|EM)/i).test(t.tagName) ) 
				) {
					preventObj.prevent = false;
				}
			});

			// bind events for UI
			_listen('bindEvents', function() {
				framework.bind(_controls, 'pswpTap click', _onControlsTap);
				framework.bind(pswp.scrollWrap, 'pswpTap', ui.onGlobalTap);

				if(!pswp.likelyTouchDevice) {
					framework.bind(pswp.scrollWrap, 'mouseover', ui.onMouseOver);
				}
			});

			// unbind events for UI
			_listen('unbindEvents', function() {
				if(!_shareModalHidden) {
					_toggleShareModal();
				}

				if(_idleInterval) {
					clearInterval(_idleInterval);
				}
				framework.unbind(document, 'mouseout', _onMouseLeaveWindow);
				framework.unbind(document, 'mousemove', _onIdleMouseMove);
				framework.unbind(_controls, 'pswpTap click', _onControlsTap);
				framework.unbind(pswp.scrollWrap, 'pswpTap', ui.onGlobalTap);
				framework.unbind(pswp.scrollWrap, 'mouseover', ui.onMouseOver);

				if(_fullscrenAPI) {
					framework.unbind(document, _fullscrenAPI.eventK, ui.updateFullscreen);
					if(_fullscrenAPI.isFullscreen()) {
						_options.hideAnimationDuration = 0;
						_fullscrenAPI.exit();
					}
					_fullscrenAPI = null;
				}
			});


			// clean up things when gallery is destroyed
			_listen('destroy', function() {
				if(_options.captionEl) {
					if(_fakeCaptionContainer) {
						_controls.removeChild(_fakeCaptionContainer);
					}
					framework.removeClass(_captionContainer, 'pswp__caption--empty');
				}

				if(_shareModal) {
					_shareModal.children[0].onclick = null;
				}
				framework.removeClass(_controls, 'pswp__ui--over-close');
				framework.addClass( _controls, 'pswp__ui--hidden');
				ui.setIdle(false);
			});
			

			if(!_options.showAnimationDuration) {
				framework.removeClass( _controls, 'pswp__ui--hidden');
			}
			_listen('initialZoomIn', function() {
				if(_options.showAnimationDuration) {
					framework.removeClass( _controls, 'pswp__ui--hidden');
				}
			});
			_listen('initialZoomOut', function() {
				framework.addClass( _controls, 'pswp__ui--hidden');
			});

			_listen('parseVerticalMargin', _applyNavBarGaps);
			
			_setupUIElements();

			if(_options.shareEl && _shareButton && _shareModal) {
				_shareModalHidden = true;
			}

			_countNumItems();

			_setupIdle();

			_setupFullscreenAPI();

			_setupLoadingIndicator();
		};

		ui.setIdle = function(isIdle) {
			_isIdle = isIdle;
			_togglePswpClass(_controls, 'ui--idle', isIdle);
		};

		ui.update = function() {
			// Don't update UI if it's hidden
			if(_controlsVisible && pswp.currItem) {
				
				ui.updateIndexIndicator();

				if(_options.captionEl) {
					_options.addCaptionHTMLFn(pswp.currItem, _captionContainer);

					_togglePswpClass(_captionContainer, 'caption--empty', !pswp.currItem.title);
				}

				_overlayUIUpdated = true;

			} else {
				_overlayUIUpdated = false;
			}

			if(!_shareModalHidden) {
				_toggleShareModal();
			}

			_countNumItems();
		};

		ui.updateFullscreen = function(e) {

			if(e) {
				// some browsers change window scroll position during the fullscreen
				// so PhotoSwipe updates it just in case
				setTimeout(function() {
					pswp.setScrollOffset( 0, framework.getScrollY() );
				}, 50);
			}
			
			// toogle pswp--fs class on root element
			framework[ (_fullscrenAPI.isFullscreen() ? 'add' : 'remove') + 'Class' ](pswp.template, 'pswp--fs');
		};

		ui.updateIndexIndicator = function() {
			if(_options.counterEl) {
				_indexIndicator.innerHTML = (pswp.getCurrentIndex()+1) + 
											_options.indexIndicatorSep + 
											_options.getNumItemsFn();
			}
		};
		
		ui.onGlobalTap = function(e) {
			e = e || window.event;
			var target = e.target || e.srcElement;

			if(_blockControlsTap) {
				return;
			}

			if(e.detail && e.detail.pointerType === 'mouse') {

				// close gallery if clicked outside of the image
				if(_hasCloseClass(target)) {
					pswp.close();
					return;
				}

				if(framework.hasClass(target, 'pswp__img')) {
					if(pswp.getZoomLevel() === 1 && pswp.getZoomLevel() <= pswp.currItem.fitRatio) {
						if(_options.clickToCloseNonZoomable) {
							pswp.close();
						}
					} else {
						pswp.toggleDesktopZoom(e.detail.releasePoint);
					}
				}
				
			} else {

				// tap anywhere (except buttons) to toggle visibility of controls
				if(_options.tapToToggleControls) {
					if(_controlsVisible) {
						ui.hideControls();
					} else {
						ui.showControls();
					}
				}

				// tap to close gallery
				if(_options.tapToClose && (framework.hasClass(target, 'pswp__img') || _hasCloseClass(target)) ) {
					pswp.close();
					return;
				}
				
			}
		};
		ui.onMouseOver = function(e) {
			e = e || window.event;
			var target = e.target || e.srcElement;

			// add class when mouse is over an element that should close the gallery
			_togglePswpClass(_controls, 'ui--over-close', _hasCloseClass(target));
		};

		ui.hideControls = function() {
			framework.addClass(_controls,'pswp__ui--hidden');
			_controlsVisible = false;
		};

		ui.showControls = function() {
			_controlsVisible = true;
			if(!_overlayUIUpdated) {
				ui.update();
			}
			framework.removeClass(_controls,'pswp__ui--hidden');
		};

		ui.supportsFullscreen = function() {
			var d = document;
			return !!(d.exitFullscreen || d.mozCancelFullScreen || d.webkitExitFullscreen || d.msExitFullscreen);
		};

		ui.getFullscreenAPI = function() {
			var dE = document.documentElement,
				api,
				tF = 'fullscreenchange';

			if (dE.requestFullscreen) {
				api = {
					enterK: 'requestFullscreen',
					exitK: 'exitFullscreen',
					elementK: 'fullscreenElement',
					eventK: tF
				};

			} else if(dE.mozRequestFullScreen ) {
				api = {
					enterK: 'mozRequestFullScreen',
					exitK: 'mozCancelFullScreen',
					elementK: 'mozFullScreenElement',
					eventK: 'moz' + tF
				};

				

			} else if(dE.webkitRequestFullscreen) {
				api = {
					enterK: 'webkitRequestFullscreen',
					exitK: 'webkitExitFullscreen',
					elementK: 'webkitFullscreenElement',
					eventK: 'webkit' + tF
				};

			} else if(dE.msRequestFullscreen) {
				api = {
					enterK: 'msRequestFullscreen',
					exitK: 'msExitFullscreen',
					elementK: 'msFullscreenElement',
					eventK: 'MSFullscreenChange'
				};
			}

			if(api) {
				api.enter = function() { 
					// disable close-on-scroll in fullscreen
					_initalCloseOnScrollValue = _options.closeOnScroll; 
					_options.closeOnScroll = false; 

					if(this.enterK === 'webkitRequestFullscreen') {
						pswp.template[this.enterK]( Element.ALLOW_KEYBOARD_INPUT );
					} else {
						return pswp.template[this.enterK](); 
					}
				};
				api.exit = function() { 
					_options.closeOnScroll = _initalCloseOnScrollValue;

					return document[this.exitK](); 

				};
				api.isFullscreen = function() { return document[this.elementK]; };
			}

			return api;
		};



	};
	return PhotoSwipeUI_Default;


	});
	});

	var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;

	function ownKeys(object, enumerableOnly) { var keys$1 = keys(object); if (getOwnPropertySymbols) { var symbols = getOwnPropertySymbols(object); if (enumerableOnly) symbols = filter(symbols).call(symbols, function (sym) { return getOwnPropertyDescriptor$1(object, sym).enumerable; }); keys$1.push.apply(keys$1, symbols); } return keys$1; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (getOwnPropertyDescriptors) { Object.defineProperties(target, getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, getOwnPropertyDescriptor$1(source, key)); }); } } return target; }

	function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !construct) return false; if (construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var VComponent$4 = /*#__PURE__*/function (_Vue) {
	  _inherits(VComponent, _Vue);

	  var _super = _createSuper$4(VComponent);

	  function VComponent() {
	    var _this;

	    _classCallCheck(this, VComponent);

	    _this = _super.apply(this, arguments);
	    _this.showOverlayer = false;
	    return _this;
	  }

	  _createClass(VComponent, [{
	    key: "items",
	    get: function get() {
	      // 这里采用深拷贝，防止photoswipe修改item时修改到this.list
	      var list = JSON.parse(stringify(this.list));
	      list.forEach(function (item) {
	        var _context;

	        // 不设置msrc时，photoswipe会以灰色矩形区域替代
	        if (!item.msrc) {
	          item.msrc = item.src;
	        } // photoswipe必须要设置尺寸，否则报错


	        if (includes(_context = [item.w, item.h]).call(_context, undefined)) {
	          item.w = 0;
	          item.h = 0;
	        }

	        return item;
	      });
	      return list;
	    }
	  }, {
	    key: "opts",
	    get: function get() {
	      return _objectSpread(_objectSpread({
	        pinchToClose: false,
	        closeOnVerticalDrag: false,
	        tapToClose: true,
	        showHideOpacity: true
	      }, this.options), {}, {
	        index: this.value,
	        // 这里始终为false，避免photoswipe自己创建历史记录
	        history: false,
	        shareEl: false
	      });
	    } // 预览指定图片

	  }, {
	    key: "show",
	    value: function () {
	      var _show = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
	        var _this2 = this;

	        return regenerator.wrap(function _callee$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                if (this.$el) {
	                  _context2.next = 2;
	                  break;
	                }

	                return _context2.abrupt("return");

	              case 2:
	                if (!(this.opts.index < 0)) {
	                  _context2.next = 5;
	                  break;
	                }

	                // 关闭预览
	                if (this.previewer) {
	                  this.showOverlayer = false;
	                }

	                return _context2.abrupt("return");

	              case 5:
	                if (!this.previewer) {
	                  _context2.next = 8;
	                  break;
	                }

	                // 切换item
	                if (this.opts.index !== this.previewer.getCurrentIndex()) {
	                  this.previewer.goTo(this.opts.index);
	                }

	                return _context2.abrupt("return");

	              case 8:
	                if (!(this.getThumbnail && (!this.items[this.opts.index].w || !this.items[this.opts.index].h))) {
	                  _context2.next = 11;
	                  break;
	                }

	                _context2.next = 11;
	                return new promise(function (resolve) {
	                  var img = new Image();

	                  img.onload = function () {
	                    _this2.items[_this2.opts.index].w = img.width;
	                    _this2.items[_this2.opts.index].h = img.height;
	                    resolve('');
	                  };

	                  img.onerror = function () {
	                    resolve('');
	                  };

	                  img.src = _this2.items[_this2.opts.index].src;
	                  setTimeout(function () {
	                    resolve('');
	                  }, 300);
	                });

	              case 11:
	                // 打开预览组件
	                this.previewer = new photoswipe(this.$el, photoswipeUiDefault, JSON.parse(stringify(this.items)), _objectSpread(_objectSpread({}, this.opts), {}, {
	                  errorMsg: this.$refs.error.innerHTML,
	                  getThumbBoundsFn: this.getThumbnail ? function (index) {
	                    // 获取缩略图元素
	                    var thumbnail = _this2.getThumbnail(index); // get window scroll Y


	                    var pageYScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop; // optionally get horizontal scroll

	                    var pageXScroll = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft; // get position of element relative to viewport

	                    var rect = thumbnail.getBoundingClientRect();
	                    return {
	                      x: rect.left + pageXScroll,
	                      y: rect.top + pageYScroll,
	                      w: rect.width
	                    };
	                  } : undefined
	                })); // 未设置尺寸时加载图片后重新设置尺寸

	                this.previewer.listen('gettingData', function (index, item) {
	                  /**
	                   * item.loadError为true时证明已经加载失败了，不能再尝试加载
	                   * 否则会再次触发onerror中的updateSize，导致无限循环
	                   */
	                  if ((!item.w || !item.h) && !item.loadError) {
	                    var img = new Image();

	                    img.onload = function () {
	                      var _this2$previewer, _this2$previewer3;

	                      item.w = img.width;
	                      item.h = img.height; // 这里是为了防止图片显示时出现从0尺寸开始放大的过渡效果

	                      if (((_this2$previewer = _this2.previewer) === null || _this2$previewer === void 0 ? void 0 : _this2$previewer.getCurrentIndex()) === index) {
	                        var _this2$previewer2;

	                        (_this2$previewer2 = _this2.previewer) === null || _this2$previewer2 === void 0 ? void 0 : _this2$previewer2.invalidateCurrItems();
	                      }
	                      /**
	                       * 这里会导致加载失败元素尺寸被设置成0
	                       * 所以在css中给失败元素宽高强制设置!important非0尺寸
	                       */


	                      (_this2$previewer3 = _this2.previewer) === null || _this2$previewer3 === void 0 ? void 0 : _this2$previewer3.updateSize(true);
	                    };

	                    img.onerror = function () {
	                      var _this2$previewer4, _this2$previewer6;

	                      if (((_this2$previewer4 = _this2.previewer) === null || _this2$previewer4 === void 0 ? void 0 : _this2$previewer4.getCurrentIndex()) === index) {
	                        var _this2$previewer5;

	                        (_this2$previewer5 = _this2.previewer) === null || _this2$previewer5 === void 0 ? void 0 : _this2$previewer5.invalidateCurrItems();
	                      }

	                      (_this2$previewer6 = _this2.previewer) === null || _this2$previewer6 === void 0 ? void 0 : _this2$previewer6.updateSize(true);
	                    };

	                    img.src = item.src;
	                  }
	                });
	                this.previewer.listen('afterChange', function () {
	                  var _this2$previewer7;

	                  _this2.$emit('input', (_this2$previewer7 = _this2.previewer) === null || _this2$previewer7 === void 0 ? void 0 : _this2$previewer7.getCurrentIndex());
	                });
	                this.previewer.listen('destroy', function () {
	                  _this2.previewer = undefined;
	                  _this2.showOverlayer = false;

	                  _this2.$emit('input', -1);
	                });
	                this.showOverlayer = true; // 在container元素监听pswpTap事件，framework在photoswipe init后才存在

	                _context2.next = 18;
	                return this.$nextTick();

	              case 18:
	                this.previewer.framework.bind(this.$refs.container, 'pswpTap', this.onPswpTap);

	              case 19:
	              case "end":
	                return _context2.stop();
	            }
	          }
	        }, _callee, this);
	      }));

	      function show() {
	        return _show.apply(this, arguments);
	      }

	      return show;
	    }() // 当使用tapToClose时，移动端点击图片时不关闭预览组件

	  }, {
	    key: "onPswpTap",
	    value: function onPswpTap(e) {
	      // 非移动端，保持原样
	      if (e.detail && e.detail.pointerType === 'mouse') {
	        return;
	      }

	      if (e.target.classList.contains('pswp__img')) {
	        e.target.classList.remove('pswp__img'); // 等photoswipe事件回掉后、浏览器渲染前恢复pswp__img类

	        raf(function () {
	          e.target.classList.add('pswp__img');
	        });
	      }
	    } // 更新图片列表

	  }, {
	    key: "update",
	    value: function update() {
	      var _this$previewer$items, _context3;

	      if (!this.previewer) {
	        return;
	      } // 重置所有数据，因为photoswipe会在item上添加保存内部状态的字段，所以这里必须采用深拷贝来完全重置数据


	      splice(_this$previewer$items = this.previewer.items).apply(_this$previewer$items, concat(_context3 = [0, this.previewer.items.length]).call(_context3, _toConsumableArray(JSON.parse(stringify(this.items))))); // sets a flag that slides should be updated


	      this.previewer.invalidateCurrItems(); // updates the content of slides

	      this.previewer.updateSize(true);
	    }
	  }, {
	    key: "onShowOverlayerChange",
	    value: function onShowOverlayerChange() {
	      if (!this.previewer) {
	        return;
	      }

	      if (this.showOverlayer) {
	        this.previewer.init();
	        return;
	      }

	      this.previewer.close();
	    } // 检测是否重新加载

	  }, {
	    key: "onContainerClick",
	    value: function onContainerClick(event) {
	      var el = event.target;

	      while (el !== event.currentTarget) {
	        if (el.classList.contains('vui-image-previewer__reload')) {
	          this.update();
	          return;
	        }

	        el = el.parentElement;
	      }
	    }
	  }, {
	    key: "onSave",
	    value: function onSave() {// TODO: 文件下载
	    }
	  }, {
	    key: "mounted",
	    value: function () {
	      var _mounted = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
	        return regenerator.wrap(function _callee2$(_context4) {
	          while (1) {
	            switch (_context4.prev = _context4.next) {
	              case 0:
	                // 将根dom节点移到body下，防止业务方样式干扰
	                document.body.appendChild(this.$el); // 等子组件都挂载完成后再显示，否则errorMsg的html可能获取不全

	                _context4.next = 3;
	                return this.$nextTick();

	              case 3:
	                _context4.next = 5;
	                return this.show();

	              case 5:
	              case "end":
	                return _context4.stop();
	            }
	          }
	        }, _callee2, this);
	      }));

	      function mounted() {
	        return _mounted.apply(this, arguments);
	      }

	      return mounted;
	    }()
	  }, {
	    key: "beforeDestroy",
	    value: function beforeDestroy() {
	      this.previewer && this.previewer.destroy();
	    }
	  }]);

	  return VComponent;
	}(Vue__default['default']);

	__decorate([Prop({
	  type: Number,
	  default: -1
	})], VComponent$4.prototype, "value", void 0);

	__decorate([Prop({
	  type: Array,
	  required: true,
	  validator: function validator(value) {
	    return value.length > 0;
	  }
	})], VComponent$4.prototype, "list", void 0);

	__decorate([Prop({
	  type: Object,
	  default: function _default() {
	    return {};
	  }
	})], VComponent$4.prototype, "options", void 0);

	__decorate([Prop({
	  type: Function
	})], VComponent$4.prototype, "getThumbnail", void 0);

	__decorate([Watch('opts.index')], VComponent$4.prototype, "show", null);

	__decorate([Watch('items')], VComponent$4.prototype, "update", null);

	__decorate([Watch('showOverlayer')], VComponent$4.prototype, "onShowOverlayerChange", null);

	VComponent$4 = __decorate([Component({
	  name: 'VuiImagePreviewer',
	  components: {
	    VuiOverlayer: __vue_component__$7,
	    VuiButton: __vue_component__$9
	  }
	})], VComponent$4);
	var script$4 = VComponent$4;

	/* script */
	var __vue_script__$4 = script$4;
	/* template */

	var __vue_render__$4 = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c("div", {
	    staticClass: "vui-image-previewer pswp",
	    attrs: {
	      tabindex: "-1",
	      role: "dialog",
	      "aria-hidden": "true"
	    }
	  }, [_c("div", {
	    staticClass: "pswp__bg"
	  }), _vm._v(" "), _c("div", {
	    staticClass: "pswp__scroll-wrap"
	  }, [_c("div", {
	    ref: "container",
	    staticClass: "pswp__container",
	    on: {
	      click: _vm.onContainerClick
	    }
	  }, [_c("div", {
	    staticClass: "pswp__item"
	  }), _vm._v(" "), _c("div", {
	    staticClass: "pswp__item"
	  }), _vm._v(" "), _c("div", {
	    staticClass: "pswp__item"
	  })]), _vm._v(" "), _c("div", {
	    staticClass: "pswp__ui pswp__ui--hidden"
	  }, [_vm._m(0), _vm._v(" "), _vm._m(1), _vm._v(" "), _c("button", {
	    staticClass: "pswp__button pswp__button--arrow--left",
	    attrs: {
	      title: "Previous (arrow left)"
	    }
	  }), _vm._v(" "), _c("button", {
	    staticClass: "pswp__button pswp__button--arrow--right",
	    attrs: {
	      title: "Next (arrow right)"
	    }
	  }), _vm._v(" "), _vm._m(2), _vm._v(" "), _c("div", {
	    staticClass: "pswp__counter"
	  }), _vm._v(" "), _c("div", {
	    staticClass: "vui-image-previewer__download",
	    on: {
	      click: _vm.onSave
	    }
	  }), _vm._v(" "), _c("div", {
	    staticClass: "vui-image-previewer__layer"
	  }), _vm._v(" "), _c("div", {
	    staticClass: "vui-image-previewer__layer vui-image-previewer__layer--bottom"
	  })])]), _vm._v(" "), _c("div", {
	    ref: "error",
	    staticClass: "vui-image-previewer__placeholder"
	  }, [_vm._t("default", [_c("div", {
	    staticClass: "vui-image-previewer__error"
	  }, [_c("vui-button", {
	    staticClass: "vui-image-previewer__reload",
	    attrs: {
	      corner: "round"
	    }
	  }, [_vm._v("重新加载")])], 1)])], 2), _vm._v(" "), _c("vui-overlayer", {
	    staticClass: "vui-image-previewer__overlayer",
	    attrs: {
	      "push-state": _vm.options.history
	    },
	    model: {
	      value: _vm.showOverlayer,
	      callback: function callback($$v) {
	        _vm.showOverlayer = $$v;
	      },
	      expression: "showOverlayer"
	    }
	  })], 1);
	};

	var __vue_staticRenderFns__$4 = [function () {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c("div", {
	    staticClass: "pswp__top-bar"
	  }, [_c("button", {
	    staticClass: "pswp__button pswp__button--close",
	    attrs: {
	      title: "Close (Esc)"
	    }
	  }), _vm._v(" "), _c("button", {
	    staticClass: "pswp__button pswp__button--share",
	    attrs: {
	      title: "Share"
	    }
	  }), _vm._v(" "), _c("button", {
	    staticClass: "pswp__button pswp__button--fs",
	    attrs: {
	      title: "Toggle fullscreen"
	    }
	  }), _vm._v(" "), _c("button", {
	    staticClass: "pswp__button pswp__button--zoom",
	    attrs: {
	      title: "Zoom in/out"
	    }
	  }), _vm._v(" "), _c("div", {
	    staticClass: "pswp__preloader"
	  }, [_c("div", {
	    staticClass: "pswp__preloader__icn"
	  }, [_c("div", {
	    staticClass: "pswp__preloader__cut"
	  }, [_c("div", {
	    staticClass: "pswp__preloader__donut"
	  })])])])]);
	}, function () {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c("div", {
	    staticClass: "pswp__share-modal pswp__share-modal--hidden pswp__single-tap"
	  }, [_c("div", {
	    staticClass: "pswp__share-tooltip"
	  })]);
	}, function () {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c("div", {
	    staticClass: "pswp__caption"
	  }, [_c("div", {
	    staticClass: "pswp__caption__center"
	  })]);
	}];
	__vue_render__$4._withStripped = true;
	/* style */

	var __vue_inject_styles__$4 = undefined;
	/* scoped */

	var __vue_scope_id__$4 = undefined;
	/* module identifier */

	var __vue_module_identifier__$4 = undefined;
	/* functional template */

	var __vue_is_functional_template__$4 = false;
	/* style inject */

	/* style inject SSR */

	/* style inject shadow dom */

	var __vue_component__$4 = /*#__PURE__*/normalizeComponent_1({
	  render: __vue_render__$4,
	  staticRenderFns: __vue_staticRenderFns__$4
	}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, undefined, undefined);

	var ImagePreviewer = __vue_component__$4;

	ImagePreviewer.install = function (Vue) {
	  Vue.component('VuiImagePreviewer', __vue_component__$4);
	};

	function unbind$3(el) {
	  if (!el._intersect) return;

	  el._intersect.observer.unobserve(el);

	  delete el._intersect;
	}

	function inserted$3(el, binding) {
	  var _binding$modifiers;

	  var modifiers = (_binding$modifiers = binding.modifiers) !== null && _binding$modifiers !== void 0 ? _binding$modifiers : {};
	  var value = binding.value;

	  var _ref = _typeof$2(value) === 'object' ? value : {
	    handler: value,
	    options: {}
	  },
	      handler = _ref.handler,
	      options = _ref.options;

	  var observer = new IntersectionObserver(function (entries, observer) {
	    if (!el._intersect) return;
	    var isIntersecting = Boolean(find(entries).call(entries, function (entry) {
	      return entry.isIntersecting;
	    })); // bind 会触发一次回调，所以使用init参数控制，不调用外部的处理函数，只有初始化后，可见性再发生变化时才调用外部处理函数

	    if (handler && el._intersect.init) handler(entries, observer, isIntersecting);
	    if (el._intersect.init && modifiers.once) unbind$3(el); // 如果检测到once参数，在初始化后执行一次后取消监听
	    else el._intersect.init = true;
	  }, options);
	  el._intersect = {
	    init: false,
	    observer: observer
	  };
	  observer.observe(el);
	}

	var directive$3 = {
	  inserted: inserted$3,
	  unbind: unbind$3,
	  install: function install(Vue) {
	    Vue.directive('vui-intersect', directive$3);
	  }
	};

	function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !construct) return false; if (construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var VComponent$3 = /*#__PURE__*/function (_Vue) {
	  _inherits(VComponent, _Vue);

	  var _super = _createSuper$3(VComponent);

	  function VComponent() {
	    _classCallCheck(this, VComponent);

	    return _super.apply(this, arguments);
	  }

	  return VComponent;
	}(Vue__default['default']);

	__decorate([Prop({
	  type: String,
	  default: 'primary'
	})], VComponent$3.prototype, "vue", void 0);

	__decorate([Prop({
	  type: Boolean,
	  default: true
	})], VComponent$3.prototype, "underline", void 0);

	__decorate([Prop({
	  type: Boolean,
	  default: false
	})], VComponent$3.prototype, "disabled", void 0);

	__decorate([Prop({
	  type: String,
	  default: 'regular'
	})], VComponent$3.prototype, "size", void 0);

	__decorate([Prop({
	  type: String,
	  default: ''
	})], VComponent$3.prototype, "href", void 0);

	__decorate([Prop({
	  type: String,
	  default: ''
	})], VComponent$3.prototype, "icon", void 0);

	__decorate([Prop({
	  type: String,
	  default: 'before'
	})], VComponent$3.prototype, "iconPosition", void 0);

	VComponent$3 = __decorate([Component({
	  name: 'VuiLink'
	})], VComponent$3);
	var script$3 = VComponent$3;

	var __vue_script__$3 = script$3;
	/* template */

	var __vue_render__$3 = function __vue_render__() {
	  var _context, _context2;

	  var _obj;

	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c("a", {
	    class: ["vui-link", (_obj = {}, _obj["vui-link--" + _vm.vue] = includes(_context = ["primary", "regular", "success", "fail"]).call(_context, _vm.vue), _obj["vui-link--" + _vm.size] = includes(_context2 = ["big", "regular", "small", "mini"]).call(_context2, _vm.size), _obj)],
	    attrs: {
	      disabled: _vm.disabled,
	      href: _vm.href,
	      underline: _vm.underline
	    },
	    on: {
	      click: function click($event) {
	        !_vm.disabled && _vm.emit("click");
	      }
	    }
	  }, [_vm.icon && _vm.iconPosition === "before" ? _c("div", [_vm._v("icon")]) : _vm._e(), _vm._v(" "), _vm._t("default"), _vm._v(" "), _vm.icon && _vm.iconPosition === "after" ? _c("div", [_vm._v("icon")]) : _vm._e()], 2);
	};

	var __vue_staticRenderFns__$3 = [];
	__vue_render__$3._withStripped = true;
	/* style */

	var __vue_inject_styles__$3 = undefined;
	/* scoped */

	var __vue_scope_id__$3 = undefined;
	/* module identifier */

	var __vue_module_identifier__$3 = undefined;
	/* functional template */

	var __vue_is_functional_template__$3 = false;
	/* style inject */

	/* style inject SSR */

	/* style inject shadow dom */

	var __vue_component__$3 = /*#__PURE__*/normalizeComponent_1({
	  render: __vue_render__$3,
	  staticRenderFns: __vue_staticRenderFns__$3
	}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);

	var Link = __vue_component__$3;

	Link.install = function (Vue) {
	  Vue.component('VuiLink', __vue_component__$3);
	};

	function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !construct) return false; if (construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var VComponent$2 = /*#__PURE__*/function (_Vue) {
	  _inherits(VComponent, _Vue);

	  var _super = _createSuper$2(VComponent);

	  function VComponent() {
	    _classCallCheck(this, VComponent);

	    return _super.apply(this, arguments);
	  }

	  return VComponent;
	}(Vue__default['default']);

	__decorate([Prop({
	  type: Boolean,
	  default: false
	})], VComponent$2.prototype, "value", void 0);

	__decorate([Prop({
	  type: Boolean,
	  default: true
	})], VComponent$2.prototype, "showOverlayer", void 0);

	__decorate([Prop({
	  type: String,
	  default: 'bottom'
	})], VComponent$2.prototype, "position", void 0);

	VComponent$2 = __decorate([Component({
	  name: 'VuiPopup',
	  inheritAttrs: false,
	  components: {
	    VuiOverlayer: __vue_component__$7,
	    VuiTransition: __vue_component__$8
	  }
	})], VComponent$2);
	var script$2 = VComponent$2;

	/* script */
	var __vue_script__$2 = script$2;
	/* template */

	var __vue_render__$2 = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c("vui-overlayer", _vm._g(_vm._b({
	    class: ["vui-popup", {
	      "vui-popup--nolayer": !_vm.showOverlayer
	    }],
	    attrs: {
	      value: _vm.value
	    },
	    scopedSlots: _vm._u([{
	      key: "default",
	      fn: function fn(slotProps) {
	        return [_c("vui-transition", {
	          class: ["vui-popup__content", "vui-popup__content--" + _vm.position],
	          attrs: {
	            type: "popup-" + _vm.position
	          }
	        }, [_c("div", {
	          directives: [{
	            name: "show",
	            rawName: "v-show",
	            value: slotProps.show,
	            expression: "slotProps.show"
	          }],
	          staticClass: "vui-popup__box"
	        }, [_vm._t("default")], 2)])];
	      }
	    }], null, true)
	  }, "vui-overlayer", _vm.$attrs, false), _vm.$listeners));
	};

	var __vue_staticRenderFns__$2 = [];
	__vue_render__$2._withStripped = true;
	/* style */

	var __vue_inject_styles__$2 = undefined;
	/* scoped */

	var __vue_scope_id__$2 = undefined;
	/* module identifier */

	var __vue_module_identifier__$2 = undefined;
	/* functional template */

	var __vue_is_functional_template__$2 = false;
	/* style inject */

	/* style inject SSR */

	/* style inject shadow dom */

	var __vue_component__$2 = /*#__PURE__*/normalizeComponent_1({
	  render: __vue_render__$2,
	  staticRenderFns: __vue_staticRenderFns__$2
	}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

	var Popup = __vue_component__$2;

	Popup.install = function (Vue) {
	  Vue.component('VuiPopup', __vue_component__$2);
	};

	function unbind$2(el) {
	  if (!el._scroll) return;
	  var handler = el._scroll.handler;
	  el.removeEventListener('scroll', handler);
	  delete el._scroll;
	}

	function inserted$2(el, binding) {
	  var _binding$modifiers;

	  var _ref = (_binding$modifiers = binding.modifiers) !== null && _binding$modifiers !== void 0 ? _binding$modifiers : {},
	      _ref$once = _ref.once,
	      once = _ref$once === void 0 ? false : _ref$once;

	  var value = binding.value;
	  if (!value) return;
	  var scrollSection = el.scrollHeight - el.clientHeight; // eslint-disable-next-line

	  var handler = function handler(e) {
	    value(e, e.target.scrollTop / scrollSection);
	    once && unbind$2(el);
	  };

	  el.addEventListener('scroll', handler, {
	    passive: true
	  });
	  el._scroll = {
	    handler: handler
	  };
	}

	var directive$2 = {
	  inserted: inserted$2,
	  unbind: unbind$2,
	  install: function install(Vue) {
	    Vue.directive('vui-scroll', directive$2);
	  }
	};

	function unbind$1(el) {
	  if (!el._bottom) return;
	  var handler = el._bottom.handler;
	  el.removeEventListener('scroll', handler);
	  delete el._bottom;
	}

	function inserted$1(el, binding) {
	  var _binding$modifiers;

	  var _ref = (_binding$modifiers = binding.modifiers) !== null && _binding$modifiers !== void 0 ? _binding$modifiers : {},
	      _ref$once = _ref.once,
	      once = _ref$once === void 0 ? false : _ref$once;

	  var value = binding.value;
	  if (!value) return;

	  var handler = function handler() {
	    // -1是为了 解决在安卓6等部分机型下，scrollHeight四舍五入导致计算偏差问题
	    if (Math.round(el.scrollTop) + el.clientHeight >= el.scrollHeight - 1) {
	      value();
	      once && unbind$1(el);
	    }
	  };

	  el.addEventListener('scroll', handler, {
	    passive: true
	  });
	  el._bottom = {
	    handler: handler
	  };
	}

	var directive$1 = {
	  inserted: inserted$1,
	  unbind: unbind$1,
	  install: function install(Vue) {
	    Vue.directive('vui-scroll-bottom', directive$1);
	  }
	};

	function unbind(el) {
	  if (!el._top) return;
	  var handler = el._top.handler;
	  el.removeEventListener('scroll', handler);
	  delete el._top;
	}

	function inserted(el, binding) {
	  var _binding$modifiers;

	  var _ref = (_binding$modifiers = binding.modifiers) !== null && _binding$modifiers !== void 0 ? _binding$modifiers : {},
	      _ref$once = _ref.once,
	      once = _ref$once === void 0 ? false : _ref$once;

	  var value = binding.value;
	  if (!value) return;

	  var handler = function handler() {
	    if (el.scrollTop <= 0) {
	      value();
	      once && unbind(el);
	    }
	  };

	  el.addEventListener('scroll', handler, {
	    passive: true
	  });
	  el._top = {
	    handler: handler
	  };
	}

	var directive = {
	  inserted: inserted,
	  unbind: unbind,
	  install: function install(Vue) {
	    Vue.directive('vui-scroll-top', directive);
	  }
	};

	function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !construct) return false; if (construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var VComponent$1 = /*#__PURE__*/function (_Vue) {
	  _inherits(VComponent, _Vue);

	  var _super = _createSuper$1(VComponent);

	  function VComponent() {
	    var _this;

	    _classCallCheck(this, VComponent);

	    _this = _super.apply(this, arguments);
	    _this.show = true;
	    return _this;
	  }

	  _createClass(VComponent, [{
	    key: "onClose",
	    value: function onClose() {
	      this.show = false;
	      this.$emit('close');
	    }
	  }]);

	  return VComponent;
	}(Vue__default['default']);

	__decorate([Prop({
	  type: String,
	  default: 'regular'
	})], VComponent$1.prototype, "type", void 0);

	__decorate([Prop({
	  type: String,
	  default: 'regular'
	})], VComponent$1.prototype, "hue", void 0);

	__decorate([Prop({
	  type: String,
	  default: function _default() {
	    return size;
	  }
	})], VComponent$1.prototype, "size", void 0);

	__decorate([Prop({
	  type: Boolean,
	  default: false
	})], VComponent$1.prototype, "closable", void 0);

	VComponent$1 = __decorate([Component({
	  name: 'VuiTag'
	})], VComponent$1);
	var script$1 = VComponent$1;

	var __vue_script__$1 = script$1;
	/* template */

	var __vue_render__$1 = function __vue_render__() {
	  var _context, _context2, _context3;

	  var _obj;

	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _vm.show ? _c("span", {
	    class: ["vui-tag", (_obj = {}, _obj["vui-tag--" + _vm.type] = includes(_context = ["gorgeous", "plain"]).call(_context, _vm.type), _obj["vui-tag--" + _vm.hue] = includes(_context2 = ["primary", "success", "fail"]).call(_context2, _vm.hue), _obj["vui-tag--" + _vm.size] = includes(_context3 = ["big", "small", "mini"]).call(_context3, _vm.size), _obj)]
	  }, [_vm._t("default"), _vm._v(" "), _vm.closable ? _c("i", {
	    staticClass: "vui-tag__close",
	    on: {
	      click: _vm.onClose
	    }
	  }, [_vm._v("X")]) : _vm._e()], 2) : _vm._e();
	};

	var __vue_staticRenderFns__$1 = [];
	__vue_render__$1._withStripped = true;
	/* style */

	var __vue_inject_styles__$1 = undefined;
	/* scoped */

	var __vue_scope_id__$1 = undefined;
	/* module identifier */

	var __vue_module_identifier__$1 = undefined;
	/* functional template */

	var __vue_is_functional_template__$1 = false;
	/* style inject */

	/* style inject SSR */

	/* style inject shadow dom */

	var __vue_component__$1 = /*#__PURE__*/normalizeComponent_1({
	  render: __vue_render__$1,
	  staticRenderFns: __vue_staticRenderFns__$1
	}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

	var Tag = __vue_component__$1;

	Tag.install = function (Vue) {
	  Vue.component('VuiTag', __vue_component__$1);
	};

	function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

	function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !construct) return false; if (construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var VComponent = /*#__PURE__*/function (_Vue) {
	  _inherits(VComponent, _Vue);

	  var _super = _createSuper(VComponent);

	  function VComponent() {
	    var _this;

	    _classCallCheck(this, VComponent);

	    _this = _super.apply(this, arguments);
	    _this.visible = false;
	    _this.content = '';
	    _this.allowHtml = false;
	    _this.className = '';
	    return _this;
	  }

	  _createClass(VComponent, [{
	    key: "show",
	    value: function show(content) {
	      var _this2 = this;

	      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	          duration = _ref.duration,
	          allowHtml = _ref.allowHtml,
	          className = _ref.className;

	      clearTimeout(this.timeoutId);
	      this.content = content;
	      this.allowHtml = !!allowHtml;
	      this.className = className || '';
	      this.visible = true;
	      this.timeoutId = window.setTimeout(function () {
	        _this2.visible = false;
	      }, duration || 3000);
	    }
	  }, {
	    key: "mounted",
	    value: function mounted() {
	      document.body.appendChild(this.$el);
	    }
	  }]);

	  return VComponent;
	}(Vue__default['default']);

	VComponent = __decorate([Component({
	  name: 'VuiToast',
	  components: {
	    VuiTransition: Transition
	  }
	})], VComponent);
	var script = VComponent;

	/* script */
	var __vue_script__ = script;
	/* template */

	var __vue_render__ = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c("vui-transition", {
	    class: ["vui-toast", _vm.className],
	    attrs: {
	      appear: ""
	    }
	  }, [_vm.visible && _vm.allowHtml ? _c("div", {
	    staticClass: "vui-toast__content",
	    domProps: {
	      innerHTML: _vm._s(_vm.content)
	    }
	  }) : _vm.visible ? _c("div", {
	    staticClass: "vui-toast__content"
	  }, [_vm._v(_vm._s(_vm.content))]) : _vm._e()]);
	};

	var __vue_staticRenderFns__ = [];
	__vue_render__._withStripped = true;
	/* style */

	var __vue_inject_styles__ = undefined;
	/* scoped */

	var __vue_scope_id__ = undefined;
	/* module identifier */

	var __vue_module_identifier__ = undefined;
	/* functional template */

	var __vue_is_functional_template__ = false;
	/* style inject */

	/* style inject SSR */

	/* style inject shadow dom */

	var __vue_component__ = /*#__PURE__*/normalizeComponent_1({
	  render: __vue_render__,
	  staticRenderFns: __vue_staticRenderFns__
	}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

	var vm;

	function Toast(content, options) {
	  if (!vm) {
	    vm = new __vue_component__();
	    vm.$mount(document.body.appendChild(document.createElement('div')));
	  }
	  vm.show(content, options);
	}

	Toast.install = function (Vue) {
	  extendVue(Vue, 'toast', Toast);
	};

	function install(vue, // 插件参数
	options) {
	  var names = ['Appear', 'Avatar', 'Button', 'Config', 'Dialog', 'Disappear', 'HistoryAction', 'Icon', 'ImagePreviewer', 'Intersect', 'Link', 'Overlayer', 'Popup', 'Scroll', 'ScrollBottom', 'ScrollTop', 'Tag', 'Toast', 'Transition'];
	  [directive$5, Avatar, Button, Config, Dialog, directive$4, plugin, Icon, ImagePreviewer, directive$3, Link, Overlayer, Popup, directive$2, directive$1, directive, Tag, Toast, Transition].forEach(function (item, index) {
	    if (typeof item.install !== 'function') {
	      return;
	    }

	    vue.use(item, options === null || options === void 0 ? void 0 : options[names[index]]);
	  });
	}
	var index = {
	  version: '2.3.0',
	  install: install,
	  config: Config
	};

	exports.Appear = directive$5;
	exports.Avatar = Avatar;
	exports.Button = Button;
	exports.Config = Config;
	exports.Dialog = Dialog;
	exports.Disappear = directive$4;
	exports.HistoryAction = plugin;
	exports.Icon = Icon;
	exports.ImagePreviewer = ImagePreviewer;
	exports.Intersect = directive$3;
	exports.Link = Link;
	exports.Overlayer = Overlayer;
	exports.Popup = Popup;
	exports.Scroll = directive$2;
	exports.ScrollBottom = directive$1;
	exports.ScrollTop = directive;
	exports.Tag = Tag;
	exports.Toast = Toast;
	exports.Transition = Transition;
	exports.default = index;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
