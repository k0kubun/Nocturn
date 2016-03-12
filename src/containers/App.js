import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import AccountSelector      from './AccountSelector';
import Authentication       from '../utils/Authentication'
import Editor               from './Editor';
import Header               from './Header';
import Timeline             from './Timeline';
import TwitterClient        from '../utils/TwitterClient'
import Actions              from '../actions';

class App extends React.Component {
  static propTypes = {
    accounts:        PropTypes.array.isRequired,
    addAccount:      PropTypes.func.isRequired,
    refreshUserInfo: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.initializeAccounts();
  }

  initializeAccounts() {
    let accounts = Authentication.allAccounts();
    for (let account of accounts) {
      this.props.addAccount(account);

      let client = new TwitterClient(account);
      client.verifyCredentials((user) => {
        this.props.refreshUserInfo(user);
      });
    }
  }

  render() {
    return(
      <div className={`timeline_container ${process.platform}`}>
        <Header />

        <AccountSelector />
        <Editor />

        <div className='timelines'>
          {this.props.accounts.map((account) =>
            <Timeline key={account.id} account={account} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
  }
}

export default connect(mapStateToProps, {
  ...Actions.accounts,
})(App);
