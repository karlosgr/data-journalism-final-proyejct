export type regionData = countryData;

//Interfaces
export interface dataByYear {
    year: number;
    value: number;
}

export interface countryData {
    id: string;
    countryName: string;
    birthData: dataByYear[];
    mortalityData: dataByYear[];
    populationData: dataByYear[];
}

export interface worldData {
    year: number,
    worldBirthRate: number,
    worldMortalityRate: number,
    worldPopulation: number,
}


//Functions
export function findValueByYear(years: dataByYear[], year: number): number | undefined {
    if (years != undefined) {
        for (const date of years) {
            if (date.year == year && date.value != 0) return date.value
        }
    }
}

async function loadJson(jsonUrl: string): Promise<any> {
    return await (await fetch(jsonUrl)).json()
}

export function numberOfCountriesWithBirthRateData(year: number): number {
    return buildData.filter((value: countryData): boolean => findValueByYear(value.birthData, year) !== undefined).length;
}

export function numberOfCountriesWithMortalityData(year: number): number {
    return buildData.filter((value: countryData): boolean => findValueByYear(value.mortalityData, year) !== undefined).length;
}


//Data
const data: {
    countriesData: any
    birthData: any
    populationData: any
    mortalityData: any
} = await (async (): Promise<any> => {
    return {
        birthData: await loadJson("data/birth-rate-data.json"),
        mortalityData: await loadJson("data/mortality-rate-data.json"),
        populationData: await loadJson("data/population.json"),
        countriesData: await loadJson("data/countries.json"),
    }
})();


export const buildData: countryData[] = ((): countryData[] => {
    let countryDataResult: countryData[] = []
    for (const country in data.countriesData["countries"]) {
        countryDataResult.push({
            id: country,
            countryName: data.countriesData["countries"][country]["country_name"],
            birthData: data.birthData[country],
            populationData: data.populationData[country],
            mortalityData: data.mortalityData[country],
        })
    }
    return countryDataResult;
})();

export const regionData: regionData[] = (() => {
    const regionDataResult: regionData[] = []
    for (const region in data.countriesData["regions"]) {
        regionDataResult.push({
            id: region,
            countryName: data.countriesData["regions"][region]["country_name"],
            birthData: data.birthData[region],
            populationData: data.populationData[region],
            mortalityData: data.mortalityData[region],
        })
    }
    return regionDataResult;
})();

export const worldDataByYears: worldData[] = ((data: countryData[]) => {
    let worldDataResult: worldData[] = [];
    for (let i = 1960; i < 2022; i++) {
        let mortalityRate = 0;
        let birthRate = 0;
        let population = 0;
        for (const countryData of data) {
            mortalityRate += findValueByYear(countryData.mortalityData, i) ?? 0;
            birthRate += findValueByYear(countryData.birthData, i) ?? 0;
            population += findValueByYear(countryData.populationData, i) ?? 0;
        }
        worldDataResult.push({
            year: i,
            worldBirthRate: birthRate,
            worldMortalityRate: mortalityRate,
            worldPopulation: population
        })
    }
    return worldDataResult;
})(buildData);

