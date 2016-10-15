import { connect } from 'react-redux';
import Icon        from '../components/icon';

const mapStateToProps = (state) => {
  let activeAccount = state.accounts[state.activeAccountIndex];
  return {
    activeUser: activeAccount && state.userByUserId[activeAccount.id_str],
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTwitterIconClicked: (event) => {
      event.preventDefault();
      let document = event.target.ownerDocument;

      // Dirty hack to toggle select element
      // FIXME: This doesn't work on Electron >= 1.4.0
      let dropdown = document.getElementById('account_selector');
      let mouseEvent = document.createEvent('MouseEvents');
      mouseEvent.initMouseEvent('mousedown', true, true, window);
      dropdown.dispatchEvent(mouseEvent);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Icon);
