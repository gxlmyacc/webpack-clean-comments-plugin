# webpack-clean-comments-plugin
a webpack plugin that clean webpack assets comments

## installtion

```bash
  npm install --save-dev webpack-clean-comments-plugin
  // or 
  yarn add -D webpack-clean-comments-plugin
```

## config


```js
const WebpackCleanCommentsPlugin = require('./webpack-clean-comments-plugin');

// babel.config.js
module.exports = {
 
  plugins: [
   ...
   new WebpackCleanCommentsPlugin({
    comments: [
      /^\/\*[A-Za-z0-9\s*():/.",\-!_$@#%&~]+\*\/\n?/
    ]
   }),
   ...
  ]
};
```
## options

- `comments` comment string or RegExp list, default is `[/^\/\*[A-Za-z0-9\s*():/.",\-!_$@#%&~]+\*\/\n?/]`.

- `test` - remove files filter, default is `/\.js($|\?)/i`.
