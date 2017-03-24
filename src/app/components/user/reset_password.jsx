import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetPasswordEmail } from '../../modules/User';
import {Row, Col, Alert} from 'react-bootstrap'

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();
        const email = this.refs.email.value;
        this.props.resetPasswordEmail(email).then((data) => {
            if (data.payload.errorCode) {
                this.setState({ message: data.payload.errorMessage });
            } else {
                this.setState({ message: 'Check your e-mail!' });
            }
        });
    }

    render() {
        return (
            <Row className="content">
                <Col sm={4} smOffset={4}>
                    <h2>Password reset</h2>
                    <form role="form" onSubmit={this.onFormSubmit}>
                        {this.state.message &&
                            <Alert bsStyle="danger">{this.state.message}</Alert>
                        }
                        <div className="form-group">
                            <label htmlFor="txtEmail">Type your email:</label>
                            <input
                            type="email" className="form-control" id="txtEmail" ref="email" placeholder="email"
                            name="email"
                        />
                        </div>
                        <button type="submit" className="btn btn-default btn-block">Reset</button>
                    </form>
                </Col>
            </Row>

        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        resetPasswordEmail,
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(ResetPassword);
