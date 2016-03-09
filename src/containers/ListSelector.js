import React from 'react';
import { connect } from 'react-redux';

class ListSelector extends React.Component {
  isActive() {
    return this.props.selectedTabByUserId[this.props.account.id] === 'lists';
  }

  render() {
    return(
      <div className={`tweets_header list_selector ${this.isActive() ? 'active' : ''}`}>
        <select className='list_field'>
          <option className='list_default' value='0'>Select List...</option>
        </select>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedTabByUserId: state.selectedTabByUserId,
  };
}

export default connect(mapStateToProps, {})(ListSelector);
