export function log(msg){
    const styledMsg = '%c' + msg;
    const style = 'color: red';
    console.log(styledMsg, style);
}

export function l(msg){
    return log(msg);
}

export const Cities = ['Mumbai', 'Delhi', 'Paris', 'London', 'HongKong', 'Manila', 'Quebec'];

export const DefaultWeather = {
    city : 'Kolkata',
    location :'Kolkata, India',
    tempMaxC : 25,
    tempMinC : 25,
    humidity : 60,
    url : 'https://google.com',
    lastUpdated : Date.now()
};

export const WeatherSchema = {
    'id' : '',
    'city' : '',
    'location' : '',
    'tempMinC' : 0,
    'tempMaxC' : 0,
    'humidity' : 0,
    'pressure' : 0,
    'lat' : 0.0,
    'lon' : 0.0,
    'windSpeed' : 0.00,
    'localTime' : '',
    'sunrise' : '',
    'sunset' : '',
    'url' : ''
}
export class ResponseParser{
    Default
    static parse(response){
        let {
            id, 
            name : city, 
            coord : {lon, lat}, 
            weather : {id_weather, main, description, icon},
            base,
            main : {temp, feels_like, temp_min, temp_max, pressure, humidity},
            visibility, 
            wind : {speed : windSpeed, deg},
            clouds : {all, dt},
            sys : {type, id_sys, country, sunrise, sunset},
            timezone, 
            cod 
        } = response;
        return {
            'id' : id,
            'city' : city,
            'location' : `${city}, ${country}`,
            'tempMinC' : (temp_max-273).toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 }),
            'tempMaxC' : (temp_max-273).toFixed(2), //Second way of doing it
            'humidity' : humidity,
            'pressure' : (pressure/1000).toFixed(2),
            'lat' : lat,
            'lon' : lon,
            'windSpeed' : windSpeed,
            'localTime' : timezone,
            'sunrise' : sunrise,
            'sunset' : sunset,
            'url' : ''
        }
    }
}