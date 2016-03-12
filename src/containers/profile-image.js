import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';

class ProfileImage extends React.Component {
  static propTypes = {
    activeUser: PropTypes.object,
  }

  onTwitterIconClicked(event) {
    event.preventDefault();
    let document = event.target.ownerDocument;

    // Dirty hack to toggle select element
    let dropdown = document.getElementById('account_selector');
    let mouseEvent = document.createEvent('MouseEvents');
    mouseEvent.initMouseEvent('mousedown', true, true, window);
    dropdown.dispatchEvent(mouseEvent);
  }

  render() {
    return(
      <div className='account_wrapper'>
        <img
          className='twitter_icon'
          src={this.props.activeUser ? this.props.activeUser.profile_image_url : ''}
          onClick={this.onTwitterIconClicked.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let activeAccount = state.accounts[state.activeAccountIndex];
  return {
    activeUser: activeAccount && state.userByUserId[activeAccount.id],
  }
}

export default connect(mapStateToProps, {})(ProfileImage);
