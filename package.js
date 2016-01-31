var srcPath = 'components';
var ecmaPkg = 'universe:ecmascript@0.6.7_1';
var platform = ['client', 'server'];

var modules = ['button', 'ripple', 'spinner'];
var npmPath = Npm.require('path');

Package.describe({
  name: 'zodiase:mdl-react',
  version: '0.0.2',
  summary: 'Material Design Lite implemented with React.',
  git: 'https://github.com/Zodiase/meteor-mdl-react.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use([
    'ecmascript',
    'react@0.14.3',
    'fourseven:scss@3.4.1'
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

  api.addFiles('index.js', platform);
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
