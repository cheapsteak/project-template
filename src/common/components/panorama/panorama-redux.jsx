import React from 'react';
import * as actionCreators from './panorama-actions.js';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Panorama from './panorama.jsx';

@connect(state => ({data: state.panorama}), null, null, {withRef: true})

class PanoramaRedux extends React.Component {
  constructor(props) {
    super(props);
    this.boundActionCreators = bindActionCreators(actionCreators, props.dispatch);
    this.boundActionCreators.setPanorama(props.slug);
  }

  render() {
    const {data, className} = this.props;

    return <Panorama
      ref="wrappedInstance"
      {...data}
      {...this.props}
      setPanorama={this.boundActionCreators.setPanorama}
    />
  }
}

export default PanoramaRedux;
