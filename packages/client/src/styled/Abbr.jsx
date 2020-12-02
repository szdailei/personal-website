import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/dist/styled.esm.js';

function Abbr({ onClick, title, children, ...props }) {
  const objStyles = {
    textDecoration: 'none',
    ...props,
  };
  const StyledAbbr = styled.abbr(objStyles);
  return (
    <StyledAbbr title={title} onClick={onClick}>
      {children}
    </StyledAbbr>
  );
}

Abbr.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
};

Abbr.defaultProps = {
  onClick: null,
  title: '',
  children: '',
};

export default Abbr;
