import React from 'react';
import { findDOMNode } from 'react-dom';
import PillButton from 'common/components/pill-button/pill-button';
import RectangularButton from 'common/components/rectangular-button/rectangular-button';
import gridIcon from 'svgs/icon-explore.svg';
import closeIcon from 'svgs/icon-close.svg';

export default class ButtonsTest extends React.Component {

  rectangularButtons = [
    {
      text: 'Yellow Button',
      color: "#ffffff",
      backgroundColor: "#9f7740",
      hoverBackgroundColor: "#8d652f",
      svg: gridIcon
    },
    {
      text: 'Gray Button',
      color: "#ffffff",
      backgroundColor: "#565d60",
      hoverBackgroundColor: "#3e4548",

    },
    {
      text: 'Red Button',
      color: "#ffffff",
      backgroundColor: "#962b22",
      hoverBackgroundColor: "#7c1711",
      svg: closeIcon
    },
    {
      text: 'Navy Button',
      color: "#ffffff",
      backgroundColor: "#152030",
      hoverBackgroundColor: "#0a1321",

    },
    {
      text: 'Teal Button',
      color: "#ffffff",
      backgroundColor: "#6193ae",
      hoverBackgroundColor: "#397499",
      svg: closeIcon
    },
    {
      text: 'Clear Button',
      color: "#ffffff",
      style: { border: '1px solid white', fill: 'black' },
      hoverBackgroundColor: "rgba(255,255,255,0.8)",
      svg: gridIcon
    }
  ];

  style = {
    display: 'flex',
    backgroundColor: '#444',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  };

  render () {

    return (
      <div style={this.style}>
        
        <PillButton 
          style={{margin: 20}}
          idleText="Pill Button Idle"
          activeText="Pill Button Active"
          onClick={() => alert('Pill Button Clicked')}
        />
        <div style={{display: 'flex'}}>
          {
            this.rectangularButtons.map((button, i) => {
              return <RectangularButton
                style={ Object.assign({margin: 10}, button.style || {}) }
                key={i}
                text={button.text}
                svgIcon={button.svg}
                color={button.color}
                backgroundColor={button.backgroundColor}
                hoverBackgroundColor={button.hoverBackgroundColor}
                onClick={() => alert(`${button.text} Clicked`)}
              />
            })
          }
        </div>
      </div>
    )
  }
}