import React from 'react';
import ReactDOM from 'react-dom';
import Presentation from './presentation/Presentation';

function LocalMain() {
  return <Presentation />;
}

export default () => {
  ReactDOM.render(<LocalMain />, document.getElementById('root'));
};
