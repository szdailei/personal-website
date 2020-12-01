import React from 'react';
import PropTypes from 'prop-types';

/**
@purpose
<Loaded> as top container in all pages, then select '#loaded' in test program.
@examples
<Loaded>
  <Article>{data}</Article>
</Loaded>

await page.goto(thePage);
await page.waitForSelector('#loaded');
*/
function Loaded({ children }) {
  return <div id="loaded">{children}</div>;
}

Loaded.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Loaded;
