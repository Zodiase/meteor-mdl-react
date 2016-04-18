import { Meteor } from 'meteor/meteor';
import { describe, it } from 'meteor/practicalmeteor:mocha';
import { expect } from 'meteor/practicalmeteor:chai';
import React from 'react';
import { render } from 'react-dom';
import { MDlReact } from 'meteor/zodiase:mdl-react';

export default (createContainer) => {

  describe("mdl-react/MaterialTabs", () => {

    const { MaterialTabs } = MDlReact;

    it("should throw error if render empty", () => {
      expect(() => {
        const component = React.createElement(MaterialTabs);
        render(component, createContainer());
      }).to.throw(Error);
    });

    it("should render empty without error", () => {
      expect(() => {
        const tabBar = React.createElement(MaterialTabs.TabBar),
              component = React.createElement(MaterialTabs, {}, tabBar);

        render(component, createContainer());
      }).to.not.throw(Error);
    });

    it("should render and then find the element", (done) => {
      const elementId = Meteor.uuid(),
            tabBar = React.createElement(MaterialTabs.TabBar),
            component = React.createElement(MaterialTabs, {
              id: elementId
            }, tabBar);

      render(component, createContainer(), () => {
        const element = document.getElementById(elementId);
        expect(element).to.not.be.null;
        done();
      });
    });

    it("should render empty correctly", (done) => {
      const elementId = Meteor.uuid(),
            tabBar = React.createElement(MaterialTabs.TabBar),
            component = React.createElement(MaterialTabs, {
              id: elementId
            }, tabBar);

      render(component, createContainer(), () => {
        const element = document.getElementById(elementId);
        expect(element.classList.contains(MaterialTabs.cssName)).to.be.true;
        const tabBarElement = element.querySelector(`.${MaterialTabs.prototype.CssClasses_.TABBAR_CLASS}`);
        expect(tabBarElement).to.be.instanceof(HTMLElement);
        done();
      });
    });

    it("should render with correct class names", (done) => {
      const elementId = Meteor.uuid(),
            randomClassNames = [
              Meteor.uuid(),
              Meteor.uuid()
            ],
            randomTabBarClassNames = [
              Meteor.uuid(),
              Meteor.uuid()
            ],
            tabBar = React.createElement(MaterialTabs.TabBar, {
              className: randomTabBarClassNames.join(' ')
            }),
            component = React.createElement(MaterialTabs, {
              id: elementId,
              className: randomClassNames.join(' ')
            }, tabBar);

      render(component, createContainer(), () => {
        const element = document.getElementById(elementId);
        randomClassNames.forEach((name) => {
          expect(element.classList.contains(name)).to.be.true;
        });
        const tabBarElement = element.querySelector(`.${MaterialTabs.prototype.CssClasses_.TABBAR_CLASS}`);
        randomTabBarClassNames.forEach((name) => {
          expect(tabBarElement.classList.contains(name)).to.be.true;
        });
        done();
      });
    });

    it("should render full set without error", () => {
      expect(() => {
        const tab0 = React.createElement(MaterialTabs.Tab, {
                tabId: 'tab0'
              }, 'Tab 0'),
              tab1 = React.createElement(MaterialTabs.Tab, {
                tabId: 'tab1'
              }, 'Tab 1'),
              tabBar = React.createElement(MaterialTabs.TabBar, {}, tab0, tab1),
              panel0 = React.createElement(MaterialTabs.Panel, {
                tabId: 'tab0'
              }, 'Panel 0'),
              panel1 = React.createElement(MaterialTabs.Panel, {
                tabId: 'tab1'
              }, 'Panel 1'),
              component = React.createElement(MaterialTabs, {}, tabBar, panel0, panel1);

        render(component, createContainer());
      }).to.not.throw(Error);
    });

  });

};