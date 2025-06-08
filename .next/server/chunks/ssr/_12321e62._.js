module.exports = {

"[project]/app/callback/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// pages/callback.tsx or app/callback/page.tsx (Next 13+)
__turbopack_context__.s({
    "default": (()=>CallbackPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useCookies$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useCookies.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$pinwheel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LoaderPinwheelIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-pinwheel.js [app-ssr] (ecmascript) <export default as LoaderPinwheelIcon>");
"use client";
;
;
;
;
;
function CallbackPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const { setCookie } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useCookies$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const code = params.get("code");
        if (!code) return;
        const fetchToken = async ()=>{
            setLoading(true);
            const res = await fetch("/api/spotify/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code
                })
            });
            const data = await res.json();
            console.log("Tokens:", data);
            if (res.ok) {
                // Store token in localStorage/context or set cookie
                setCookie("token", JSON.stringify(data));
                router.push("/metronome"); // or dashboard
            } else {
                console.error("Token error:", data.error);
            }
            setLoading(false);
        };
        fetchToken();
    }, [
        params
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full w-full justify-center items-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "absolute top-[50%] right-[50%] mx-auto my-auto h-5 w-10",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$pinwheel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LoaderPinwheelIcon$3e$__["LoaderPinwheelIcon"], {
                    className: "spin"
                }, void 0, false, {
                    fileName: "[project]/app/callback/page.tsx",
                    lineNumber: 47,
                    columnNumber: 5
                }, this),
                "Connecting with Spotify..."
            ]
        }, void 0, true, {
            fileName: "[project]/app/callback/page.tsx",
            lineNumber: 46,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/callback/page.tsx",
        lineNumber: 45,
        columnNumber: 3
    }, this);
}
}}),
"[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-ssr] (ecmascript)");
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/loader-pinwheel.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": (()=>__iconNode),
    "default": (()=>LoaderPinwheel)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0",
            key: "1lzz15"
        }
    ],
    [
        "path",
        {
            d: "M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6",
            key: "1gnrpi"
        }
    ],
    [
        "path",
        {
            d: "M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6",
            key: "u9yy5q"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ]
];
const LoaderPinwheel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("loader-pinwheel", __iconNode);
;
 //# sourceMappingURL=loader-pinwheel.js.map
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/loader-pinwheel.js [app-ssr] (ecmascript) <export default as LoaderPinwheelIcon>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "LoaderPinwheelIcon": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$pinwheel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$pinwheel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-pinwheel.js [app-ssr] (ecmascript)");
}}),

};

//# sourceMappingURL=_12321e62._.js.map