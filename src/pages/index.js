import React from 'react'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Author from '../components/author';
import Post from '../components/post';

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const topics = get(this, 'props.data.allContentfulTopic.edges');
    const firstTopic = topics.length > 0 && topics[0].node;
    const author = get(firstTopic, 'author');
    const post = get(firstTopic, 'post');
    console.log(firstTopic);

    return (
      <div style={{ background: '#fff' }}>
        <Helmet title={siteTitle} />
        <div className="wrapper">
          <h2>Topics</h2>
          <div>
            <h3>
              { firstTopic.title }
            </h3>
            <div dangerouslySetInnerHTML={{ __html: firstTopic.introduction.childMarkdownRemark.html }} />
            <Author { ...author } />
            <Post sections={ post } />
          </div>
        </div>
      </div>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulTopic {
      edges {
        node {
          title
          slug
          introduction {
            childMarkdownRemark {
              html
            }
          }
          author {
            name
            bio {
              childMarkdownRemark {
                html
              }
            }
            photo {
              sizes(
                maxWidth: 400
              ) {
                ...GatsbyContentfulSizes_tracedSVG
              }
            }
          }
          post {
            ... on ContentfulSection {
              id
              title
              content {
                childMarkdownRemark {
                  html
                }
              }
            }
            ... on ContentfulSubTopic {
              id
              title
              content {
                childMarkdownRemark {
                  html
                }
              }
            }
          }
        }
      }
    }
  }
`
