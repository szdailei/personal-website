/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Div } from '../styled';
import { Header, Title } from '../sectioning';
import makeid from '../lib/makeid';
import { getTextFromChildren } from './parse-react-component-utils';
import Split from '../layout/Split';

function CheckboxWithState({ checked, ...props }) {
  const [state, setState] = useState(checked);
  function clickCheckbox() {
    setState(!state);
  }
  return <Checkbox checked={state} onClick={clickCheckbox} {...props} />;
}

CheckboxWithState.propTypes = {
  checked: PropTypes.bool,
};

CheckboxWithState.defaultProps = {
  checked: false,
};

function Component({ children, tag, attributes }) {
  switch (tag) {
    case 'Checkbox':
      return <CheckboxWithState {...attributes} label={getTextFromChildren(children)} />;
    case 'Header':
      return <Header {...attributes}>{getTextFromChildren(children)}</Header>;
    case 'Split':
      return <Split {...attributes}>{children}</Split>;
    // There is a bug of marked. If you use same tag as html, like Div, it requires a blank line before </Div>
    case 'Style':
      return <Div {...attributes}>{children}</Div>;
    case 'Title':
      return <Title {...attributes}>{getTextFromChildren(children)}</Title>;
    default:
      console.assert(false, `Unknown tag of ${tag}`); // eslint-disable-line no-console
  }
}

Component.propTypes = {
  children: PropTypes.node.isRequired,
  tag: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  attributes: PropTypes.object.isRequired,
};

function CreateComponent(node) {
  const component = (
    <Component key={makeid()} tag={node.tagName} attributes={node.attributes}>
      {node.children}
    </Component>
  );
  return component;
}

export { Component, CreateComponent };
