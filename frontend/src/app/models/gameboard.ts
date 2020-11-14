import { Card } from './card';

export interface Gameboard {
  deck: Array<Card>;
  dealerHand: Array<Card>;
  dealerHidden: Array<Card>;
  playerHand: Array<Card>;
  playerChips: number;
  pot: number;
}
