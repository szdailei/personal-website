import React from 'react';
import PropTypes from 'prop-types';
import Div from './Div';

function Commit({ commit, locale }) {
  const date = new Date(commit.committerDate);
  const localeDate = date.toLocaleDateString(locale);
  const localeTime = date.toLocaleTimeString(locale);

  const files = commit.files;
  const status = commit.status;
  return (
    <Div marginTop="0.8em" marginLeft="2em" display="flex" fontSize="1em">
      <Div width="15%">{localeDate}</Div>
      <Div width="15%">{localeTime}</Div>
      <Div width="25%">{commit.authorName}</Div>
      <Div>{commit.rawBody}</Div>
    </Div>
  );
}

Commit.propTypes = {
  locale: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  commit: PropTypes.object.isRequired,
};

export default Commit;
