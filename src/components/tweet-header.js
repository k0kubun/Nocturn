import React, { PropTypes } from 'react';
import Time                 from '../components/time';

export default class TweetHeader extends React.Component {
  static propTypes = {
    tweet: PropTypes.object.isRequired,
    now:   PropTypes.number,
  }

  generateTwitterProfileUrl(screen_name) {
    return `https://twitter.com/${screen_name}`;
  }

  render() {
    const tweetUser = this.props.tweet.user;

    return (
      <div className='tweet_header clearfix'>
        <div className='name_wrapper'>
          <a
            href={this.generateTwitterProfileUrl(tweetUser.screen_name)}
            className='user_name external-link external-link-twitter'
            target='_blank'
          >
            {tweetUser.name}
          </a>
          <span className='screen_name'>
            {tweetUser.screen_name}
          </span>
        </div>
        <Time className='created_at' time={this.props.tweet.created_at} now={this.props.now} />
      </div>
    );
  }
}
