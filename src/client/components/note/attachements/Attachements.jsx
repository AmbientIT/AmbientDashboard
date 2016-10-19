import React, { PropTypes } from 'react'
import { FilePreview } from '../../index'

export const Attachements = ({ attachements, onRemoveAttachement }) => {
  return (
    <section>
      {attachements.map(({ node }, index) => (
        <FilePreview
          file={node}
          key={index}
          removeFile={onRemoveAttachement}
        />
      ))}
    </section>
  )
}

Attachements.propTypes = {
  attachements: PropTypes.arrayOf(PropTypes.shape({
    node: PropTypes.object,
  })),
  onRemoveAttachement: PropTypes.func,
}

Attachements.defaultProps = {
  attachements: [],
  onRemoveAttachement: () => {},
}
