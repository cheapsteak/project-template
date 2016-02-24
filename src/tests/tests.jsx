import React from 'react';
import { Link } from 'react-router';
import componentsManifest from './components-manifest.jsx';

class ManifestMenu extends React.Component {
  state = {
    isOpen: true
  };

  handleClickClose = () => {
    this.setState({isOpen: false});
  };

  handleClickOpen = () => {
    this.setState({isOpen: true});
  };

  render () {
    const styles = {
      position: 'absolute',
      padding: 10
    };

    const openedStyles = {
      backgroundColor: '#fff'
    };

    const closedStyles = {
      backgroundColor: 'rgba(255,255,255,0.5)'
    };

    Object.assign(styles, this.state.isOpen ? openedStyles : closedStyles);

    return <div style={styles} className="manifest-menu">
      {this.props.isIndexPage && <Link to="/tests">Home</Link>}
      { this.state.isOpen && Object.keys(this.props.manifest).map((componentName, i) =>
      <Link
        to={`/tests/${componentName}`}
        key={i}
      >{componentName}</Link>)}
      {this.props.isIndexPage && (this.state.isOpen ? <div onClick={this.handleClickClose}>close</div> : <div onClick={this.handleClickOpen}>open</div>)}
    </div>;
  }
}

export default function (props) {
  const { pathname } = props.location;
  const key = pathname.split('/')[2] || 'root';
  const isIndexPage = key === 'root';

  return <div>
    <ManifestMenu
      manifest={componentsManifest}
      isIndexPage={!isIndexPage}
    />
    {React.cloneElement(props.children || <div />, { key: key })}
  </div>;
}
