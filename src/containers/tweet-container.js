import React, { PropTypes } from 'react';
import Actions              from '../actions';
import BaseContainer        from '../containers/base-container';
import Tweet                from '../components/tweet';
import Retweet              from '../components/retweet';
import { remote }           from 'electron';

export default class TweetContainer extends BaseContainer {
  shouldComponentUpdate(nextProps, nextState) {
    return (this.props.tweet.favorited != nextProps.tweet.favorited) ||
      ((this.props.activeTweetId === this.props.tweet.id_str) != (nextProps.activeTweetId === nextProps.tweet.id_str)) ||
      this.props.now != nextProps.now;
  }

  onClick(event) {
    this.store.dispatch(Actions.selectTweet(this.props.tweet, this.props.tab, this.props.account));
  }

  // FIXME: Some parts of this should be moved to a better place.
  openMediaInWindow(media) {
    const BrowserWindow = remote.BrowserWindow;
    const ipcMain = remote.ipcMain;

    let options = { resizable: false, width: 100, height: 100 };
    if (process.platform === 'darwin'){
      Object.assign(options, { titleBarStyle: 'hidden' });
    }
    let win = new BrowserWindow(options);
    win.loadURL(`file://${__dirname}../../media-popup.html`);
    win.webContents.on('did-finish-load', () => {
      let mediaUrl  = media.media_url;
      let mediaType = '';
      if (media.video_info != null) {
        mediaUrl  = media.video_info.variants[0].url;
        mediaType = media.video_info.variants[0].content_type;
      }
      win.webContents.send('load-media', mediaUrl, mediaType);
    });

    ipcMain.once('imageDimensions', (event, width, height) => {
      if (win != null) {
        const screenWidth  = Math.round((screen.width/2) - (width/2));
        const screenHeight = Math.round((screen.height/3) - (height/3));
        let options = { x: screenWidth, y: screenHeight, width: width, height: height+20 };
        win.setBounds(options, true);
      }
    });

    win.on('closed', () => {
      win = null;
    });
  }

  render() {
    if (this.props.tweet.retweeted_status) {
      return(
        <Retweet
          account={this.props.account}
          active={this.props.activeTweetId === this.props.tweet.id_str}
          tab={this.props.tab}
          tweet={this.props.tweet}
          onClick={this.onClick.bind(this)}
          openMediaInWindow={this.openMediaInWindow.bind(this)}
          now={this.props.now}
        />
      );
    } else {
      return(
        <Tweet
          account={this.props.account}
          active={this.props.activeTweetId === this.props.tweet.id_str}
          tab={this.props.tab}
          tweet={this.props.tweet}
          onClick={this.onClick.bind(this)}
          openMediaInWindow={this.openMediaInWindow.bind(this)}
          now={this.props.now}
        />
      );
    }
  }
}
