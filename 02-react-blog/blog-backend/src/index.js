// 해당 파일에서만 no-global-assign ESLint 옵션을 비활성함.
/* eslint-disable no-global-assign */

require = require('esm')(module /*, options*/);
module.exports = require('./main.js');
