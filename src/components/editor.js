import React, { PropTypes } from 'react';
import IconContainer        from '../containers/icon-container';

export default class Editor extends React.Component {
  static propTypes = {
    activeAccount:     PropTypes.object,
    text:              PropTypes.string.isRequired,
    inReplyTo:         PropTypes.string,
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
          />
          <div className='in_reply_to' id='0' />
        </form>
      </div>
    );
  }
}
