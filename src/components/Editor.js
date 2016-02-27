import React from 'react';

export default class Editor extends React.Component {
  render() {
    return(
      <div className='editor'>
        <div className='account_wrapper'>
          <img className='twitter_icon' />
        </div>
        <form action='#' method='post'>
          <textarea className='tweet_editor' name='tweet' tabindex='1'></textarea>
          <div className='in_reply_to' id='0'></div>
        </form>
      </div>
    );
  }
}
