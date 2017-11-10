import './styles';
import macrosURL from '../../output/grouper.groups.json';
import appView from './app/view';

window
  .fetch(macrosURL)
  .then((macros) => macros.json())
  .then((macros) => appView(macros));
