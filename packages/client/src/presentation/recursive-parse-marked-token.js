import { trim } from '../lib/markdown.js';
import MarkdownNode from './MarkdownNode.jsx';

function isRequiredRecursiveParse(type) {
  if (type === 'html' || type === 'table') return false;
  return true;
}

function recursiveParseMarkedToken(ctx, token) {
  let recursiveParseResult;
  const subTokens = token.tokens || token.items;
  if (subTokens && isRequiredRecursiveParse(token.type)) {
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

  if (isRequiredRecursiveParse(token.type) && !children) return null;
  return MarkdownNode(token, children);
}

export default recursiveParseMarkedToken;
