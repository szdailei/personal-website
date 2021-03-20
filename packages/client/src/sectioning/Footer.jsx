import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

function Footer({ children, ...styles }) {
  const objStyles = {
    zIndex: -100,
    gridArea: 'footer',
    marginTop: '0.3em',
    justifySelf: 'end',
    fontSize: '0.6em',
    ...styles,
  };
  const StyledFooter = styled.footer(objStyles);
  return <StyledFooter>{children}</StyledFooter>;
}

Footer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Footer;
