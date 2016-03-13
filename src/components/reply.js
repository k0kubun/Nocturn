import React, { PropTypes } from 'react';

export default class Reply extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  }

  render() {
    return(
      <div className='reply_widget_wrapper' onClick={this.props.onClick}>
        <i className='fa fa-reply reply_button' />
      </div>
    );
  }
}
