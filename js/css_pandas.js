import { levels } from './levels';
import Game from './game';

$(() => {
  let game = new Game(levels(), $('.forest'));
});
