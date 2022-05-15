import React from "react";
import { connect } from "react-redux";
import _ from "lodash"

import MeaningList from "./MeaningList";
import Audio from "./Audio";

class WordList extends React.Component {

  getValidAudioPhonetic = (phonetics) =>{
    let seletedAudio = "";
    let audio_priority = phonetics.map((phonetic, i) => {
      if (phonetic.audio) {
        if (_.endsWith(phonetic.audio, "uk.mp3")) {
          return { key: 1, value: phonetic };
        } else if (_.endsWith(phonetic.audio, "us.mp3")) {
          return { key: 2, value: phonetic };
        } else {
          return { key: 3, value: phonetic };
        }
      }
    });
    audio_priority = audio_priority.filter(val => _.isObject(val))

    if (audio_priority.some((val) => val === undefined)) {
      return null;
    }
    
    let audio_priority_obj = audio_priority.reduce(
      (obj, item) => ((obj[item.key] = item.value), obj),
      {}
    );

    seletedAudio = (() => {
      if (1 in audio_priority_obj) {
        return audio_priority_obj[1];
      } else if (2 in audio_priority_obj) {
        return audio_priority_obj[2];
      } else {
        return audio_priority_obj[3];
      }
    })();
    console.log(seletedAudio)
    return seletedAudio
  }

  renderedList=(words) => words.map((word, i) => {

    let phoneticObj = this.getValidAudioPhonetic(word.phonetics)
    return (
      <div className="item" key={i}>
        <div className="ui large horizontal divided list">
          <div className="item">
            <Audio phonetic={phoneticObj}/>
          </div>
          <div className="item">
            <div className="content">
              <div className="header">{word.word}</div>
            </div>
          </div>
        </div>
        <MeaningList meanings={word.meanings} word={word.word} phonetic={phoneticObj}/>
      </div>
    );
  });

  render() {
    return (
      <div className="ui relaxed list">
        {this.renderedList(this.props.words)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { words: state.data.words};
};

export default connect(mapStateToProps, { })(WordList);
