import React, { PropTypes } from 'react';
import FavoriteContainer    from '../containers/favorite-container';
import ReplyContainer       from '../containers/reply-container';
import Tweet                from '../components/tweet';
import TweetHeader          from '../components/tweet-header';

export default class Retweet extends Tweet {
  static propTypes = {
    account: PropTypes.object.isRequired,
    active:  PropTypes.bool.isRequired,
    now:     PropTypes.number,
    tab:     PropTypes.string.isRequired,
    tweet:   PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  render() {
    return(
      <li className={`tweet retweet ${this.props.active ? 'active' : ''}`} onClick={this.props.onClick}>
        <div className='box_wrapper'>
          <div className='left_box'>
            <img className='retweeted_user_icon' src={this.largeProfileImage(this.props.tweet.retweeted_status.user)} />
            <img className='retweet_user_icon' src={this.props.tweet.user.profile_image_url} />
            <i className='retweet_icon fa fa-retweet' />
          </div>
          <div className='right_box'>
            <TweetHeader tweet={this.props.tweet.retweeted_status} now={this.props.now} />
            <div className='tweet_body' dangerouslySetInnerHTML={this.autolinkedText(this.props.tweet.retweeted_status)} />
            {this.tweetMedia()}
            <div className='retweeted_by_wrapper'>
              <span className='retweeted_by'>Retweeted by</span>
              <span className='retweeted_user'>{this.props.tweet.user.name}</span>
            </div>
          </div>
          <div className='right_widget'>
            <ReplyContainer tweet={this.props.tweet.retweeted_status} account={this.props.account} />
            <FavoriteContainer tweet={this.props.tweet} account={this.props.account} tab={this.props.tab} />
          </div>
        </div>
      </li>
    );
  }
}
