import React from 'react';
import Article from 'common/components/article/article.jsx';

export default class ArticleTest extends React.Component {
  render () {
    const style = {
      display: 'flex',
      backgroundColor: '#222',
      flexDirection: 'column',
      alignItems: 'center'
    };

    return (
      <div style={style}>
      {
        _.range(5).map(i => {
          return <div key={i} style={{ flex: 1, width: 800, height: 500, margin: 100 }}>
            <Article
              text={
                `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took
                a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
                also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.`
              }
            />
          </div>
        })
      }
      </div>
    )
  }
}