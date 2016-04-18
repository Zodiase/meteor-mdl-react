// The name of the property attached to React.Component for storing a map of flag names and their matching class names.
const classNameFlagsNamespace = '_flagClassNames';

// Create a global namespace for components to register themselves onto.
Components = {};

// Helpers
Helers = {
  makeArray (val) {
    return (typeof val === 'undefined') ? [] : (Array.isArray(val) ? val : [val]);
  },
  /**
   * @param {Array.<String>} bases
   * @param {String} [className='']
   * @param {Array.<String>} [extra=[]]
   */
  joinClassNames (bases, className = '', extra = []) {
    return [
      ...bases,
      ...(String(className).split(' ')),
      ...extra
    ].filter((name) => String(name).length > 0).join(' ');
  },
  /**
   * @param {React.Component} Component
   * @param {Object} props
   */
  getClassList (Component, props) {
    let classNameSet = new Set();
    if (typeof Component.cssName === 'string') {
      Component.cssName.split(' ').forEach((name) => {
        if (name.length > 0) {
          classNameSet.add(name);
        }
      });
    }
    if (typeof props.className === 'string') {
      props.className.split(' ').forEach((name) => {
        if (name.length > 0) {
          classNameSet.add(name);
        }
      });
    }
    if (typeof Component[classNameFlagsNamespace] === 'object') {
      for (let name of Object.keys(Component[classNameFlagsNamespace])) {
        if (props[name]) {
          classNameSet.add(Component[classNameFlagsNamespace][name]);
        }
      }
    }
    let classList = [];
    classNameSet.forEach((name) => {
      classList.push(name);
    });
    return classList;
  },
  /**
   * @param {React.Component} Component
   * @param {Object} flagMap
   */
  registerClassNameFlags (Component, flagMap) {
    Component[classNameFlagsNamespace] = {};
    for (let name of Object.keys(flagMap)) {
      Component.propTypes[name] = React.PropTypes.bool;
      Component[classNameFlagsNamespace][name] = flagMap[name];
    }
  }
};
