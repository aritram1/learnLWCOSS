import { LightningElement, track, api } from 'lwc';
import { log, l } from './helper.js';
export default class TypeaheadInput extends LightningElement{
    
    constructor(){
        super();
        log('Typeahead input initiated');
    }
    
    connectedCallback(){
        log('Inside conntedCallback');
        let inp = document.querySelector(".container");//.firstChild;
        console.log(inp);
    }
        
}