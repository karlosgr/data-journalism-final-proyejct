var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { findValueByYear } from "./functions.js";
export function getCountryDataByYear(data, year) {
    let resultData = [];
    for (const country of data) {
        const { id, countryName } = country, rest = __rest(country, ["id", "countryName"]);
        resultData.push({
            id: id,
            countryName: countryName,
            birthRate: findValueByYear(rest.birthData, year),
            mortalityRate: findValueByYear(rest.mortalityData, year),
            population: findValueByYear(rest.populationData, year)
        });
    }
    return resultData;
}
