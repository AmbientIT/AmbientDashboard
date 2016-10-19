import { Component, createElement } from 'react'

/**
 * Creates a component class that renders the given Material UI component
 *
 * @param MaterialUIComponent The material ui component to render
 * @param mapProps A mapping of props provided by redux-form to the props the Material UI
 * component needs
 */
export const createComponent = (MaterialUIComponent, mapProps) => {
  class InputComponent extends Component {
    getRenderedComponent() {
      return this.refs.component //eslint-disable-line
    }

    render() {
      return createElement(MaterialUIComponent, {
        ...mapProps(this.props),
        ref: 'component',
      })
    }
  }
  InputComponent.displayName = `ReduxFormMaterialUI${MaterialUIComponent.name}`
  return InputComponent
}

export const mapError = ({ meta: { touched, error } = {}, input: { ...inputProps }, ...props }, errorProp = 'errorText') =>
  touched && error ? { ...props, ...inputProps, [errorProp]: error } : { ...inputProps, ...props }
