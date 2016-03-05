import React  from 'react';
import Editor from './Editor';
import Header from './Header';
import StreamingTimeline from '../containers/StreamingTimeline';

export default class App extends React.Component {
  componentDidMount() {
    this.props.onAppInit();
  }

  render() {
    return(
      <div className='timeline_container'>
        <Header />

        <select id='account_selector' name='account_list'></select>
        <Editor />

        <div className='timelines'>
          {this.props.accounts.map((account) =>
            <StreamingTimeline
              key={account.userId}
              account={account}
              tweets={this.props.tweetsByAccountId[account.userId] || []}
            />
          )}
        </div>
      </div>
    );
  }
}
