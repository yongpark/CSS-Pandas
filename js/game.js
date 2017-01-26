import { levels } from './levels';
import CSSPandas from './css_pandas';

document.addEventListener('DOMContentLoaded', () => {
  let csspandas = new CSSPandas(levels(), $('.frame'));
});
// $(() => {
//   let csspandas = new CSSPandas(levels(), $('.bed'));
// });
// console.log("hello world");
