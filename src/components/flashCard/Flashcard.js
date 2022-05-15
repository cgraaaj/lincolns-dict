import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

// import "./Flashcard.css";

function Flashcard({ fc }) {
  const [flip, setFlip] = useState(false);

  function onClickCard(e) {
    setFlip(!flip);
    // let element = e.currentTarget;
    // if (element.className === "card") {
    //   if (flip) {
    //     element.style.transform = "rotateY(180deg)";
    //   } else {
    //     element.style.transform = "rotateY(0deg)";
    //   }
    // }
  }

  return (
    <div className="card" onClick={onClickCard}>
      {flip ? (
        <div className="center aligned description">
          <div className="item">{fc.definitions[0]}</div>
        </div>
      ) : (
        <div className="content">
          <div className="header">{fc.search_word}</div>
        </div>
      )}
    </div>
  );
}

function mapsStateToProps(state) {
  return {
    ...state,
  };
}

export default connect(mapsStateToProps, {})(Flashcard);
