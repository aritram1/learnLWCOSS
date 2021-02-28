import { LightningElement, track, api } from 'lwc';
import { ResponseParser, log, l } from './helper.js';
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const WEATHER_API = '&appid=dc14a4d0c2ab97c643acd3e8447fd074';
const DELAY = 5000; //in ms
export default class Weather extends LightningElement{
    @track currentWeather = {};
    @track error;
    @api city;

    constructor(){
        super();
        this.currentWeather = {
            dayTypeImage : '',
            feels_like : 25,
            dayType : 'Cloudy',
            location : 'Kolkata, India',
            date : new Date().getDate(),
            humidity: 50,
            dayTypeImage : '../../../resources/images/daytypes/wi-cloudy.svg',
            tempMinC : 25,
            tempMaxC : 45
        }
    }
    
    connectedCallback(){
        setInterval(()=>{
            let r = Math.random(1);
            this.city = r < 0.1 ? 'Paris' :
                        r < 0.2 ? 'Amsterdam' :
                        r < 0.3 ? 'Delhi' :
                        r < 0.4 ? 'Oslo' :
                        r < 0.5 ? 'Houston' :
                        r < 0.6 ? 'London' :
                        r < 0.7 ? 'Dubai' :
                        r < 0.8 ? 'Moscow' :
                        r < 0.9 ? 'Barcelona' : 'Kolkata';
                        
            log('City => ' + this.city);
            let url = WEATHER_URL + this.city + WEATHER_API; //In the form [api.openweathermap.org/q=][cityName][&appid=<appId>]
            fetch(url)
            .then((result) => {
                //console.dir(result);
                return result.json();
            })
            .then(data=>{
                log(`Data received for ${this.city} as ${JSON.stringify(data)}`);
                log('data' + JSON.stringify(ResponseParser.parse(data)) );
                this.currentWeather = ResponseParser.parse(data); //Or Object.assign({}, this.currentWeather, data);
                console.log('I am here');
                this.error = undefined;
            })
            .catch((error) => {
                console.log(`Encountered error during fetch : ${error}`);
                this.error = error;
                //throw error;
            });
        }, DELAY);
    }
    
    // fetchData(){
        
    // }
}