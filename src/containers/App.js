import React  from 'react';
import Editor from '../components/Editor';
import Header from '../components/Header';
import Timeline from './Timeline';
import Authentication from '../utils/Authentication'
import { connect } from 'react-redux';
import { addAccount, activateAccount } from '../actions';

class App extends React.Component {
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
            <Timeline
              key={account.userId}
              account={account}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accounts:        state.accounts,
    activeAccountId: state.activeAccountId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAppInit: () => {
      let accounts = Authentication.allAccounts();
      for (let account of accounts) {
        dispatch(addAccount(account));
      }
      dispatch(activateAccount(accounts[0]));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
