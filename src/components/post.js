import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Post extends Component {
  static propTypes = {
    sections: PropTypes.array.isRequired,
  }

  render() {
    const { sections } = this.props;

    return (
      <div>
        <ul>
          { sections.map(section => {
            const type = section['__typename'];

            return (
              <li key={ section.id }>
                { type === 'ContentfulSection' ?
                  this.renderSection(section) : this.renderSubTopic(section) }
              </li>
            );
          }) }
        </ul>
      </div>
    );
  }

  renderSection = ({
    content,
    title,
  }) => (
    <div>
      <h5>
        { `Section: ${ title }` }
      </h5>
      <div dangerouslySetInnerHTML={{ __html: content.childMarkdownRemark.html }} />
    </div>
  )

  renderSubTopic = ({
    content,
    title,
  }) => (
    <div>
      <h5>
        { `Sub-topic: ${ title }` }
      </h5>
      <div dangerouslySetInnerHTML={{ __html: content.childMarkdownRemark.html }} />
    </div>
  )
}

export default Post;
