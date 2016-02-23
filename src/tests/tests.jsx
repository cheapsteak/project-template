import React from 'react';
import { Link } from 'react-router';
import componentsManifest from './components-manifest.jsx';

export default function (props) {
  const { pathname } = props.location;
  const key = pathname.split('/')[2] || 'root';
  const isIndexPage = key === 'root';

  return <div>
    {isIndexPage  && Object.keys(componentsManifest).map((componentName) => <Link to={`/tests/${componentName}`}>{componentName}</Link>)}
    {React.cloneElement(props.children || <div />, { key: key })}
  </div>;
}
