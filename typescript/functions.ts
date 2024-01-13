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

export function findValueByYear(years: dataByYear[], year: number): number | undefined {
    if (years != undefined) {
        for (const date of years) {
            if (date.year == year && date.value != 0) return date.value
        }
    }
}


const data: {
    countriesData: any
    birthData: any
    populationData: any
    mortalityData: any
} = await (async (): Promise<any> => {
    return {
        "birthData": await loadJson("data/birth-rate-data.json"),
        "mortalityData": await loadJson("data/mortality-rate-data.json"),
        "populationData": await loadJson("data/population.json"),
        "countriesData": await loadJson("data/countries.json"),
    }
})();


async function loadJson(jsonUrl: string): Promise<any> {
    return await (await fetch(jsonUrl)).json()
}


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

