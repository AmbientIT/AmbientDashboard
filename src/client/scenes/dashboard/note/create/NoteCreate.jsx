import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import NoteForm from '../_components/NoteForm'
import { CREATE_NOTE } from '../_graphql'

@connect((state) => {
  return {
    loggedUser: state.login.loggedUser,
  }
})
@graphql(CREATE_NOTE, {
  props: ({ mutate, ownProps }) => ({
    submitForm: async note => {
      try {
        note.owner = ownProps.loggedUser.id

        const { data: { addNote } } = await mutate({
          variables: note,
          updateQueries: {
            getNotes: (prev, { mutationResult }) => {
              if (prev.viewer) {
                prev.viewer.notes.edges = [...prev.viewer.notes.edges, mutationResult.data.addNote.changedNoteEdge]
              }
              return prev
            },
          },
        })

        const { changedNoteEdge: { node } } = addNote

        ownProps.history.push(`/note/edit/${node.id}`)
      } catch (err) {
        console.error('error createNote', err)
      }
    },
  }),
})
export default class NoteCreate extends NoteForm {}
