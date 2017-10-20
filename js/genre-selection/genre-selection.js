import {changeView} from '../render';
import GenreSelection from './genre-selection-view';
import mainResult from '../main-result/main-result';

const genreSelection = new GenreSelection();

genreSelection.onStart = () => changeView(mainResult());

export default () => genreSelection;
