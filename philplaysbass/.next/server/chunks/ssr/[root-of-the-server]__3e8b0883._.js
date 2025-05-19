module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/context/LanguageContext.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "LanguageContext": (()=>LanguageContext),
    "LanguageProvider": (()=>LanguageProvider),
    "useLanguage": (()=>useLanguage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const LanguageProvider = ({ children })=>{
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("en");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
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
const useLanguage = ()=>{
    "use client";
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
}}),
"[project]/AuthProvider.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "AuthProvider": (()=>AuthProvider)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/index.es.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$frontend$2f$AuthProvider$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/frontend/AuthProvider.es.js [app-ssr] (ecmascript)");
"use client";
;
;
const AuthProvider = ({ children })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$frontend$2f$AuthProvider$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["KindeProvider"], {
        children: children
    }, void 0, false, {
        fileName: "[project]/AuthProvider.tsx",
        lineNumber: 6,
        columnNumber: 10
    }, this);
};
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else {
                "TURBOPACK unreachable";
            }
        } else {
            "TURBOPACK unreachable";
        }
    }
} //# sourceMappingURL=module.compiled.js.map
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxRuntime; //# sourceMappingURL=react-jsx-runtime.js.map
}}),
"[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/utils/version.es.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "version": (()=>o)
});
const o = "2.6.2";
;
}}),
"[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/utils/removeTrailingSlash.es.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
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
"[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/config/index.es.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "config": (()=>O),
    "routes": (()=>p)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$utils$2f$version$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/utils/version.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$utils$2f$removeTrailingSlash$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/utils/removeTrailingSlash.es.js [app-ssr] (ecmascript)");
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
}, a = "pkce-verifier", _ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$utils$2f$removeTrailingSlash$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeTrailingSlash"])(process.env.KINDE_SITE_URL), T = process.env.KINDE_POST_LOGIN_ALLOWED_URL_REGEX, t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$utils$2f$removeTrailingSlash$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeTrailingSlash"])(process.env.NEXT_PUBLIC_KINDE_AUTH_API_PATH) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$utils$2f$removeTrailingSlash$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeTrailingSlash"])(process.env.KINDE_AUTH_API_PATH) || "/api/auth", R = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$utils$2f$removeTrailingSlash$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeTrailingSlash"])(process.env.KINDE_POST_LOGIN_REDIRECT_URL) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$utils$2f$removeTrailingSlash$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeTrailingSlash"])(process.env.KINDE_POST_LOGIN_URL_REDIRECT_URL), E = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$utils$2f$removeTrailingSlash$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeTrailingSlash"])(process.env.KINDE_POST_LOGOUT_REDIRECT_URL), r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$utils$2f$removeTrailingSlash$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeTrailingSlash"])(process.env.KINDE_ISSUER_URL), l = process.env.KINDE_CLIENT_ID, i = process.env.KINDE_CLIENT_SECRET, n = process.env.KINDE_AUDIENCE, D = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$utils$2f$removeTrailingSlash$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["removeTrailingSlash"])(process.env.KINDE_COOKIE_DOMAIN), u = process.env.KINDE_SCOPE || "openid profile email offline", N = process.env.KINDE_DEBUG_MODE === "true", O = {
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
        frameworkVersion: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$utils$2f$version$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["version"],
        scope: u
    },
    grantType: "AUTHORIZATION_CODE"
}, o = (s)=>s && /^[a-zA-Z0-9_-]+$/.test(s) ? s : null, p = {
    login: o(process.env.KINDE_AUTH_LOGIN_ROUTE) || "login",
    logout: o(process.env.KINDE_AUTH_LOGOUT_ROUTE) || "logout",
    register: o(process.env.KINDE_AUTH_REGISTER_ROUTE) || "register",
    createOrg: o(process.env.KINDE_AUTH_CREATEORG_ROUTE) || "create_org",
    health: o(process.env.KINDE_AUTH_HEALTH_ROUTE) || "health",
    setup: o(process.env.KINDE_AUTH_SETUP_ROUTE) || "setup"
};
;
}}),
"[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/frontend/AuthProvider.es.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "KindeProvider": (()=>Oe),
    "flagDataTypeMap": (()=>m),
    "useKindeAuth": (()=>Ee)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/config/index.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
;
const m = {
    s: "string",
    i: "integer",
    b: "boolean"
}, b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])({
    ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["config"].initialState
}), Ee = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(b), Fe = async (d)=>{
    let r;
    try {
        r = await fetch(d);
    } catch  {
        throw new Error("Failed to fetch token");
    }
    if (r.ok) return await r.json();
    if (r.status === 401) throw new Error("Failed to fetch token");
}, Oe = ({ children: d })=>{
    const r = `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["config"].apiPath}/${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].setup}`, w = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        F();
    }, [
        "checkSession"
    ]), F = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
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
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["config"].isDebugMode && console.error(t);
                }
            }, le = (e, s)=>{
                try {
                    return l(e, s, "s").value;
                } catch (t) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["config"].isDebugMode && console.error(t);
                }
            }, de = (e, s)=>{
                try {
                    return l(e, s, "i").value;
                } catch (t) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["config"].isDebugMode && console.error(t);
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
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["config"].isDebugMode && console.error(n), u((i)=>({
                    ...i,
                    isLoading: !1,
                    error: n
                }));
        }
    }, [
        r
    ]), [k, u] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["config"].initialState
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(b.Provider, {
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
"[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/frontend/hooks/use-sync-state.es.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "useSyncState": (()=>o)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
const o = (r)=>{
    const [t, n] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
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
"[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/utils/removeUndefined.es.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>n)
});
const n = (e)=>Object.fromEntries(Object.entries(e).filter(([r, t])=>t !== void 0));
;
}}),
"[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/utils/generateOrganizationObject.es.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "generateOrganizationObject": (()=>d)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$utils$2f$removeUndefined$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/utils/removeUndefined.es.js [app-ssr] (ecmascript)");
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
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$utils$2f$removeUndefined$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(_);
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
"[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/frontend/KindeBrowserClient.es.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "useKindeBrowserClient": (()=>C)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$frontend$2f$AuthProvider$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/frontend/AuthProvider.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/config/index.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$frontend$2f$hooks$2f$use$2d$sync$2d$state$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/frontend/hooks/use-sync-state.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$utils$2f$generateOrganizationObject$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/utils/generateOrganizationObject.es.js [app-ssr] (ecmascript)");
;
;
;
;
;
const F = async ()=>{
    try {
        const { refreshTokensServerAction: a } = await __turbopack_context__.r("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/session/refreshTokensServerAction.es.js [app-ssr] (ecmascript, async loader)")(__turbopack_context__.i);
        return a;
    } catch  {
        return null;
    }
}, C = (a = process.env.NEXT_PUBLIC_KINDE_AUTH_API_PATH || process.env.KINDE_AUTH_API_PATH || "/api/auth")=>{
    const [r, i] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$frontend$2f$hooks$2f$use$2d$sync$2d$state$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSyncState"])({
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        g();
    }, []);
    const f = async ()=>{
        const n = await F();
        n ? (await n(), await g()) : console.warn("[Kinde] refreshData is only available in Next.js App Router environments, version 14 or higher.");
    }, g = async ()=>{
        const n = `${a}/${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].setup}`, s = await fetch(n), { message: e, error: o, ...t } = await s.json();
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
        if (e && t.t && e !== t.t) throw Error(`Flag ${n} is of type ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$frontend$2f$AuthProvider$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["flagDataTypeMap"][t.t]} - requested type ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$frontend$2f$AuthProvider$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["flagDataTypeMap"][e]}`);
        return {
            code: n,
            type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$frontend$2f$AuthProvider$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["flagDataTypeMap"][t.t || e],
            value: t.v == null ? s : t.v,
            is_default: t.v == null,
            defaultValue: s
        };
    }, k = (n, s)=>{
        try {
            return c(n, s, "b").value;
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["config"].isDebugMode && console.error(e);
        }
    }, T = (n, s)=>{
        try {
            return c(n, s, "s").value;
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["config"].isDebugMode && console.error(e);
        }
    }, m = (n, s)=>{
        try {
            return c(n, s, "i").value;
        } catch (e) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["config"].isDebugMode && console.error(e);
        }
    }, p = (n, s = "access_token")=>{
        const e = s === "access_token" ? r().accessToken : r().idToken;
        return e ? {
            name: n,
            value: e[n]
        } : null;
    }, h = ()=>r().accessToken, d = ()=>r().accessTokenEncoded, v = ()=>d(), w = ()=>r().idTokenRaw, A = ()=>r().idToken, _ = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$utils$2f$generateOrganizationObject$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateOrganizationObject"])(r().idToken, r().accessToken), E = ()=>r().permissions, y = ()=>r().userOrganizations, D = (n)=>{
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
"[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/components/RegisterLink.es.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "RegisterLink": (()=>c)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/config/index.es.js [app-ssr] (ecmascript)");
;
;
function c({ children: a, orgCode: t, postLoginRedirectURL: i, authUrlParams: o, ...f }) {
    let e = new URLSearchParams(), r = {};
    t != null && (r.org_code = t), i != null && (r.post_login_redirect_url = i), r = {
        ...o,
        ...r
    };
    for(const n in r)e.append(n, r[n]);
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("a", {
        href: `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["config"].apiPath}/${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].register}${e ? `?${e.toString()}` : ""}`,
        ...f,
        children: a
    });
}
;
}}),
"[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/components/LoginLink.es.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "LoginLink": (()=>w)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/config/index.es.js [app-ssr] (ecmascript)");
;
;
function w({ children: l, postLoginRedirectURL: n, orgCode: o, authUrlParams: s, ...t }) {
    const r = new URLSearchParams();
    let a = {};
    o != null && (a.org_code = o), n != null && (n != null && n.startsWith("/") && (n = `${typeof window < "u" ? window.location.origin : process.env.KINDE_SITE_URL}${n}`), a.post_login_redirect_url = n), a = {
        ...s,
        ...a
    };
    for(const f in a)r.append(f, a[f]);
    const u = `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["config"].apiPath}/${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].login}${r ? `?${r.toString()}` : ""}`;
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("a", {
        href: u,
        ...t,
        children: l
    });
}
;
}}),
"[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/components/LogoutLink.es.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "LogoutLink": (()=>m)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/config/index.es.js [app-ssr] (ecmascript)");
;
;
function m({ children: r, postLogoutRedirectURL: o, ...t }) {
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("a", {
        href: `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["config"].apiPath}/${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].logout}${o ? `?post_logout_redirect_url=${o}` : ""}`,
        ...t,
        children: r
    });
}
;
}}),
"[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/components/CreateOrgLink.es.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "CreateOrgLink": (()=>m)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/config/index.es.js [app-ssr] (ecmascript)");
;
;
function m({ children: t, orgName: r, ...e }) {
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])("a", {
        href: `${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["config"].apiPath}/${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$config$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["routes"].createOrg}${r ? `?org_name=${r}` : ""}`,
        ...e,
        children: t
    });
}
;
}}),
"[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/index.es.js [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$frontend$2f$AuthProvider$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/frontend/AuthProvider.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$frontend$2f$KindeBrowserClient$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/frontend/KindeBrowserClient.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$components$2f$RegisterLink$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/components/RegisterLink.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$components$2f$LoginLink$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/components/LoginLink.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$components$2f$LogoutLink$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/components/LogoutLink.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$components$2f$CreateOrgLink$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/components/CreateOrgLink.es.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
}}),
"[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/index.es.js [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$frontend$2f$AuthProvider$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/frontend/AuthProvider.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$frontend$2f$KindeBrowserClient$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/frontend/KindeBrowserClient.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$components$2f$RegisterLink$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/components/RegisterLink.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$components$2f$LoginLink$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/components/LoginLink.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$components$2f$LogoutLink$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/components/LogoutLink.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$components$2f$CreateOrgLink$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/components/CreateOrgLink.es.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/index.es.js [app-ssr] (ecmascript) <locals>");
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__3e8b0883._.js.map