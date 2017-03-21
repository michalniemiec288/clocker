import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loginUser, fetchUser } from '../../modules/User'
import {Row, Col, Grid, Alert} from 'react-bootstrap'

class UserLogin extends Component {

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
        this.props.loginUser({ email, password }).then((data) => {
            if (data.payload.errorCode) {
                this.setState({ message: data.payload.errorMessage });
            } else {
                browserHistory.push('/');
            }
        }
    );
    }

    render() {
        return (
            <Grid className="content">
                <Col sm={6} smOffset={3}>
                    <form id="frmLogin" role="form" onSubmit={this.onFormSubmit}>
                    {this.state.message &&
                        <Alert bsStyle="warning">
                            {this.state.message}
                        </Alert>
                    }    <h2>Logowanie do serwisu</h2>
                        <div className="form-group">
                            <label htmlFor="txtEmail">Email</label>
                            <input
                            type="email" className="form-control" id="txtEmail" ref="email" placeholder="Wprowadź email"
                            name="email"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="txtPass">Hasło</label>
                            <input
                            type="password" className="form-control" id="txtPass" ref="password" placeholder="Wprowadź hasło"
                            name="password"
                            />
                        </div>
                        <button type="submit" className="btn btn-default">Login</button>
                        <Link style={{marginLeft: '30px'}} to="/reset">Zapomniałeś hasła?</Link>
                        <Link style={{marginLeft: '30px'}} to="/register">Zarejestruj się</Link>
                    </form>
                </Col>
            </Grid>

        );
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loginUser,
        fetchUser
    }, dispatch);
}

function mapStateToProps(state) {
    return { currentUser: state.currentUser };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
