import { trim } from '../lib/markdown.js';
import MarkdownNode from './MarkdownNode.jsx';

function recursiveParseMarkedToken(ctx, token) {
  let recursiveParseResult;
  const subTokens = token.tokens || token.items;
  if (subTokens && token.type !== 'html') {
    recursiveParseResult = [];
    subTokens.forEach((subToken) => {
      const subNode = recursiveParseMarkedToken(ctx, subToken);
      if (!subNode) return;

      recursiveParseResult.push(subNode);
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
