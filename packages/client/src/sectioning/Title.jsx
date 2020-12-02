import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/dist/styled.esm.js';

function Title({ children, ...props }) {
  document.title = children;

  const containerStyles = {
    minHeight: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const itemStyles = {
    fontSize: '3em',
    fontWeight: '700',
    ...props,
  };
  const StyledContainer = styled.div(containerStyles);
  const StyledItem = styled.div(itemStyles);
  return (
    <StyledContainer>
      <StyledItem id="title">{children}</StyledItem>
    </StyledContainer>
  );
}

Title.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Title;
