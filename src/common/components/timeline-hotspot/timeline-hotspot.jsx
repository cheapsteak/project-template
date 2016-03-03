import React from 'react';
import { findDOMNode } from 'react-dom';
import animate from 'gsap-promise';
import _ from 'lodash';
import HoverCard from 'common/components/timeline-hover-card/timeline-hover-card.jsx';

const animationStates = {
  cardOut: { display: 'none', opacity: 0, x: '-50%', y: -220, height: '208px' },
  cardIn: { display: 'block', opacity: 1, y: -240 }
}

export default class TimelineHotspot extends React.Component {

  constructor(props) {
    super(props);

    this.timeOutIds = [];

    this.state = {
      hasUserInteraction: props.hasUserInteraction
    };
  }

  componentDidMount() {
    const card = findDOMNode(this.refs.card);
    const dot = this.refs.dot;
    
    animate.set(card, animationStates.cardOut);
  }
 
  componentWillReceiveProps(nextProps) {
    if(nextProps.withinCurrentTime) {
      this.timeOutIds.map(id => clearTimeout(id)).filter(Boolean);
      this.timeOutIds.push(setTimeout(this.animateCardIn, 300));
      this.timeOutIds.push(setTimeout(this.animateCardOut, 3000));
    } else if(!this.state.hasUserInteraction){
      this.animateCardOut();
      this.timeOutIds.push(setTimeout(this.animateCardOut, 300));
    }
  }

  handleClick = (e) => {
    this.props.onClick && this.props.onClick();
  };

  handleMouseEnter = (e) => {
    this.timeOutIds.map(id => clearTimeout(id)).filter(Boolean);
    this.setState({hasUserInteraction: true});
    this.animateCardIn();
  };

  handleMouseLeave = (e) => {
    this.timeOutIds.map(id => clearTimeout(id)).filter(Boolean);
    this.setState({hasUserInteraction: false});
    this.timeOutIds.push(setTimeout(this.animateCardOut, 300));
  };

  goToRoute = (e) => {
    this.props.onClick();
  };

  animateCardIn = () => {
    const card = findDOMNode(this.refs.card);
    const dot = this.refs.dot;

    return animate.to(card, 0.3, animationStates.cardIn);
  };

  animateCardOut = () => {
    const card = findDOMNode(this.refs.card);
    const dot = this.refs.dot;

    return animate.to(card, 0.3, animationStates.cardOut);
  };

  render() {
    const { style, image } = this.props; 
    return (
      <div className="timeline-hotspot" style={style}>
        <HoverCard
          ref="card"
          src={image}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.goToRoute}
        />
        <div
          ref="dot"
          className="dot"
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
        </div>
      </div>
    )
  }
}