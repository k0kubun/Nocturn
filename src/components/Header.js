import React from 'react';
import { shell } from 'electron';

export default class Header extends React.Component {
  onHomeClicked() {
    let url = `https://twitter.com/${this.props.activeUser.screen_name}`;
    shell.openExternal(url);
  }

  render() {
    return(
      <div className='header clearfix'>
        <div className='button_wrapper'>
          <div className='button home_button' onClick={this.onHomeClicked.bind(this)}>
            <i className='fa fa-home'></i>
          </div>
          Home
        </div>
        <div className='button_wrapper'>
          <div className='button refresh_button'>
            <i className='fa fa-refresh'></i>
          </div>
          Refresh
        </div>
      </div>
    );
  }
}
