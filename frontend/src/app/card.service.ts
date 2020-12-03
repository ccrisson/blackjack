import { Injectable } from '@angular/core';
import { Gameboard } from './models/gameboard';
import { Card } from './models/card';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private gameListener = new Subject<JSON>();
  suits = ['C', 'D', 'H', 'S'];
  ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
  // deck: Array<Card> = [];

  constructor(private http: HttpClient) { }

  getGameListener(): Observable<JSON> {
    return this.gameListener.asObservable();
  }

  startGame(): void{
    this.http.get('http://localhost:3000/startgame').subscribe(req => {
      this.gameListener.next(JSON.parse(JSON.stringify(req)));
    });
    console.log('after http.get()');
  }

  bet(bet: number, gameboard: Gameboard): void{
    console.log('alsdkfj;');
    this.http.post('http://localhost:3000/bet', {betAmount: bet, gameboard})
              .subscribe(req => {
                // console.log('whaaaaa');
                this.gameListener.next(JSON.parse(JSON.stringify(req)));
              });
            }
  // generateDeck(): Array<Card>{
  //   for (const rank of this.ranks){
  //     for (const suit of this.suits){
  //       this.deck.push({rank, suit});
  //     }
  //   }
  //   this.shuffleDeck(this.deck);
  //   console.log(this.deck);
  //   return this.deck;


  shuffleDeck(deck: Array<Card>): Array<Card>{
    for (let i = 0; i <= 10000; i++){
      deck.splice(Math.floor(Math.random() * deck.length), 0,
        deck.splice(Math.floor(Math.random()) * deck.length, 1)[0] );
    }
    return deck;
  }

  calculateHand(hand: Array<Card>): number{
    let score = 0;
    for (const card of hand){
      const value = this.convertRankToScore(card.rank);
      if (value > 0){
        score += value;
      } else {
        console.log('ERROR');
      }
    }
    if (score > 21){
      score = 0;
      for (const card of hand){
        const value = this.convertRankToScore(card.rank, true);
        if (value > 0){
          score += value;
        } else {
          console.log('ERROR');
        }
      }
    }
    return score;
  }

  convertRankToScore(rank: string, aceRecalc: boolean = false): number{
    if (rank === '2'){
      return 2;
    } else if (rank === '3'){
      return 3;
    } else if (rank === '4'){
      return 4;
    } else if (rank === '5'){
      return 5;
    } else if (rank === '6'){
      return 6;
    } else if (rank === '7'){
      return 7;
    } else if (rank === '8'){
      return 8;
    } else if (rank === '9'){
      return 9;
    } else if (rank === 'T'){
      return 10;
    } else if (rank === 'J'){
      return 10;
    } else if (rank === 'Q'){
      return 10;
    } else if (rank === 'K'){
      return 10;
    } else if (rank === 'A' && aceRecalc){
      return 1;
    } else if (rank === 'A'){
       return 11;
    }
    return -1;
  }

  // generateGameboard(): Gameboard{
  //   return {
  //     dealerHand: [],
  //     dealerHidden: [],
  //     playerHand: [],
  //     playerChips: 1000,
  //     deck: this.generateDeck(),
  //     pot: 0
  //   };
  // }

  hit(board: Gameboard): Gameboard{
    board = this.dealCard(board, true);
    return board;
  }

  dealCard(board: Gameboard, isPlayer: boolean, isHidden: boolean = false): Gameboard{
    if (isPlayer){
      board.playerHand.push(board.deck.pop());
    }else{
      if (isHidden){
        board.dealerHidden.push(board.deck.pop());
      }else{
        board.dealerHand.push(board.deck.pop());
      }
    }
    return board;
  }
}
