export const CAR = {
    name: "Aston Martin Vulcan",
    tagline: "Born for the Apex",
    price: "$2,300,000",
    year: 2024,
    totalFrames: 181,
    imageFolderPath: "/images/vulcan-sequence",
} as const;

export const HERO_DATA = {
    title: "ASTON MARTIN VULCAN",
    subtitle: "TRACK-ONLY HYPERCAR",
    price: "$2,300,000",
    cta: "INQUIRE NOW",
} as const;

export const DESIGN_DATA = {
    title: "Design",
    body: "Track-only carbon-fiber hypercar engineered for extreme aerodynamics. Massive front splitter, sculpted hood vents, aggressive side channels, and towering rear wing create uncompromising downforce and presence.",
} as const;

export const ENGINE_DATA = {
    title: "Engine",
    specs: [
        { label: "Engine", value: "7.0L Naturally Aspirated V12" },
        { label: "Power", value: "800+ HP" },
        { label: "Torque", value: "575 lb-ft" },
        { label: "Transmission", value: "Xtrac 6-Speed Sequential" },
        { label: "Weight", value: "1,350 kg" },
    ],
} as const;

export const SPECS_GRID = [
    { label: "Top Speed", value: "205+ MPH", icon: "⚡" },
    { label: "0–60 MPH", value: "< 3.0s", icon: "🏁" },
    { label: "Engine", value: "7.0L V12", icon: "🔧" },
    { label: "Power", value: "800+ HP", icon: "💥" },
    { label: "Torque", value: "575 lb-ft", icon: "⚙️" },
    { label: "Weight", value: "1,350 kg", icon: "🪶" },
    { label: "Gearbox", value: "6-Speed Sequential", icon: "🔩" },
    { label: "Production", value: "24 Units", icon: "🏆" },
] as const;

export const FEATURES = [
    {
        title: "Carbon Fiber Monocoque",
        description:
            "A full carbon-fiber chassis provides extraordinary rigidity-to-weight ratio, born from GT racing technology and track-proven in the most demanding conditions.",
    },
    {
        title: "Bespoke Aerodynamics",
        description:
            "Every surface is shaped by computational fluid dynamics, featuring a massive front splitter, sculpted side channels, and active rear wing generating extreme downforce.",
    },
    {
        title: "Track-Tuned Suspension",
        description:
            "Fully adjustable, race-spec pushrod suspension with adjustable anti-roll bars and twin-spring damper units deliver relentless grip and precision cornering.",
    },
    {
        title: "Exclusive Ownership",
        description:
            "Limited to just 24 examples worldwide, each Vulcan owner receives a bespoke driver training programme developed in partnership with Aston Martin Racing.",
    },
] as const;
