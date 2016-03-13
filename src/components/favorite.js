import React, { PropTypes } from 'react';

export default class Favorite extends React.Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    tweet:   PropTypes.object.isRequired,
    tab:     PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  render() {
    return(
      <div className='favorite_widget_wrapper' onClick={this.props.onClick}>
        <i className={`fa fa-star favorite_button ${this.props.tweet.favorited ? 'active' : ''}`} />
      </div>
    );
  }
}
