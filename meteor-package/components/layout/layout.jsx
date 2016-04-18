/**
 * @license
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

let { Component, PropTypes } = React;
let { getClassList, joinClassNames, registerClassNameFlags } = Helers;

/*
 * Todo
 * - Finish the tab part.
 * - Refactor header into its own component.
 * - Refactor drawer into its own component.
 * - Refactor content into its own component.
 * - All tests.
 */

/**
 * MaterialLayout
 * @version 1.1.1
 * @since 1.0.6
 * @see {@link https://github.com/jasonmayes/mdl-component-design-pattern}
 */
class MaterialLayout extends Component {

  _upgrade() {
    if (this.container_ && this.element_) {

      window.addEventListener('pageshow', this.boundPageShowHandler, false);

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
        this.drawer_.addEventListener('keydown', this.boundKeyboardEventHandler); //x
        if (this.drawerButton_) {
          this.drawerButton_.addEventListener('click', this.boundDrawerToggleHandler); //x
          this.drawerButton_.addEventListener('keydown', this.boundDrawerToggleHandler); //x
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

      window.removeEventListener('pageshow', this.boundPageShowHandler, false);

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
        this.drawer_.removeEventListener('keydown', this.boundKeyboardEventHandler); //x
        if (this.drawerButton_) {
          this.drawerButton_.removeEventListener('click', this.boundDrawerToggleHandler); //x
          this.drawerButton_.removeEventListener('keydown', this.boundDrawerToggleHandler); //x
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

  _getStateFromProps(props) {
    return {
      classList: getClassList(self, props)
    };
  }

  constructor(props) {
    super(props);

    this.boundPageShowHandler = function(e) {
      if (e.persisted) { // when page is loaded from back/forward cache
        // trigger repaint to let layout scroll in safari
        this.element_.style.overflowY = 'hidden';
        requestAnimationFrame(function() {
          this.element_.style.overflowY = '';
        }.bind(this));
      }
    }.bind(this);

    this.boundHeaderTransitionEndHandler = this.headerTransitionEndHandler_.bind(this);
    this.boundHeaderClickHandler = this.headerClickHandler_.bind(this);
    this.boundContentScrollHandler = this.contentScrollHandler_.bind(this);
    this.boundDrawerToggleHandler = this.drawerToggleHandler_.bind(this);
    this.boundKeyboardEventHandler = this.keyboardEventHandler_.bind(this);
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

    let classNameString = this.state.classList.join(' ');

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
    contentProps.className = joinClassNames([this.CssClasses_.CONTENT], contentProps.className);

    // Header is OK to not exist. Only prepare props when exists.
    // @see {@link https://github.com/google/material-design-lite/blob/v1.1.1/src/layout/layout.js#L323}
    let headerProps = null;
    if (header) {
      headerProps = {...header.props};
      headerProps.className = joinClassNames([this.CssClasses_.HEADER], headerProps.className);

      if (headerProps.seamed) {
        mode = this.Mode_.SEAMED;
      } else if (headerProps.waterfall) {
        mode = this.Mode_.WATERFALL;
      } else if (headerProps.scroll) {
        mode = this.Mode_.SCROLL;
        contentProps.className = joinClassNames([], contentProps.className || '', [this.CssClasses_.HAS_SCROLLING_HEADER]);
      }

      if (mode === this.Mode_.STANDARD) {
        headerProps.className = joinClassNames([], headerProps.className || '', [this.CssClasses_.CASTING_SHADOW]);
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
    // @see {@link https://github.com/google/material-design-lite/blob/v1.1.1/src/layout/layout.js#L360}
    // Add drawer toggling button to our layout, if we have an openable drawer.
    let drawerProps = null;
    let drawerButtonProps = null;
    if (drawer) {
      drawerProps = {...drawer.props};
      drawerProps.className = joinClassNames([this.CssClasses_.DRAWER], drawerProps.className);

      drawerButtonProps = {
        "className": this.CssClasses_.DRAWER_BTN,
        "aria-expanded": false,
        "role": 'button',
        "tabIndex": 0,
        "children": (
          <i className={this.CssClasses_.ICON} dangerouslySetInnerHTML={{__html: this.Constant_.MENU_ICON}} />
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
      props["aria-hidden"] = 'true';
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
  "className": "",
  "children": []
};
registerClassNameFlags(self, {
  "fixedHeader": "mdl-layout--fixed-header"
});

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

  MENU_ICON: '&#xE5D2;',
  CHEVRON_LEFT: 'chevron_left',
  CHEVRON_RIGHT: 'chevron_right'
};

/**
 * Keycodes, for code readability.
 *
 * @enum {number}
 * @private
 */
MaterialLayout.prototype.Keycodes_ = {
  ENTER: 13,
  ESCAPE: 27,
  SPACE: 32
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

  var headerVisible =
      !this.element_.classList.contains(this.CssClasses_.IS_SMALL_SCREEN) ||
      this.element_.classList.contains(this.CssClasses_.FIXED_HEADER);

  if (this.content_.scrollTop > 0 &&
      !this.header_.classList.contains(this.CssClasses_.IS_COMPACT)) {
    this.header_.classList.add(this.CssClasses_.CASTING_SHADOW);
    this.header_.classList.add(this.CssClasses_.IS_COMPACT);
    if (headerVisible) {
      this.header_.classList.add(this.CssClasses_.IS_ANIMATING);
    }
  } else if (this.content_.scrollTop <= 0 &&
      this.header_.classList.contains(this.CssClasses_.IS_COMPACT)) {
    this.header_.classList.remove(this.CssClasses_.CASTING_SHADOW);
    this.header_.classList.remove(this.CssClasses_.IS_COMPACT);
    if (headerVisible) {
      this.header_.classList.add(this.CssClasses_.IS_ANIMATING);
    }
  }
};

/**
 * Handles a keyboard event on the drawer.
 *
 * @param {Event} evt The event that fired.
 * @private
 */
MaterialLayout.prototype.keyboardEventHandler_ = function(evt) {
  // Only react when the drawer is open.
  if (evt.keyCode === this.Keycodes_.ESCAPE &&
      this.drawer_.classList.contains(this.CssClasses_.IS_DRAWER_OPEN)) {
    this.toggleDrawer();
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
 * Handles events of drawer button.
 *
 * @param {Event} evt The event that fired.
 * @private
 */
MaterialLayout.prototype.drawerToggleHandler_ = function(evt) {
  if (evt && (evt.type === 'keydown')) {
    if (evt.keyCode === this.Keycodes_.SPACE || evt.keyCode === this.Keycodes_.ENTER) {
      // prevent scrolling in drawer nav
      evt.preventDefault();
    } else {
      // prevent other keys
      return;
    }
  }

  this.toggleDrawer();
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
* Toggle drawer state
*
* @public
*/
MaterialLayout.prototype.toggleDrawer = function() {
  var drawerButton = this.element_.querySelector('.' + this.CssClasses_.DRAWER_BTN);
  this.drawer_.classList.toggle(this.CssClasses_.IS_DRAWER_OPEN);
  this.obfuscator_.classList.toggle(this.CssClasses_.IS_DRAWER_OPEN);

  // Set accessibility properties.
  if (this.drawer_.classList.contains(this.CssClasses_.IS_DRAWER_OPEN)) {
    this.drawer_.setAttribute('aria-hidden', 'false');
    drawerButton.setAttribute('aria-expanded', 'true');
  } else {
    this.drawer_.setAttribute('aria-hidden', 'true');
    drawerButton.setAttribute('aria-expanded', 'false');
  }
};
MaterialLayout.prototype['toggleDrawer'] =
    MaterialLayout.prototype.toggleDrawer;

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

  /**
   * Auxiliary method to programmatically select a tab in the UI.
   */
  function selectTab() {
    var href = tab.href.split('#')[1];
    var panel = layout.content_.querySelector('#' + href);
    layout.resetTabState_(tabs);
    layout.resetPanelState_(panels);
    tab.classList.add(layout.CssClasses_.IS_ACTIVE);
    panel.classList.add(layout.CssClasses_.IS_ACTIVE);
  }

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
    if (tab.getAttribute('href').charAt(0) === '#') {
      e.preventDefault();
      selectTab();
    }
  });
  tab.show = selectTab;

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
self.Header.propTypes = {
  "className": PropTypes.string.isRequired,
  "seamed": PropTypes.bool.isRequired,
  "waterfall": PropTypes.bool.isRequired,
  "scroll": PropTypes.bool.isRequired,
  "children": PropTypes.any.isRequired
};
self.Header.defaultProps = {
  "className": "",
  "seamed": false,
  "waterfall": false,
  "scroll": false,
  "children": []
};

// Placeholder. Does nothing. Real magic happens in MaterialLayout.
class Drawer extends Component {render() {return null;}}
self.Drawer = Drawer;
self.Drawer.propTypes = {
  "className": PropTypes.string.isRequired,
  "largeScreenOnly": PropTypes.bool.isRequired,
  "smallScreenOnly": PropTypes.bool.isRequired,
  "children": PropTypes.any.isRequired
};
self.Drawer.defaultProps = {
  "className": "",
  "largeScreenOnly": false,
  "smallScreenOnly": false,
  "children": []
};

// Placeholder. Does nothing. Real magic happens in MaterialLayout.
class Content extends Component {render() {return null;}}
self.Content = Content;
self.Content.propTypes = {
  "className": PropTypes.string.isRequired,
  "children": PropTypes.any.isRequired
};
self.Content.defaultProps = {
  "className": "",
  "children": []
};

class Spacer extends Component {
  render() {
    return (
      <div className="mdl-layout-spacer" />
    );
  }
}
self.Spacer = Spacer;

class Title extends Component {
  _getStateFromProps(props) {
    return {
      classList: getClassList(self.Title, props)
    };
  }

  constructor(props) {
    super(props);

    this.state = this._getStateFromProps(props);
  }
  componentWillReceiveProps(nextProps) {
    this.setState(this._getStateFromProps(nextProps));
  }
  render() {
    let {
      children,
      ...props
    } = this.props;

    return (
      <span {...props}
        className={this.state.classList.join(' ')}
      >{children}</span>
    );
  }
}
self.Title = Title;
self.Title.cssName = 'mdl-layout-title';
