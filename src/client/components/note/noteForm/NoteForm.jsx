import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import { TextField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import radium from 'radium'
import style from './noteForm.style'
import { CurrencyField, MyDatePicker } from '../../index'

@reduxForm({
  form: 'note',
})
@radium()
export class NoteForm extends Component {
  constructor(props, context) {
    super(props, context)
    this.currencyConfig = {
      precision: 2,
      separator: ',',
      delimiter: '.',
    }
    switch (this.context.locale) {
      case 'en_us':
        this.currencyConfig.unit = '$'
        break
      default:
        this.currencyConfig.unit = '€'
        break
    }
  }

  render() {
    const { handleSubmit, locale } = this.props
    return (
      <Paper zDepth={3}>
        <form
          style={style.form}
          onSubmit={handleSubmit}
        >
          <div style={style.inputContainer}>
            <Field
              name="name"
              component={TextField}
              hintText="Nommer la note de frais"
              floatingLabelText="Titre"
              style={style.input}
            />
          </div>
          <div style={style.inputContainer}>
            <Field
              name="description"
              component={TextField}
              hintText="Decrire la note de frais"
              floatingLabelText="Description"
              style={style.input}
            />
          </div>
          <div style={style.inputContainer}>
            <Field
              name="date"
              component={MyDatePicker}
              floatingLabelText="Date"
              hintText="Dater cette note de frais"
              locale={locale}
              DateTimeFormat={Intl.DateTimeFormat}
              okLabel="OK"
              cancelLabel="Annuler"
              textFieldStyle={style.input}
            />
          </div>
          <div style={style.inputContainer}>
            <Field
              name="amount"
              component={CurrencyField}
              style={style.input}
              mask={this.currencyConfig}
              hintText="Le montant de la note de frais"
              floatingLabelText="Montant"
            />
          </div>
          <div style={style.inputContainer}>
            <RaisedButton
              type="submit"
              label="Submit"
              style={style.input}
            />
          </div>
        </form>
      </Paper>
    )
  }
}

NoteForm.propTypes = {
  handleSubmit: PropTypes.func,
  locale: PropTypes.string,
}

NoteForm.defaultProps = {
  initialValues: {},
  submitForm: () => {},
}
