import React, { Component, PropTypes } from 'react'
import { graphql, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import ActionAndroid from 'material-ui/svg-icons/action/android'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import { FETCH_NOTES, FETCH_NOTE, DELETE_NOTE } from '../_graphql'

const { shape, arrayOf, string, number, func, bool, object } = PropTypes

@connect(
  ({ login: { loggedUser } }) => ({ loggedUser }),
)
@graphql(FETCH_NOTES)
@graphql(DELETE_NOTE, {
  props: ({ mutate }) => ({
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
  }),
})
class NoteList extends Component {
  static propTypes = {
    deleteNote: func,
    loggedUser: object,
    client: shape({
      query: func,
    }),
    data: shape({
      loading: bool,
      viewer: shape({
        notes: shape({
          edges: arrayOf(shape({
            id: string,
            name: string,
            attachements: shape({
              count: number,
            }),
          })),
        }),
      }),
    }),
  }


  static contextTypes = {
    router: shape({
      push: func,
    }),
  }

  goToDetailView = id => {
    this.context.router.push(`/note/edit/${id}`)
  }

  prefetch = id => {
    this.props.client.query({
      query: FETCH_NOTE,
      variables: { id },
    })
  }

  renderData() {
    const { data: { viewer: { notes: { edges } } } } = this.props
    return edges.map(({ node }, index) => (
      <TableRow key={index} selected={node.selected}>
        <TableRowColumn>{node.owner.email}</TableRowColumn>
        <TableRowColumn>{node.name}</TableRowColumn>
        <TableRowColumn>{new Intl.DateTimeFormat().format(new Date(node.date))}</TableRowColumn>
        <TableRowColumn>
          <FlatButton
            onTouchTap={() => this.goToDetailView(node.id)}
            onMouseOver={() => this.prefetch(node.id)}
            icon={<ActionAndroid />}
            style={{ margin: 12 }}
          />
        </TableRowColumn>
        <TableRowColumn>
          <FlatButton
            onTouchTap={() => this.props.deleteNote(node.id)}
            icon={<ActionAndroid />}
            style={{ margin: 12 }}
          />
        </TableRowColumn>
      </TableRow>
      ))
  }

  renderLoader() {
    return 'loading...'
  }

  render() {
    const { data } = this.props
    return (
      <Table
        height="500px"
        fixedHeader
        fixedFooter
        selectable
        multiSelectable
      >
        <TableHeader
          displaySelectAll
          adjustForCheckbox
          enableSelectAll
        >
          <TableRow>
            <TableHeaderColumn
              colSpan="6"
              style={{ textAlign: 'center' }}
            >
              Notes de frais
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn tooltip="Owner">Owner</TableHeaderColumn>
            <TableHeaderColumn tooltip="Name">Name</TableHeaderColumn>
            <TableHeaderColumn tooltip="Date">Date</TableHeaderColumn>
            <TableHeaderColumn tooltip="Editer">Edit</TableHeaderColumn>
            <TableHeaderColumn tooltip="Supprimer">Supprimer</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox
          deselectOnClickaway
          showRowHover
          stripedRows
        >
          {data.loading ? this.renderLoader() : this.renderData()}
        </TableBody>
      </Table>
    )
  }
}

export default withApollo(NoteList)
