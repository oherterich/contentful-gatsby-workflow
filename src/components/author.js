import React from 'react';

import Img from 'gatsby-image';

export default ({
  bio,
  name,
  photo
}) => (
  <div>
    <h3>
      { name }
    </h3>
    <div dangerouslySetInnerHTML={{ __html: bio.childMarkdownRemark.html }} />
    <Img alt='' sizes={ photo.sizes } style={{ maxWidth: '400px' }} />
  </div>
);
