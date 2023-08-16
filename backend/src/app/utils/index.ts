export let config = function (key: string, value: any = '') {

    const keyArray = key.split('.');

    if (keyArray.length <= 1) {
        return value;
    }

    let configData = require('../../config/' + keyArray[0]);

    for (let i = 1; i < keyArray.length; i++){
        if(keyArray[i] !== undefined && keyArray[i].length){
            configData = configData[keyArray[i]];
        } else {
            configData = value;
        }
    }

    return configData;

}