import React from 'react';

export default class Editor extends React.Component {
  render() {
    return(
      <div className='editor'>
        <div className='account_wrapper'>
          <img className='twitter_icon' src={this.props.user ? this.props.user.profile_image_url : ''} />
        </div>
        <form action='#' method='post'>
          <textarea className='tweet_editor' name='tweet' tabIndex='1'></textarea>
          <div className='in_reply_to' id='0'></div>
        </form>
      </div>
    );
  }
}
