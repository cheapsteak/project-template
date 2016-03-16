import React from 'react';
import { findDOMNode } from 'react-dom';
import animate from 'gsap-promise';
import IconReturn from 'svgs/icon-play.svg';
import IconClose from 'svgs/icon-close.svg';
import IconFilter from 'svgs/icon-check.svg';
import { Link } from 'react-router';

const states = {
  IDLE: '',
  ACTIVE: 'active',
  DEACTIVATED: 'deactivated'
};

export default class GridMenu extends React.Component {

  state = {
    filterTabState: states.IDLE,
    returnTabState: states.IDLE,
    closeTabState: states.IDLE
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
    animate.set(this.containerEl, {y: '-130%'});
  }

  animateIn = (duration, delay) => {
    delay = delay || 0;
    const ctaItems = [this.refs.returnIcon, this.refs.returnText, this.refs.filterIcon, this.refs.filterText, this.refs.closeIcon, this.refs.closeText];

    animate.set(ctaItems, {y: 20, autoAlpha: 0});
    animate.to(this.containerEl, duration || 0.5, {y: '0%', ease: Expo.easeOut, delay: delay});
    animate.staggerTo(ctaItems, 0.05, {y: 0, autoAlpha: 0.8, delay: delay + 0.2, ease: Expo.easeOut}, 0.1)
      .then(() => animate.set(ctaItems, {clearProps: 'all'}));
  };

  handleFilterClick = () => {
    var filterTabState;

    if (this.state.filterTabState === states.IDLE || this.state.filterTabState === states.DEACTIVATED) {
      filterTabState = states.ACTIVE
    } else if (this.state.filterTabState === states.ACTIVE) {
      filterTabState = states.DEACTIVATED;
    }
    this.setState({filterTabState});
    this.context.eventBus.emit('clickFilter', this);
  };

  handleFilterMouseLeave = () => {
    if (this.state.filterTabState === states.DEACTIVATED) {
      this.setState({filterTabState: states.IDLE});
    }
  };

  handleCloseClick = () => {
    if (this.state.closeTabState === states.ACTIVE) {
      return;
    }

    this.setState({closeTabState: states.ACTIVE});
  };

  handleReturnClick = () => {
    if (this.state.returnTabState === states.ACTIVE) {
      return;
    }

    this.setState({returnTabState: states.ACTIVE});
  };

  render() {
    const filterState = this.state.filterTabState;
    const returnState = this.state.returnTabState;
    const closeState = this.state.closeTabState;

    return (
      <div className={`grid-menu`}>

        <Link
          ref="returnTab"
          className={`return tab ${returnState}`}
          onClick={this.handleReturnClick}
          to={`tests/narrative-video-player`}
        >
          <div
            ref="returnIcon"
            className={`icon return`}
            dangerouslySetInnerHTML={{ __html: IconReturn }}
          ></div>
          <p ref="returnText">Return to Documentary</p>
        </Link>

        <div
          ref="filterTab"
          className={`filter tab ${filterState}`}
          onClick={this.handleFilterClick}
          onMouseLeave={this.handleFilterMouseLeave}
        >
          <div
            ref="filterIcon"
            className={`icon filter`}
            dangerouslySetInnerHTML={{ __html: IconFilter }}
          ></div>
          <p ref="filterText">See Instructional Videos</p>
        </div>

        <Link
          ref="closeTab"
          className={`close tab ${closeState}`}
          onClick={this.handleCloseClick}
          to={`/tests`}
        >
          <div
            ref="closeIcon"
            className={`icon close`}
            dangerouslySetInnerHTML={{ __html: IconClose }}
          ></div>
          <p ref="closeText">Close</p>
        </Link>

      </div>
    );
  }

}
