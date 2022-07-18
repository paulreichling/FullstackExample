const express = require('express');
const cors = require('cors');
const GenerationEngine = require('./generation/engine.js');
const dragonRouter = require('./api/dragon.js');
const generationRouter = require('./api/generation.js');

const app = express();
const engine = new GenerationEngine();

app.locals.engine = engine;

app.use(cors({origin: 'http://localhost:5100' }));
app.use('/dragon', dragonRouter);
app.use('/generation', generationRouter);


app.use((err, req, res, next) => { //error handler

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        type: 'error!1!!!! oH noO', message: err.message
    })
});

engine.start();





module.exports = app;




















//NOTES

//Inital index js file with test dragons
/* 
const Dragon = require('./dragon.js');

const fooey = new Dragon({
    birthdate: new Date(),
    nickname: 'fooey'
});
const baloo = new Dragon({
    nickname: 'baloo',
    birthdate: new Date(),
    traits: [
        {traitType: 'backgroundColor', traitValue: 'green' }
    ]
});

const mimar = new Dragon();

setTimeout(() => {
    const gooby = new Dragon();
    console.log('gooby: ' , gooby);
}, 3000);

console.log('Fooey: ' , fooey);
console.log('baloo: ' , baloo);
console.log('mimar: ' , mimar);


//expiration date inital index file

const Generation = require('./generation.js');

const generation = new Generation();

console.log('generation' , generation);

const gooby = generation.newDragon();

console.log('gooby', gooby);

setTimeout(() => {
    const mimar = generation.newDragon({
        nickname: 'mimar'
    });
    console.log('mimar ' , mimar);
}, 1000);


setTimeout(() => {
   engine.stop(); 
}, 20000);

*/