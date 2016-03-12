import React, { PropTypes } from 'react';
import TwitterClient        from '../utils/twitter-client'

export default class Favorite extends React.Component {
  static propTypes = {
    account:  PropTypes.object.isRequired,
    tweet:    PropTypes.object.isRequired,
    tab:      PropTypes.string.isRequired,
    addTweet: PropTypes.func.isRequired,
  }

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
