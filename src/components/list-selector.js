import React from 'react';

export default class ListSelector extends React.Component {
  render() {
    return(
      <div className="tweets_header list_selector">
        <select className="list_field">
          <option className="list_default" value="0">Select List...</option>
        </select>
      </div>
    );
  }
}
