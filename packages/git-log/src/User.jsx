import React from 'react';
import PropTypes from 'prop-types';
import Div from './Div';
import makeid from './lib/makeid.js';
import Commit from './Commit';

function User({ commits, locale }) {
  const name = commits[0].committerName;
  const email = commits[0].committerEmail;

  const children = [];
  commits.forEach((commit) => {
    children.push(<Commit key={makeid()} commit={commit} locale={locale} />);
  });

  return (
    <Div display="flex" flexDirection="column">
      <Div display="flex" flexDirection="row" fontSize='1.5em'>
        <Div width="20%">{name}</Div>
        <Div width="80%">{email}</Div>
      </Div>
      {children}
    </Div>
  );
}

User.propTypes = {
  locale: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  commits: PropTypes.array.isRequired,
};

export default User;
