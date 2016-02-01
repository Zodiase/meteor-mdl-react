let { Component, PropTypes } = React;

class MaterialLayout extends Component {

  _upgrade() {
    if (this.container_ && this.element_) {

      //if (this.header_) {
      //  this.tabBar_ = this.header_.querySelector('.' + this.CssClasses_.TAB_BAR);
      //}

      if (this.header_) {
        if (this.mode_ === this.Mode_.WATERFALL) {
          this.header_.addEventListener('transitionend', this.boundHeaderTransitionEndHandler); //x
          this.header_.addEventListener('click', this.boundHeaderClickHandler); //x
          // Add and remove shadows depending on scroll position.
          // Also add/remove auxiliary class for styling of the compact version of
          // the header.
          this.content_.addEventListener('scroll', this.boundContentScrollHandler); //x
          this.contentScrollHandler_();
        }
      }

      // Add drawer toggling button to our layout, if we have an openable drawer.
      if (this.drawer_) {
        if (this.drawerButton_) {
          this.drawerButton_.addEventListener('click', this.boundDrawerToggleHandler); //x
        }
        if (this.obfuscator_) {
          this.obfuscator_.addEventListener('click', this.boundDrawerToggleHandler); //x
        }
      }

      // Keep an eye on screen size, and add/remove auxiliary class for styling
      // of small screens.
      this.screenSizeMediaQuery_ = window.matchMedia(/** @type {string} */ (this.Constant_.MAX_WIDTH));
      this.screenSizeMediaQuery_.addListener(this.boundScreenSizeHandler);
      this.screenSizeHandler_();

      // Initialize tabs, if any.
      if (this.header_ && this.tabBar_) {
        this.element_.classList.add(this.CssClasses_.HAS_TABS);

        var tabContainer = document.createElement('div');
        tabContainer.classList.add(this.CssClasses_.TAB_CONTAINER);
        this.header_.insertBefore(tabContainer, this.tabBar_);
        this.header_.removeChild(this.tabBar_);

        var leftButton = document.createElement('div');
        leftButton.classList.add(this.CssClasses_.TAB_BAR_BUTTON);
        leftButton.classList.add(this.CssClasses_.TAB_BAR_LEFT_BUTTON);
        var leftButtonIcon = document.createElement('i');
        leftButtonIcon.classList.add(this.CssClasses_.ICON);
        leftButtonIcon.textContent = this.Constant_.CHEVRON_LEFT;
        leftButton.appendChild(leftButtonIcon);
        leftButton.addEventListener('click', function() {
          this.tabBar_.scrollLeft -= this.Constant_.TAB_SCROLL_PIXELS;
        }.bind(this));

        var rightButton = document.createElement('div');
        rightButton.classList.add(this.CssClasses_.TAB_BAR_BUTTON);
        rightButton.classList.add(this.CssClasses_.TAB_BAR_RIGHT_BUTTON);
        var rightButtonIcon = document.createElement('i');
        rightButtonIcon.classList.add(this.CssClasses_.ICON);
        rightButtonIcon.textContent = this.Constant_.CHEVRON_RIGHT;
        rightButton.appendChild(rightButtonIcon);
        rightButton.addEventListener('click', function() {
          this.tabBar_.scrollLeft += this.Constant_.TAB_SCROLL_PIXELS;
        }.bind(this));

        tabContainer.appendChild(leftButton);
        tabContainer.appendChild(this.tabBar_);
        tabContainer.appendChild(rightButton);

        // Add and remove buttons depending on scroll position.
        var tabScrollHandler = function() {
          if (this.tabBar_.scrollLeft > 0) {
            leftButton.classList.add(this.CssClasses_.IS_ACTIVE);
          } else {
            leftButton.classList.remove(this.CssClasses_.IS_ACTIVE);
          }

          if (this.tabBar_.scrollLeft < this.tabBar_.scrollWidth - this.tabBar_.offsetWidth) {
            rightButton.classList.add(this.CssClasses_.IS_ACTIVE);
          } else {
            rightButton.classList.remove(this.CssClasses_.IS_ACTIVE);
          }
        }.bind(this);

        this.tabBar_.addEventListener('scroll', tabScrollHandler);
        tabScrollHandler();

        if (this.tabBar_.classList.contains(this.CssClasses_.JS_RIPPLE_EFFECT)) {
          this.tabBar_.classList.add(this.CssClasses_.RIPPLE_IGNORE_EVENTS);
        }

        // Select element tabs, document panels
        var tabs = this.tabBar_.querySelectorAll('.' + this.CssClasses_.TAB);
        var panels = this.content_.querySelectorAll('.' + this.CssClasses_.PANEL);

        // Create new tabs for each tab element
        for (var i = 0; i < tabs.length; i++) {
          new MaterialLayoutTab(tabs[i], tabs, panels, this);
        }
      }

      this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
    }
  }

  _downgrade() {
    if (this.container_ && this.element_) {

      //if (this.header_) {
      //  this.tabBar_ = this.header_.querySelector('.' + this.CssClasses_.TAB_BAR);
      //}

      if (this.header_) {
        if (this.mode_ === this.Mode_.WATERFALL) {
          this.header_.removeEventListener('transitionend', this.boundHeaderTransitionEndHandler); //x
          this.header_.removeEventListener('click', this.boundHeaderClickHandler); //x
          // Add and remove shadows depending on scroll position.
          // Also add/remove auxiliary class for styling of the compact version of
          // the header.
          this.content_.removeEventListener('scroll', this.boundContentScrollHandler); //x
        }
      }

      // Add drawer toggling button to our layout, if we have an openable drawer.
      if (this.drawer_) {
        if (this.drawerButton_) {
          this.drawerButton_.removeEventListener('click', this.boundDrawerToggleHandler); //x
        }
        if (this.obfuscator_) {
          this.obfuscator_.removeEventListener('click', this.boundDrawerToggleHandler); //x
        }
      }

      // Keep an eye on screen size, and add/remove auxiliary class for styling
      // of small screens.
      if (this.screenSizeMediaQuery_) {
        this.screenSizeMediaQuery_.removeListener(this.boundScreenSizeHandler); //x
        this.screenSizeMediaQuery_ = null;
      }

      // Initialize tabs, if any.
      if (this.header_ && this.tabBar_) {
        //!
      }

      this.element_.classList.remove(this.CssClasses_.IS_UPGRADED);
    }
  }

  _joinClassNames(extraBase, currentClassName = '', extraMore = []) {
    return [
      ...extraBase,
      ...(String(currentClassName).split(' ')),
      ...extraMore
    ].filter((name) => String(name).length > 0).join(' ');
  }

  _getStateFromProps(props) {
    return {};
  }

  constructor(props) {
    super(props);

    this.boundHeaderTransitionEndHandler = this.headerTransitionEndHandler_.bind(this);
    this.boundHeaderClickHandler = this.headerClickHandler_.bind(this);
    this.boundContentScrollHandler = this.contentScrollHandler_.bind(this);
    this.boundDrawerToggleHandler = this.drawerToggleHandler_.bind(this);
    this.boundScreenSizeHandler = this.screenSizeHandler_.bind(this);

    this.state = this._getStateFromProps(props);
  }

  //componentWillMount() {}
  componentDidMount() {
    this._upgrade();
  }
  componentWillUnmount() {
    this._downgrade();
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this._getStateFromProps(nextProps));
  }
  //shouldComponentUpdate(nextProps, nextState) {
  //  return true;
  //}
  componentWillUpdate(nextProps, nextState) {
    this._downgrade();
  }
  componentDidUpdate(prevProps, prevState) {
    this._upgrade();
  }
  render() {
    let {
      className,
      fixedHeader,
      children,
      ...props
    } = this.props;

    // Reset references.
    this.container_ = null;
    this.element_ = null;
    this.content_ = null;
    this.header_ = null;
    this.drawer_ = null;
    this.drawerButton_ = null;
    this.obfuscator_ = null;

    let flaggedClassNames = [];
    // Add flag classNames.
    for (let name of self.flagClassNames) {
      if (this.props[name]) {
        flaggedClassNames.push(self.classNames[name]);
      }
    }

    let classNameString = this._joinClassNames([self.cssName], className, flaggedClassNames);

    let mode = this.Mode_.STANDARD;
    console.info('raw children', children);

    // Pick out the header, drawer, content and leave the rest.
    let header = null,
        drawer = null,
        drawerButton = null,
        drawerButtonInHeader = false,
        obfuscator = null,
        content = null;
    children = children.filter(function (element) {
      switch (element.type) {
        case self.Header:
          header = element;
          return false;
          break;
        case self.Drawer:
          drawer = element;
          return false;
          break;
        case self.Content:
          content = element;
          return false;
          break;
        default:
          return true;
          break;
      }
    });
    console.info('filtered children', children);

    // Content should exist. Even not, prepare empty props for creating later.
    let contentProps = content ? {...content.props} : {};
    contentProps.className = this._joinClassNames([this.CssClasses_.CONTENT], contentProps.className || '');

    // Header is OK to not exist. Only prepare props when exists.
    let headerProps = null;
    if (header) {
      headerProps = {...header.props};
      headerProps.className = this._joinClassNames([this.CssClasses_.HEADER], headerProps.className || '');

      if (headerProps.seamed) {
        mode = this.Mode_.SEAMED;
      } else if (headerProps.waterfall) {
        mode = this.Mode_.WATERFALL;
      } else if (headerProps.scroll) {
        mode = this.Mode_.SCROLL;
        contentProps.className = this._joinClassNames([], contentProps.className || '', [this.CssClasses_.HAS_SCROLLING_HEADER]);
      }

      if (mode === this.Mode_.STANDARD) {
        headerProps.className = this._joinClassNames([], headerProps.className || '', [this.CssClasses_.CASTING_SHADOW]);
        //! Modify tabBar.
      } else if (mode === this.Mode_.SEAMED || mode === this.Mode_.SCROLL) {
        //! Modify tabBar.
      } else if (mode === this.Mode_.WATERFALL) {
        // Add and remove shadows depending on scroll position.
        // Also add/remove auxiliary class for styling of the compact version of
        // the header.
      }
    }

    // Drawer is OK to not exist. Only prepare props when exists.
    // Add drawer toggling button to our layout, if we have an openable drawer.
    let drawerProps = null;
    let drawerButtonProps = null;
    if (drawer) {
      drawerProps = {...drawer.props};
      drawerProps.className = this._joinClassNames([this.CssClasses_.DRAWER], drawerProps.className || '');

      drawerButtonProps = {
        "className": this.CssClasses_.DRAWER_BTN,
        "children": (
          <i className={this.CssClasses_.ICON}>{this.Constant_.MENU_ICON}</i>
        )
      };

      if (drawerProps.largeScreenOnly) {
        //If drawer has ON_LARGE_SCREEN class then add it to the drawer toggle button as well.
        drawerButtonProps.className += ' ' + this.CssClasses_.ON_LARGE_SCREEN;
      } else if (drawerProps.smallScreenOnly) {
        //If drawer has ON_SMALL_SCREEN class then add it to the drawer toggle button as well.
        drawerButtonProps.className += ' ' + this.CssClasses_.ON_SMALL_SCREEN;
      }

      // Add a class if the layout has a drawer, for altering the left padding.
      // Adds the HAS_DRAWER to the elements since this.header_ may or may
      // not be present.
      classNameString += ' ' + this.CssClasses_.HAS_DRAWER;

      // Safe to initialize drawer button.
      drawerButton = (
        <div {...drawerButtonProps}
          ref={(ref) => this.drawerButton_ = ref}
        />
      );

      // If we have a fixed header, add the button to the header rather than
      // the layout.
      if (fixedHeader) {
        drawerButtonInHeader = true;
      } else {
        drawerButtonInHeader = false;
      }

      obfuscator = (
        <div
          className={this.CssClasses_.OBFUSCATOR}
          ref={(ref) => this.obfuscator_ = ref}
        />
      );
    }

    // Keep an eye on screen size, and add/remove auxiliary class for styling
    // of small screens.

    // Initialize tabs, if any.
    if (this.header_ && this.tabBar_) {
      //!
    }

    // Rebuild main components with their props.

    // Content must exist.
    content = (
      <main {...contentProps}
        ref={(ref) => this.content_ = ref}
      />
    );

    // Only build Header if needed.
    header = null;
    if (headerProps) {
      let {
        children,
        ...props
      } = headerProps;

      header = (
        <header {...props}
          ref={(ref) => this.header_ = ref}
        >{drawerButtonInHeader ? drawerButton : null}{children}</header>
      );
    }

    // Only build Drawer if needed.
    drawer = null;
    if (drawerProps) {
      let {
        children,
        ...props
      } = drawerProps;
      drawer = (
        <div {...props}
          ref={(ref) => this.drawer_ = ref}
        >{children}</div>
      );
    }

    // Update mode.
    this.mode_ = mode;

    return (
      <div
        key="container"
        className={this.CssClasses_.CONTAINER}
        ref={(ref) => this.container_ = ref}
      >
        <div
          className={classNameString}
          ref={(ref) => this.element_ = ref}
        >{header}{drawer}{drawerButtonInHeader ? null : drawerButton}{content}{children}{obfuscator}</div>
      </div>
    );
  }
}
const self = Components.MaterialLayout = MaterialLayout;

self.cssName = 'mdl-layout';
self.propTypes = {
  "className": PropTypes.string.isRequired,
  "children": PropTypes.any.isRequired
};
self.defaultProps = {
  "className": ""
};
self.classNames = {
  "fixedHeader": "mdl-layout--fixed-header"
};
self.flagClassNames = ["fixedHeader"];
for (let flagClassName of self.flagClassNames) {
  self.propTypes[flagClassName] = PropTypes.bool;
}

// Code from MDL.

/**
 * Store constants in one place so they can be updated easily.
 *
 * @enum {string | number}
 * @private
 */
MaterialLayout.prototype.Constant_ = {
  MAX_WIDTH: '(max-width: 1024px)',
  TAB_SCROLL_PIXELS: 100,

  MENU_ICON: 'menu',
  CHEVRON_LEFT: 'chevron_left',
  CHEVRON_RIGHT: 'chevron_right'
};

/**
 * Modes.
 *
 * @enum {number}
 * @private
 */
MaterialLayout.prototype.Mode_ = {
  STANDARD: 0,
  SEAMED: 1,
  WATERFALL: 2,
  SCROLL: 3
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 *
 * @enum {string}
 * @private
 */
MaterialLayout.prototype.CssClasses_ = {
  CONTAINER: 'mdl-layout__container',
  HEADER: 'mdl-layout__header',
  DRAWER: 'mdl-layout__drawer',
  CONTENT: 'mdl-layout__content',
  DRAWER_BTN: 'mdl-layout__drawer-button',

  ICON: 'material-icons',

  JS_RIPPLE_EFFECT: 'mdl-js-ripple-effect',
  RIPPLE_CONTAINER: 'mdl-layout__tab-ripple-container',
  RIPPLE: 'mdl-ripple',
  RIPPLE_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events',

  HEADER_SEAMED: 'mdl-layout__header--seamed',
  HEADER_WATERFALL: 'mdl-layout__header--waterfall',
  HEADER_SCROLL: 'mdl-layout__header--scroll',

  FIXED_HEADER: 'mdl-layout--fixed-header',
  OBFUSCATOR: 'mdl-layout__obfuscator',

  TAB_BAR: 'mdl-layout__tab-bar',
  TAB_CONTAINER: 'mdl-layout__tab-bar-container',
  TAB: 'mdl-layout__tab',
  TAB_BAR_BUTTON: 'mdl-layout__tab-bar-button',
  TAB_BAR_LEFT_BUTTON: 'mdl-layout__tab-bar-left-button',
  TAB_BAR_RIGHT_BUTTON: 'mdl-layout__tab-bar-right-button',
  PANEL: 'mdl-layout__tab-panel',

  HAS_DRAWER: 'has-drawer',
  HAS_TABS: 'has-tabs',
  HAS_SCROLLING_HEADER: 'has-scrolling-header',
  CASTING_SHADOW: 'is-casting-shadow',
  IS_COMPACT: 'is-compact',
  IS_SMALL_SCREEN: 'is-small-screen',
  IS_DRAWER_OPEN: 'is-visible',
  IS_ACTIVE: 'is-active',
  IS_UPGRADED: 'is-upgraded',
  IS_ANIMATING: 'is-animating',

  ON_LARGE_SCREEN: 'mdl-layout--large-screen-only',
  ON_SMALL_SCREEN: 'mdl-layout--small-screen-only'

};

/**
 * Handles scrolling on the content.
 *
 * @private
 */
MaterialLayout.prototype.contentScrollHandler_ = function() {
  if (this.header_.classList.contains(this.CssClasses_.IS_ANIMATING)) {
    return;
  }

  if (this.content_.scrollTop > 0 &&
      !this.header_.classList.contains(this.CssClasses_.IS_COMPACT)) {
    this.header_.classList.add(this.CssClasses_.CASTING_SHADOW);
    this.header_.classList.add(this.CssClasses_.IS_COMPACT);
    this.header_.classList.add(this.CssClasses_.IS_ANIMATING);
  } else if (this.content_.scrollTop <= 0 &&
      this.header_.classList.contains(this.CssClasses_.IS_COMPACT)) {
    this.header_.classList.remove(this.CssClasses_.CASTING_SHADOW);
    this.header_.classList.remove(this.CssClasses_.IS_COMPACT);
    this.header_.classList.add(this.CssClasses_.IS_ANIMATING);
  }
};

/**
 * Handles changes in screen size.
 *
 * @private
 */
MaterialLayout.prototype.screenSizeHandler_ = function() {
  if (this.screenSizeMediaQuery_.matches) {
    this.element_.classList.add(this.CssClasses_.IS_SMALL_SCREEN);
  } else {
    this.element_.classList.remove(this.CssClasses_.IS_SMALL_SCREEN);
    // Collapse drawer (if any) when moving to a large screen size.
    if (this.drawer_) {
      this.drawer_.classList.remove(this.CssClasses_.IS_DRAWER_OPEN);
      this.obfuscator_.classList.remove(this.CssClasses_.IS_DRAWER_OPEN);
    }
  }
};

/**
 * Handles toggling of the drawer.
 *
 * @private
 */
MaterialLayout.prototype.drawerToggleHandler_ = function() {
  this.drawer_.classList.toggle(this.CssClasses_.IS_DRAWER_OPEN);
  this.obfuscator_.classList.toggle(this.CssClasses_.IS_DRAWER_OPEN);
};

/**
 * Handles (un)setting the `is-animating` class
 *
 * @private
 */
MaterialLayout.prototype.headerTransitionEndHandler_ = function() {
  this.header_.classList.remove(this.CssClasses_.IS_ANIMATING);
};

/**
 * Handles expanding the header on click
 *
 * @private
 */
MaterialLayout.prototype.headerClickHandler_ = function() {
  if (this.header_.classList.contains(this.CssClasses_.IS_COMPACT)) {
    this.header_.classList.remove(this.CssClasses_.IS_COMPACT);
    this.header_.classList.add(this.CssClasses_.IS_ANIMATING);
  }
};

/**
 * Reset tab state, dropping active classes
 *
 * @private
 */
MaterialLayout.prototype.resetTabState_ = function(tabBar) {
  for (var k = 0; k < tabBar.length; k++) {
    tabBar[k].classList.remove(this.CssClasses_.IS_ACTIVE);
  }
};

/**
 * Reset panel state, droping active classes
 *
 * @private
 */
MaterialLayout.prototype.resetPanelState_ = function(panels) {
  for (var j = 0; j < panels.length; j++) {
    panels[j].classList.remove(this.CssClasses_.IS_ACTIVE);
  }
};

/**
 * Constructor for an individual tab.
 *
 * @constructor
 * @param {HTMLElement} tab The HTML element for the tab.
 * @param {!Array<HTMLElement>} tabs Array with HTML elements for all tabs.
 * @param {!Array<HTMLElement>} panels Array with HTML elements for all panels.
 * @param {MaterialLayout} layout The MaterialLayout object that owns the tab.
 */
function MaterialLayoutTab(tab, tabs, panels, layout) {
  if (layout.tabBar_.classList.contains(layout.CssClasses_.JS_RIPPLE_EFFECT)) {
    var rippleContainer = document.createElement('span');
    rippleContainer.classList.add(layout.CssClasses_.RIPPLE_CONTAINER);
    rippleContainer.classList.add(layout.CssClasses_.JS_RIPPLE_EFFECT);
    var ripple = document.createElement('span');
    ripple.classList.add(layout.CssClasses_.RIPPLE);
    rippleContainer.appendChild(ripple);
    tab.appendChild(rippleContainer);
  }

  tab.addEventListener('click', function(e) {
    e.preventDefault();
    var href = tab.href.split('#')[1];
    var panel = layout.content_.querySelector('#' + href);
    layout.resetTabState_(tabs);
    layout.resetPanelState_(panels);
    tab.classList.add(layout.CssClasses_.IS_ACTIVE);
    panel.classList.add(layout.CssClasses_.IS_ACTIVE);
  });
}

// Placeholder. Does nothing. Real magic happens in MaterialLayout.
class Header extends Component {render() {return null;}}
self.Header = Header;

// Placeholder. Does nothing. Real magic happens in MaterialLayout.
class Drawer extends Component {render() {return null;}}
self.Drawer = Drawer;

// Placeholder. Does nothing. Real magic happens in MaterialLayout.
class Content extends Component {render() {return null;}}
self.Content = Content;

class Spacer extends Component {
  render() {
    return (
      <div className="mdl-layout-spacer" />
    );
  }
}
self.Spacer = Spacer;

class Title extends Component {
  render() {
    let {
      className,
      children,
      ...props
    } = this.props;

    let classNames = [
      "mdl-layout-title"
    ];
    // Add classNames passed in.
    let passedInClassNames = String(className || '').split(' ');
    for (let name of passedInClassNames) {
      if (name.length > 0) {
        classNames.push(name);
      }
    }
    let classNameString = classNames.join(" ");

    return (
      <span {...props}
        className={classNameString}
      >{children}</span>
    );
  }
}
self.Title = Title;
