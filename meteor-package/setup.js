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
  },
  /**
   * This is a helper for
   * @param {Function} getHandler
   *        If a function is returned, it will be executed before the callback.
   * @param {Function} callback
   *        This will only be executed when the handler didn't prevent default.
   */
  handleExtraHandler (getHandler, callback) {
    return (event) => {
      /*
       * Handle `onChange` parameter by executing it first if possible.
       * If it called `.preventDefault()` or returned `false`, do nothing.
       */
      let defaultPrevented = false;
      const handler = getHandler();
      if (typeof handler === 'function') {
        const returnValue = handler(event);

        if (event.defaultPrevented || returnValue === false) {
          defaultPrevented = true;
        }
      }
      if (defaultPrevented) {
        return true;
      }

      callback(event);
    };
  }
};
