import { mediaQueries } from '../../../../../styles'

export default {
  form: {
    marginTop: 0,
    width: '100%',
  },
  submit: {
    width: '100%',
    [mediaQueries.md]: {
      width: '80%',
    },
  },
  input: {
    width: '100%',
    margin: 'auto',
    [mediaQueries.md]: {
      color: 'red',
      width: '80% !important',
    },
  },
}
