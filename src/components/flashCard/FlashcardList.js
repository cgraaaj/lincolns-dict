import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { fetchFlashcards } from "../../actions";
import Flashcard from "./Flashcard";

function FlashcardList({ flashcards, fetchFlashcards }) {
  // const [flashcards, setFlashcards] = useState([])

  useEffect(() => {
    fetchFlashcards();
  }, []);

  console.log(flashcards);

  return _.isEmpty(flashcards) ? null : (
    <div className="ui cards ui">
      {flashcards.map((flashcard) => {
        console.log(flashcard);
        return <Flashcard key={flashcard.id} fc={flashcard} />;
      })}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    flashcards: state.flashcard.flashcards,
  };
}

export default connect(mapStateToProps, { fetchFlashcards })(FlashcardList);

// class FlashCard extends React.Component {

//   componentDidMount(){

//   }

//   render() {
//     return <div>FlashCard</div>;
//   }
// }

// const mapsStateToProps = (state) => {
//   return {
//     ...state,
//   };
// };

// export default connect(mapsStateToProps, {})(FlashCard);
