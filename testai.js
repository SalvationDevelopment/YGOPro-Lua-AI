var database = require('./database.json'),
    fs = require('fs');


var brain = require('brain.js');


var ai = require('./ai-1524632683164');

function encode(arg) {
    return arg.split('').map(x => x.charCodeAt(0) / 400)
}

card = database[2];
console.log(ai(encode(JSON.stringify({
    name: '',
    passcode: 0000001000,
    desc: ''
}))))