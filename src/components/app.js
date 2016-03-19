import React, { PropTypes } from 'react';
import AccountContainer     from '../containers/account-container';
import EditorContainer      from '../containers/editor-container';
import HeaderContainer      from '../containers/header-container';
import TimelineContainer    from '../containers/timeline-container';

export default class App extends React.Component {
  static propTypes = {
    accounts:           PropTypes.array.isRequired,
    initializeAccounts: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.initializeAccounts();
  }

  render() {
    return(
      <div className={`timeline_container ${process.platform}`}>
        <HeaderContainer />

        <AccountContainer />
        <EditorContainer />

        <div className='timelines'>
          {this.props.accounts.map((account) =>
            <TimelineContainer key={account.id_str} account={account} />
          )}
        </div>
      </div>
    );
  }
}
