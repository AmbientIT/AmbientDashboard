import gql from 'graphql-tag'

export const FETCH_NOTES_BY_NAME = gql`
  query getNotesByName($cursor:String, $name:String) {
    viewer{
      notes(first:3 after:$cursor name: $name){
        count
        edges{
          cursor
          node{
            id
            name
            date
            amount
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
            amount
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

export const FETCH_NOTE = gql`
  query getNote($id: ID!){
    note(id: $id){
      id
      name
      date
      amount
      description
      attachements(first: 10){
        count
        edges{
          cursor
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
  mutation addNote($name: String!, $description: String!, $amount: Float!, $date: Date!, $owner: ID!){
    addNote(input:{name: $name, date: $date, amount: $amount, description: $description, owner: $owner, clientMutationId: "1"}){
      changedNoteEdge{
        cursor
        node{
          id
          name
          date
          amount
          description
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

export const UPDATE_NOTE = gql`
  mutation updateNote($name: String!, $date: Date!, $amount: Float!, $description:String!, $id: ID!){
    updateNote(input:{id: $id, name: $name, date: $date, amount: $amount, description: $description, clientMutationId: "2"}){
      changedNote{
        id
        name
        date
        amount
        description
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

export const DELETE_NOTE = gql`
  mutation deleteNote($id: ID!){
    deleteNote(input: {id: $id, clientMutationId: "3"}){
      ok
    }
  }
`
