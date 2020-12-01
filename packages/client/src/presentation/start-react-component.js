import marked from 'marked';
import recursiveParseMarkedToken from './recursive-parse-marked-token';
import { createNode, addNode } from './tree';
import { isStartingTag } from './parse-react-component-utils';
import finishReactComponent from './finish-react-component';

function startReactCompenent(ctx, text) {
  const node = createNode(text);
  // Do nothing for empty tag
  if (node.foundClosingTag && !node.textContent) {
    return;
  }

  if (!ctx.reactRoot) {
    ctx.reactRoot = node;
  } else {
    addNode(ctx.reactRoot, node);
  }

  if (node.textContent) {
    const tokens = marked.lexer(node.textContent);
    tokens.forEach((token) => {
      const subNode = recursiveParseMarkedToken(ctx, token);
      if (subNode) {
        if (subNode.error) {
          // React component
          if (isStartingTag(subNode.text)) {
            startReactCompenent(ctx, subNode.text);
          } else {
            finishReactComponent(ctx);
          }
        } else {
          node.children.push(subNode);
        }
      }
    });
  }

  if (node.foundClosingTag) {
    finishReactComponent(ctx);
  }
}

export default startReactCompenent;
