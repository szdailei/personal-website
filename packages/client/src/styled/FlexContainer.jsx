import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/dist/styled.esm.js';

function FlexContainer({ children, ...props }) {
  const objStyles = {
    display: 'flex',
    flexDirection: 'column',
    flexFlow: 'column wrap',
    ...props,
  };
  const StyledDiv = styled.div(objStyles);
  return <StyledDiv>{children}</StyledDiv>;
}

FlexContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FlexContainer;
