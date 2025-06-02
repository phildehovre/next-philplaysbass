(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/hooks/useCookies.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
const useCookies = ()=>{
    const getCookie = (name)=>{
        const cookieString = document.cookie.split("; ").find((row)=>row.startsWith(`${name}=`));
        return cookieString ? cookieString.split("=")[1] : null;
    };
    const setCookie = (name, value, days = 7)=>{
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
    };
    const deleteCookie = (name)=>{
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    };
    return {
        getCookie,
        setCookie,
        deleteCookie
    };
};
const __TURBOPACK__default__export__ = useCookies;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/services/membership.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "createMembership": (()=>createMembership),
    "createUser": (()=>createUser),
    "credentials": (()=>credentials),
    "useApiCall": (()=>useApiCall)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("services/membership.ts")}`;
    }
};
var _s = __turbopack_context__.k.signature();
;
const credentials = {
    credentials: "include",
    headers: {
        "Access-Control-Allow-Origin": "no-cors",
        "Content-Type": "application/json"
    }
};
const useApiCall = (callback)=>{
    _s();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const execute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useApiCall.useCallback[execute]": async (...args)=>{
            setIsLoading(true);
            setError(null);
            try {
                const res = await callback(...args);
                setResult(res);
                return res; // Allows the caller to use the result
            } catch (err) {
                setError(err);
                console.error("API call error:", err);
            } finally{
                setIsLoading(false);
            }
        }
    }["useApiCall.useCallback[execute]"], [
        callback
    ]);
    return {
        execute,
        result,
        isLoading,
        error
    };
};
_s(useApiCall, "/uRslkRHX07pKp/l2I2ru6Ul4rc=");
const createMembership = async ()=>{
    try {
        const res = await fetch(url + "/membership", {
            method: "POST",
            ...credentials,
            body: JSON.stringify({
                password,
                email
            })
        });
        const data = await res.json();
        if (data.user) {
            navigate("/");
        }
        console.log(data);
        console.log("membership created");
    } catch (error) {
        console.error(error);
    }
};
const createUser = async (data)=>{
    try {
        const res = await fetch(`${__TURBOPACK__import$2e$meta__.env.CLIENT_URL}/signup`, {
            method: "POST",
            ...credentials,
            body: JSON.stringify({
                email: data.email
            })
        });
        const data = await res.json();
        return data;
    } catch (err) {
        throw new Error(err);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/payment/PaymentForm.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useCookies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useCookies.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payment$2f$PaymentForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/payment/PaymentForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$membership$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/membership.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const Checkout = ()=>{
    _s();
    const [paymentDetails, setPaymentDetails] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const { setCookie, getCookie, deleteCookie } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useCookies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    const { execute: exeUser, isLoading: isUserLoading, userError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$membership$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApiCall"])(__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$membership$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createUser"]);
    const { execute: exeMembership, isLoading: isMembershipLoading, membershipError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$membership$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApiCall"])(__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$membership$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createMembership"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Checkout.useEffect": ()=>{
            if (membershipError || userError) {
                console.error("Membership/User error", {
                    membershipError,
                    userError
                });
            }
        }
    }["Checkout.useEffect"], [
        membershipError,
        userError
    ]);
    const handleSubmitRegistration = async (data)=>{
        console.log("Received payment form data", data);
        setPaymentDetails(data);
        try {
            const userData = {
                email: "test@email.com",
                password: "123456"
            };
            const user = await exeUser(userData);
            if (!user) throw new Error("User creation failed");
            const membershipData = {
                type: "membership",
                startDate: new Date(),
                endDate: new Date(),
                active: true,
                owner: user._id
            };
            const membership = await exeMembership(membershipData);
            if (!membership) throw new Error("Membership creation failed");
            console.log("User + Membership created", user, membership);
        // navigate("/");
        } catch (err) {
            console.error(err);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "checkout_ctn",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "Payment"
            }, void 0, false, {
                fileName: "[project]/components/payment/PaymentForm.tsx",
                lineNumber: 65,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payment$2f$PaymentForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onSubmit: handleSubmitRegistration,
                paymentDetails: paymentDetails
            }, void 0, false, {
                fileName: "[project]/components/payment/PaymentForm.tsx",
                lineNumber: 66,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/payment/PaymentForm.tsx",
        lineNumber: 64,
        columnNumber: 3
    }, this);
};
_s(Checkout, "0ENY9c3ua2d9bib7C/0nxCYPIj0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useCookies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$membership$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApiCall"],
        __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$membership$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApiCall"]
    ];
});
_c = Checkout;
const __TURBOPACK__default__export__ = Checkout;
var _c;
__turbopack_context__.k.register(_c, "Checkout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/payment/Checkout.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useCookies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useCookies.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payment$2f$PaymentForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/payment/PaymentForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$membership$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/membership.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const Checkout = ()=>{
    _s();
    const [paymentDetails, setPaymentDetails] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const { setCookie, getCookie, deleteCookie } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useCookies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
    const { execute: exeUser, isLoading: isUserLoading, userError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$membership$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApiCall"])(__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$membership$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createUser"]);
    const { execute: exeMembership, isLoading: isMembershipLoading, membershipError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$membership$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApiCall"])(__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$membership$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createMembership"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Checkout.useEffect": ()=>{
            if (membershipError || userError) {
                console.error("Membership/User error", {
                    membershipError,
                    userError
                });
            }
        }
    }["Checkout.useEffect"], [
        membershipError,
        userError
    ]);
    const handleSubmitRegistration = async (data)=>{
        console.log("Received payment form data", data);
        setPaymentDetails(data);
        try {
            const userData = {
                email: "test@email.com",
                password: "123456"
            };
            const user = await exeUser(userData);
            if (!user) throw new Error("User creation failed");
            const membershipData = {
                type: "membership",
                startDate: new Date(),
                endDate: new Date(),
                active: true,
                owner: user._id
            };
            const membership = await exeMembership(membershipData);
            if (!membership) throw new Error("Membership creation failed");
            console.log("User + Membership created", user, membership);
        // navigate("/");
        } catch (err) {
            console.error(err);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "checkout_ctn",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "Payment"
            }, void 0, false, {
                fileName: "[project]/components/payment/Checkout.tsx",
                lineNumber: 65,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payment$2f$PaymentForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onSubmit: handleSubmitRegistration,
                paymentDetails: paymentDetails
            }, void 0, false, {
                fileName: "[project]/components/payment/Checkout.tsx",
                lineNumber: 66,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/payment/Checkout.tsx",
        lineNumber: 64,
        columnNumber: 3
    }, this);
};
_s(Checkout, "0ENY9c3ua2d9bib7C/0nxCYPIj0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useCookies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$membership$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApiCall"],
        __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$membership$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApiCall"]
    ];
});
_c = Checkout;
const __TURBOPACK__default__export__ = Checkout;
var _c;
__turbopack_context__.k.register(_c, "Checkout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_69feb277._.js.map