import React, { PropTypes } from 'react';
import Time                 from '../components/time';

export default class TweetHeader extends React.Component {
  static propTypes = {
    tweet: PropTypes.object.isRequired,
    now:   PropTypes.number,
  }

  generateTwitterProfileUrl(screen_name) {
    return `https://twitter.com/${screen_name}`
  }

  render() {
    const tweetUser = this.props.tweet.user
    const twitterExtLinkClasses = 'external-link external-link-twitter'
    const classes = {
      userName: `user_name ${twitterExtLinkClasses}`,
      screenName: `screen_name ${twitterExtLinkClasses}`
    }

    return (
      <div className='tweet_header clearfix'>
        <div className='name_wrapper'>
          <a
            href={this.generateTwitterProfileUrl(tweetUser.screen_name)}
            className={classes.userName}
            target='_blank'
          >
            {tweetUser.name}
          </a>
          <a
            href={this.generateTwitterProfileUrl(tweetUser.screen_name)}
            className={classes.screenName}
            target='_blank'
          >
            {tweetUser.screen_name}
          </a>
        </div>
        <Time className='created_at' time={this.props.tweet.created_at} now={this.props.now} />
      </div>
    );
  }
}
