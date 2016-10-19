import VMasker from 'vanilla-masker'
import TextField from 'material-ui/TextField'
import { createComponent, mapError } from '../_lib'

const formatData = (value, mask) => typeof parseFloat(value) === 'number' ? VMasker.toMoney(value, mask) : value

export const CurrencyField = createComponent(
  TextField,
  ({
    mask,
    input: {
      value,
      onChange,
      ...inputProps
    },
    ...props
  }) => ({
    value: formatData(value, mask),
    ...inputProps,
    ...mapError(props),
    onChange: (event, val) => onChange(formatData(val, mask)),
  })
)
