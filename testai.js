var database = require('./database.json'),
    fs = require('fs');


var brain = require('brain.js');

var net = new brain.recurrent.GRU();
var json = require('./ai-1524629317716.json');
net.fromJSON(json);

card = database[0];

console.log(net.run(JSON.stringify({
    input: JSON.stringify(card.desc)
})));