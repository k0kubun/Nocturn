import React  from 'react';
import Editor from './Editor';
import Header from './Header';
import StreamingTimeline from '../containers/StreamingTimeline';

export default class App extends React.Component {
  render() {
    return(
      <div className='timeline_container'>
        <Header />

        <select id='account_selector' name='account_list'></select>
        <Editor />

        <div className='timelines'>
          <StreamingTimeline />
        </div>
      </div>
    );
  }
}
