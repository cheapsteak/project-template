import React from 'react';
import { findDOMNode } from 'react-dom';
import animate from 'gsap-promise';
import IconReturn from '../../../../assets/svgs/icon-play.svg';
import IconClose from '../../../../assets/svgs/icon-close.svg';
import IconFilter from '../../../../assets/svgs/icon-check.svg';
import { Link } from 'react-router';

const states = {
  ACTIVE: 'active',
  IDLE: ''
};

export default class GridMenu extends React.Component {

  state = {
    isFilterActive: false,
    isReturnActive: false,
    isCloseActive: false
  };

  static contextTypes = {
    eventBus: React.PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFilterEnabled !== this.isFiltered && !this.state.data.instructionalVideoUrl) {
      nextProps.isFilterEnabled ? this.applyFilter() : this.removeFilter();
    }

    this.isFilterEnabled = nextProps.isFilterEnabled && !this.state.data.instructionalVideoUrl;
  }

  componentDidMount() {
    this.containerEl = findDOMNode(this);
  }

  handleFilterClick = () => {
    const isFilterActive = !this.state.isFilterActive;
    this.setState({isFilterActive});
    this.context.eventBus.emit('clickFilter', this);
  };

  handleCloseClick = () => {
    console.log('clickClose');
    const isCloseActive = !this.state.isCloseActive;
    this.setState({isCloseActive});
    this.context.eventBus.emit('clickClose', this);
  };

  handleReturnClick = () => {
    console.log('clickReturn');
    const isReturnActive = !this.state.isReturnActive;
    this.setState({isReturnActive});
    this.context.eventBus.emit('clickReturn', this);
  };

  render() {
    const filterState = this.state.isFilterActive ? states.ACTIVE : states.IDLE;
    const returnState = this.state.isReturnActive ? states.ACTIVE : states.IDLE;
    const closeState = this.state.isCloseActive ? states.ACTIVE : states.IDLE;

    return (
      <div className={`grid-menu`}>

        <div
          ref="returnTab"
          className={`return tab ${returnState}`}
          onClick={this.handleReturnClick}
        >
          <div className={`icon return`} dangerouslySetInnerHTML={{ __html: IconReturn }}></div>
          <p>Return to Documentary</p>
        </div>

        <div
          ref="filterTab"
          className={`filter tab ${filterState}`}
          onClick={this.handleFilterClick}
        >
          <div className={`icon filter`} dangerouslySetInnerHTML={{ __html: IconFilter }}></div>
          <p>See Instructional Videos</p>
        </div>

        <div
          ref="closeTab"
          className={`close tab ${closeState}`}
          onClick={this.handleCloseClick}
        >
          <div className={`icon close`} dangerouslySetInnerHTML={{ __html: IconClose }}></div>
          <p>Close</p>
        </div>

      </div>
    );
  }

}
