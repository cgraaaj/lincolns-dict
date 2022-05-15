import { FETCH_FLASHCARDS } from "../actions/types";
import _ from "lodash";

const INTIAL_STATE = {
  flashcards: [],
};

const flashcardReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_FLASHCARDS: {
    // random sort
    let randSortedFC = action.payload.words.sort(()=> 0.5 - Math.random())
    let selectedFC = randSortedFC.slice(0,action.payload.numberOfFlashcards) 
      // return { ...state, flashcards: _.mapKeys(selectedFC, "_id") };
      return { ...state, flashcards:selectedFC };
    }
    default:
      return state;
  }
};

export default flashcardReducer;
