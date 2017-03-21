import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changePassword } from '../../modules/User';
import {Row, Col} from 'react-bootstrap'

class ChangePassword extends Component {
  constructor(props) {
      super(props);
      this.onFormSubmit = this.onFormSubmit.bind(this);
      this.state = {
        message: '',
    };
  }

  onFormSubmit(event) {
      event.preventDefault();
      let password = this.refs.password.value;
      let repeatPassword = this.refs.repeatPassword.value;
      if (password !== repeatPassword) {
        this.setState({
          message: 'Please password must match!',
      });
    } else {
        this.props.changePassword(password).then((data) => {
          if (data.payload.errorCode)
            this.setState({ message: data.payload.errorMessage });
          else
          this.setState({ message: 'Password was changed!' });
      });
    }
  }
    render() {
      return (
        <form id="ChangePassword" role="form" onSubmit={this.onFormSubmit}>
          <h4> Zmiana hasła </h4>
          <h5> {this.state.message} </h5>
          <div className="form-group">
            <label htmlFor="password"> Nowe hasło </label>
            <input type="password" className="form-control"
              name="password" ref="password" id="password" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="repeatPassword"> Powtórz hasło: </label>
            <input type="password" className="form-control"
              name="repeatPassword" ref="repeatPassword" id="repeatPassword" 
            />

          </div>
          <button type="submit" className="btn btn-primary">Zapisz</button>
        </form>
    );
  }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({ changePassword }, dispatch)
const mapStateToProps = (state) => ({ currentUser: state.currentUser })

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
