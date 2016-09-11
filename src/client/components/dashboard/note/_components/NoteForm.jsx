import React, { Component, PropTypes } from 'react'
import Formsy from 'formsy-react'
import { FormsyDate, FormsyText } from 'formsy-material-ui/lib'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

export default class NoteForm extends Component {
  static propTypes = {
    note: PropTypes.object,
    submitForm: PropTypes.func,
  }

  static defaultProps = {
    note: {},
    submitForm: () => {},
  }

  constructor(props) {
    super(props)
    this.state = {
      canSubmit: false,
      DateTimeFormat: global.Intl.DateTimeFormat,
      files: [],
    }

    this.errorMessages = {
      wordsError: 'Please only use letters',
    }
  }

  enableButton = () => {
    this.setState({
      canSubmit: true,
    })
  }

  disableButton = () => {
    this.setState({
      canSubmit: false,
    })
  }

  notifyFormError = (data) => {
    console.error('Form error:', data)
  }

  render() {
    const { wordsError } = this.errorMessages
    const { note, submitForm } = this.props
    return (
      <Paper className="form-container" zDepth={3}>
        <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={submitForm}
          onInvalidSubmit={this.notifyFormError}
          className="noteForm "
        >
          <div className="row center-xs">
            <FormsyText
              name="name"
              validations="isWords"
              validationError={wordsError}
              required
              value={note.name}
              hintText="Nommer la note de frais"
              floatingLabelText="Titre"
            />
          </div>
          <div className="row center-xs">
            <FormsyDate
              name="date"
              required
              value={note.date}
              floatingLabelText="Date"
              DateTimeFormat={this.state.DateTimeFormat}
              okLabel="OK"
              cancelLabel="Annuler"
              locale="fr"
            />
          </div>
          <RaisedButton
            className="noteSubmit"
            type="submit"
            label="Submit"
            disabled={!this.state.canSubmit}
          />
        </Formsy.Form>
      </Paper>
    )
  }
}
