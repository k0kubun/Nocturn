import React, { PropTypes } from 'react';

export default class List extends React.Component {
  static propTypes = {
    account:       PropTypes.object.isRequired,
    active:        PropTypes.bool.isRequired,
    lists:         PropTypes.array.isRequired,
    onListChanged: PropTypes.func.isRequired,
  }

  render() {
    return(
      <div className={`tweets_header list_selector ${this.props.active ? 'active' : ''}`}>
        <select className='list_field' onChange={this.props.onListChanged}>
          <option value='0'>Select List...</option>
          {this.props.lists.map((list) =>
            <option key={list.id_str} value={list.id_str}>{list.full_name}</option>
          )}
        </select>
      </div>
    );
  }
}
