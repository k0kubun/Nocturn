import React from 'react';
import { connect } from 'react-redux';

class ReplyButton extends React.Component {
  render() {
    return(
      <div className='reply_widget_wrapper'>
        <i className='fa fa-reply reply_button' />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, {})(ReplyButton);
