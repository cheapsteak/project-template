import React from 'react';
import { findDOMNode } from 'react-dom';
import Article from 'common/components/article/article.jsx';

export default class ArticleTest extends React.Component {

  getTarget = () => {
    return findDOMNode(this).parentNode;
  };

  render () {
    const style = {
      display: 'flex',
      backgroundColor: 'white',
      flexDirection: 'column',
      alignItems: 'center'
    };

    return (
      <div style={style}>
      {
        _.range(5).map(i => {
          return <Article
              key={i} 
              style={{ flex: 1, width: '50%', margin: 100 }}
              getTarget={this.getTarget}
              aboveFoldSelector="#abovefold"
            >
              <p id="abovefold">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took
              a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
              with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
              software like Aldus PageMaker including versions of Lorem Ipsum.</p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took
              a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
              with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
              software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took
              a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
              with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
              software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took
              a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
              with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
              software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took
              a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
              with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
              software like Aldus PageMaker including versions of Lorem Ipsum.
            </Article>
        })
      }
      </div>
    )
  }
}