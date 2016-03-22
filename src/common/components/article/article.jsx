import React from 'react';
import PillButton from 'common/components/pill-button/pill-button';

export default class Article extends React.Component {
  render () {
    const { className, style } = this.props;

    return (
      <div
        className={`article ${className || ''}`}
        style={style}
      >
        <div>
        </div>
        <PillButton
          staticText="Read More"
          activeText="Read Less"
        />
      </div>
    )
  }
}