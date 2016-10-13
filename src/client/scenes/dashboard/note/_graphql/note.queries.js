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

export const CREATE_NOTE = gql`
  mutation addNote($name: String!, $date: Date!, $owner: ID!){
    addNote(input:{name: $name, date: $date, owner: $owner, clientMutationId: "1"}){
      changedNoteEdge{
        node{
          id
          name
          date
          owner{
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
`

export const UPDATE_NOTE = gql`
  mutation updateNote($name: String!, $date: Date!, $id: ID!){
    updateNote(input:{id: $id, name: $name, date: $date, clientMutationId: "2"}){
      changedNote{
        id
        name
        date
        owner{
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
`

export const DELETE_NOTE = gql`
  mutation deleteNote($id: ID!){
    deleteNote(input: {id: $id, clientMutationId: "3"}){
      ok
    }
  }
`
