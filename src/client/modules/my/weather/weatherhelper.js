export class helper{
    message = 'default message';
}

export function log(msg){
    const styledMsg = '%c' + msg;
    const style = 'color: red';
    console.log(styledMsg, style);
}

export const DEFAULT = {
    place : 'New town', 
    location :'Kolkata, India',
    tempC :25,
    time : new Date().toLocaleDateString(),
    humidity : 60,
    url : 'www://google.com',
    lastUpdated : Date.now()
};