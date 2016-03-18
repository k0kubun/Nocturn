import React, { PropTypes } from 'react';
import Autolinker           from 'autolinker';
import FavoriteContainer    from '../containers/favorite-container';
import ReplyContainer       from '../containers/reply-container';
import Time                 from '../components/time';

export default class Retweet extends React.Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    active:  PropTypes.bool.isRequired,
    tab:     PropTypes.string.isRequired,
    tweet:   PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  resizedProfileImage() {
    let baseUrl = this.props.tweet.retweeted_status.user.profile_image_url;
    return baseUrl.replace(/_normal\./, '_400x400.');
  }

  rawTweetBody() {
    return {
      __html: Autolinker.link(
        this.props.tweet.retweeted_status.text.replace(/\n/g, '<br>'),
        { className: 'external-link' },
      ),
    };
  }

  render() {
    return(
      <li className={`tweet retweet ${this.props.active ? 'active' : ''}`} onClick={this.props.onClick}>
        <div className='box_wrapper'>
          <div className='left_box'>
            <img className='retweeted_user_icon' src={this.resizedProfileImage()} />
            <img className='retweet_user_icon' src={this.props.tweet.user.profile_image_url} />
            <i className='retweet_icon fa fa-retweet' />
          </div>
          <div className='right_box'>
            <div className='tweet_header clearfix'>
              <span className='user_name'>{this.props.tweet.retweeted_status.user.name}</span>
              <span className='screen_name'>{this.props.tweet.retweeted_status.user.screen_name}</span>
              <Time className='created_at' time={this.props.tweet.retweeted_status.created_at} />
            </div>
            <div className='tweet_body' dangerouslySetInnerHTML={this.rawTweetBody()} />
            <div className='retweeted_by_wrapper'>
              <span className='retweeted_by'>Retweeted by</span>
              <span className='retweeted_user'>{this.props.tweet.user.name}</span>
            </div>
          </div>
          <div className='right_widget'>
            <ReplyContainer tweet={this.props.tweet.retweeted_status} account={this.props.account} />
            <FavoriteContainer tweet={this.props.tweet.retweeted_status} account={this.props.account} tab={this.props.tab} />
          </div>
        </div>
      </li>
    );
  }
}
