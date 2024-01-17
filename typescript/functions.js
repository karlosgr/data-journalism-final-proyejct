var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//Functions
export function findValueByYear(years, year) {
    if (years != undefined) {
        for (const date of years) {
            if (date.year == year && date.value != 0)
                return date.value;
        }
    }
}
function loadJson(jsonUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (yield fetch(jsonUrl)).json();
    });
}
export function numberOfCountriesWithBirthRateData(year) {
    return buildData.filter((value) => findValueByYear(value.birthData, year) !== undefined).length;
}
export function numberOfCountriesWithMortalityData(year) {
    return buildData.filter((value) => findValueByYear(value.mortalityData, year) !== undefined).length;
}
//Data
const data = await (() => __awaiter(void 0, void 0, void 0, function* () {
    return {
        birthData: yield loadJson("data/birth-rate-data.json"),
        mortalityData: yield loadJson("data/mortality-rate-data.json"),
        populationData: yield loadJson("data/population.json"),
        countriesData: yield loadJson("data/countries.json"),
    };
}))();
export const buildData = (() => {
    let countryDataResult = [];
    for (const country in data.countriesData["countries"]) {
        countryDataResult.push({
            id: country,
            countryName: data.countriesData["countries"][country]["country_name"],
            birthData: data.birthData[country],
            populationData: data.populationData[country],
            mortalityData: data.mortalityData[country],
        });
    }
    return countryDataResult;
})();
export const regionData = (() => {
    const regionDataResult = [];
    for (const region in data.countriesData["regions"]) {
        regionDataResult.push({
            id: region,
            countryName: data.countriesData["regions"][region]["country_name"],
            birthData: data.birthData[region],
            populationData: data.populationData[region],
            mortalityData: data.mortalityData[region],
        });
    }
    return regionDataResult;
})();
export const worldDataByYears = ((data) => {
    var _a, _b, _c;
    let worldDataResult = [];
    for (let i = 1960; i < 2022; i++) {
        let mortalityRate = 0;
        let birthRate = 0;
        let population = 0;
        for (const countryData of data) {
            mortalityRate += (_a = findValueByYear(countryData.mortalityData, i)) !== null && _a !== void 0 ? _a : 0;
            birthRate += (_b = findValueByYear(countryData.birthData, i)) !== null && _b !== void 0 ? _b : 0;
            population += (_c = findValueByYear(countryData.populationData, i)) !== null && _c !== void 0 ? _c : 0;
        }
        worldDataResult.push({
            year: i,
            worldBirthRate: birthRate,
            worldMortalityRate: mortalityRate,
            worldPopulation: population
        });
    }
    return worldDataResult;
})(buildData);
