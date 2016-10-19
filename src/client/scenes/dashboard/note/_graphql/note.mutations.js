import { amountToFloat } from '../../../../lib/currency'
import { createNoteUpdateQuery, updateNoteUpdateQuery, getRemoveNoteUpdateQuery } from './index'

export const createNoteMutation = ({ mutate, ownProps }) => async note => {
  note.amount = amountToFloat(note.amount)
  console.log('mutate')
  try {
    const { data: { addNote } } = await mutate({
      variables: Object.assign(note, {
        owner: ownProps.loggedUser.id,
      }),
      updateQueries: {
        getNotes: createNoteUpdateQuery,
      },
    })
    const { changedNoteEdge: { node } } = addNote

    ownProps.history.push(`/note/edit/${node.id}`)
  } catch (err) {
    console.error('error createNote', err)
  }
}

export const updateNoteMutation = ({ mutate, ownProps }) => async note => {
  note.amount = amountToFloat(note.amount)
  try {
    await mutate({
      variables: Object.assign(note, ownProps.params),
      updateQueries: {
        getNotes: updateNoteUpdateQuery,
      },
    })
    ownProps.history.push('/note')
  } catch (err) {
    console.error('update note error', err)
  }
}

export const deleteNoteMutation = ({ mutate }) => async id => {
  try {
    await mutate({
      variables: { id },
      updateQueries: {
        getNotes: getRemoveNoteUpdateQuery(id),
      },
    })
  } catch (err) {
    console.error('remove error', err)
  }
}
