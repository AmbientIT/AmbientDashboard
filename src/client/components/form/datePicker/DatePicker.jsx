import DatePicker from 'material-ui/DatePicker'
import { createComponent, mapError } from '../_lib'

export const MyDatePicker = createComponent(
  DatePicker,
  ({
    input: {
      onBlur, // eslint-disable-line no-unused-vars
      onChange,
      value,
      ...inputProps
    },
    ...props
  }) => ({
    value: typeof value === 'object' ? value : new Date(value),
    ...inputProps,
    ...mapError(props),
    onChange: (event, val) => onChange(val),
  })
)
