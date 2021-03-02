import { LightningElement, track, api } from 'lwc';
import { log, l } from './helper.js';
export default class Typeaheadinput extends LightningElement{
    
    constructor(){
        super();
        log('Typeahead input initiated');
    }
    
    connectedCallback(){
        log('Inside conntedCallback');
        let inp = document.getElementsByClassName("typeaheadinput");//.firstChild;a
        //inp.addEventListener('change', this.handleChange);
        console.log(inp.classList);
    }

    handleChange(event){
        log('inside handlechange');
        log(eve,t.targetvalue);
    }
        
}