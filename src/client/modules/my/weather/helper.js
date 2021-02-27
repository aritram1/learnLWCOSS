export class ResponseParser {
    static weather = {};
    
    static parse(response){
        let w = this._parse(response);
        this.weather = this._process(w);
        return this.weather;
    }
    
    static _parse(response){
        let {
            id, 
            name : city, 
            coord : {lon, lat}, 
            weather : {id_weather, main, description, icon},
            base,
            main : {temp, feels_like, temp_min  , temp_max, pressure, humidity},
            visibility, 
            wind : {speed : windSpeed, deg},
            clouds : {all, dt},
            sys : {type, id_sys, country, sunrise, sunset},
            timezone, 
            cod
        } = response;
        
        let parsedResp = {
            'id' : id,
            'city' : city,
            'country' : country,
            'tempMinC' : (temp_min-273).toFixed(2),
            'tempMaxC' : (temp_max-273).toFixed(2),
            'feels_like' : (feels_like-273).toFixed(2),
            'humidity' : humidity,
            'pressure' : (pressure/1000).toFixed(2),
            'lat' : lat,
            'lon' : lon,
            'windSpeed' : windSpeed,
            'sunrise' : new Date(sunrise).getTime(),
            'sunset' : new Date(sunset).getTime(),
            'url' : '',
            'timeZone' : timezone,  
        }
        console.log('Parsed Response > ' + JSON.stringify(parsedResp));
        return parsedResp;
    }

    static _process(data){
        let dayTypeImage, dayType, localTime;

        let dayTypes = ['Sunny', 'Overcast', 'Rainy'];
        let r = Math.random(1)*100%3;
        dayType = dayTypes[r];
        if(data.humidity > 60) dayType = 'Overcast';
        if(data.feels_like-273 < 25) dayType = 'Cold';
        if(data.feels_like-273 > 35) dayType = 'Warm';

        dayTypeImage = '../../../resources/images/daytypes/wi-cloudy.svg';
        localTime = Date.now();

        let injectedNodes = {
            'dayType' : dayType,
            'dayTypeImage' : dayTypeImage,
            'localTime' : data.localTime,
            'date' : new Date().getDate(),
            'location' : `${data.city}, ${data.country}`
        }
        let _p = Object.assign({}, injectedNodes, data);
        console.log('Processed response >' + JSON.stringify(_p)) ;
        return _p;
    }
}

export function log(msg){
    const styledMsg = '%c' + msg;
    const style = 'color: red';
    console.log(styledMsg, style);
}

export function l(msg){
    return log(msg);
}