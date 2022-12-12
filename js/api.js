const apiKey = config.API_KEY;

export async function getIATA(from, to) {
    const options = {
        method: 'GET',
    };

    let response = await fetch(`https://www.travelpayouts.com/widgets_suggest_params?q=Из%20${from}%20в%20${to}`, options);
    let json = await response.json();

    if(json && (Object.keys(json).length === 0) && (Object.getPrototypeOf(json) === Object.prototype)) return "No IATA";

    return json;
}

export async function initQueryToTravelAdvisor(iataFrom, iataTo, date) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
    };

    const response = await fetch(`https://travel-advisor.p.rapidapi.com/flights/create-session?o1=${iataFrom}&d1=${iataTo}&dd1=${date}&currency=RUB&ta=1&c=0`, options);
    const json = await response.json();

    return json;
}

export async function queryToTravelAdvisor(res) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
    };

    if(res.search_params.sid == null) return "No sid";

    let response = await fetch(`https://travel-advisor.p.rapidapi.com/flights/poll?sid=${res.search_params.sid}&so=PRICE&currency=RUB&n=15&ns=NON_STOP%2CONE_STOP&o=0`, options);
    let json = await response.json();

    return json;
}

