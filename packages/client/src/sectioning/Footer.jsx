import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/dist/styled.esm.js';

function Footer({ children, ...props }) {
  const objStyles = {
    zIndex: -100,
    gridArea: 'footer',
    marginTop: '0.3em',
    justifySelf: 'end',
    fontSize: '0.6em',
    ...props,
  };
  const StyledFooter = styled.footer(objStyles);
  return <StyledFooter>{children}</StyledFooter>;
}

Footer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Footer;
