import React from 'react'
import { Link } from 'react-router'
import { FormattedNumber, FormattedDate } from 'react-intl'
// import Toggle from 'material-ui/Toggle'

export const formatTableCell = (cell, format, row) => {
  switch (format && format.type) {
    case 'link':
      return <Link to={`${format.url}${row.id}`}>{cell}</Link>
    case 'percentage':
      return `${cell}%`
    case 'currency':
      return <FormattedNumber value={cell} style="currency" currency={format.currency} />
    case 'date':
      return <FormattedDate value={cell} />
    case 'bool':
      return cell ? 'V' : 'X'
    case 'user':
      return cell.firstName
    default:
      return cell
  }
}
