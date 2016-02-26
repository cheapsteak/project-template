import React from 'react';
import { findDOMNode } from 'react-dom';

export default class FullBrowserWrapper extends React.Component {
  constructor(props) {
    super(props)
  }

  enterFullbrowser = (el) => {

  };

  exitFullbrowser = (el) => {

  };

  render () {
    return (
      <div className="fullbrowser-wrapper">
        { 
          React.cloneElement(this.props.children, { 
            enterFullbrowser : this.enterFullbrowser,
            exitFullbrowser : this.exitFullbrowser
          })
        }
      </div>
    )
  }
}