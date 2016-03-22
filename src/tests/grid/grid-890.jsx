import React from 'react';
import Grid from 'common/components/grid-manager/grid/layout-890';

export default function () {

  const styles = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    padding: '30px',
    backgroundColor: '#000',
    overflowY: 'scroll'
  };

  return (
    <div style={styles}>
      <Grid/>
    </div>
  )
}
