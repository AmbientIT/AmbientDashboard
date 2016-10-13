import React, { PropTypes, Component } from 'react'
import Dropzone from 'react-dropzone'
import Paper from 'material-ui/Paper'

import FilePreview from '../index'

export class MyDropzone extends Component {
  static propTypes = {
    onUpload: PropTypes.func,
    label: PropTypes.string,
  }

  static defaultProps = {
    note: {},
    onDrop: () => {},
  }

  state = { filesPreview: [] }

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
            <div>{this.props.label}</div>
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
