import React from 'react';
import Panorama from 'common/components/panorama/panorama.jsx';

export default class PanoramaTest extends React.Component {

  state = {
    value: '../images/pan-11.jpg'
  };

  handleChange = (event) => {
    this.setState({value: event.target.value});
  };

  render() {
    return (
      <div>
        <div style={{height: 600}}>
          <Panorama src={this.state.value}/>
        </div>
        <input type="text"
               onChange={this.handleChange}
               style={{marginTop: 100, marginLeft: 200,width: 400, height: 50}}
               placeholder="URL"
        />
      </div>
    )
  }
}
