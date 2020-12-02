import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/dist/styled.esm.js';

function Heading({ depth, children, ...props }) {
  let StyledHeading;
  let objStyles;
  switch (depth) {
    case 1:
      objStyles = {
        fontSize: '1.4em',
        ...props,
      };
      StyledHeading = styled.h1(objStyles);
      break;
    case 2:
      objStyles = {
        fontSize: '1.3em',
        ...props,
      };
      StyledHeading = styled.h2(objStyles);
      break;
    case 3:
      StyledHeading = styled.h3(props);
      break;
    case 4:
      StyledHeading = styled.h4(props);
      break;
    case 5:
      StyledHeading = styled.h5(props);
      break;
    case 6:
      StyledHeading = styled.h6(props);
      break;
    default:
      StyledHeading = styled.h3(props);
  }
  return <StyledHeading>{children}</StyledHeading>;
}

Heading.propTypes = {
  depth: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default Heading;
