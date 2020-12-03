import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/dist/styled.esm.js';

/**
@examples
<Article>{data}</Article>
*/
function Article({ children, ...props }) {
  const objStyles = {
    fontFamily:
      '"Noto Serif","Times New Roman", "Noto Color Emoji","Font Awesome 5 Free","Noto Serif CJK SC","PingFang SC","Microsoft Yahei",serif',
    letterSpacing: '1px',
    margin: '0',
    ...props,
  };

  const StyledArticle = styled.article(objStyles);
  return <StyledArticle>{children}</StyledArticle>;
}

Article.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Article;
