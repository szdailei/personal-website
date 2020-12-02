import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/dist/styled.esm.js';
import Div from './Div';
import FlexContainer from './FlexContainer';
import GridContainer from './GridContainer';

function CheckboxWithoutLabel({ checked, height }) {
  const objStyles = {
    cursor: 'pointer',
    fill: 'gray',
    width: height,
    height,
  };
  const StyledSvg = styled.svg(objStyles);
  const PATH_DATA_CHECKED =
    'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z';
  const PATH_DATA_UNCHECKED =
    'M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z';
  return (
    <StyledSvg>
      <path d={checked ? PATH_DATA_CHECKED : PATH_DATA_UNCHECKED} />
    </StyledSvg>
  );
}

CheckboxWithoutLabel.propTypes = {
  checked: PropTypes.bool.isRequired,
  height: PropTypes.string.isRequired,
};

/**
@example
function CheckboxWithState({ checked, ...props }) {
  const [state, setState] = useState(checked);
  function clickCheckbox() {
    setState(!state);
  }
  return <Checkbox checked={state} onClick={clickCheckbox} {...props} />;
}
*/
function Checkbox({ checked, gridTemplateColumns, height, label, onClick, right, ...props }) {
  const objStyles = {
    fontSize: height,
    ...props,
  };
  const StyledDiv = styled.div(objStyles);

  if (right) {
    return (
      <Div onClick={onClick} cursor="pointer">
        <FlexContainer>
          <GridContainer gridTemplateColumns={gridTemplateColumns}>
            <StyledDiv fontSize={height}>{label}</StyledDiv>
            <CheckboxWithoutLabel checked={checked} height={height} />
          </GridContainer>
        </FlexContainer>
      </Div>
    );
  }
  return (
    <Div onClick={onClick} cursor="pointer">
      <CheckboxWithoutLabel checked={checked} height={height} />
      <StyledDiv fontSize={height}>{label}</StyledDiv>
    </Div>
  );
}

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  gridTemplateColumns: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  right: PropTypes.bool,
};

Checkbox.defaultProps = {
  right: false,
};

export default Checkbox;
