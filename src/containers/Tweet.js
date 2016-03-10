import React       from 'react';
import Autolinker  from 'autolinker'
import Time        from '../components/Time'
import Actions     from '../actions';
import { connect } from 'react-redux';

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

  selectedTweetIdByTab() {
    return this.props.selectedTweetIdsByUserId[this.props.account.id] || {};
  }

  isActive() {
    return this.selectedTweetIdByTab()[this.props.tab] == this.props.tweet.id;
  }

  render() {
    return(
      <li className={`tweet ${this.isActive() ? 'active' : ''}`} onClick={this.onTweetClicked.bind(this)}>
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
            <div className='reply_widget_wrapper'>
              <i className='fa fa-reply reply_button' />
            </div>
            <div className='favorite_widget_wrapper'>
              <i className='fa fa-star favorite_button' />
            </div>
          </div>
        </div>
      </li>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedTweetIdsByUserId: state.selectedTweetIdsByUserId,
  }
}

export default connect(mapStateToProps, Actions)(Tweet);
