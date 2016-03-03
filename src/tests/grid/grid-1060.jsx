import React from 'react';
import Grid from 'common/components/grid/grid-1060/grid-1060.jsx';

export default function () {

  var container = document.getElementById('container');
  container.style.height = '100%';
  container.style.overflowY = 'scroll';
  container.style.backgroundColor = '#000';

  return (
    <Grid/>
  )
}
