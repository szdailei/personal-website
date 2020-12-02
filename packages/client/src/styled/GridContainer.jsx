import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/dist/styled.esm.js';

function GridContainer({ gridTemplateColumns, children, ...props }) {
  const objStyles = {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns,
    ...props,
  };
  const StyledDiv = styled.div(objStyles);
  return <StyledDiv>{children}</StyledDiv>;
}

GridContainer.propTypes = {
  gridTemplateColumns: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default GridContainer;
