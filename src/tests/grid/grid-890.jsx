import React from 'react';
import Grid890 from 'common/components/grid/grid-890/grid-890.jsx';

export default function () {

  var container = document.getElementById('container');
  container.style.height = '100%';
  container.style.overflowY = 'scroll';
  container.style.backgroundColor = '#000';

  return (
    <Grid890/>
  )
}
