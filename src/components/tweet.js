import React, { PropTypes } from 'react';
import Autolinker           from 'autolinker';
import DeleteContainer      from '../containers/delete-container';
import FavoriteContainer    from '../containers/favorite-container';
import ReplyContainer       from '../containers/reply-container';
import TweetHeader          from '../components/tweet-header';
const {BrowserWindow} = require('electron').remote;

export default class Tweet extends React.Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    active:  PropTypes.bool.isRequired,
    now:     PropTypes.number,
    tab:     PropTypes.string.isRequired,
    tweet:   PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
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
    if (!this.props.tweet.entities.media) return [];

    return this.props.tweet.entities.media.map((media) => {
      if (media.type === 'photo') {
        return (
          <a href="javascript:void(0);"  key={media.id_str} target='_blank'>
            <img id ="tweet_mediaid"className='tweet_media' onClick={() => {this.openImageInWindow(media)}} src={media.media_url} />
          </a>
        );
      } else {
        return '';
      }
    });
  }

  openImageInWindow (med) {
    let image = new Image();
    let loaded = false;
    let mediaUrl = med.media_url;
    let mediaWidth = 0;
    let mediaHeight = 0;
    image = document.getElementById('tweet_mediaid');
    image.onload = function () { loaded = true; };

    if (loaded) {
      clearInterval(wait);
    } else {
      mediaWidth = image.width * 3;
      mediaHeight = image.height * 3;
      let win = new BrowserWindow({resizable: false, title: "image" , width: mediaWidth, height: mediaHeight});
      win.loadURL(mediaUrl);
      win.on('closed', () => {
        win = null
      });
    }
  }

  reactionButtonFor(tweet) {
    if (tweet.user.id_str === this.props.account.id_str) {
      return <DeleteContainer tweet={this.props.tweet} account={this.props.account} tab={this.props.tab} />;
    } else {
      return <ReplyContainer tweet={this.props.tweet} account={this.props.account} />;
    }
  }

  render() {
    return(
      <li className={`tweet ${this.props.active ? 'active' : ''}`} onClick={this.props.onClick}>
        <div className='box_wrapper'>
          <div className='left_box'>
            <img className='user_icon' src={this.largeProfileImage(this.props.tweet.user)} />
          </div>
          <div className='right_box'>
            <TweetHeader tweet={this.props.tweet} now={this.props.now}/>
            <div className='tweet_body' dangerouslySetInnerHTML={this.autolinkedText(this.props.tweet)} />
            {this.tweetMedia()}
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
