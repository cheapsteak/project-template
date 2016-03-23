import React from 'react';
import LearnMoreModal from 'common/components/learn-more-modal/learn-more-modal.jsx';
import TransitionGroup from 'react-addons-transition-group';

export default class LearnMoreModalTest extends React.Component {
  static defaultProps = {
    containerStyle: {
      display: 'flex',
      width: '100%',
      height: '100%',
      backgroundColor: '#dedede',
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttonStyle: {
      margin: 'auto',
      display: 'inline-block',
      padding: '20px 30px',
      backgroundColor: '#222',
      color: 'white',
      cursor: 'pointer'
    }
  };

  state = {
    showModal: false
  };

  render () {
    return (
      <div style={this.props.containerStyle}>
        <div
          style={this.props.buttonStyle}
          onClick={ () => this.setState({ showModal: !this.state.showModal })}
        >
          Learn More
        </div>
        <TransitionGroup>
          {
            this.state.showModal 
            ? <LearnMoreModal
                close={ () => this.setState({ showModal: false }) }
                paragraphs={[
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                ]}
              />
            : undefined
          }
        </TransitionGroup>
      </div>
    )
  }
}
