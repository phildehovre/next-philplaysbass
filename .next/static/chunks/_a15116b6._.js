(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/constants/chromaticScale.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "arpeggios": (()=>arpeggios),
    "arrayChromaticScale": (()=>arrayChromaticScale),
    "default": (()=>__TURBOPACK__default__export__),
    "formulae": (()=>formulae)
});
const __TURBOPACK__default__export__ = [
    "C",
    "",
    "D",
    "",
    "E",
    "F",
    "",
    "G",
    "",
    "A",
    "",
    "B"
];
const arrayChromaticScale = [
    [
        "C"
    ],
    [
        "C#",
        "Db"
    ],
    [
        "D"
    ],
    [
        "D#",
        "Eb"
    ],
    [
        "E"
    ],
    [
        "F"
    ],
    [
        "F#",
        "Gb"
    ],
    [
        "G"
    ],
    [
        "G#",
        "Ab"
    ],
    [
        "A"
    ],
    [
        "A#",
        "Bb"
    ],
    [
        "B"
    ]
];
const formulae = {
    major: [
        0,
        2,
        4,
        5,
        7,
        9,
        11
    ],
    minor: [
        0,
        2,
        3,
        5,
        7,
        8,
        10
    ]
};
const arpeggios = {
    C: {
        major: [
            "C",
            "E",
            "G"
        ],
        minor: [
            "C",
            "Eb",
            "G"
        ],
        diminished: [
            "C",
            "Eb",
            "Gb"
        ],
        augmented: [
            "C",
            "E",
            "G#"
        ]
    },
    "C#": {
        major: [
            "C#",
            "F",
            "G#"
        ],
        minor: [
            "C#",
            "E",
            "G#"
        ],
        diminished: [
            "C#",
            "E",
            "G"
        ],
        augmented: [
            "C#",
            "F",
            "A"
        ]
    },
    Db: {
        major: [
            "Db",
            "F",
            "Ab"
        ],
        minor: [
            "Db",
            "E",
            "Ab"
        ],
        diminished: [
            "Db",
            "E",
            "G"
        ],
        augmented: [
            "Db",
            "F",
            "A"
        ]
    },
    D: {
        major: [
            "D",
            "F#",
            "A"
        ],
        minor: [
            "D",
            "F",
            "A"
        ],
        diminished: [
            "D",
            "F",
            "Ab"
        ],
        augmented: [
            "D",
            "F#",
            "A#"
        ]
    },
    "D#": {
        major: [
            "D#",
            "G",
            "A#"
        ],
        minor: [
            "D#",
            "F#",
            "A#"
        ],
        diminished: [
            "D#",
            "F#",
            "A"
        ],
        augmented: [
            "D#",
            "G",
            "B"
        ]
    },
    Eb: {
        major: [
            "Eb",
            "G",
            "Bb"
        ],
        minor: [
            "Eb",
            "Gb",
            "Bb"
        ],
        diminished: [
            "Eb",
            "Gb",
            "A"
        ],
        augmented: [
            "Eb",
            "G",
            "B"
        ]
    },
    E: {
        major: [
            "E",
            "G#",
            "B"
        ],
        minor: [
            "E",
            "G",
            "B"
        ],
        diminished: [
            "E",
            "G",
            "Bb"
        ],
        augmented: [
            "E",
            "G#",
            "C"
        ]
    },
    F: {
        major: [
            "F",
            "A",
            "C"
        ],
        minor: [
            "F",
            "Ab",
            "C"
        ],
        diminished: [
            "F",
            "Ab",
            "B"
        ],
        augmented: [
            "F",
            "A",
            "C#"
        ]
    },
    "F#": {
        major: [
            "F#",
            "A#",
            "C#"
        ],
        minor: [
            "F#",
            "A",
            "C#"
        ],
        diminished: [
            "F#",
            "A",
            "C"
        ],
        augmented: [
            "F#",
            "A#",
            "D"
        ]
    },
    Gb: {
        major: [
            "Gb",
            "Bb",
            "Db"
        ],
        minor: [
            "Gb",
            "A",
            "Db"
        ],
        diminished: [
            "Gb",
            "A",
            "C"
        ],
        augmented: [
            "Gb",
            "Bb",
            "D"
        ]
    },
    G: {
        major: [
            "G",
            "B",
            "D"
        ],
        minor: [
            "G",
            "Bb",
            "D"
        ],
        diminished: [
            "G",
            "Bb",
            "Db"
        ],
        augmented: [
            "G",
            "B",
            "D#"
        ]
    },
    "G#": {
        major: [
            "G#",
            "C",
            "D#"
        ],
        minor: [
            "G#",
            "B",
            "D#"
        ],
        diminished: [
            "G#",
            "B",
            "D"
        ],
        augmented: [
            "G#",
            "C",
            "E"
        ]
    },
    Ab: {
        major: [
            "Ab",
            "C",
            "Eb"
        ],
        minor: [
            "Ab",
            "B",
            "Eb"
        ],
        diminished: [
            "Ab",
            "B",
            "D"
        ],
        augmented: [
            "Ab",
            "C",
            "E"
        ]
    },
    A: {
        major: [
            "A",
            "C#",
            "E"
        ],
        minor: [
            "A",
            "C",
            "E"
        ],
        diminished: [
            "A",
            "C",
            "Eb"
        ],
        augmented: [
            "A",
            "C#",
            "F"
        ]
    },
    "A#": {
        major: [
            "A#",
            "D",
            "F"
        ],
        minor: [
            "A#",
            "C#",
            "F"
        ],
        diminished: [
            "A#",
            "C#",
            "E"
        ],
        augmented: [
            "A#",
            "D",
            "F#"
        ]
    },
    Bb: {
        major: [
            "Bb",
            "D",
            "F"
        ],
        minor: [
            "Bb",
            "Db",
            "F"
        ],
        diminished: [
            "Bb",
            "Db",
            "E"
        ],
        augmented: [
            "Bb",
            "D",
            "F#"
        ]
    },
    B: {
        major: [
            "B",
            "D#",
            "F#"
        ],
        minor: [
            "B",
            "D",
            "F#"
        ],
        diminished: [
            "B",
            "D",
            "F"
        ],
        augmented: [
            "B",
            "D#",
            "G"
        ]
    },
    Cb: {
        major: [
            "Cb",
            "Eb",
            "Gb"
        ],
        minor: [
            "Cb",
            "D",
            "Gb"
        ],
        diminished: [
            "Cb",
            "D",
            "F"
        ],
        augmented: [
            "Cb",
            "Eb",
            "G"
        ]
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/games/arpeggio/ArpeggioGame.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$chromaticScale$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/constants/chromaticScale.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const ArpeggioGame = ()=>{
    _s();
    const [question, setQuestion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [answer, setAnswer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const [available, setAvailable] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        "major"
    ]);
    const selectRandomNote = ()=>{
        let rIndex = Math.round(Math.random() * __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$chromaticScale$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arrayChromaticScale"].length) % __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$chromaticScale$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arrayChromaticScale"].length;
        let selected = __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$chromaticScale$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arrayChromaticScale"][rIndex];
        var accidental = "";
        if (!selected) {
            let i = __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$chromaticScale$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arrayChromaticScale"].indexOf(selected);
            selected = __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$chromaticScale$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arrayChromaticScale"][i];
        }
        if (selected.length > 1) {
            return Math.round(Math.random() * selected.length) > 0.5 ? selected[0] : selected[1];
        }
        return selected[0];
    };
    const buildNaturalScale = (startingNote)=>{
        const startingArray = __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$chromaticScale$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arrayChromaticScale"].find((item, index)=>{
            return item.some((i)=>i === startingNote);
        });
        if (!startingArray) return;
        const startingIndex = __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$chromaticScale$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arrayChromaticScale"].indexOf(startingArray);
        const scale = [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$chromaticScale$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arrayChromaticScale"].slice(startingIndex),
            ...__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$chromaticScale$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arrayChromaticScale"].slice(0, startingIndex)
        ];
        return scale;
    };
    const buildMajArpeggio = (scale, quality)=>{
        const filtered = scale.map((item, index)=>{
            if (__TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$chromaticScale$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formulae"].major.indexOf(index) == -1) {
                return "";
            }
            return item;
        });
        console.log(filtered);
        // S'assurer que toutes les lettres soient toujours consecutives!
        const flattened = scale.filter(Boolean);
        const adjustedScale = [];
        flattened.forEach((note, i)=>{
            const noteIndex = scale.indexOf(note);
            const targetIndex = __TURBOPACK__imported__module__$5b$project$5d2f$constants$2f$chromaticScale$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formulae"].major[i];
        // if (noteIndex === targetIndex) {
        // 	adjustedScale[targetIndex] = note;
        // } else if (noteIndex < targetIndex) {
        // 	adjustedScale[targetIndex - 1] = "";
        // 	adjustedScale[targetIndex] = note + "#";
        // } else {
        // 	adjustedScale[targetIndex] = note + "b";
        // }
        });
        // Fill any undefined gaps with empty strings
        for(let i = 0; i < 12; i++){
            if (!adjustedScale[i]) adjustedScale[i] = "";
        }
        return [
            ...filtered.map((item)=>item[0] || "")
        ];
    };
    const filters = [
        "minor",
        "diminished",
        "augmented"
    ];
    const renderFilters = ()=>{
        return filters.map((filter, index)=>{
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setAvailable((prev)=>available.indexOf(filter) !== -1 ? available.filter((f)=>f !== filter) : [
                            ...prev,
                            filter
                        ]),
                children: filter
            }, filter + index, false, {
                fileName: "[project]/app/games/arpeggio/ArpeggioGame.tsx",
                lineNumber: 90,
                columnNumber: 5
            }, this);
        });
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ArpeggioGame.useEffect": ()=>{}
    }["ArpeggioGame.useEffect"], [
        available
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ArpeggioGame.useEffect": ()=>{
            const note = selectRandomNote();
            console.log("gen'd note: ", note);
            const scale = buildNaturalScale(note);
            // console.log("gen'd scale: ", scale);
            if (!scale) return;
            const majorScale = buildMajArpeggio(scale, "major");
            console.log("gen'd maj scale: ", majorScale);
        }
    }["ArpeggioGame.useEffect"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "game_ctn",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: question
            }, void 0, false, {
                fileName: "[project]/app/games/arpeggio/ArpeggioGame.tsx",
                lineNumber: 119,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "filter_ctn flex gap-1 justify-center",
                children: renderFilters()
            }, void 0, false, {
                fileName: "[project]/app/games/arpeggio/ArpeggioGame.tsx",
                lineNumber: 120,
                columnNumber: 4
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/games/arpeggio/ArpeggioGame.tsx",
        lineNumber: 118,
        columnNumber: 3
    }, this);
};
_s(ArpeggioGame, "U/Z0CmlJCu+0pA+PG+/MY4LI0Dc=");
_c = ArpeggioGame;
const __TURBOPACK__default__export__ = ArpeggioGame;
var _c;
__turbopack_context__.k.register(_c, "ArpeggioGame");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_a15116b6._.js.map