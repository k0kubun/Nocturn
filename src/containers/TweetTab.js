import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';

class TweetTab extends React.Component {
  static propTypes = {
    account:     PropTypes.object.isRequired,
    activate:    PropTypes.bool,
    children:    PropTypes.string,
    selectedTab: PropTypes.string.isRequired,
    tab:         PropTypes.string.isRequired,
  }

  isActive() {
    return this.props.selectedTab === this.props.tab;
  }

  onTabClicked() {
    this.props.selectTab(this.props.tab, this.props.account);
  }

  render() {
    return(
      <li
        className={this.isActive() ? 'tab active' : 'tab'}
        data-activate={this.props.activate || ''}
        onClick={this.onTabClicked.bind(this)}
      >
        {this.props.children}
      </li>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
}

export default connect(mapStateToProps, {})(TweetTab);
