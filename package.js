var srcPath = 'components';
var ecmaPkg = 'universe:ecmascript@0.6.7_1';
var platform = ['client', 'server'];

var modules = ['button', 'layout', 'ripple', 'spinner', 'textfield'];

var npmPath = Npm.require('path');

Npm.depends({
  react: '15.0.0'
});

Package.describe({
  name: 'zodiase:mdl-react',
  version: '0.0.5',
  summary: 'Material Design Lite implemented with React.',
  git: 'https://github.com/Zodiase/meteor-mdl-react.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.1');
  api.use([
    'ecmascript',
    'fourseven:scss@3.4.2'
  ]);

  api.export('MDlReact', platform);

  api.addFiles('setup.js', platform);

  var moduleName, dirname, sassFilename, jsxFilename, sassFilePath, jsxFilePath;
  while (modules.length > 0) {
    moduleName = modules.shift();
    dirname = moduleName;
    sassFilename = '_' + moduleName + '.scss';
    jsxFilename = '' + moduleName + '.jsx';
    sassFilePath = npmPath.join(srcPath, dirname, sassFilename);
    jsxFilePath = npmPath.join(srcPath, dirname, jsxFilename);
    // Add sass files to be imported by users.
    api.addFiles(sassFilePath, platform, {isImport: true});
    // Add JSX file.
    api.addFiles(jsxFilePath, platform);
  }

  api.addFiles('export.js', platform);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('zodiase:mdl-react');
  api.addFiles('tests.js');
});

function prepandPathToFiles(files, path) {
  var npmPath = Npm.require('path');
  return files.map(function(file) {
    return npmPath.join(path, file);
  });
}
