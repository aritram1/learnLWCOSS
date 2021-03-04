import { LightningElement, track, api } from 'lwc';
import { log, l } from './helper.js';
export default class Typeaheadinput extends LightningElement{
    
    constructor(){
        super();
        log('Typeahead input initiated');
    }

    connectedCallback(){
        let container = this.template.querySelector('div');
        console.log('inside cback');
        console.log(container);
    }


    handleChange(event){
        log('inside handlechange');
        log(event.targetvalue);
    }
        
}