import React from 'react';
import ReactDOM from 'react-dom';
import Div from './Div'
import makeid from './lib/makeid.js';
import User from './User';
import gitLog from '../reports/git-log.json';

function LocalMain() {
  const users = [];
  const ids = [];
  gitLog.forEach((commit) => {
    const id = commit.committer.email;
    const index = ids.indexOf(id);
    if (index === -1) {
      ids.push(id);
      users.push([commit]);
    } else {
      users[index].push(commit);
    }
  });

  const children = [];
  users.forEach((user) => {
    const { name } = user[0].committer;
    const { email } = user[0].committer;
    children.push(<User key={makeid()} name={name} email={email} commits={user} />);
  });

  return <Div margin='36px' fontSize='1.8em'>{children}</Div>;
}

export default () => {
  ReactDOM.render(<LocalMain />, document.getElementById('root'));
};
