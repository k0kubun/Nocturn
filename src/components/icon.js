import React, { PropTypes } from 'react';

export default class Icon extends React.Component {
  static propTypes = {
    activeUser:           PropTypes.object,
    onTwitterIconClicked: PropTypes.func.isRequired,
  }

  render() {
    return(
      <div className='account_wrapper'>
        <img
          className='twitter_icon'
          src={this.props.activeUser ? this.props.activeUser.profile_image_url : ''}
          onClick={this.props.onTwitterIconClicked}
        />
      </div>
    );
  }
}
