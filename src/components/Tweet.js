import React from 'react';

export default class Tweet extends React.Component {
  render() {
    return(
      <ul className='template_wrapper'>
        <li className='tweet hidden_template'>
          <div className='box_wrapper'>
            <div className='left_box'>
              <img className='user_icon' />
            </div>
            <div className='right_box'>
              <div className='tweet_header clearfix'>
                <span className='user_name'></span>
                <span className='screen_name'></span>
                <span className='created_at'></span>
              </div>
              <div className='tweet_body'></div>
            </div>
            <div className='right_widget'>
              <div className='reply_widget_wrapper'>
                <i className='fa fa-reply reply_button'></i>
              </div>
              <div className='favorite_widget_wrapper'>
                <i className='fa fa-star favorite_button'></i>
              </div>
            </div>
          </div>
        </li>
      </ul>
    );
  }
}
