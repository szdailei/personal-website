import React from 'react';
import PropTypes from 'prop-types';
import Div from './Div';

function Commit({ commit }) {
  const date = new Date(commit.committer.date)

  return (
    <Div marginTop="0.8em" display="flex" fontSize="1em">
      <Div width="25%">{date.toDateString()}</Div>
      <Div width="35%">{commit.subject}</Div>
      <Div width="40%">{commit.body}</Div>
    </Div>
  );
}

Commit.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  commit: PropTypes.object.isRequired,
};

export default Commit;
