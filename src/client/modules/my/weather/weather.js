import { LightningElement, track, api } from 'lwc';
import { ResponseParser, log, l } from './helper.js';
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const WEATHER_API = '&appid=dc14a4d0c2ab97c643acd3e8447fd074';
const DELAY = 2000; //in ms
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
            dayTypeImage : '../../../resources/images/daytypes/wi-cloudy.svg'
        }
    }
    
    connectedCallback(){
        setInterval(()=>{
            this.city = Math.random(1) > 0.5 ? 'Kolkata' : 'Mumbai';
            //console.log('hi ' + this.city);
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
        // this.city = Math.random(1) > 0.5 ? 'Kolkata' : 'Mumbai';
        // //console.log('hi ' + this.city);
        // let url = WEATHER_URL + this.city + WEATHER_API; //In the form [api.openweathermap.org/q=][cityName][&appid=<appId>]
        // fetch(url)
        // .then((result) => {
        //     //console.dir(result);
        //     return result.json();
        // })
        // .then(data=>{
        //     log(`Data received for ${this.city} as ${JSON.stringify(data)}`);
        //     log('data' + ResponseParser.parse(data));
        //     this.currentWeather = ResponseParser.parse(JSON.stringify(data)); //Or Object.assign({}, this.currentWeather, data);
        //     this.error = undefined;
        // })
        // .catch((error) => {
        //     console.log(`Encountered error during fetch : ${error}`);
        //     this.error = error;
        //     //throw error;
        // });
    // }
}