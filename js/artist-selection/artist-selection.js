import {changeView} from '../render';
import ArtistSelection from './artist-selection-view';
import genreSelection from '../genre-selection/genre-selection';

const artistSelection = new ArtistSelection();

artistSelection.onStart = () => changeView(genreSelection());

export default () => artistSelection;
