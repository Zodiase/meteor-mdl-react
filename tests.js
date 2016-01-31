const components = [
  'MaterialButton',
  'MaterialRipple'
];

Tinytest.add('Export', function (test) {
  test.isNotUndefined(MDlReact, 'MDlReact is not defined');
  for (let component of components) {
    test.isNotUndefined(MDlReact[component], 'MDlReact.' + component + ' is not defined');
  }
});
