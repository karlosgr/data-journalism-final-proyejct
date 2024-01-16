import {findValueByYear} from "./functions.js";

export function getCountryDataByYear(data: any, year: number): any[] {
    let resultData: any[] = []
    for (const country of data) {
        const {id, countryName, ...rest} = country;
        resultData.push({
            id: id,
            countryName: countryName,
            birthRate: findValueByYear(rest.birthData, year),
            mortalityRate: findValueByYear(rest.mortalityData, year),
            population: findValueByYear(rest.populationData, year)
        })
    }
    return resultData;
}

