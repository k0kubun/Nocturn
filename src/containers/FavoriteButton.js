import React from 'react';
import Actions     from '../actions';
import { connect } from 'react-redux';
import TwitterClient from '../utils/TwitterClient'

class FavoriteButton extends React.Component {
  onFavoriteClicked(event) {
    let client = new TwitterClient(this.props.account);
    client.favoriteStatus(this.props.tweet.id_str, (tweet) => {
      this.props.addTweet(tweet, this.props.account, this.props.tab);
    });
  }

  render() {
    return(
      <div className='favorite_widget_wrapper' onClick={this.onFavoriteClicked.bind(this)}>
        <i className={`fa fa-star favorite_button ${this.props.tweet.favorited ? 'active' : ''}`} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, Actions)(FavoriteButton);
