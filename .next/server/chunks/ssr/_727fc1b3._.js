module.exports = {

"[project]/hooks/useCookies.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
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
}}),
"[project]/services/membership.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "createMembership": (()=>createMembership),
    "createUser": (()=>createUser),
    "credentials": (()=>credentials),
    "useApiCall": (()=>useApiCall)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
const __TURBOPACK__import$2e$meta__ = {
    get url () {
        return `file://${__turbopack_context__.P("services/membership.ts")}`;
    }
};
;
const credentials = {
    credentials: "include",
    headers: {
        "Access-Control-Allow-Origin": "no-cors",
        "Content-Type": "application/json"
    }
};
const useApiCall = (callback)=>{
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const execute = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (...args)=>{
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
    }, [
        callback
    ]);
    return {
        execute,
        result,
        isLoading,
        error
    };
};
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
}}),
"[project]/components/payment/PaymentForm.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useCookies$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useCookies.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payment$2f$PaymentForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/payment/PaymentForm.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$membership$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/membership.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
const Checkout = ()=>{
    const [paymentDetails, setPaymentDetails] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])();
    const { setCookie, getCookie, deleteCookie } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useCookies$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])();
    const { execute: exeUser, isLoading: isUserLoading, userError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$membership$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useApiCall"])(__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$membership$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createUser"]);
    const { execute: exeMembership, isLoading: isMembershipLoading, membershipError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$membership$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useApiCall"])(__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$membership$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createMembership"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (membershipError || userError) {
            console.error("Membership/User error", {
                membershipError,
                userError
            });
        }
    }, [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "checkout_ctn",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "Payment"
            }, void 0, false, {
                fileName: "[project]/components/payment/PaymentForm.tsx",
                lineNumber: 65,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payment$2f$PaymentForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
const __TURBOPACK__default__export__ = Checkout;
}}),
"[project]/components/payment/Checkout.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useCookies$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useCookies.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payment$2f$PaymentForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/payment/PaymentForm.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$membership$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/membership.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
const Checkout = ()=>{
    const [paymentDetails, setPaymentDetails] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])();
    const { setCookie, getCookie, deleteCookie } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useCookies$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])();
    const { execute: exeUser, isLoading: isUserLoading, userError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$membership$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useApiCall"])(__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$membership$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createUser"]);
    const { execute: exeMembership, isLoading: isMembershipLoading, membershipError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$membership$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useApiCall"])(__TURBOPACK__imported__module__$5b$project$5d2f$services$2f$membership$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createMembership"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (membershipError || userError) {
            console.error("Membership/User error", {
                membershipError,
                userError
            });
        }
    }, [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "checkout_ctn",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "Payment"
            }, void 0, false, {
                fileName: "[project]/components/payment/Checkout.tsx",
                lineNumber: 65,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$payment$2f$PaymentForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
const __TURBOPACK__default__export__ = Checkout;
}}),

};

//# sourceMappingURL=_727fc1b3._.js.map