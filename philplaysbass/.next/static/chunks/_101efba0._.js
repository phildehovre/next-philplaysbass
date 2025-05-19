(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/components/VideoPlayer.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
// Dynamic import of cloudinary to avoid SSR issues
const loadCloudinary = ()=>{
    if ("TURBOPACK compile-time truthy", 1) {
        return __turbopack_context__.r("[project]/node_modules/cloudinary-video-player/lib/cld-video-player.js [app-client] (ecmascript, async loader)")(__turbopack_context__.i);
    }
    "TURBOPACK unreachable";
};
const VideoPlayer = ()=>{
    _s();
    const [bgLoaded, setBgLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VideoPlayer.useEffect": ()=>{
            const video = videoRef.current;
            if (!video) return;
            const handleLoad = {
                "VideoPlayer.useEffect.handleLoad": ()=>setBgLoaded(true)
            }["VideoPlayer.useEffect.handleLoad"];
            video.addEventListener("loadedmetadata", handleLoad);
            return ({
                "VideoPlayer.useEffect": ()=>video.removeEventListener("loadedmetadata", handleLoad)
            })["VideoPlayer.useEffect"];
        }
    }["VideoPlayer.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VideoPlayer.useEffect": ()=>{
            let cloudinary;
            loadCloudinary().then({
                "VideoPlayer.useEffect": (module)=>{
                    if (module) {
                        cloudinary = module.default;
                        if (videoRef.current) {
                            cloudinary.videoPlayer(videoRef.current, {
                                cloudName: "dtnif6mzm",
                                publicId: "Portfolio - 2024/promo_intro_clean_web_export_-_720WebShareName_lmzz2h",
                                autoplay: true,
                                muted: true,
                                controls: false,
                                loop: true
                            });
                        }
                    }
                }
            }["VideoPlayer.useEffect"]);
            return ({
                "VideoPlayer.useEffect": ()=>{
                    if (cloudinary) cloudinary.destroy();
                }
            })["VideoPlayer.useEffect"];
        }
    }["VideoPlayer.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        id: "player_ctn",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
            ref: videoRef,
            className: `video_ctn ${bgLoaded ? "loaded" : ""}`,
            "data-cld-public-id": "Portfolio - 2024/promo_intro_clean_web_export_-_720WebShareName_lmzz2h"
        }, void 0, false, {
            fileName: "[project]/components/VideoPlayer.tsx",
            lineNumber: 55,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/VideoPlayer.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
};
_s(VideoPlayer, "8DXGKhQuWxNAWst6WJZX/vE+M5U=");
_c = VideoPlayer;
const __TURBOPACK__default__export__ = VideoPlayer;
var _c;
__turbopack_context__.k.register(_c, "VideoPlayer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/Socials.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Twitch$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/twitch.js [app-client] (ecmascript) <export default as Twitch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Youtube$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/youtube.js [app-client] (ecmascript) <export default as Youtube>");
;
;
;
function Socials() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
        className: "socials-list",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    className: "social-link",
                    href: "https://www.youtube.com/watch?v=QlwlT6CPqJ8",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Youtube$3e$__["Youtube"], {
                        className: "youtube-icon"
                    }, void 0, false, {
                        fileName: "[project]/components/Socials.tsx",
                        lineNumber: 15,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/Socials.tsx",
                    lineNumber: 9,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Socials.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    className: "social-link",
                    href: "https://www.facebook.com/seanjacksonband",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Twitch$3e$__["Twitch"], {
                        className: "facebook-icon"
                    }, void 0, false, {
                        fileName: "[project]/components/Socials.tsx",
                        lineNumber: 25,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/Socials.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Socials.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    className: "social-link",
                    href: "https://www.instagram.com/seanjacksonband/",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"], {
                        className: "instagram-icon"
                    }, void 0, false, {
                        fileName: "[project]/components/Socials.tsx",
                        lineNumber: 35,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/Socials.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Socials.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Socials.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Socials;
const __TURBOPACK__default__export__ = Socials;
var _c;
__turbopack_context__.k.register(_c, "Socials");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/constants/textFile.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "textObject": (()=>textObject)
});
const textObject = {
    nav: {
        buttons: {
            home: {
                labels: {
                    fr: 'home',
                    en: 'home',
                    nl: 'thuis'
                },
                tooltip: {
                    fr: 'Retour à la page d’accueil',
                    en: 'Back to the homepage',
                    nl: 'Terug naar de startpagina'
                }
            },
            about: {
                labels: {
                    fr: 'à propos',
                    en: 'about',
                    nl: 'over'
                },
                tooltip: {
                    fr: 'En savoir plus sur nous',
                    en: 'Learn more about us',
                    nl: 'Meer over ons te weten komen'
                }
            },
            lessons: {
                labels: {
                    fr: 'leçons',
                    en: 'lessons',
                    nl: 'lessen'
                },
                tooltip: {
                    fr: 'Voir les leçons disponibles',
                    en: 'View available lessons',
                    nl: 'Bekijk beschikbare lessen'
                }
            },
            produits: {
                labels: {
                    fr: 'produits',
                    en: 'products',
                    nl: 'producten'
                },
                tooltip: {
                    fr: 'Voir nos produits',
                    en: 'View our products',
                    nl: 'Bekijk onze producten'
                }
            }
        }
    },
    hero: {},
    footer: {
        buttons: {}
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/Hero.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$VideoPlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/VideoPlayer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Socials$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Socials.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$textFile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/textFile.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$LanguageContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/LanguageContext.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const Hero = ()=>{
    _s();
    const { language } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$LanguageContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "hero_ctn",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$VideoPlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/components/Hero.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "slogan_ctn",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "left top",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                id: "phil",
                                children: "Phil"
                            }, void 0, false, {
                                fileName: "[project]/components/Hero.tsx",
                                lineNumber: 18,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                id: "bass",
                                children: "BASS"
                            }, void 0, false, {
                                fileName: "[project]/components/Hero.tsx",
                                lineNumber: 19,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                id: "plays",
                                children: "plays"
                            }, void 0, false, {
                                fileName: "[project]/components/Hero.tsx",
                                lineNumber: 20,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Hero.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "right bottom",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "container",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "links_ctn",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "link_item",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$textFile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["textObject"].nav.buttons.about.labels[language]
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Hero.tsx",
                                                    lineNumber: 27,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/Hero.tsx",
                                                lineNumber: 26,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "link_item",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$textFile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["textObject"].nav.buttons.home.labels[language]
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Hero.tsx",
                                                    lineNumber: 30,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/Hero.tsx",
                                                lineNumber: 29,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "link_item",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$textFile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["textObject"].nav.buttons.lessons.labels[language]
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Hero.tsx",
                                                    lineNumber: 33,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/Hero.tsx",
                                                lineNumber: 32,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Hero.tsx",
                                        lineNumber: 25,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/Hero.tsx",
                                    lineNumber: 24,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "buttons_ctn",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            children: "Shop"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Hero.tsx",
                                            lineNumber: 38,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            children: "Learn"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Hero.tsx",
                                            lineNumber: 39,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Hero.tsx",
                                    lineNumber: 37,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Socials$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/components/Hero.tsx",
                                    lineNumber: 41,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Hero.tsx",
                            lineNumber: 23,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/Hero.tsx",
                        lineNumber: 22,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Hero.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Hero.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
};
_s(Hero, "TEPgRKiq4UlAq4eGEcqQcUvS7/s=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$LanguageContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"]
    ];
});
_c = Hero;
const __TURBOPACK__default__export__ = Hero;
var _c;
__turbopack_context__.k.register(_c, "Hero");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/constants/languages.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "LANGUAGES": (()=>LANGUAGES)
});
const LANGUAGES = [
    "en",
    "fr",
    "nl"
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/Nav.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$textFile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/textFile.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$LanguageContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/LanguageContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$languages$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/languages.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$index$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/index.es.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$components$2f$LoginLink$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/components/LoginLink.es.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$components$2f$RegisterLink$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@kinde-oss/kinde-auth-nextjs/dist/components/RegisterLink.es.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const Nav = ()=>{
    _s();
    const { language, setLanguage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$LanguageContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"])();
    const languages = __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$languages$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LANGUAGES"];
    const btns = __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$textFile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["textObject"].nav.buttons;
    const renderLanguageButtons = ()=>{
        return languages.map((item, index)=>{
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setLanguage(item),
                        children: item
                    }, void 0, false, {
                        fileName: "[project]/components/Nav.tsx",
                        lineNumber: 20,
                        columnNumber: 6
                    }, this),
                    index < languages.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "|"
                    }, void 0, false, {
                        fileName: "[project]/components/Nav.tsx",
                        lineNumber: 25,
                        columnNumber: 39
                    }, this)
                ]
            }, item, true, {
                fileName: "[project]/components/Nav.tsx",
                lineNumber: 19,
                columnNumber: 5
            }, this);
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "logo",
                children: "Logo"
            }, void 0, false, {
                fileName: "[project]/components/Nav.tsx",
                lineNumber: 33,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "/",
                            title: btns.home.tooltip[language],
                            children: btns.home.labels[language]
                        }, void 0, false, {
                            fileName: "[project]/components/Nav.tsx",
                            lineNumber: 36,
                            columnNumber: 6
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/Nav.tsx",
                        lineNumber: 35,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "/about",
                            title: btns.about.tooltip[language],
                            children: btns.about.labels[language]
                        }, void 0, false, {
                            fileName: "[project]/components/Nav.tsx",
                            lineNumber: 41,
                            columnNumber: 6
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/Nav.tsx",
                        lineNumber: 40,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "/lessons",
                            title: btns.lessons.tooltip[language],
                            children: btns.lessons.labels[language]
                        }, void 0, false, {
                            fileName: "[project]/components/Nav.tsx",
                            lineNumber: 46,
                            columnNumber: 6
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/Nav.tsx",
                        lineNumber: 45,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Nav.tsx",
                lineNumber: 34,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "languages",
                children: renderLanguageButtons()
            }, void 0, false, {
                fileName: "[project]/components/Nav.tsx",
                lineNumber: 51,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$components$2f$LoginLink$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoginLink"], {
                postLoginRedirectURL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.POST_LOGIN_REDIRECT_URL,
                children: "Sign in"
            }, void 0, false, {
                fileName: "[project]/components/Nav.tsx",
                lineNumber: 52,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$kinde$2d$oss$2f$kinde$2d$auth$2d$nextjs$2f$dist$2f$components$2f$RegisterLink$2e$es$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RegisterLink"], {
                children: "Sign up"
            }, void 0, false, {
                fileName: "[project]/components/Nav.tsx",
                lineNumber: 53,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Nav.tsx",
        lineNumber: 32,
        columnNumber: 3
    }, this);
};
_s(Nav, "UZUYajh7f/ecAaqs8+JAYjvISYI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$LanguageContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLanguage"]
    ];
});
_c = Nav;
const __TURBOPACK__default__export__ = Nav;
var _c;
__turbopack_context__.k.register(_c, "Nav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "hasA11yProp": (()=>hasA11yProp),
    "mergeClasses": (()=>mergeClasses),
    "toCamelCase": (()=>toCamelCase),
    "toKebabCase": (()=>toKebabCase),
    "toPascalCase": (()=>toPascalCase)
});
const toKebabCase = (string)=>string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string)=>string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2)=>p2 ? p2.toUpperCase() : p1.toLowerCase());
const toPascalCase = (string)=>{
    const camelCase = toCamelCase(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes)=>classes.filter((className, index, array)=>{
        return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
    }).join(" ").trim();
const hasA11yProp = (props)=>{
    for(const prop in props){
        if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
            return true;
        }
    }
};
;
 //# sourceMappingURL=utils.js.map
}}),
"[project]/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "default": (()=>defaultAttributes)
});
var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
};
;
 //# sourceMappingURL=defaultAttributes.js.map
}}),
"[project]/node_modules/lucide-react/dist/esm/Icon.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "default": (()=>Icon)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-client] (ecmascript)");
;
;
;
const Icon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])("svg", {
        ref,
        ...__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeClasses"])("lucide", className),
        ...!children && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasA11yProp"])(rest) && {
            "aria-hidden": "true"
        },
        ...rest
    }, [
        ...iconNode.map(([tag, attrs])=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(tag, attrs)),
        ...Array.isArray(children) ? children : [
            children
        ]
    ]));
;
 //# sourceMappingURL=Icon.js.map
}}),
"[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "default": (()=>createLucideIcon)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/Icon.js [app-client] (ecmascript)");
;
;
;
const createLucideIcon = (iconName, iconNode)=>{
    const Component = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            ref,
            iconNode,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeClasses"])(`lucide-${(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toKebabCase"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toPascalCase"])(iconName))}`, `lucide-${iconName}`, className),
            ...props
        }));
    Component.displayName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toPascalCase"])(iconName);
    return Component;
};
;
 //# sourceMappingURL=createLucideIcon.js.map
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": (()=>__iconNode),
    "default": (()=>Instagram)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "rect",
        {
            width: "20",
            height: "20",
            x: "2",
            y: "2",
            rx: "5",
            ry: "5",
            key: "2e1cvw"
        }
    ],
    [
        "path",
        {
            d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z",
            key: "9exkf1"
        }
    ],
    [
        "line",
        {
            x1: "17.5",
            x2: "17.51",
            y1: "6.5",
            y2: "6.5",
            key: "r4j83e"
        }
    ]
];
const Instagram = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("instagram", __iconNode);
;
 //# sourceMappingURL=instagram.js.map
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Instagram": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript)");
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/twitch.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": (()=>__iconNode),
    "default": (()=>Twitch)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7",
            key: "c0yzno"
        }
    ]
];
const Twitch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("twitch", __iconNode);
;
 //# sourceMappingURL=twitch.js.map
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/twitch.js [app-client] (ecmascript) <export default as Twitch>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Twitch": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/twitch.js [app-client] (ecmascript)");
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/youtube.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": (()=>__iconNode),
    "default": (()=>Youtube)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",
            key: "1q2vi4"
        }
    ],
    [
        "path",
        {
            d: "m10 15 5-3-5-3z",
            key: "1jp15x"
        }
    ]
];
const Youtube = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("youtube", __iconNode);
;
 //# sourceMappingURL=youtube.js.map
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/youtube.js [app-client] (ecmascript) <export default as Youtube>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Youtube": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/youtube.js [app-client] (ecmascript)");
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

//# sourceMappingURL=_101efba0._.js.map