(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/context/LanguageContext.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "LanguageContext": (()=>LanguageContext),
    "LanguageProvider": (()=>LanguageProvider),
    "useLanguage": (()=>useLanguage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const LanguageProvider = ({ children })=>{
    _s();
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("en");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: {
            language,
            setLanguage
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/context/LanguageContext.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
};
_s(LanguageProvider, "JgNS4s3wc06/6u6z+Ak7Ai5ELN8=");
_c = LanguageProvider;
const useLanguage = ()=>{
    _s1();
    "use client";
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
_s1(useLanguage, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "LanguageProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/AuthProvider.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AuthProvider": (()=>AuthProvider)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/index.es.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$frontend$2f$AuthProvider$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/frontend/AuthProvider.es.js [app-client] (ecmascript)");
"use client";
;
;
const AuthProvider = ({ children })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$frontend$2f$AuthProvider$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KindeProvider"], {
        children: children
    }, void 0, false, {
        fileName: "[project]/AuthProvider.tsx",
        lineNumber: 6,
        columnNumber: 10
    }, this);
};
_c = AuthProvider;
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return (type.displayName || "Context") + ".Provider";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, self, source, owner, props, debugStack, debugTask) {
        self = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, self, source, getOwner(), maybeKey, debugStack, debugTask);
    }
    function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    Symbol.for("react.provider");
    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        "react-stack-bottom-frame": function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React["react-stack-bottom-frame"].bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren, source, self) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}}),
"[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/utils/version.es.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "version": (()=>o)
});
const o = "2.6.2";
;
}}),
"[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/utils/removeTrailingSlash.es.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "removeTrailingSlash": (()=>n)
});
function n(e) {
    if (e != null) return e = e.trim(), e.endsWith("/") && (e = e.slice(0, -1)), e;
}
;
}}),
"[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/config/index.es.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "config": (()=>O),
    "routes": (()=>p)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$utils$2f$version$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/utils/version.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$utils$2f$removeTrailingSlash$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/utils/removeTrailingSlash.es.js [app-client] (ecmascript)");
;
;
const I = {
    accessToken: null,
    idToken: null,
    isAuthenticated: !1,
    isLoading: !0,
    organization: null,
    permissions: [],
    user: null,
    userOrganizations: [],
    getAccessToken: ()=>null,
    getBooleanFlag: ()=>null,
    getClaim: ()=>null,
    getFlag: ()=>null,
    getIdToken: ()=>null,
    getIntegerFlag: ()=>null,
    getOrganization: ()=>null,
    getPermission: ()=>null,
    getPermissions: ()=>[],
    getStringFlag: ()=>null,
    getToken: ()=>null,
    getUser: ()=>null,
    getUserOrganizations: ()=>null,
    refreshData: ()=>null
}, a = "pkce-verifier", _ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$utils$2f$removeTrailingSlash$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeTrailingSlash"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.KINDE_SITE_URL), T = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.KINDE_POST_LOGIN_ALLOWED_URL_REGEX, t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$utils$2f$removeTrailingSlash$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeTrailingSlash"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_KINDE_AUTH_API_PATH) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$utils$2f$removeTrailingSlash$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeTrailingSlash"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.KINDE_AUTH_API_PATH) || "/api/auth", R = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$utils$2f$removeTrailingSlash$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeTrailingSlash"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.KINDE_POST_LOGIN_REDIRECT_URL) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$utils$2f$removeTrailingSlash$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeTrailingSlash"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.KINDE_POST_LOGIN_URL_REDIRECT_URL), E = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$utils$2f$removeTrailingSlash$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeTrailingSlash"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.KINDE_POST_LOGOUT_REDIRECT_URL), r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$utils$2f$removeTrailingSlash$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeTrailingSlash"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.KINDE_ISSUER_URL), l = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.KINDE_CLIENT_ID, i = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.KINDE_CLIENT_SECRET, n = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.KINDE_AUDIENCE, D = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$utils$2f$removeTrailingSlash$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeTrailingSlash"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.KINDE_COOKIE_DOMAIN), u = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.KINDE_SCOPE || "openid profile email offline", N = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.KINDE_DEBUG_MODE === "true", O = {
    isDebugMode: N,
    apiPath: t,
    initialState: I,
    SESSION_PREFIX: a,
    redirectURL: _,
    postLoginRedirectURL: R,
    postLoginAllowedURLRegex: T,
    issuerURL: r,
    clientID: l,
    clientSecret: i,
    postLogoutRedirectURL: E,
    audience: n ? n.split(" ") : "",
    cookieDomain: D,
    responseType: "code",
    codeChallengeMethod: "S256",
    redirectRoutes: {
        callback: `${t}/kinde_callback`
    },
    issuerRoutes: {
        logout: "/logout",
        login: "/oauth2/auth",
        register: "/oauth2/auth",
        token: "/oauth2/token",
        profile: "/oauth2/v2/user_profile"
    },
    clientOptions: {
        audience: n ? n.split(" ") : "",
        authDomain: r || "",
        clientId: l || "",
        clientSecret: i || "",
        logoutRedirectURL: E || "",
        redirectURL: `${_}${t}/kinde_callback`,
        frameworkVersion: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$utils$2f$version$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["version"],
        scope: u
    },
    grantType: "AUTHORIZATION_CODE"
}, o = (s)=>s && /^[a-zA-Z0-9_-]+$/.test(s) ? s : null, p = {
    login: o(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.KINDE_AUTH_LOGIN_ROUTE) || "login",
    logout: o(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.KINDE_AUTH_LOGOUT_ROUTE) || "logout",
    register: o(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.KINDE_AUTH_REGISTER_ROUTE) || "register",
    createOrg: o(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.KINDE_AUTH_CREATEORG_ROUTE) || "create_org",
    health: o(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.KINDE_AUTH_HEALTH_ROUTE) || "health",
    setup: o(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.KINDE_AUTH_SETUP_ROUTE) || "setup"
};
;
}}),
"[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/frontend/AuthProvider.es.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "KindeProvider": (()=>Oe),
    "flagDataTypeMap": (()=>m),
    "useKindeAuth": (()=>Ee)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/config/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
;
const m = {
    s: "string",
    i: "integer",
    b: "boolean"
}, b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["config"].initialState
}), Ee = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(b), Fe = async (d)=>{
    let r;
    try {
        r = await fetch(d);
    } catch  {
        throw new Error("Failed to fetch token");
    }
    if (r.ok) return await r.json();
    if (r.status === 401) throw new Error("Failed to fetch token");
}, Oe = ({ children: d })=>{
    const r = `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["config"].apiPath}/${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].setup}`, w = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        F();
    }, [
        "checkSession"
    ]), F = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            const n = await Fe(r);
            if (n == null) return;
            const { accessToken: i, accessTokenEncoded: c, featureFlags: Y, idToken: v, organization: T, permissions: f, user: z, userOrganizations: E } = n, Z = ()=>i, V = ()=>c, ee = ()=>c, te = ()=>c, se = ()=>v, ne = ()=>g, oe = ()=>f, re = ()=>T, ae = ()=>z, ie = ()=>E, ce = (e, s = "access_token")=>{
                const t = s === "access_token" ? n.accessToken : n.idToken;
                return t ? {
                    name: e,
                    value: t[e]
                } : null;
            }, l = (e, s, t)=>{
                const h = Y, o = h && h[e] ? h[e] : {};
                if (Object.keys(o).length === 0 && s == null) throw Error(`Flag ${e} was not found, and no default value has been provided`);
                if (t && o.t && t !== o.t) throw Error(`Flag ${e} is of type ${m[o.t]} - requested type ${m[t]}`);
                return {
                    // @ts-ignore
                    code: e,
                    // @ts-ignore
                    type: m[o.t || t],
                    // @ts-ignore
                    value: o.v == null ? s : o.v,
                    // @ts-ignore
                    is_default: o.v == null,
                    defaultValue: s
                };
            }, ge = (e, s)=>{
                try {
                    return l(e, s, "b").value;
                } catch (t) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["config"].isDebugMode && console.error(t);
                }
            }, le = (e, s)=>{
                try {
                    return l(e, s, "s").value;
                } catch (t) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["config"].isDebugMode && console.error(t);
                }
            }, de = (e, s)=>{
                try {
                    return l(e, s, "i").value;
                } catch (t) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["config"].isDebugMode && console.error(t);
                }
            }, ke = (e)=>({
                    isGranted: f.permissions.some((s)=>s === e),
                    orgCode: T.orgCode
                });
            u((e)=>({
                    ...e,
                    accessToken: i,
                    accessTokenEncoded: c,
                    accessTokenRaw: c,
                    idToken: v,
                    idTokenRaw: g,
                    idTokenEncoded: g,
                    isLoading: !1,
                    organization: T,
                    permissions: f,
                    user: z,
                    userOrganizations: E,
                    getAccessToken: Z,
                    getAccessTokenRaw: V,
                    getAccessTokenEncoded: ee,
                    getBooleanFlag: ge,
                    getClaim: ce,
                    getFlag: l,
                    getIdToken: se,
                    getIdTokenRaw: ne,
                    getIntegerFlag: de,
                    getOrganization: re,
                    getPermission: ke,
                    getPermissions: oe,
                    getStringFlag: le,
                    getToken: te,
                    getUser: ae,
                    getUserOrganizations: ie,
                    refreshData: w
                }));
        } catch (n) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["config"].isDebugMode && console.error(n), u((i)=>({
                    ...i,
                    isLoading: !1,
                    error: n
                }));
        }
    }, [
        r
    ]), [k, u] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["config"].initialState
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const n = async ()=>{
            await F(), u((i)=>({
                    ...i,
                    isLoading: !1
                }));
        };
        k.user || n();
    }, [
        k.user
    ]);
    const { user: p, accessToken: y, accessTokenRaw: A, accessTokenEncoded: C, idToken: I, idTokenEncoded: P, idTokenRaw: g, getAccessToken: R, getAccessTokenRaw: S, getIdTokenRaw: U, getToken: D, getClaim: $, getFlag: x, getIdToken: L, getBooleanFlag: M, getStringFlag: j, getIntegerFlag: B, getOrganization: _, getPermission: K, getPermissions: q, getUser: G, getUserOrganizations: H, permissions: J, organization: N, userOrganizations: Q, error: W, isLoading: X } = k;
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(b.Provider, {
        value: {
            user: p,
            error: W,
            accessToken: y,
            idToken: I,
            accessTokenEncoded: C,
            accessTokenRaw: A,
            idTokenEncoded: P,
            idTokenRaw: g,
            getAccessToken: R,
            getAccessTokenRaw: S,
            getToken: D,
            getClaim: $,
            getFlag: x,
            getIdToken: L,
            getIdTokenRaw: U,
            getBooleanFlag: M,
            getStringFlag: j,
            getIntegerFlag: B,
            getOrganization: _,
            getPermission: K,
            getPermissions: q,
            getUser: G,
            getUserOrganizations: H,
            permissions: J,
            organization: N,
            userOrganizations: Q,
            isLoading: X,
            isAuthenticated: !!p,
            refreshData: w
        },
        children: d
    });
};
;
}}),
"[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/frontend/hooks/use-sync-state.es.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "useSyncState": (()=>o)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
const o = (r)=>{
    const [t, n] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        current: r
    });
    return [
        ()=>t.current,
        (e)=>{
            n({
                current: e
            }), t.current = e;
        }
    ];
};
;
}}),
"[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/utils/removeUndefined.es.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>n)
});
const n = (e)=>Object.fromEntries(Object.entries(e).filter(([r, t])=>t !== void 0));
;
}}),
"[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/utils/generateOrganizationObject.es.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "generateOrganizationObject": (()=>d)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$utils$2f$removeUndefined$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/utils/removeUndefined.es.js [app-client] (ecmascript)");
;
const a = (s, o)=>{
    const i = s.organization_properties || s["x-hasura-organization_properties"] || {}, n = o.organization_properties || o["x-hasura-organization_properties"] || {}, e = {
        ...i,
        ...n
    }, r = {};
    Object.keys(e).forEach((t)=>{
        e[t].t === "b" || e[t].t, r[t] = e[t].v;
    });
    const _ = {
        // Keep the original keys for backwards compatibility
        // will be deprecated in the future
        city: r.kp_org_city,
        industry: r.kp_org_industry,
        postcode: r.kp_org_postcode,
        state_region: r.kp_org_state_region,
        street_address: r.kp_org_street_address,
        street_address_2: r.kp_org_street_address_2,
        ...r
    };
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$utils$2f$removeUndefined$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(_);
}, d = (s, o)=>{
    const i = o.org_code || o["x-hasura-org-code"], n = o.org_name || o["x-hasura-org-name"];
    return i ? {
        orgCode: i,
        orgName: n,
        properties: a(s, o)
    } : null;
};
;
}}),
"[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/frontend/KindeBrowserClient.es.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "useKindeBrowserClient": (()=>C)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$frontend$2f$AuthProvider$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/frontend/AuthProvider.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/config/index.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$frontend$2f$hooks$2f$use$2d$sync$2d$state$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/frontend/hooks/use-sync-state.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$utils$2f$generateOrganizationObject$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/utils/generateOrganizationObject.es.js [app-client] (ecmascript)");
;
;
;
;
;
const F = async ()=>{
    try {
        const { refreshTokensServerAction: a } = await __turbopack_context__.r("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/session/refreshTokensServerAction.es.js [app-client] (ecmascript, async loader)")(__turbopack_context__.i);
        return a;
    } catch  {
        return null;
    }
}, C = (a = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_KINDE_AUTH_API_PATH || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.KINDE_AUTH_API_PATH || "/api/auth")=>{
    const [r, i] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$frontend$2f$hooks$2f$use$2d$sync$2d$state$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncState"])({
        accessToken: null,
        accessTokenEncoded: null,
        error: null,
        featureFlags: [],
        idToken: null,
        idTokenRaw: null,
        isAuthenticated: !1,
        isLoading: !0,
        organization: null,
        permissions: null,
        user: null,
        userOrganizations: null
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        g();
    }, []);
    const f = async ()=>{
        const n = await F();
        n ? (await n(), await g()) : console.warn("[Kinde] refreshData is only available in Next.js App Router environments, version 14 or higher.");
    }, g = async ()=>{
        const n = `${a}/${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].setup}`, s = await fetch(n), { message: e, error: o, ...t } = await s.json();
        if (!s.ok) {
            i({
                ...r(),
                isLoading: !1,
                error: `${e}: ${o || "An error occurred"}`
            });
            return;
        }
        switch(e){
            case "OK":
                i({
                    ...t,
                    isLoading: !1
                });
                break;
            case "NOT_LOGGED_IN":
                i({
                    ...r(),
                    isLoading: !1
                });
                break;
            default:
                i({
                    ...r(),
                    isLoading: !1,
                    error: `${e}: ${o || "An error occurred"}`
                });
        }
    }, c = (n, s, e)=>{
        const o = r().featureFlags || [], t = o && o[n] ? o[n] : null;
        if (!t && s == null) throw Error(`Flag ${n} was not found, and no default value has been provided`);
        if (e && t.t && e !== t.t) throw Error(`Flag ${n} is of type ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$frontend$2f$AuthProvider$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flagDataTypeMap"][t.t]} - requested type ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$frontend$2f$AuthProvider$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flagDataTypeMap"][e]}`);
        return {
            code: n,
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$frontend$2f$AuthProvider$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flagDataTypeMap"][t.t || e],
            value: t.v == null ? s : t.v,
            is_default: t.v == null,
            defaultValue: s
        };
    }, k = (n, s)=>{
        try {
            return c(n, s, "b").value;
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["config"].isDebugMode && console.error(e);
        }
    }, T = (n, s)=>{
        try {
            return c(n, s, "s").value;
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["config"].isDebugMode && console.error(e);
        }
    }, m = (n, s)=>{
        try {
            return c(n, s, "i").value;
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["config"].isDebugMode && console.error(e);
        }
    }, p = (n, s = "access_token")=>{
        const e = s === "access_token" ? r().accessToken : r().idToken;
        return e ? {
            name: n,
            value: e[n]
        } : null;
    }, h = ()=>r().accessToken, d = ()=>r().accessTokenEncoded, v = ()=>d(), w = ()=>r().idTokenRaw, A = ()=>r().idToken, _ = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$utils$2f$generateOrganizationObject$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateOrganizationObject"])(r().idToken, r().accessToken), E = ()=>r().permissions, y = ()=>r().userOrganizations, D = (n)=>{
        var s, e;
        return r().permissions ? {
            //@ts-ignore
            isGranted: (s = r().permissions.permissions) == null ? void 0 : s.some((o)=>o === n),
            orgCode: (e = r().organization) == null ? void 0 : e.orgCode
        } : {
            isGranted: !1,
            orgCode: null
        };
    };
    return {
        ...r(),
        isAuthenticated: !!r().user,
        getUser: ()=>r().user,
        getIdTokenRaw: w,
        getPermission: D,
        getBooleanFlag: k,
        getIntegerFlag: m,
        getFlag: c,
        getStringFlag: T,
        getClaim: p,
        getAccessToken: h,
        getToken: d,
        getAccessTokenRaw: v,
        getIdToken: A,
        getOrganization: _,
        getPermissions: E,
        getUserOrganizations: y,
        refreshData: f,
        accessTokenRaw: r().accessTokenEncoded,
        idTokenEncoded: r().idTokenRaw
    };
};
;
}}),
"[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/components/RegisterLink.es.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "RegisterLink": (()=>c)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/config/index.es.js [app-client] (ecmascript)");
;
;
function c({ children: a, orgCode: t, postLoginRedirectURL: i, authUrlParams: o, ...f }) {
    let e = new URLSearchParams(), r = {};
    t != null && (r.org_code = t), i != null && (r.post_login_redirect_url = i), r = {
        ...o,
        ...r
    };
    for(const n in r)e.append(n, r[n]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("a", {
        href: `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["config"].apiPath}/${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].register}${e ? `?${e.toString()}` : ""}`,
        ...f,
        children: a
    });
}
;
}}),
"[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/components/LoginLink.es.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "LoginLink": (()=>w)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/config/index.es.js [app-client] (ecmascript)");
;
;
function w({ children: l, postLoginRedirectURL: n, orgCode: o, authUrlParams: s, ...t }) {
    const r = new URLSearchParams();
    let a = {};
    o != null && (a.org_code = o), n != null && (n != null && n.startsWith("/") && (n = `${typeof window < "u" ? window.location.origin : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.KINDE_SITE_URL}${n}`), a.post_login_redirect_url = n), a = {
        ...s,
        ...a
    };
    for(const f in a)r.append(f, a[f]);
    const u = `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["config"].apiPath}/${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].login}${r ? `?${r.toString()}` : ""}`;
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("a", {
        href: u,
        ...t,
        children: l
    });
}
;
}}),
"[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/components/LogoutLink.es.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "LogoutLink": (()=>m)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/config/index.es.js [app-client] (ecmascript)");
;
;
function m({ children: r, postLogoutRedirectURL: o, ...t }) {
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("a", {
        href: `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["config"].apiPath}/${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].logout}${o ? `?post_logout_redirect_url=${o}` : ""}`,
        ...t,
        children: r
    });
}
;
}}),
"[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/components/CreateOrgLink.es.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "CreateOrgLink": (()=>m)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/config/index.es.js [app-client] (ecmascript)");
;
;
function m({ children: t, orgName: r, ...e }) {
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])("a", {
        href: `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["config"].apiPath}/${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routes"].createOrg}${r ? `?org_name=${r}` : ""}`,
        ...e,
        children: t
    });
}
;
}}),
"[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/index.es.js [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$frontend$2f$AuthProvider$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/frontend/AuthProvider.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$frontend$2f$KindeBrowserClient$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/frontend/KindeBrowserClient.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$components$2f$RegisterLink$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/components/RegisterLink.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$components$2f$LoginLink$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/components/LoginLink.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$components$2f$LogoutLink$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/components/LogoutLink.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$components$2f$CreateOrgLink$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/components/CreateOrgLink.es.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
}}),
"[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/index.es.js [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$frontend$2f$AuthProvider$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/frontend/AuthProvider.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$frontend$2f$KindeBrowserClient$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/frontend/KindeBrowserClient.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$components$2f$RegisterLink$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/components/RegisterLink.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$components$2f$LoginLink$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/components/LoginLink.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$components$2f$LogoutLink$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/components/LogoutLink.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$components$2f$CreateOrgLink$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/components/CreateOrgLink.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/index.es.js [app-client] (ecmascript) <locals>");
}}),
}]);

//# sourceMappingURL=_81998fc3._.js.map