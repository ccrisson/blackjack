// Handle all deck actions (generation/manipulation)

function createDeck(){
  const suits = ['D', 'H', 'C', 'S'];
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];

  let deck = [];
  for (let i = 0; i < suits.length; i++){
    for (let j = 0; j < 13; j++){
      let card = {
        rank: ranks[j],
        suit: suits[i]
      }
      deck.push(card);
    }
  }
  deck = shuffleDeck(deck);
  return deck;
}

function shuffleDeck(deck){
    for (let cardSwaps = 0; cardSwaps < 10000; cardSwaps++){
      let index1 = Math.floor(Math.random() * deck.length);
      let index2 = Math.floor(Math.random() * deck.length);
  
      let temp = deck[index1];
      deck[index1] = deck[index2];
      deck[index2] = temp;
    }
    return deck;
  }

  function drawCard(deck, hand){
      hand.push(deck.pop());
      return {
          deck: deck,
          hand: hand
      }
  }
  exports.createDeck = createDeck;
  exports.shuffleDeck = shuffleDeck;
  exports.drawCard = drawCard;