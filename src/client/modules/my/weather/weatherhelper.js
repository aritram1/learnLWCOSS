export class helper{
    message = 'default message';
}

export function log(msg){
    const styledMsg = '%c' + msg;
    const style = 'color: red';
    console.log(styledMsg, style);
}

export const DEFAULT = {
    'id' : '',
    'city' : 'Kolkata',
    'location' : 'Kolkata',
    'tempMinC' : 0,
    'tempMaxC' : 0,//temp_max,
    'humidity' : 0,//humidity,
    'pressure' : 0;//pressure,
    'lat' : lat,
    'lon' : lon,
    'windspeed' : windspeed,
    'localtime' : timezone,
    'sunrise' : sunrise,
    'sunset' : sunset
    }
    city : 'Kolkata',
    location :'New town',
    tempMaxC : 25,
    tempMinC : 25,
    humidity : 60,
    url : 'https://google.com',
    lastUpdated : Date.now()
};
export class ResponseParser{
    static parse(resp){
        let {
            id, 
            name : city, 
            coord : {lon, lat}, 
            weather : {id_weather, main, description, icon},
            base,
            main : {temp, feels_like, temp_min, temp_max, pressure, humidity},
            visibility, 
            wind : {windspeed, deg},
            clouds : {all, dt},
            sys : {type, id_sys, country, sunrise, sunset},
            timezone, 
            cod 
        } = resp;
        return {
            'id' : id,
            'city' : city,
            'location' : `${city}, ${country}`,
            'tempMinC' : temp_min,
            'tempMaxC' : temp_max,
            'humidity' : humidity,
            'pressure' : pressure,
            'lat' : lat,
            'lon' : lon,
            'windspeed' : windspeed,
            'localtime' : timezone,
            'sunrise' : sunrise,
            'sunset' : sunset
        }
    }
}