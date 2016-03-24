function unwrapComponent(component) {

  if (process.env.NODE_ENV !== 'production'
    && component.constructor.name === 'Connect'
    && !component.refs.wrappedInstance
  ) {
    console.trace('%c This Connect component does not have refs.wrappedInstance, make sure {withRef: true} was used when decorating the class definition', 'color: #ff0000;');
  }
  return component.refs.wrappedInstance
    ? unwrapComponent(component.refs.wrappedInstance)
    : component;
}

export default unwrapComponent;
