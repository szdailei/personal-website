import path from 'path';

const dirname = path.dirname(new URL(import.meta.url).pathname);

export default dirname;
