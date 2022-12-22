const dbInsertURL = config.FUNCTION_INSERT;

export async function dbInsert(city_from, city_to, iata_from, iata_to, date_departure, options_count) {
    var data = [city_from, city_to, iata_from, iata_to, date_departure, options_count];

    console.log(data);

    const options = {
        method: 'POST',
        body: JSON.stringify(data)
    };

    let response = await fetch(dbInsertURL, options);
    let txt = await response.text();
    console.log(txt);
}