import gql from 'graphql-tag'

export const FETCH_NOTES = gql`
  query getNotes($cursor:String) {
    viewer{
      notes(first:3 after:$cursor){
        count
        edges{
          cursor
          node{
            id
            name
            date
            owner {
              id
              firstName,
              lastName,
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
  }
`

export const updateAfterFetchMore = (previousResult, { fetchMoreResult }) => {
  return Object.assign(previousResult, {
    viewer: {
      notes: {
        count: previousResult.viewer.notes.count,
        edges: [...previousResult.viewer.notes.edges, ...fetchMoreResult.data.viewer.notes.edges],
      },
    },
  })
}

export const FETCH_NOTE = gql`
  query getNote($id: ID!){
    note(id: $id){
      id
      name
      date
      attachements(first: 10){
        count
        edges{
          node{
            id
            name
            url
            type
          }
        }
      }
    }
  }
`
