import React from 'react';
import { connect } from 'react-redux';

class SearchBox extends React.Component {
  isActive() {
    return this.props.selectedTabByUserId[this.props.account.id] === 'search';
  }

  render() {
    return(
      <div className={`tweets_header search_box ${this.isActive() ? 'active' : ''}`}>
        <input className='search_field' type='text' placeholder='Twitter Search' />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedTabByUserId: state.selectedTabByUserId,
  };
}

export default connect(mapStateToProps, {})(SearchBox);
