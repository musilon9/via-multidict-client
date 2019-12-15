import * as R from 'ramda';
import store from '../store';

const cardEquals = (word, source, definition) => card =>
  R.propEq('word', word)(card) &&
  R.propEq('source', source)(card) &&
  R.propEq('definition', definition)(card);

export const canBeStored = card => store.getters.user && !hasBeenStored(card);

export const hasBeenStored = card =>
  store.getters.storedCards.some(
    cardEquals(store.getters.word, card.source, card.definition)
  );
