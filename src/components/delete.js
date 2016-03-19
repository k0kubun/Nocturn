import React, { PropTypes } from 'react';

export default class Delete extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  }

  render() {
    return(
      <div className='delete_button' onClick={this.props.onClick}>
        <i className='fa fa-trash' />
      </div>
    );
  }
}
