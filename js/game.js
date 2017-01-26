import { levels } from './levels';
import CSSPandas from './css_pandas';

$(() => {
  let csspandas = new CSSPandas(levels(), $('.forest'));
});
