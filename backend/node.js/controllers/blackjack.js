// Handles game actions specific to blackjack including creating gameboard
const deckService = require('./deck.js');

function generateGameboard() {
    return {
        deck: [],
        dealerHand: [],
        dealerHidden: [],
        playerHand: [],
        playerChips: 1000,
        pot: 0
    };
   
}

function dealCards(gameboard) {
    let playerHand = [];
    let dealerHand = [];
    let obj = deckService.drawCard(gameboard.deck, []);
    gameboard.deck = obj.deck;
    gameboard.playerHand.push(obj.hand[0]);
    obj = deckService.drawCard(gameboard.deck, []);
    gameboard.deck = obj.deck;
    gameboard.dealerHidden.push(obj.hand[0]);
    obj = deckService.drawCard(gameboard.deck, []);
    gameboard.deck = obj.deck;
    gameboard.playerHand.push(obj.hand[0]);
    obj = deckService.drawCard(gameboard.deck, []);
    gameboard.deck = obj.deck;
    gameboard.dealerHand.push(obj.hand[0]);
    return gameboard;
    
}

exports.generateGameboard = generateGameboard;
exports.dealCards = dealCards;