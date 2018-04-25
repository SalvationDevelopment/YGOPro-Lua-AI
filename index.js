var database = require('./database.json'),
    fs = require('fs'),
    trainingData = [];

console.log('Loading Scripts');


//database.length = 2;
database.forEach(function(card, i) {
    try {
        const scriptData = fs.readFileSync(`../ygopro-scripts/c${card.id}.lua`);

        trainingData.push({
            input: JSON.stringify(card),
            output: scriptData.toString()
        });
    } catch (e) {
        //console.log(`${card.name} not found, ${card.id}`);
    }
});

console.log(`${trainingData.length} scripts found, training AI, godspeed.`);


var brain = require('brain.js');

var net = new brain.recurrent.GRU();

var result = net.train(trainingData, {
    // Defaults values --> expected validation
    iterations: 1000, // the maximum times to iterate the training data --> number greater than 0
    errorThresh: 0.05, // the acceptable error percentage from training data --> number between 0 and 1
    log: false, // true to use console.log, when a function is supplied it is used --> Either true or a function
    logPeriod: 1, // iterations between logging out --> number greater than 0
    learningRate: 0.9, // scales with delta to effect training rate --> number between 0 and 1
    momentum: 0.9, // scales with next layer's change value --> number between 0 and 1
    callback: console.log, // a periodic call back that can be triggered while training --> null or function
    callbackPeriod: 5, // the number of iterations through the training data between callback calls --> number greater than 0
    timeout: 20 // the max number of milliseconds to train for --> number greater than 0
});

console.log('AI trained, saving to file');
var tag = new Date().getTime();
fs.writeFileSync(`ai-${tag}.lua`, net.run(trainingData[0].input));
console.log(net.run(trainingData[0].input));
var json = net.toJSON();
fs.writeFileSync(`ai-${tag}.json`, JSON.stringify(json));