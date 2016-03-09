import React from 'react';
import { connect } from 'react-redux';

class ListSelector extends React.Component {
  lists() {
    return this.props.listsByUserId[this.props.account.id] || [];
  }

  isActive() {
    return this.props.selectedTabByUserId[this.props.account.id] === 'lists';
  }

  render() {
    return(
      <div className={`tweets_header list_selector ${this.isActive() ? 'active' : ''}`}>
        <select className='list_field'>
          <option value='0'>Select List...</option>
          {this.lists().map((list) =>
            <option key={list.id} value={list.id}>{list.full_name}</option>
          )}
        </select>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listsByUserId: state.listsByUserId,
    selectedTabByUserId: state.selectedTabByUserId,
  };
}

export default connect(mapStateToProps, {})(ListSelector);
