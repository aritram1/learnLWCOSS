import { LightningElement, track, api } from 'lwc';
import { helper, log, DEFAULT } from './weatherhelper.js';

export default class Weather extends LightningElement{
    
    //define properties
    @track currentWeather;
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
        this.currentWeather = Object.assign({}, DEFAULT);
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
        fetch('url')
        .then((result) => {
            log(result);
            // result.json()
            // .then(data=>{
            //     log('inside fetch url success');
            //     log(data);
            // });
        })
        .catch((error) => {
            this.error = error;
        });
    }


}