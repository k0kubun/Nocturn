import React from 'react';
import { connect } from 'react-redux';

class FavoriteButton extends React.Component {
  render() {
    return(
      <div className='favorite_widget_wrapper'>
        <i className='fa fa-star favorite_button' />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, {})(FavoriteButton);
