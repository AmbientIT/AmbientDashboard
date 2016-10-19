import React from 'react'
import { formatHeaders } from '../../lib/note'
import { NoteActionColumn } from '../../components'

export const fetchNotesReducer = ({ ownProps: { handleRemove }, data }) => {
  const returnLoading = () => ({ loading: data.loading })
  const returnData = () => {
    const { viewer: { notes: { edges, count } }, refetch, fetchMore } = data
    return {
      headers: formatHeaders(edges),
      data: edges.map(({ node, cursor }) => ({ ...node, cursor, action: <NoteActionColumn note={node} {...{ handleRemove }} /> })),
      refetchNotes: refetch,
      fetchMoreNotes: fetchMore,
      count,
    }
  }
  return data.loading ? returnLoading() : returnData()
}

export const fetchMoreNotesUpdateQuery = (previousResult, { fetchMoreResult }) => {
  return Object.assign(previousResult, {
    viewer: {
      notes: {
        count: previousResult.viewer.notes.count,
        edges: [...previousResult.viewer.notes.edges, ...fetchMoreResult.data.viewer.notes.edges],
      },
    },
  })
}

export const createNoteUpdateQuery = (prev, { mutationResult: { data: { addNote: { changedNoteEdge } } } }) => {
  const { notes } = prev.viewer
  if (notes.edges.length === notes.count) {
    notes.edges = [...notes.edges, changedNoteEdge]
    notes.count += notes.count
  }
  return prev
}

export const updateNoteUpdateQuery = (prev, { mutationResult: { data: { updateNote: { changedNote } } } }) => {
  if (prev.viewer) {
    const { notes } = prev.viewer
    notes.edges = notes.edges.map(({ node, cursor }) => {
      return node.id === changedNote.id
        ? { node: changedNote, cursor }
        : { node, cursor }
    })
  }
  return prev
}

export const getRremoveNoteUpdateQuery = id => (prev, { mutationResult }) => {
  if (mutationResult.data.deleteNote.ok) {
    const { notes } = prev.viewer
    notes.count -= notes.count
    notes.edges = notes.edges.filter(({ node }) => node.id !== id)
  }
  return prev
}
