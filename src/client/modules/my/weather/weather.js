import { LightningElement, track, api } from 'lwc';
import { log, l, WeatherSchema, DefaultWeather, ResponseParser, Cities } from './weatherhelper.js';
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const WEATHER_API = '&appid=dc14a4d0c2ab97c643acd3e8447fd074';
const DELAY = 2000; //in ms
const faker = require('faker');
export default class Weather extends LightningElement{
    @track currentWeather;
    @track cached; 
    @track error; 
    @track lastModified = Date.now;
    @track attempts=0;
    intervalId;
    
    //getters
    get timeSecondsAgo(){
        let diff = (Date.now() - this.lastModified)/1000;
        return diff.toFixed(2);
    }

    //constructor
    constructor(){
        super();
        this.currentWeather = Object.assign({}, WeatherSchema, DefaultWeather);
        this.cached = false;
        this.lastModified = Date.now();
    }

    //connectedCallback
    connectedCallback(){
        this.intervalId = setInterval(()=>{
            let city;
            this.attempts = 0;
            l('--------------------------------------------------');
            for(let i=0; i<9; i++){
                ('Attempt '+ i);
                let current = this.currentWeather.city;
                let next = Cities[Math.floor((Math.random(1)*100) % Cities.length)];
                l('current >' + current);
                l('new >' + next);
                if(next != current){
                    city = next;
                    if(i != 0){
                        console.log(`After ${i} attempts resolved to : ${city}`);
                        this.attempts = i;
                    }
                    break;
                }else{
                    l('Same city found!');
                }
            }
            l('----------------------------------------------------');
            
            let url = WEATHER_URL + city + WEATHER_API; //In the form [api.openweathermap.org/q=][cityName][&appid=<appId>]
            fetch(url)
            .then((result) => {
                //console.dir(result);
                return result.json();
            })
            .then(data=>{
                //log(`Data received for ${city} as ${JSON.stringify(data)}`);
                this.currentWeather = ResponseParser.parse(data); //Or Object.assign({}, this.currentWeather, data);
                this.currentWeather.lastModified = Date.now();
            })
            .catch((error) => {
                log(`Encountered error during fetch : ${error}`);
                this.error = error;
                //throw error;
            });
        },DELAY);

        // let btnSv = document.getElementById('btnSv');
        // btnSv.addEventListener('click', ()=>{
        //     clearInterval(this.intervalId);
        // });
        
    }

    //placeholder optimization
    //fetchWeather(){}

}