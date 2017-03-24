import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { registerUser } from '../../modules/User';
import {Row, Col, Alert} from 'react-bootstrap'

class UserRegister extends Component {
    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.state = {
            message: '',
        };
    }

    onFormSubmit(event) {
        event.preventDefault();

        const email = this.refs.email.value;
        const password = this.refs.password.value;
        this.props.registerUser({ email, password }).then((data) => {
            if (data.payload.errorCode) {
                this.setState({ message: data.payload.errorMessage })
              ;
            } else {
                browserHistory.push('/profile');
            }
        }
    );
    }

    render() {
        return (
            <Row className="content">
                <Col md={4} mdOffset={4}>
                    <form id="frmRegister" role="form" onSubmit={this.onFormSubmit}>
                        {this.state.message && <Alert bsStyle='warning'>{this.state.message}</Alert>}
                        <h2>Registration</h2>
                        <div className="form-group">
                            <label htmlFor="txtRegEmail">Email</label>
                            <input
                            type="email" className="form-control" ref="email" id="txtEmail" placeholder="Email"
                            name="email"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="txtRegPass">Password</label>
                            <input
                            type="password" className="form-control" ref="password" id="txtPass" placeholder="Password"
                            name="password"
                            />
                        </div>
                        <button type="submit" className="btn btn-default">Submit</button>
                    </form>
                </Col>
            </Row>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        registerUser,
    }, dispatch);
}

function mapStateToProps(state) {
    return { currentUser: state.currentUser };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegister);
