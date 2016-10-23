import React, { PropTypes } from 'react';
import Autolinker           from 'autolinker';
import DeleteContainer      from '../containers/delete-container';
import FavoriteContainer    from '../containers/favorite-container';
import ReplyContainer       from '../containers/reply-container';
import TweetHeader          from '../components/tweet-header';

export default class Tweet extends React.Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    active:  PropTypes.bool.isRequired,
    now:     PropTypes.number,
    tab:     PropTypes.string.isRequired,
    tweet:   PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    openMediaInWindow: PropTypes.func.isRequired,
  }

  largeProfileImage(user) {
    let baseUrl = user.profile_image_url;
    return baseUrl.replace(/_normal\./, '_400x400.');
  }

  autolinkedText(tweet) {
    let text = tweet.text;

    for (let entity of tweet.entities.urls) {
      text = text.replace(entity.url, entity.expanded_url);
    }
    for (let entity of (tweet.entities.media || [])) {
      text = text.replace(entity.url, entity.display_url);
    }

    return {
      __html: Autolinker.link(
        text.replace(/\n/g, '<br>'),
        { className: 'external-link' },
      ),
    };
  }

  tweetMedia() {
    let tweet = this.props.tweet;

    if (tweet.retweeted_status && tweet.retweeted_status.entities.media) {
      tweet = tweet.retweeted_status;
    } else if (!tweet.entities.media) {
      return [];
    }

    const entities = Object.assign({}, tweet.entities, tweet.extended_entities);

    return entities.media.map((media) => {
      if (media.type === 'photo' || media.type === 'video' || media.type === 'animated_gif') {
        return (
          <a href="javascript:void(0);"  key={media.id_str} target='_blank'>
            <img className='tweet_media' onClick={(event) => {this.props.openMediaInWindow(media)}} src={media.media_url} />
          </a>
        );
      } else {
        return '';
      }
    });
  }

  reactionButtonFor(tweet) {
    if (tweet.user.id_str === this.props.account.id_str) {
      return <DeleteContainer tweet={this.props.tweet} account={this.props.account} tab={this.props.tab} />;
    } else {
      return <ReplyContainer tweet={this.props.tweet} account={this.props.account} />;
    }
  }

  render() {
    const tweetMedia = this.tweetMedia();
    const multpleMediaClass = (tweetMedia.length > 1 ? 'multiple' : '');

    return(
      <li className={`tweet ${this.props.active ? 'active' : ''}`} onClick={this.props.onClick}>
        <div className='box_wrapper'>
          <div className='left_box'>
            <img className='user_icon' src={this.largeProfileImage(this.props.tweet.user)} />
          </div>
          <div className='right_box'>
            <TweetHeader tweet={this.props.tweet} now={this.props.now}/>
            <div className='tweet_body' dangerouslySetInnerHTML={this.autolinkedText(this.props.tweet)} />
            <div className={`tweet_entities ${multpleMediaClass}`}>
              {tweetMedia}
            </div>
          </div>
          <div className='right_widget'>
            {this.reactionButtonFor(this.props.tweet)}
            <FavoriteContainer tweet={this.props.tweet} account={this.props.account} tab={this.props.tab} />
          </div>
        </div>
      </li>
    );
  }
}
