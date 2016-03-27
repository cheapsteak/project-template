import React from 'react';
import {findDOMNode} from 'react-dom';
import animate from 'gsap-promise';
import IconReturn from 'svgs/icon-play.svg';
import IconClose from 'svgs/icon-close.svg';
import IconFilter from 'svgs/icon-check.svg';
import {Link} from 'react-router';

const states = {
  IDLE: 'idle',
  ACTIVE: 'active',
  DEACTIVATED: 'deactivated'
};

export default class GridMenu extends React.Component {

  static propTypes = {
    className: React.PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  state = {
    filterTabState: states.IDLE,
    returnTabState: states.IDLE,
    closeTabState: states.IDLE
  };

  static contextTypes = {
    eventBus: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {

  }

  componentDidMount() {
    this.containerEl = findDOMNode(this);
    this.tabs = [this.refs.returnTab, this.refs.filterTab, this.refs.closeTab];

    animate.set(this.containerEl, {y: '-125%'});

    this.tabs.forEach((tab) => {
      tab = findDOMNode(tab);
      tab.addEventListener('mouseenter', () => audio.play('button-rollover'));
      tab.addEventListener('click', () => audio.play('button-click'));
    });

    setTimeout(() => this.resize());
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.addEventListener('resize', this.handleWindowResize);
  }

  resize = () => {
    this.handleWindowResize();
  };

  handleWindowResize = () => {
    const parentContainer = this.containerEl.parentNode;
    const scrollbarWidth = parentContainer.offsetWidth - parentContainer.clientWidth;
    animate.set(this.containerEl, {width: parentContainer.clientWidth});
  };

  animateIn = (duration = 0.5, delay = 0, ease = Expo.easeOut) => {
    const ctaItems = [this.refs.returnIcon, this.refs.returnText, this.refs.filterIcon, this.refs.filterText, this.refs.closeIcon, this.refs.closeText];
    const afterTabs = [this.refs.returnTabAfter, this.refs.filterTabAfter, this.refs.closeTabAfter];

    animate.set(ctaItems, {y: 20, autoAlpha: 0});
    animate.set(afterTabs, {y: '-100%'});

    return animate.all([
      animate.to(this.containerEl, duration, {y: '0%', ease: ease, delay: delay}),
      animate.to(afterTabs, 0.6, {y: '0%', ease: ease, delay: delay + 0.1}),
      animate.staggerTo(ctaItems, 0.08, {y: 0, autoAlpha: 0.8, delay: delay + 0.2, ease: ease}, 0.12)
        .then(() => animate.set(ctaItems, {clearProps: 'all'}))
    ])
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
    this.context.router.goBack();
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
      <div className={`grid-menu ${this.props.className}`}>

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
          <div ref="returnTabAfter" className={`after`}></div>
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
          <div ref="filterTabAfter" className={`after`}></div>
        </div>

        <div
          ref="closeTab"
          className={`close tab ${closeState}`}
          onClick={this.handleCloseClick}
        >
          <div
            ref="closeIcon"
            className={`icon close`}
            dangerouslySetInnerHTML={{ __html: IconClose }}
          ></div>
          <p ref="closeText">Close</p>
          <div ref="closeTabAfter" className={`after`}></div>
        </div>

      </div>
    );
  }

}
