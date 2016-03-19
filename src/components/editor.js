import React, { PropTypes } from 'react';
import IconContainer        from '../containers/icon-container';

export default class Editor extends React.Component {
  static propTypes = {
    active:            PropTypes.bool.isRequired,
    activeAccount:     PropTypes.object,
    text:              PropTypes.string.isRequired,
    inReplyTo:         PropTypes.string,
    onBlur:            PropTypes.func.isRequired,
    onFocus:           PropTypes.func.isRequired,
    onTextareaChanged: PropTypes.func.isRequired,
    onTextareaKeyDown: PropTypes.func.isRequired,
  }

  render() {
    return(
      <div className='editor'>
        <IconContainer />
        <form action='#' method='post'>
          <textarea
            id='tweet_editor'
            className='tweet_editor'
            name='tweet'
            tabIndex='1'
            onChange={this.props.onTextareaChanged}
            onKeyDown={this.props.onTextareaKeyDown}
            value={this.props.text}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
          />
          <div className='in_reply_to' id='0' />
          <span className={`tweet_counter ${this.props.active ? 'active' : ''} ${this.props.text.length > 140 ? 'minus' : ''}`}>
            {140 - this.props.text.length}
          </span>
        </form>
      </div>
    );
  }
}
