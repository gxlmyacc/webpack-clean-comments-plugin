const { sources } = require('webpack');
const webpackMajorVersion = Number(require('webpack/package.json').version.split('.')[0]);

class WebpackCleanCommentsPlugin {

  constructor(opts) {
    this.options = opts || {};
    this.options.test = this.options.test || /\.js($|\?)/i;
    if (!this.options.comments) this.options.comments = [/^\/\*[A-Za-z0-9\s*():/.",\-!_$@#%&~]+\*\/\n?/];
    if (!Array.isArray(this.options.comments)) this.options.comments = [this.options.comments];
  }

  apply(compiler) {
    const { webpack } = compiler;
    if (webpackMajorVersion < 5) {
      compiler.hooks.emit.tapAsync('WebpackCleanCommentsPlugin',
      /**
       * Hook into the webpack emit phase
       * @param {WebpackCompilation} compilation
       * @param {(err?: Error) => void} callback
      */
        (compilation, callback) => {
          this.processAssets(compilation.assets).filter(Boolean).forEach(
            ({ filename, source }) => {
              compilation.assets[filename] = {
                source: () => source,
                size: () => source.length,
              };
            },
          );
          callback();
        });
    } else {
      compiler.hooks.thisCompilation.tap('WebpackCleanCommentsPlugin',
        compilation => {
          compilation.hooks.processAssets.tapAsync(
            {
              name: 'WebpackCleanCommentsPlugin',

              stage: webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE,
            },
            (compilationAssets, callback) => {
              // eslint-disable-next-line no-console
              // console.log('compilationAssets', compilationAssets);
              this.processAssets(compilation.assets).filter(Boolean).forEach(
                ({ filename, source }) => {
                  compilation.updateAsset(filename, source);
                },
              );
              callback();
            },
          );
        });
    }
  }

  processAssets(assets) {
    return Object.keys(assets)
      .filter(filename => this.testFileName(filename))
      .map(filename => {
        const asset = assets[filename];
        const source = asset.source();
        const { comments } = this.options;
        let newSource = source;
        comments.forEach(comment => newSource = newSource.replace(comment, ''));
        if (source.length === newSource.length) return;
        return {
          filename,
          source: new sources.RawSource(newSource),
        };
      });
  }

  testFileName(filename) {
    if (this.options.test instanceof RegExp) {
      return this.options.test.test(filename);
    }

    if (typeof this.options.test === 'string') {
      return this.options.test === filename;
    }

    if (typeof this.options.test === 'function') {
      return this.options.test(filename);
    }

    throw new Error(
      // eslint-disable-next-line max-len
      '[webpack-clean-comments-plugin]: Invalid "test" option. May be a RegExp (tested against asset key), a string containing the key, a function(key): bool',
    );
  }

}

module.exports = WebpackCleanCommentsPlugin;
