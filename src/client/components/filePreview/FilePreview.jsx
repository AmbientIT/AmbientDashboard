import React, { Component, PropTypes } from 'react'
import { Card, CardActions, CardMedia, CardTitle } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

export class FilePreview extends Component {
  render() {
    return (
      <Card className="filepreview">
        <CardMedia
          overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
        >
          <img src={this.props.file.url} alt={this.props.file.name} width="100px" />
        </CardMedia>
        <CardTitle className="filepreview-title" title={this.props.file.name} subtitle={this.props.file.type} />
        <CardActions>
          <FlatButton label="Upload" onTouchTap={() => this.props.uploadFile(this.props.file)} />
          <FlatButton label="Remove" onTouchTap={() => this.props.removeFile(this.props.file)} />
        </CardActions>
      </Card>
    )
  }
}

FilePreview.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.type,
    url: PropTypes.url,
  }),
  uploadFile: PropTypes.func,
  removeFile: PropTypes.func,
}

FilePreview.defaultProps = {
  uploadFile: () => {},
  removeFile: () => {},
}
