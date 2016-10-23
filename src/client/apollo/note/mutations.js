import { amountToFloat } from '../../lib/currency'
import { addNoteUpdateQuery, updateNoteUpdateQuery, getDeleteNoteUpdateQuery } from './reducers/updateQueries'

export const addNoteMutation = ({ mutate, ownProps }) => async note => {
  const { data: { addNote: { changedNoteEdge: { node } } } } = await mutate({
    variables: Object.assign(note, {
      owner: ownProps.loggedUser.id,
      amount: amountToFloat(note.amount),
    }),
    updateQueries: {
      getNotes: addNoteUpdateQuery,
    },
  })
  return node
}

export const updateNoteMutation = ({ mutate, ownProps }) => async note => {
  // console.log(note, ownProps.params)
  // console.log(Object.assign(note, {
  //   ...ownProps.params,
  // }))
  delete note.action
  delete note.owner
  console.log(note)
  await mutate({
    variables: Object.assign(note, {
      ...ownProps.params,
    }),
    updateQueries: {
      getNotes: updateNoteUpdateQuery,
    },
  })
}

export const deleteNoteMutation = ({ mutate }) => async id => {
  try {
    await mutate({
      variables: { id },
      updateQueries: {
        getNotes: getDeleteNoteUpdateQuery(id),
      },
    })
  } catch (err) {
    console.error('remove error', err)
  }
}
