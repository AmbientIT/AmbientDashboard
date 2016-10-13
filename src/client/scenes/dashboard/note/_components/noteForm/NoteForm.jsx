import React, { Component, PropTypes } from 'react'
import { Form } from 'formsy-react'
import { FormsyDate, FormsyText } from 'formsy-material-ui/lib'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import radium from 'radium'
import style from './noteForm.style'

const {
  shape,
  string,
  instanceOf,
  func,
} = PropTypes
@radium()
export class NoteForm extends Component {
  state = {
    canSubmit: false,
    DateTimeFormat: global.Intl.DateTimeFormat,
    files: [],
  }

  errorMessages = {
    wordsError: 'Please only use letters',
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
    console.log('tru lalalala :    ', global.Intl.DateTimeFormat)
    const { wordsError } = this.errorMessages
    const { note, submitForm } = this.props
    return (
      <Paper zDepth={3}>
        <Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={submitForm}
          onInvalidSubmit={this.notifyFormError}
          style={style.form}
        >
          <div style={style.input}>
            <FormsyText
              style={style.input}
              name="name"
              validations="isWords"
              validationError={wordsError}
              required
              value={note.name}
              hintText="Nommer la note de frais"
              floatingLabelText="Titre"
            />
          </div>
          <div>
            <FormsyDate
              style={style.input}
              name="date"
              required
              value={note.date}
              floatingLabelText="Date"
              locale=""
              DateTimeFormat={this.state.DateTimeFormat}
              okLabel="OK"
              cancelLabel="Annuler"
              locale="fr"
            />
          </div>
          <div>
            <RaisedButton
              style={style.submit}
              type="submit"
              label="Submit"
              disabled={!this.state.canSubmit}
            />
          </div>
        </Form>
      </Paper>
    )
  }
}

NoteForm.propTypes = {
  note: shape({
    name: string,
    date: instanceOf(Date),
  }),
  submitForm: func,
}

NoteForm.defaultProps = {
  note: {},
  submitForm: () => {},
}

// export const NoteForm = radium(NoteFormClass)

// todo remove this when radium server rendering issue is fixed
