import React, { Component, PropTypes } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { connectModal } from 'redux-modal'
import { Field, reduxForm } from 'redux-form'

const NewProjectModal = ({ show, handleHide, handleSubmit, pristine, reset, submitting }) =>
  <Modal show={show} >
    <Modal.Header>
      <Modal.Title>
        <h2>Dodaj projekt</h2>
      </Modal.Title>
    </Modal.Header>
    <form>
      <Modal.Body>
        <div>
          <label>Nazwa: </label>
          <div>
            <Field
              name="name"
              component="input"
              type="text"
              style={{width: '100%'}}/>
          </div>
        </div>
        <div>
          <label>Opis: </label>
          <div>
            <Field
              name="description"
              component="textarea"
              style={{width: '100%', height: 100}}/>
          </div>
        </div>
          <Field
            name="members"
            component="input"
            type="text"
            hidden
          />
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={pristine || submitting}
          onClick={() => {
            handleSubmit()
            handleHide()
          }}>
          Dodaj
        </Button>
        <Button onClick={handleHide} >Zamknij</Button>
      </Modal.Footer>
    </form>
  </Modal>

export default 
connectModal({ name: 'newProjectModal' })(
  reduxForm({ form: 'newProject' })(NewProjectModal)
)
