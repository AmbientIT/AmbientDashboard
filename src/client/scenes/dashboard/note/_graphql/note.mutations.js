import gql from 'graphql-tag'

export const CREATE_NOTE = gql`
  mutation addNote($name: String!, $date: Date!, $owner: ID!){
    addNote(input:{name: $name, date: $date, owner: $owner, clientMutationId: "1"}){
      changedNoteEdge{
        cursor
        node{
          id
          name
          date
          owner{
            id
            firstName
            lastName
            email
            avatar
          }
          attachements{
            count
          }
        }
      }
    }
  }
`
export const createNoteMutation = ({ mutate, ownProps }) => async note => {
  try {
    const { data: { addNote } } = await mutate({
      variables: Object.assign(note, {
        owner: ownProps.loggedUser.id,
      }),
      updateQueries: {
        getNotes: (prev, { mutationResult: { data: { addNote: { changedNoteEdge } } } }) => {
          const { notes } = prev.viewer
          notes.edges = [...notes.edges, changedNoteEdge]
          return prev
        },
      },
    })
    const { changedNoteEdge: { node } } = addNote

    ownProps.history.push(`/note/edit/${node.id}`)
  } catch (err) {
    console.error('error createNote', err)
  }
}

export const UPDATE_NOTE = gql`
  mutation updateNote($name: String!, $date: Date!, $id: ID!){
    updateNote(input:{id: $id, name: $name, date: $date, clientMutationId: "2"}){
      changedNote{
        id
        name
        date
        owner{
          id
          firstName
          lastName
          email
          avatar
        }
        attachements{
          count
        }
      }
    }
  }
`

export const updateNoteMutation = ({ mutate, ownProps }) => async note => {
  try {
    await mutate({
      variables: Object.assign(note, ownProps.params),
      updateQueries: {
        getNotes: (prev, { mutationResult: { data: { updateNote: { changedNote } } } }) => {
          if (prev.viewer) {
            const { notes } = prev.viewer
            notes.edges = notes.edges.map(({ node, cursor }) => {
              return node.id === changedNote.id
                ? { node: changedNote, cursor }
                : { node, cursor }
            })
          }
          return prev
        },
      },
    })
    ownProps.history.push('/note')
  } catch (err) {
    console.error('update note error', err)
  }
}

export const DELETE_NOTE = gql`
  mutation deleteNote($id: ID!){
    deleteNote(input: {id: $id, clientMutationId: "3"}){
      ok
    }
  }
`

export const deleteNoteMutation = ({ mutate }) => async id => {
  try {
    await mutate({
      variables: { id },
      updateQueries: {
        getNotes: (prev, { mutationResult }) => {
          if (mutationResult.data.deleteNote.ok) {
            const { notes } = prev.viewer
            notes.count -= notes.count
            notes.edges = notes.edges.filter(({ node }) => node.id !== id)
          }
          return prev
        },
      },
    })
  } catch (err) {
    console.error('remove error', err)
  }
}
