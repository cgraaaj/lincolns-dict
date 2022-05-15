import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

class Audio extends React.Component {
  renderAudio = (phoneticObj) => {
    let audio_id = _.uniqueId("audio_");
    return (
      <div className="ui column grid">
          <audio id={audio_id} src={phoneticObj.audio} />
        <div className="column">
          <div
            className="ui icon button"
            onClick={() => {
              document.getElementById(audio_id).play();
            }}
            data-content={
              _.isEmpty(phoneticObj.text) ? null : phoneticObj.text
            }
          >
            <i
              className="volume up icon"
            ></i>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        {!_.isEmpty(this.props.phonetic) ? (
          this.renderAudio(this.props.phonetic)
        ) : !_.isUndefined(this.props.card) ? (
          <div className="ui column grid">
            <audio id={this.props.card.id} src={this.props.card.audio}></audio>
            <div className="column">
              <i
                className="volume up icon"
                onClick={() => {
                  document.getElementById(this.props.card.id).play();
                }}
              ></i>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapsStateToProps = (state, ownProps) => {
  if (ownProps.cardId) {
    return { card: state.data.cards[ownProps.cardId] };
  }
  return { ...state };
};

export default connect(mapsStateToProps, {})(Audio);
