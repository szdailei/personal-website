import marked from 'marked';
import { debug, color, START_COLOR, REACT_PARSE } from '../lib/debug.js';
import recursiveParseMarkedToken from './recursive-parse-marked-token.js';
import { createNode, addNode } from './tree.js';
import { isStartingTag } from './parse-react-component-utils.js';
import closingReactComponent from './closing-react-component.js';
import finishReactComponent from './finish-react-component.js';

const contract = debug(REACT_PARSE);

function startReactCompenent(ctx, text) {
  contract('@require React Starting tag \n%s', color(text, START_COLOR));
  const node = createNode(text);
  if (!ctx.reactRoot) {
    contract('@require ctx.reactRoot不存在 \n@ensure  新增ctx.reactRoot');
    ctx.reactRoot = node;
  } else {
    contract('@require ctx.reactRoot存在 \n@ensure  ctx.reactRoot添加子节点');
    addNode(ctx.reactRoot, node);
  }

  if (node.textContent) {
    const tokens = marked.lexer(node.textContent);
    contract('@require React tag里有MD \n%s\n@ensure 解析为%d个token%O', node.textContent, tokens.length, tokens);

    tokens.forEach((token) => {
      contract('@require token \n%O \n@ensure 递归解析为subNode', token);
      const subNode = recursiveParseMarkedToken(ctx, token);

      if (subNode && subNode.error) {
        if (isStartingTag(subNode.text)) {
          contract('@require React有子节点文本\n%s\n@ensure 递归React Starting tag', subNode.text);
          startReactCompenent(ctx, subNode.text);
        } else {
          contract('@require React Closing tag \n%s\n@ensure 结束解析React子节点文本', subNode.text);
          closingReactComponent(ctx, subNode.text);
        }
        return;
      }

      node.children.push(subNode);
    });
  }

  if (node.foundClosingTag) {
    contract('@require starting tag和closing tag在同一个token\n@ensure 结束解析React');
    finishReactComponent(ctx);
  }
}

export default startReactCompenent;
