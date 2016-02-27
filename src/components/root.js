import React    from 'react';
import Timeline from './timeline';

export default class Root extends React.Component {
  render() {
    return(
      <div className='timeline_container'>
        <div className='header clearfix'>
          <div className='button_wrapper'>
            <div className='button home_button'>
              <i className='fa fa-home'></i>
            </div>
            Home
          </div>
          <div className='button_wrapper'>
            <div className='button refresh_button'>
              <i className='fa fa-refresh'></i>
            </div>
            Refresh
          </div>
        </div>
        <select id='account_selector' name='account_list'></select>
        <div className='editor'>
          <div className='account_wrapper'>
            <img className='twitter_icon' />
          </div>
          <form action='#' method='post'>
            <textarea className='tweet_editor' name='tweet' tabindex='1'></textarea>
            <div className='in_reply_to' id='0'></div>
          </form>
        </div>
        <div className='timelines'>
          <Timeline />
        </div>
      </div>
    )
  }
}
