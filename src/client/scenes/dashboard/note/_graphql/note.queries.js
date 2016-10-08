import gql from 'graphql-tag'

export const FETCH_NOTES = gql`
  query getNotes{
    viewer{
      notes(first:10){
        count
        edges{
          node{
            id
            name
            date
            owner {
              id
              username
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
