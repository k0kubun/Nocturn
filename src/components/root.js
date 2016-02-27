import React    from 'react';
import Editor   from './editor';
import Header   from './header';
import Timeline from './timeline';

export default class Root extends React.Component {
  render() {
    return(
      <div className='timeline_container'>
        <Header />

        <select id='account_selector' name='account_list'></select>
        <Editor />

        <div className='timelines'>
          <Timeline />
        </div>
      </div>
    );
  }
}
