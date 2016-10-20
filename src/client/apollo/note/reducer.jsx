import React from 'react'
import { getCurrencyByLocale } from '../../lib/currency'
import { NoteActionColumn } from '../../components'

export const fetchNotesReducer = ({ ownProps: { handleRemove, intl: { locale } }, data }) => {
  const headers = [
    {
      label: 'name',
      key: 'name',
      format: {},
      sortable: true,
    },
    {
      label: 'date',
      key: 'date',
      format: {
        type: 'date',
      },
      sortable: true,
    },
    {
      label: 'owner',
      key: 'owner',
      format: {
        type: 'user',
      },
      sortable: true,
    },
    {
      label: 'amount',
      key: 'amount',
      format: {
        currency: getCurrencyByLocale(locale),
        type: 'currency',
      },
      sortable: true,
    },
    {
      label: '',
      sortable: false,
      format: {},
      key: 'action',
    },
  ]
  const returnLoading = () => ({ loading: data.loading, headers })
  const returnData = () => {
    const { viewer: { notes: { edges, count } }, refetch, fetchMore, loading } = data
    return {
      data: edges.map(({ node, cursor }) => ({ ...node, cursor, action: <NoteActionColumn note={node} handleRemove={handleRemove} /> })),
      refetchNotes: refetch,
      fetchMoreNotes: fetchMore,
      isLoading: loading,
      count,
      headers,
    }
  }
  return data.loading ? returnLoading() : returnData()
}
