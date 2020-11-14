// Use express to set endpoints

const express = require('express');
const bodyParser = require('body-parser');
const deckService = require('./controllers/deck.js');
const blackjackService = require('./controllers/blackjack.js');

const app = express();

// Middleware for json, headers for cors
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods',
                'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

// Endpoints are actions that the player takes
// Startgame
app.use('/startgame', (req, res, next) => {
    // generate gameboard
    console.log("hello");
    let gameboard = blackjackService.generateGameboard();
    gameboard.deck = deckService.createDeck();
    res.json(gameboard);
});
// Bet
app.post('/bet', (req, res) => {
    console.log(req.body.betAmount);
    // check for valid bet
    if(req.body.gameboard.playerChips > req.body.betAmount
        && req.body.betAmount > 0){
        // move chips and match from house
        req.body.gameboard.playerChips -= req.body.betAmount;
        req.body.gameboard.pot = req.body.betAmount * 2;
        // deal cards
        req.body.gameboard = blackjackService.dealCards(req.body.gameboard);
        //res.json(req.body.gameboard);
    }
    res.json(req.body.gameboard);
});
// Hit
app.post('hit', (req, res) => {
    const obj = deckService.drawCard(req.body.gameboard.deck, req.body.gameboard.playerHand);
    req.body.gameboard.deck = obj.deck;
    req.body.gameboard.playerHand = obj.deck;
    res.json(req.body.gameboard);
});
// Hold
app.post('hit', (req, res) => {

});
 
module.exports = app;