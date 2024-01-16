const maxGreen = 55;
const minRed = 200;
const bluePalette = [
    "rgb(166,225,250)",
    "rgb(14,107,168)",
    "rgb(10,36,114)",
    "rgb(0,28,85)",
    "rgb(0,7,45)",
];
const redPalette = [
    "rgb(249,98,108)",
    "rgb(247,28,52)",
    // "rgb(217,8,22)",
    "rgb(157,6,16)",
    "rgb(98,4,10)",
];
const purplePalette = [
    "rgb(189,78,249)",
    "rgb(167,19,246)",
    "rgb(130,7,197)",
    "rgb(91,5,136)",
    "rgb(53,3,79)",
];
export function getMapColor(value) {
    console.log(value);
    return value == 0 ? "rgb(255,255,255)" :
        (() => {
            return value > 0 ? bluePalette[Math.round(value / 10)] : redPalette[Math.round(Math.abs(value) / 10)];
        })();
}
