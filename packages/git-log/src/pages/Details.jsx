/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import makeid from '../lib/makeid';
import { Div, Span } from '../styled/index.js';

function Details({ files, status }) {
  const children = [];
  for (let i = 0; i < files.length; i += 1) {
    const child = (
      <Div key={makeid()}>
        <Span>{status[i]}</Span>
        <Span marginLeft="2em">{files[i]}</Span>
      </Div>
    );
    children.push(child);
  }

  return <Span>{children}</Span>;
}

Details.propTypes = {
  files: PropTypes.array.isRequired,
  status: PropTypes.array.isRequired,
};

export default Details;
