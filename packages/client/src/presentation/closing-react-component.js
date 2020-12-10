import { trim } from '../lib/markdown.js';
import { isClosingTagAtBeginning, parseTextExceptTheFirstTag } from './parse-react-component-utils.js';
import finishReactComponent from './finish-react-component.js';

function closingReactComponent(ctx, origText) {
  let text = origText;

  while (isClosingTagAtBeginning(text)) {
    finishReactComponent(ctx);

    text = trim(parseTextExceptTheFirstTag(text));
    if (!text) break;
  }
}

export default closingReactComponent;
