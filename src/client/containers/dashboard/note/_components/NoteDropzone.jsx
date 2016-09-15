import React, { PropTypes, Component } from 'react'
import Dropzone from 'react-dropzone'
import Paper from 'material-ui/Paper'

import FilePreview from 'components/FilePreview' //eslint-disable-line

export default class NoteDropzone extends Component {
  static propTypes = {
    onUpload: PropTypes.func,
  }

  static defaultProps = {
    note: {},
    onDrop: () => {},
  }

  constructor(props) {
    super(props)
    this.state = { filesPreview: [] }
  }

  onDrop = (files) => {
    this.setState({ filesPreview: files })
  }

  removePreviewHandler = (index) => {
    this.setState({
      files: this.state.filesPreview.splice(index, 1),
    })
  }

  render() {
    return (
      <Paper>
        <div className="row center-xs">
          <Dropzone onDrop={this.onDrop} className="note-drop-zone">
            <div>Déposez vos justificatifs associé à cette note.</div>
          </Dropzone>
        </div>
        <div className="filepreview-container">
          {this.state.filesPreview.map((file, index) => (
            <FilePreview
              file={file}
              key={index}
              removeFile={this.removePreviewHandler}
              uploadFile={this.props.onUpload}
            />
          ))}
        </div>
      </Paper>
    )
  }
}
