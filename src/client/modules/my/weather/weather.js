import { LightningElement, track, api } from 'lwc';
import { log, l, WeatherSchema, DefaultWeather, ResponseParser, Cities } from './weatherhelper.js';
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const WEATHER_API = '&appid=dc14a4d0c2ab97c643acd3e8447fd074';
const faker = require('faker');
export default class Weather extends LightningElement{
    @track currentWeather={};
    @track cached;
    @track error;
    @track lastupdated;
    
    get timeSecondsAgo(){
        log(`timesecondsAgo called!`);
        log(this.lastUpdated);
        let timeinMS = Date.now() - parseInt(this.lastUpdated) || Date.now;
        return Math.timeinMS/1000;
    }

    //constructor
    constructor(){
        super();
        this.currentWeather = Object.assign({}, WeatherSchema, DefaultWeather);
        this.cached = false;
        this.lastupdated = Date.now();
    }

    //connectedCallback
    connectedCallback(){
        setInterval(this.fetchWeather,
            ()=>{
            let city;
            for(let i=0; i<5; i++){
                let current = this.currentWeather.city;
                let next = Cities[Math.floor((Math.random(1)*100)%3)];
                if(next != current){
                    city = next;
                    if(i != 0) console.log(`After ${i} attempts resolved to : ${city}`);
                    break;
                }
            }
            
            let url = WEATHER_URL + city + WEATHER_API; //In the form [api.openweathermap.org/q=][cityName][&appid=<appId>]
            fetch(url)
            .then((result) => {
                console.dir(result);
                return result.json();
            })
            .then(data=>{
                log(`Data received for ${city} as ${JSON.stringify(data)}`);
                this.currentWeather = ResponseParser.parse(data);
                //Object.assign(this.currentWeather, data);
                //log(JSON.stringify(data));
                //this.response = data;
                //this.currentWeather = Object.assign({}, this.currentWeather, data);
            })
            .catch((error) => {
                this.error = error;
                log('inside error');
                log(error);
            });
        },2000);
        
    }

    //placeholder optimization
    fetchWeather(){}

}