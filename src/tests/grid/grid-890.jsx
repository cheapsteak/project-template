import React from 'react';
import Grid from 'common/components/grid-manager/grid-890';

export default function () {

  var container = document.getElementById('container');
  container.style.height = '100%';
  container.style.overflowY = 'scroll';
  container.style.backgroundColor = '#000';

  return (
    <Grid/>
  )
}
