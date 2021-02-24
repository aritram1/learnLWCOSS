import { LightningElement, track, api } from 'lwc';
import { helper, log, DEFAULT } from './weatherhelper.js';

export default class Weather extends LightningElement{
    
    //define properties
    // @track place = 'New Town';
    // @track location;
    // @track tempC;
    // @track humidity;
    // @track url;
    // @track time;
    @track currentWeather={};// = Object.assign({}, DEFAULT);

    @track cached;
    @track error;

    //getters
    get timeSecondsAgo(){
        log(`timesecondsAgo called!`);
        return Date.now() - this.currentWeather.lastUpdated || Date.now;
    }

    //constructor
    constructor(){
        super();
        console.log('hi');
        log(`constructor called!`)
        log('->' + JSON.stringify(DEFAULT));
        this.currentWeather = Object.assign({}, DEFAULT);
        console.log(this.currentWeather.lastUpdated);
        this.cached = false;
    }

    //connectedCallback
    connectedCallback(){
        log(`connected called!`)
        if(!this.cached){
            this.fetchWeather();
        }
    }

    fetchWeather(){
        let url = `api.openweathermap.org/data/2.5/weather?q=${this.currentWeather.location}&appid=dc14a4d0c2ab97c643acd3e8447fd074`;
        fetch('GET', 'url')
        .then((result) => {
            //log(JSON.stringify(result));
            result.json()
            .then(data=>{
                log('inside fetch url success');
                log(data);
            });
        })
        .catch((error) => {
            this.error = error;
            log('inside error');
        });
    }


}