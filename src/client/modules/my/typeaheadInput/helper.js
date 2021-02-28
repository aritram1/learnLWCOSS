export function log(msg){
    const styledMsg = '%c' + msg;
    const style = 'color: red';
    console.log(styledMsg, style);
}

export function l(msg){
    return log(msg);
}