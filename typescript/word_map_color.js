const bluePalette = [
    "rgb(166,225,250)",
    "rgb(14,107,168)",
    "rgb(10,36,114)",
    "rgb(0,28,85)",
    "rgb(0,7,45)",
];
const redPalette = [
    "rgb(249, 128, 134)",
    "rgb(255, 64, 64)",
    "rgb(255, 0, 0)",
    "rgb(213, 0, 0)",
    "rgb(170, 0, 0)",
    "rgb(128, 0, 0)",
];
const purplePalette = [
    "rgb(189,78,249)",
    "rgb(167,19,246)",
    "rgb(130,7,197)",
    "rgb(91,5,136)",
    "rgb(53,3,79)",
];
export function getMapColor(value) {
    return value == 0 ? "rgb(255,255,255)" :
        (() => {
            return value > 0 ? redPalette[Math.round(value / 10) - 1] : purplePalette[Math.round(Math.abs(value) / 10)];
        })();
}
