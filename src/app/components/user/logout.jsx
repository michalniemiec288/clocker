import React from 'react';
import {Row, Col} from 'react-bootstrap'

export default () => (
    <Row className="content">
        <Col sm={4} smOffset={4}>
            <form id="frmLogout" role="form">
                <h2>You are logged out!</h2>
            </form>
        </Col>
    </Row>
  );
