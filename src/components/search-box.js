import React from 'react';

export default class SearchBox extends React.Component {
  render() {
    return(
      <div className="tweets_header search_box">
        <input className="search_field" type="text" placeholder="Twitter Search" />
      </div>
    );
  }
}
