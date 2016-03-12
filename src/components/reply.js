import React, { PropTypes } from 'react';

export default class Reply extends React.Component {
  static propTypes = {
    setInReplyTo: PropTypes.func.isRequired,
    setText:      PropTypes.func.isRequired,
  }

  onReplyClicked(event) {
    this.props.setText(`@${this.props.tweet.user.screen_name} `);
    this.props.setInReplyTo(this.props.tweet);

    // FIXME: Use better way to focus
    event.target.ownerDocument.getElementById('tweet_editor').focus();
  }

  render() {
    return(
      <div className='reply_widget_wrapper' onClick={this.onReplyClicked.bind(this)}>
        <i className='fa fa-reply reply_button' />
      </div>
    );
  }
}
