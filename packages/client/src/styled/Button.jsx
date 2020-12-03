import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

function Button({ onClick, value, children, ...props }) {
  const objStyles = {
    cursor: 'pointer',
    width: 'fit-content',
    margin: '4px',
    padding: '4px 8px',
    borderRadius: '4px',
    backgroundColor: '#F86E67',

    '&:hover': {
      backgroundColor: '#C84E47',
      boxShadow:
        '0 0 2px -2px rgba(29, 39, 231, 0.1), 0 0 3px 0 rgba(29, 39, 231, 0.1), 0 0 5px 0 rgba(29, 39, 231, 0.1), 0 2px 2px -4px rgba(29, 39, 231, 0.1), 0 4px 8px 0 rgba(29, 39, 231, 0.1), 0 2px 15px 0 rgba(29, 39, 231, 0.1)',
    },
    ...props,
  };

  const StyledDiv = styled.div(objStyles);
  return (
    <StyledDiv onClick={onClick} value={value}>
      {children}
    </StyledDiv>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  value: null,
};

export default Button;
