import {changeView} from '../render';
import WelcomeView from './welcome-view';
import artistSelection from '../artist-selection/artist-selection';

const welcome = new WelcomeView();

welcome.onStart = () => changeView(artistSelection());

export default () => welcome;
