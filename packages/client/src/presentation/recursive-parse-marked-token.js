import { trim } from '../lib/markdown';
import MarkdownNode from './MarkdownNode';
import { isStartingTag } from './parse-react-component-utils';

function recursiveParseMarkedToken(ctx, token) {
  let recursiveParseResult;
  const subTokens = token.tokens || token.items;
  if (subTokens) {
    recursiveParseResult = [];
    subTokens.forEach((subToken) => {
      const subNode = recursiveParseMarkedToken(ctx, subToken);
      if (!subNode) {
        return;
      }
      if (subNode.error) {
        if (isStartingTag(subNode.text)) {
          // eslint-disable-next-line no-console
          console.assert(!subNode.error, `React element inside another React element, text is ${subNode.text}`);
        }
      } else {
        recursiveParseResult.push(subNode);
      }
    });
  }

  let children;
  if (recursiveParseResult && recursiveParseResult.length !== 0) {
    children = recursiveParseResult;
  } else {
    children = trim(token.text);
  }

  if (!children) return null;
  return MarkdownNode(token, children);
}

export default recursiveParseMarkedToken;
