import { LightningElement, track, api } from 'lwc';
import { log, l } from './helper.js';
//const fs = require('fs');
//const util = require('util');

const mockPlaces = [{id: 1, name: 'Kolkata'}, {id: 2, name: 'Mumbai'}];
export default class Typeaheadinput extends LightningElement{
    @track input;
    @track places = [];
    
    constructor(){
        super();
        log('Typeahead input initiated');
    }

    connectedCallback(){
        console.log('inside cback');
    }


    handleChange(event){
        let input = event.target.value;
        if(input.length <= 3){
            return;
        }
        else{
            this.input = input;
            
            //const readFile = util.promisify(fs.readFile);
            const url = 'http://localhost:3002/api/places?p=' + this.input;
            fetch(url, {
                method: 'GET',
                mode: 'no-cors', // this is to prevent browser from sending 'OPTIONS' method request first
                // redirect: 'follow',
                // headers: new Headers({
                //         'Content-Type': 'text/plain',
                //         'X-My-Custom-Header': 'value-v',
                //         'Authorization': 'Bearer ' + token,
                // }),
                // body: companyName
            })
            .then(data => {
                console.log(this.process(data, this.input));
            })
            .catch(error=>{
                console.log(`Error occurred : ${error}`);
            });
        }
        
    }

    process(data, input){
        return 'hi';
    }
        
}