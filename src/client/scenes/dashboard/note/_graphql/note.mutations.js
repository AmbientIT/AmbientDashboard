export const updateNoteMutation = ({ mutate, ownProps }) => ({
  submitForm: async note => {
    try {
      await mutate({
        variables: Object.assign(note, ownProps.params),
        updateQueries: {
          getNotes: (prev, { mutationResult: { data: { updateNote: { changedNote } } } }) => {
            if (prev.viewer) {
              const { notes } = prev.viewer
              notes.edges = notes.edges.map(({ node }) => {
                return node.id === changedNote.id
                  ? { node: changedNote }
                  : { node }
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
  },
})

export const createNoteMutation = ({ mutate, ownProps }) => ({
  createNote: async note => {
    try {
      const { data: { addNote } } = await mutate({
        variables: Object.assign(note, {
          owner: ownProps.loggedUser.id,
        }),
        updateQueries: {
          getNotes: (prev, { mutationResult: { data: { addNote: { changedNoteEdge } } } }) => {
            prev.viewer.notes.edges = [...prev.viewer.notes.edges, changedNoteEdge]
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
})


export const deleteNoteMutation = ({ mutate }) => async id => {
  try {
    await mutate({
      variables: { id },
      updateQueries: {
        getNotes: (prev, { mutationResult }) => {
          if (mutationResult.data.deleteNote.ok) {
            const { notes } = prev.viewer

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
