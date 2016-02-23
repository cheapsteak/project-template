import React from 'react';

export default function (props) {
  const { pathname } = props.location;
  let key = pathname.split('/')[1] || 'root';

  return React.cloneElement(props.children || <div />, { key: key });
}
