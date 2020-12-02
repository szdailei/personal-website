import React from 'react';
import PropTypes from 'prop-types';
import Div from './Div';
import makeid from './lib/makeid.js';
import Commit from './Commit';

function User({ name, email, commits }) {
  const children = [];
  commits.forEach((commit) => {
    children.push(<Commit key={makeid()} commit={commit} />);
  });

  return (
    <Div display="flex" flexDirection="column">
      <Div display="flex" flexDirection="row">
        <Div width="20%">{name}</Div>
        <Div width="80%">{email}</Div>
      </Div>
      <Div marginLeft="2em">{children}</Div>
    </Div>
  );
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  commits: PropTypes.array.isRequired,
};

export default User;
