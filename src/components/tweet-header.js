import React, { PropTypes } from 'react';
import Time                 from '../components/time';

export default class TweetHeader extends React.Component {
  static propTypes = {
    tweet: PropTypes.object.isRequired,
  }

  render() {
    return(
      <div className='tweet_header clearfix'>
        <div className='name_wrapper'>
          <span className='user_name'>{this.props.tweet.user.name}</span>
          <span className='screen_name'>{this.props.tweet.user.screen_name}</span>
        </div>
        <Time className='created_at' time={this.props.tweet.created_at} />
      </div>
    );
  }
}
