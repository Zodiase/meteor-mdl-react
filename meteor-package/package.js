      // Relative path to the source directory.
const srcPath = 'components',
      // Supported platforms.
      platform = ['client', 'server'],
      // Whether the component has JS file or SCSS file.
      HAS_JS = 1, HAS_SCSS = 2,
      modules = {
        'resets':      HAS_SCSS,
        'typography':  HAS_SCSS,
        'palette':     HAS_SCSS,
        'animation':   HAS_SCSS,
        'badge':       HAS_SCSS,
        'card':        HAS_JS | HAS_SCSS,
        'dialog':      HAS_SCSS,
        'footer':      HAS_SCSS,
        'list':        HAS_SCSS,
        'shadow':      HAS_SCSS,
        'grid':        HAS_SCSS,

        // Base components
        'button':      HAS_JS | HAS_SCSS,
        'checkbox':    HAS_JS | HAS_SCSS,
        'icon-toggle': 0,
        'menu':        0,
        'progress':    0,
        'radio':       0,
        'slider':      0,
        'snackbar':    0,
        'spinner':     HAS_JS | HAS_SCSS,
        'switch':      0,
        'tabs':        HAS_JS | HAS_SCSS,
        'textfield':   HAS_JS | HAS_SCSS,
        'tooltip':     0,

        // Complex components (which reuse base components)
        'layout':      HAS_JS | HAS_SCSS,
        'data-table':  0,

        // And finally, the ripples
        'ripple':      HAS_JS | HAS_SCSS
      },
      npmPath = Npm.require('path'),
      npmFs = Npm.require('fs'),
      addModule = function (api, moduleName) {
        const module = modules[moduleName];
        if (!module) {
          return;
        }

        const dirname = moduleName;
        // Add sass files to be imported by users.
        if (module & HAS_SCSS) {
          const sassFilePath = npmPath.join(srcPath, dirname, '_' + moduleName + '.scss');
          api.addFiles(sassFilePath, 'server', {isImport: true});
        }
        // Add JSX file.
        if (module & HAS_JS) {
          const jsxFilePath = npmPath.join(srcPath, dirname, '' + moduleName + '.jsx');
          api.addFiles(jsxFilePath, platform);
        }
      };

Package.describe({
  name: 'zodiase:mdl-react',
  version: '0.0.6',
  summary: 'Material Design Lite implemented with React.',
  git: 'https://github.com/Zodiase/meteor-mdl-react.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.1');
  api.use([
    'ecmascript',
    'jquery',
    'tmeasday:check-npm-versions@0.3.1',
    'fourseven:scss@3.4.2'
  ]);

  api.export('MDlReact', platform);

  api.addFiles('setup.js', platform);

  const moduleNames = Object.keys(modules);
  while (moduleNames.length > 0) {
    addModule(api, moduleNames.shift());
  }

  api.addFiles('export.js', platform);
  api.addFiles('theme.scss', 'server', {isImport: true});

  // Add images.
  api.addAssets([
    // Needed by Checkbox.
    'components/images/tick.svg',
    'components/images/tick-mask.svg'
  ], 'client');
});

/*
Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('zodiase:mdl-react');
  api.addFiles('tests.js');
});
*/
