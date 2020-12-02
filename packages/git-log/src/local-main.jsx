import React from 'react';
import ReactDOM from 'react-dom';
import Div from './Div';
import makeid from './lib/makeid.js';
import User from './User';
import gitLog from '../reports/git-log.json';

function LocalMain() {
  const users = [];
  const ids = [];
  gitLog.data.forEach((commit) => {
    const id = commit.committerEmail;
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
    children.push(<User key={makeid()} commits={user} locale={gitLog.locale} />);
  });

  return (
    <Div>
      <Div display="flex" flexDirection="row" fontSize="2em">
        <Div>repo name</Div>
        <Div marginLeft="1em">{gitLog.repo}</Div>
      </Div>
      {children}
    </Div>
  );
}

export default () => {
  ReactDOM.render(<LocalMain />, document.getElementById('root'));
};
