import React from 'react';
import {findDOMNode} from 'react-dom';
import animate from 'gsap-promise';
import IconBack from 'svgs/icon-zoom-arrow-left.svg';
import IconPlay from 'svgs/icon-playoutline.svg';
import IconClose from 'svgs/icon-close.svg';
import IconFilter from 'svgs/icon-check.svg';
import {Link} from 'react-router';
import scrollbarSize from 'common/utils/scrollbar-size';

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

  componentDidMount() {
    this.containerEl = findDOMNode(this);
    this.tabs = [this.refs.returnTab, this.refs.filterTab, this.refs.closeTab];

    animate.set(this.containerEl, {y: '-125%'});

    setTimeout(() => this.resize());
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  playRolloverSfx = () => {
    audio.play('button-rollover')
  };

  resize = () => {
    this.handleWindowResize();
  };

  handleWindowResize = () => {
    const scrollbarWidth = scrollbarSize.get();
    animate.set(this.containerEl, {width: window.innerWidth - scrollbarWidth});
  };

  animateIn = (duration = 0.5, delay = 0, ease = Expo.easeOut) => {
    const ctaItems = [this.refs.returnIcon, this.refs.returnText, this.refs.filterIcon, this.refs.filterText, this.refs.closeIcon, this.refs.closeText];
    const afterTabs = [this.refs.returnTabAfter, this.refs.filterTabAfter, this.refs.closeTabAfter];

    animate.set(ctaItems, {y: 20, autoAlpha: 0, transition: 'none'});
    animate.set(afterTabs, {y: '-100%'});

    return animate.all([
      animate.to(this.containerEl, duration, {y: '0%', ease: ease, delay: delay}),
      animate.to(afterTabs, 0.6, {y: '0%', ease: ease, delay: delay + 0.1}),
      animate.staggerTo(ctaItems, 0.8, {y: 0, autoAlpha: 0.8, delay: delay + 0.3, ease: ease}, 0.1)
        .then(() => animate.set(ctaItems, {clearProps: 'all'}))
    ])
  };

  handleFilterClick = () => {
    var filterTabState;

    audio.play('button-click');

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

    audio.play('button-click');
    this.setState({closeTabState: states.ACTIVE});
    this.context.router.goBack();
  };

  handleReturnClick = () => {
    if (this.state.returnTabState === states.ACTIVE) {
      return;
    }

    audio.play('button-click');
    this.setState({returnTabState: states.ACTIVE});
  };

  render() {
    const filterState = this.state.filterTabState;
    const returnState = this.state.returnTabState;
    const closeState = this.state.closeTabState;

    const isReturn = !!localStorage.getItem('narrative-video-time');

    return (
      <div className={`grid-menu ${this.props.className}`}>

        <Link
          ref="returnTab"
          className={`return tab ${returnState}`}
          onClick={this.handleReturnClick}
          onMouseEnter={this.playRolloverSfx}
          to={`narrative-video`}
        >
          <div
            ref="returnIcon"
            className={`icon return ${isReturn ? 'back' : 'play'}`}
            dangerouslySetInnerHTML={{ __html: isReturn ? IconBack : IconPlay }}
          ></div>
          <p ref="returnText">{isReturn ? 'Return to Documentary' : 'Watch Documentary'}</p>
          <div ref="returnTabAfter" className={`after`}></div>
        </Link>

        <div
          ref="filterTab"
          className={`filter tab ${filterState}`}
          onClick={this.handleFilterClick}
          onMouseEnter={this.playRolloverSfx}
          onMouseLeave={this.handleFilterMouseLeave}
        >
          <div
            ref="filterIcon"
            className={`icon filter`}
            dangerouslySetInnerHTML={{ __html: IconFilter }}
          ></div>
          <p ref="filterText">See Classes in Action</p>
          <div ref="filterTabAfter" className={`after`}></div>
        </div>

        <div
          ref="closeTab"
          className={`close tab ${closeState}`}
          onClick={this.handleCloseClick}
          onMouseEnter={this.playRolloverSfx}
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
