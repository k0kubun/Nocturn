import React, { PropTypes } from 'react';
import Autolinker           from 'autolinker';
import DeleteContainer      from '../containers/delete-container';
import FavoriteContainer    from '../containers/favorite-container';
import ReplyContainer       from '../containers/reply-container';
import TweetHeader          from '../components/tweet-header';
const {BrowserWindow} = require('electron').remote;
var ipcMain           = require("electron").remote.ipcMain;

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
    let tweet = this.props.tweet;

    if (tweet.retweeted_status && tweet.retweeted_status.entities.media) {
      tweet = tweet.retweeted_status;
    } else if (!tweet.entities.media) {
      return [];
    }

    const entities = Object.assign({}, tweet.entities, tweet.extended_entities);

    return entities.media.map((media) => {
      if (media.type === 'photo') {
        return (
          <a href="javascript:void(0);"  key={media.id_str} target='_blank'>
            <img id ="tweet_mediaid" className='tweet_media' onClick={() => {this.openImageInWindow(media)}} src={media.media_url} />
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
    var mediaUrl = med.media_url;
    image = document.getElementById('tweet_mediaid');
    image.onload = function () { loaded = true; };

    if (loaded) {
      clearInterval(wait);
    } else {
      let win = new BrowserWindow({titleBarStyle: 'hidden', x:(screen.width/2)-(450/2),y:(screen.height/2)-(450/2), resizable: false, width: 100, height: 100});
      win.loadURL('file://' + __dirname + '../..' + '/imagePopup.html');
      win.webContents.executeJavaScript(`
        var ipcRenderer = require('electron').ipcRenderer;
        var img = new Image();
        img = document.getElementById('loadedImage');
        img.onload = function() {
          var imageWidth = this.width,
          imageHeight = this.height,
          maxWidth = 800,
          maxHeight = 600;

          //Scale image proportionally if larger than maxWidth and maxHeight
          if (imageWidth > maxWidth){
            imageHeight = imageHeight * (maxWidth / imageWidth);
            imageWidth = maxWidth;
            if (imageHeight > maxHeight) {
              imageWidth = imageWidth * (maxHeight / imageHeight);
              imageHeight = maxHeight;
            }
          } else if (imageHeight > maxHeight) {
            imageWidth = imageWidth * (maxHeight / imageHeight);
            imageHeight = maxHeight;
            if (imageWidth > maxWidth) {
              imageHeight = imageHeight * (maxWidth / imageWidth);
              imageWidth = maxWidth;
            }
          }

          img.height = imageHeight;
          img.width = imageWidth;
          ipcRenderer.send('imageDimensions', Math.round(imageWidth), Math.round(imageHeight))
        }
      img.src = "${mediaUrl}";
      `);
      ipcMain.on('imageDimensions', function (event, width, height) {
        win.setSize(width,height+20,true);
        win.center();
      });
      win.on('closed', () => {
        win = null;
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
