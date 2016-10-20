export const fetchMoreNotesUpdateQuery = (prev, { fetchMoreResult }) => {
  return Object.assign(prev, {
    viewer: {
      notes: {
        count: prev.viewer.notes.count,
        edges: [...prev.viewer.notes.edges, ...fetchMoreResult.data.viewer.notes.edges],
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

export const filterUpdateQuery = (prev, { fetchMoreResult }) => {
  return Object.assign(prev, {
    viewer: {
      notes: {
        count: fetchMoreResult.data.viewer.notes.edges.length,
        edges: fetchMoreResult.data.viewer.notes.edges,
      },
    },
  })
}
