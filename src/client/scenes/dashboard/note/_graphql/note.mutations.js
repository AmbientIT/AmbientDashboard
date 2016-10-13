export const updateNoteMutation = ({ mutate, ownProps }) => ({
  submitForm: async note => {
    try {
      Object.assign(note, ownProps.params)

      await mutate({
        variables: note,
        updateQueries: {
          getNotes: (prev, { mutationResult: { data: { updateNote } } }) => {
            if (prev.viewer) {
              const { notes } = prev.viewer
              notes.edges = notes.edges.map(({ node }) => {
                return node.id === updateNote.changedNote.id
                  ? { node: updateNote.changedNote }
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
})

export const deleteNoteMutation = ({ mutate }) => ({
  deleteNote: async id => {
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
  },
})
