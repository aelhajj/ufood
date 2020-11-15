import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert } from '@material-ui/lab';

let _createToast;

class Toat extends React.Component {

  state = {
    open: false,
    message: '',
  };

  componentDidMount() {
    _createToast = this.displaySnack;
  }

  hideSnack = () => {
    this.setState({
      open: false,
      message: '',
    });
  };

  displaySnack = ({ message }) => {
    this.setState({ open: true, message });
  };

  render() {
    const message = (
      <span id="snackbar-message-id" dangerouslySetInnerHTML={{ __html: this.state.message }} />
    );

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.open}
        onClose={this.hideSnack}
        autoHideDuration={3000}
      >
        <Alert severity="success">
          {message}
        </Alert>
      </Snackbar>
    );
  }
}

export function createToast({ message }) {
  _createToast({ message });
}

export default Toat;
