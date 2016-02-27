import React from 'react';
import ListSelector from './list-selector'
import SearchBox from './search-box'

export default class Root extends React.Component {
  render() {
    return(
      <div className="timeline timeline_template">
        <ListSelector />
        <SearchBox />
      </div>
    );
  }
}
