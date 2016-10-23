import React from 'react'
import { NoteActionColumn } from '../../../components'
import { GET_NOTE } from '../queries'

const getHandlePrefetch = client => id => {
  return client.query({
    query: GET_NOTE,
    variables: { id },
  })
}

export const getNotesReducer = ({ ownProps: { handleRemove, client }, data }) => {
  const returnLoading = () => ({ loading: data.loading })
  const returnData = () => {
    const { viewer: { notes: { edges, count } }, refetch, fetchMore, loading } = data
    return {
      data: edges.map(({ node, cursor }) => {
        console.log(cursor)
        return {
          ...node,
          cursor,
          action: <NoteActionColumn note={node} onNoteRemove={handleRemove} onNotePrefetch={getHandlePrefetch(client)} />,
        }
      }),
      refetchNotes: refetch,
      fetchMoreNotes: fetchMore,
      isLoading: loading,
      count,
    }
  }
  return data.loading ? returnLoading() : returnData()
}
