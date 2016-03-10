import React       from 'react';
import Autolinker  from 'autolinker'
import ReplyButton from './ReplyButton'
import Time        from '../components/Time'
import Actions     from '../actions';
import { connect } from 'react-redux';
import FavoriteButton from './FavoriteButton'

class Tweet extends React.Component {
  onTweetClicked(event) {
    this.props.selectTweet(this.props.tweet, this.props.tab, this.props.account);
  }

  resizedProfileImage() {
    let baseUrl = this.props.tweet.user.profile_image_url;
    return baseUrl.replace(/_normal\./, '_400x400.');
  }

  rawTweetBody() {
    return {
      __html: Autolinker.link(
        this.props.tweet.text.replace(/\n/g, '<br>'),
        { className: 'external-link' },
      ),
    };
  }

  render() {
    return(
      <li className={`tweet ${this.props.active ? 'active' : ''}`} onClick={this.onTweetClicked.bind(this)}>
        <div className='box_wrapper'>
          <div className='left_box'>
            <img className='user_icon' src={this.resizedProfileImage()} />
          </div>
          <div className='right_box'>
            <div className='tweet_header clearfix'>
              <span className='user_name'>{this.props.tweet.user.name}</span>
              <span className='screen_name'>{this.props.tweet.user.screen_name}</span>
              <Time className='created_at' time={this.props.tweet.created_at} />
            </div>
            <div className='tweet_body' dangerouslySetInnerHTML={this.rawTweetBody()} />
          </div>
          <div className='right_widget'>
            <ReplyButton />
            <FavoriteButton />
          </div>
        </div>
      </li>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, Actions)(Tweet);
