import { getCurrentNode, finishNode } from './tree.js';
import { CreateComponent } from './Component.jsx';

function finishReactComponent(ctx) {
  const currentNode = getCurrentNode(ctx.reactRoot);

  finishNode(ctx.reactRoot, currentNode);

  if (currentNode.tagName === 'Header') {
    ctx.hasHeaderInCurrentPage = true;
  }

  if (ctx.reactRoot.isFinished) {
    const rootComponent = CreateComponent(ctx.reactRoot);
    ctx.pageChildren.push(rootComponent);
    ctx.reactRoot = null;
  }
}

export default finishReactComponent;
