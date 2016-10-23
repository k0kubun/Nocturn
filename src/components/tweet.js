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
      if (media.type === 'photo' || media.type === 'video' || media.type === 'animated_gif') {
        return (
          <a href="javascript:void(0);"  key={media.id_str} target='_blank'>
            <img id ="tweet_mediaid" className='tweet_media' onClick={() => {this.openMediaInWindow(media)}} src={media.media_url} />
          </a>
        );
      } else {
        return '';
      }
    });
  }

  openMediaInWindow (med) {
    let image = new Image();
    let loaded = false;
    var mediaUrl = 0;
    var media = med.video_info;
    if (med.video_info != null) {
      mediaUrl = med.video_info.variants[0].url;
      var mediaType = med.video_info.variants[0].content_type;
    } else {
      mediaUrl = med.media_url;
    }
    image = document.getElementById('tweet_mediaid');
    image.onload = function () { loaded = true; };
    let options = {
      resizable: false, 
      width: 100, 
      height: 100
    }
    if (process.platform === 'darwin'){
      Object.assign(options, { titleBarStyle: 'hidden' });
    }
    let win = new BrowserWindow(options);
    win.loadURL('file://' + __dirname + '../..' + '/media-popup.html');
    if (loaded) {
      clearInterval(wait);
    } else {
      win.webContents.executeJavaScript(`
        var ipcRenderer = require('electron').ipcRenderer;
        var img = document.getElementById('loadedImage');
        var video = document.getElementById('loadedVideo');
        var mediaWidth = 0,
        mediaHeight = 0,
        maxWidth = 800,
        maxHeight = 600;

        function resizeMedia(media){
          if (media.path[0].id === img.id) {
            mediaWidth = this.width;
            mediaHeight = this.height;
          } else {
            mediaWidth = this.videoWidth;
            mediaHeight = this.videoHeight;
          }

          // Scale media proportionally if larger than maxWidth and maxHeight
          if (mediaWidth > maxWidth){
            mediaHeight = mediaHeight * (maxWidth / mediaWidth);
            mediaWidth = maxWidth;
            if (mediaHeight > maxHeight) {
              mediaWidth = mediaWidth * (maxHeight / mediaHeight);
              mediaHeight = maxHeight;
            }
          } else if (mediaHeight > maxHeight) {
            mediaWidth = mediaWidth * (maxHeight / mediaHeight);
            mediaHeight = maxHeight;
            if (mediaWidth > maxWidth) {
              mediaHeight = mediaHeight * (maxWidth / mediaWidth);
              mediaWidth = maxWidth;
            }
          }
          if (this.width > 0 ) {
            this.width = mediaWidth;
            this.height = mediaHeight;
          } else {
            this.videoWidth = mediaWidth;
            this.videoHeight = mediaHeight;
          }
          ipcRenderer.send('imageDimensions', Math.round(mediaWidth), Math.round(mediaHeight));
        }
        if ("${mediaType}" !== "video/mp4"){
          img.src = "${mediaUrl}";
          img.onload = resizeMedia.bind(img)
        } else {
          video.src = "${mediaUrl}";
          video.onloadedmetadata = resizeMedia.bind(video)
          video.preload = "auto";
          video.loop = true;
          video.autoplay = true;
          video.playbackRate = 1;
        }
      `);

      ipcMain.on('imageDimensions', (event, width, height) => {
        if (win != null) {
          var screenWidth = Math.round((screen.width/2)-(width/2))
          var screenHeight = Math.round((screen.height/3)-(height/3))
          let options = {
            x:screenWidth, 
            y:screenHeight,
            width:width,
            height:height,
          }
          if (process.platform === 'darwin'){
            Object.assign(options, { height: height+20 });
          }
        
          win.setBounds(options,true);
        }
      });
    }

    win.on('closed', () => {
      win = null;
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
