import React, { Component, PropTypes } from 'react'
import { Card, CardActions, CardMedia, CardTitle } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'


export default class FilePreview extends Component {
  static propTypes = {
    file: PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.type,
      url: PropTypes.url,
    }),
    uploadFile: PropTypes.func,
    removeFile: PropTypes.func,
  }

  static defaultProps = {
    uploadFile: () => {},
    removeFile: () => {},
  }

  render() {
    const { file } = this.props
    return (
      <Card className="filepreview">
        <CardMedia
          overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
        >
          <img src={file.url || file.preview} alt={file.name} width="100px" />
        </CardMedia>
        <CardTitle className="filepreview-title" title={file.name} subtitle={file.type} />
        <CardActions>
          <FlatButton label="Upload" onTouchTap={() => this.props.uploadFile(file)} />
          <FlatButton label="Remove" onTouchTap={() => this.props.removeFile(file)} />
        </CardActions>
      </Card>
    )
  }
}
