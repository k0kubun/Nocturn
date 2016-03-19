import React, { PropTypes } from 'react';

export default class Header extends React.Component {
  static propTypes = {
    activeAccount:     PropTypes.object,
    activeListId:      PropTypes.string,
    activeSearchQuery: PropTypes.string,
    onHomeClicked:     PropTypes.func.isRequired,
    onRefreshClicked:  PropTypes.func.isRequired,
  }

  render() {
    return(
      <div className='header clearfix'>
        <div className='button_wrapper'>
          <div className='button home_button' onClick={this.props.onHomeClicked}>
            <i className='fa fa-home'></i>
          </div>
          Home
        </div>
        <div className='button_wrapper'>
          <div className='button refresh_button' onClick={this.props.onRefreshClicked}>
            <i className='fa fa-refresh'></i>
          </div>
          Refresh
        </div>
      </div>
    );
  }
}
