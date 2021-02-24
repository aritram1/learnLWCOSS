import { LightningElement, track, api } from 'lwc';
import { helper, log, DEFAULT } from './weatherhelper.js';
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const WEATHER_API = '&appid=dc14a4d0c2ab97c643acd3e8447fd074';

export default class Weather extends LightningElement{
    //l = this.log;
    //define properties
    @track currentWeather={};
    @track cached;
    @track error;
    response = {};

    //getters
    get timeSecondsAgo(){
        log(`timesecondsAgo called!`);
        let timeinMS = Date.now() - this.currentWeather.lastUpdated || Date.now;
        return timeinMS/1000;
    }

    //constructor
    constructor(){
        super();
        this.currentWeather = Object.assign({}, DEFAULT);
        this.cached = false;
    }

    //connectedCallback
    connectedCallback(){
        setInterval(()=>{
            let city = this.currentWeather.city;
            let url = WEATHER_URL + city + WEATHER_API; //In the form [api.openweathermap.org/q=][cityName][&appid=<appId>]
            fetch(url)
            .then((result) => {
                console.dir(result);
                return result.json();
            })
            .then(data=>{
                log('inside fetch url success');
                log(JSON.stringify(data));
                this.response = data;
                let a = Object.assign({}, DEFAULT, data);
                console.log(a);
                this.currentWeather = Object.assign({}, DEFAULT, data);
            })
            .catch((error) => {
                this.error = error;
                log('inside error');
                log(error);
            });
        },5000);
        
    }

    // fetchWeather(){
    //     console.log('hi');
    //     let city = this.currentWeather.city;
    //     let url = WEATHER_URL + city + WEATHER_API; //In the form [api.openweathermap.org/q=][cityName][&appid=<appId>]
    //     fetch(url)
    //     .then((result) => {
    //         console.dir(result);
    //         return result.json();
    //     })
    //     .then(data=>{
    //         log('inside fetch url success');
    //         log(data);
    //         let a = Object.assign({}, DEFAULT, data);
    //         console.log(a);
    //         this.currentWeather = Object.assign({}, DEFAULT, data);
    //     })
    //     .catch((error) => {
    //         this.error = error;
    //         log('inside error');
    //         log(error);
    //     });
    // }


}