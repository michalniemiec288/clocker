import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from '../../utils/firebase';
import {Grid, Row, Col, Image} from 'react-bootstrap'

import { fetchUser, updateUser } from '../../modules/User'
import Loading from '../helpers/loading'
import ChangePassword from './change_password'

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.props.fetchUser();
    this.state = {
      message: ''
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(event) {
    event.preventDefault();
    const email = this.refs.email.value
    const displayName = this.refs.displayName.value
    const uid = this.refs.uid.value
    this.props.updateUser({ email, displayName, uid }).then((data) => {
      if (data.payload.errorCode) {
        this.setState({ message: data.payload.errorMessage })
      } else {
        this.setState({ message: 'Zmiany zostały zapisane!'})
      }
    })
  }

  render() {
    if (!this.props.currentUser) {
      return <Loading />
    }

    return (
      <Grid className="content">
        <Row>
          <h2>Ustawienia profilu</h2>
          <Col sm={6}>
            <form id="frmProfile" role="form" onSubmit={this.onFormSubmit}>
              <p>{this.state.message}</p>
              <br />
              <div className="form-group">
                <label htmlFor="email">Email: </label>
                <input
                type="text" defaultValue={this.props.currentUser.email}
                className="form-control" id="email" ref="email" placeholder="Email" name="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="displayName">Imię: </label>
                <input
                type="text" defaultValue={this.props.currentUser.displayName}
                className="form-control" ref="displayName" id="displayName" placeholder="Imię"
                name="displayName"
                />
              </div>
              <input
                type="hidden" defaultValue={this.props.currentUser.uid}
                className="form-control" ref="uid" id="uid"
                name="uid"
                />
              <button type="submit" className="btn btn-primary">Zapisz</button>
            </form>
          </Col>
          <Col sm={6}>
            <ChangePassword />
          </Col>
        </Row>
      </Grid>
    );
  }

}

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchUser, updateUser }, dispatch)
const mapStateToProps = ({User: {currentUser}}) => ({ currentUser })

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
