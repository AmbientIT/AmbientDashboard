import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import NoteForm from '../_components/NoteForm'
import { CREATE_NOTE } from '../_graphql'
import { createNote } from '../_utils/notes.actions'

const FormWithQuery = graphql(CREATE_NOTE, {
  props: ({ mutate, ownProps }) => ({
    submitForm: async note => {
      try {
        const {
          data: {
            addNote: {
              changedNoteEdge: {
                node,
              },
            },
          },
        } = await mutate({ variables: note })
        ownProps.history.push(`/note/edit/${node.id}`)
        ownProps.createNote(node)
      } catch (err) {
        console.error('error createNote', err)
      }
    },
  }),
})(NoteForm)

export default connect(
  () => ({}),
  (dispatch) => ({
    createNote(note) {
      dispatch(createNote(note))
    },
  })
)(FormWithQuery)
