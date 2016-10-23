import gql from 'graphql-tag'

export const GET_NOTES = gql`
  query getNotes($first:Int, $cursor:String, $orderBy:orderByNote, $name:String) {
    viewer{
      notes(first:$first after:$cursor orderBy:$orderBy name:$name){
        count
        edges{
          cursor
          node{
            id
            name
            description
            date
            amount
            ispay
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

export const GET_NOTE = gql`
  query getNote($id: ID!){
    note(id: $id){
      id
      name
      date
      amount
      description
      ispay
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

export const ADD_NOTE = gql`
  mutation addNote($name: String!, $description: String!, $amount: Float!, $date: Date!, $owner: ID!){
    addNote(input:{name: $name, date: $date, amount: $amount, description: $description, owner: $owner, clientMutationId: "1"}){
      changedNoteEdge{
        cursor
        node{
          id
          name
          date
          amount
          ispay
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
  mutation updateNote($name: String, $date: Date, $amount: Float, $description:String, $ispay: Boolean, $id: ID!){
    updateNote(input:{id: $id, name: $name, date: $date, amount: $amount, description: $description, ispay: $ispay, clientMutationId: "2"}){
      changedNote{
        id
        name
        date
        amount
        description
        ispay
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
