import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/dist/styled.esm.js';

function Header({ children, ...props }) {
  const objStyles = {
    gridArea: 'header',
    marginBottom: '0.4em',
    fontSize: '1.4em',
    fontWeight: '700',
    ...props,
  };
  const StyledHeader = styled.header(objStyles);
  return <StyledHeader>{children}</StyledHeader>;
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
