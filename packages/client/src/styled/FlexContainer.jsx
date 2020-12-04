import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/dist/styled.esm.js';

function FlexContainer({ children, ...styles }) {
  const objStyles = {
    display: 'flex',
    flexDirection: 'column',
    flexFlow: 'column wrap',
    ...styles,
  };
  const StyledDiv = styled.div(objStyles);
  return <StyledDiv>{children}</StyledDiv>;
}

FlexContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FlexContainer;
