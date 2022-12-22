const flightsCountURL = config.FUNCTION_FLIGHTS_COUNT;
const maxPriceURL = config.FUNCTION_MAX_PRICE;
const minPriceURL = config.FUNCTION_MIN_PRICE;
const dbSelectURL = config.FUNCTION_SELECT;

export async function flightsCount(flights) {
    const options = {
        method: 'POST',
        body: JSON.stringify(flights)
    };

    let response = await fetch(flightsCountURL, options);
    let txt = await response.text();
    console.log(txt);
    console.log(Number(txt));


    return Number(txt);
}

/*export async function maxPrice(flights) {
    const options = {
        method: 'POST',
        body: JSON.stringify(flights)
    };

    let response = await fetch(maxPriceURL, options);
    let txt = await response.text();
    console.log(txt);
    console.log(Number(txt));

    return Number(txt);
}*/

export async function minPrice(flights) {
    const options = {
        method: 'POST',
        body: JSON.stringify(flights)
    };

    let response = await fetch(minPriceURL, options);
    let txt = await response.text();
    console.log(txt);
    console.log(Number(txt));


    return Number(txt);
}

export async function dbSelect() {
    const options = {
        method: 'POST'
    };

    let response = await fetch(dbSelectURL, options);
    let txt = await response.text();
    console.log(txt);
    console.log(Number(txt));

    return Number(txt);
}