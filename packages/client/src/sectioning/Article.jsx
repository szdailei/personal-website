import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

/**
@examples
<Article>{data}</Article>
*/
function Article({ children, ...props }) {
  const fontFamily =
    '"Noto Serif","Times New Roman", "Noto Color Emoji","Font Awesome 5 Free","Noto Serif CJK SC","PingFang SC",”Microsoft Yahei“, "sans-serif"';
  const objStyles = {
    fontFamily,
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
