import { Component, OnInit } from '@angular/core';
import { CardService } from '../card.service';
import { Gameboard } from '../models/gameboard';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit {
  gameboard: Gameboard;
  playerScore: number;
  playing: boolean;

  constructor(private cardService: CardService) { }

  // start(): void {
  //   this.gameboard = this.cardService.startGame();
  //   this.playing = true;
  // }

  bet(betAmount): void {
    console.log(this.gameboard.playerChips);
    if (betAmount < this.gameboard.playerChips){
      this.cardService.bet(betAmount, this.gameboard);
    }
  }

  hit(): void {
    this.gameboard = this.cardService.hit(this.gameboard);
    this.playerScore = this.cardService.calculateHand(this.gameboard.playerHand);
    setTimeout(() => { this.checkPlayerBust(); }, 2000);
  }

  stand(): void {
    // disable buttons
    // impliment dealer actions
    // check winner

  }


  checkPlayerBust(): void{
    if (this.playerScore > 21){
      alert('You bust. Play again!');
      this.ngOnInit();
    }
  }

  ngOnInit(): void {
    // Initialize default (empty) gameboard to avoid exceptions
    this.gameboard = {
      deck: [],
      dealerHand: [],
      dealerHidden: [],
      playerHand: [],
      playerChips: 333,
      pot: 0,
    };
    // this.playing = false;
    // this.gameboard = this.cardService.generateGameboard();
    // this.playerScore = this.cardService.calculateHand(this.gameboard.playerHand);
    this.cardService.getGameListener().subscribe((gameboard) => this.gameboard = JSON.parse(JSON.stringify(gameboard)));
    this.cardService.startGame();
  }

}
