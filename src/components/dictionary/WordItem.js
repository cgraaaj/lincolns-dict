import React from "react";
import { connect } from "react-redux";
import _ from "lodash"

import { setDefinition, setModal } from "../../actions/index";

class WordItem extends React.Component {
  
  onClickDefinition=(def)=>e =>{
    const modal = {
      flag:!this.props.modalFlag,
      example:def.example,
      synonyms:def.synonyms
    }
    if ((def.synonyms.length > 0 ) || def.example){
      this.props.setModal(modal)
    }
  }

  renderDefinitions = (definitions) =>
    definitions.map((def, i) => {
      return (
        <div
          className="item"
          key={i}
          onClick={this.onClickDefinition(def)}
          style={{cursor: "pointer"}}
        >
          {def.definition}
        </div>
      );
    });


  onDoubleClickCard = () => {
    var wordData = {
      search_word: this.props.word,
      phonetic: {text:this.props.phonetic.text,audio:this.props.phonetic.audio},
      partOfSpeech: this.props.meaning.partOfSpeech,
      definitions: this.props.meaning.definitions.map((def) => def.definition),
    };
    console.log(wordData)
    this.props.setDefinition(wordData);
  };

  render() {
    return (
      <div className="card">
        <div className="content" onDoubleClick={this.onDoubleClickCard}>
          <div className="header">{this.props.meaning.partOfSpeech}</div>
          <div className="description">
            <div className="ui bulleted list">
              {this.renderDefinitions(this.props.meaning.definitions)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sword: state.data.sword,
    audioURL: state.data.audio,
  };
};

export default connect(mapStateToProps, { setDefinition, setModal })(WordItem);
