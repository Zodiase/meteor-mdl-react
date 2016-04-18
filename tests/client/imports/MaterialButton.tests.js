import { Meteor } from 'meteor/meteor';
import { describe, it } from 'meteor/practicalmeteor:mocha';
import { expect } from 'meteor/practicalmeteor:chai';
import React from 'react';
import { render } from 'react-dom';
import { MDlReact } from 'meteor/zodiase:mdl-react';

export default (createContainer) => {

  describe("mdl-react/MaterialButton", () => {

    const { MaterialButton, MaterialRipple } = MDlReact;

    it("should render with empty children", () => {
      expect(() => {
        render(React.createElement(MaterialButton), createContainer());
      }).to.not.throw(Error);
    });

    it("should render and then find the element", (done) => {
      const elementId = Meteor.uuid();

      render(React.createElement(MaterialButton, {
        id: elementId
      }), createContainer(), () => {
        const element = document.getElementById(elementId);
        expect(element).to.not.be.null;
        done();
      });
    });

    it("should render with correct button text", (done) => {
      const elementId = Meteor.uuid(),
            randomButtonText = Meteor.uuid();

      render(React.createElement(MaterialButton, {
        id: elementId
      }, randomButtonText), createContainer(), () => {
        const element = document.getElementById(elementId);
        expect(element.textContent).to.equal(randomButtonText);
        done();
      });
    });

    it("should render with correct class names", (done) => {
      const elementId = Meteor.uuid(),
            randomClassNames = [
              Meteor.uuid(),
              Meteor.uuid()
            ];

      render(React.createElement(MaterialButton, {
        id: elementId,
        className: randomClassNames.join(' ')
      }, 'class names'), createContainer(), () => {
        const element = document.getElementById(elementId);
        randomClassNames.forEach((name) => {
          expect(element.classList.contains(name)).to.be.true;
        });
        done();
      });
    });

    it("should render as disabled", (done) => {
      const elementId = Meteor.uuid();

      render(React.createElement(MaterialButton, {
        id: elementId,
        disabled: true
      }, 'disabled'), createContainer(), () => {
        const element = document.getElementById(elementId);
        expect(element.disabled).to.be.true;
        done();
      });
    });

    it("should render with ripple", (done) => {
      const elementId = Meteor.uuid();

      render(React.createElement(MaterialButton, {
        id: elementId,
        ripple: true
      }, 'ripple'), createContainer(), () => {
        const element = document.getElementById(elementId);
        const rippleElement = element.querySelector(`.${MaterialRipple.prototype.CssClasses_.RIPPLE}`);
        expect(rippleElement).to.be.instanceof(HTMLElement);
        done();
      });
    });

    it("should render as colored", (done) => {
      const elementId = Meteor.uuid();

      render(React.createElement(MaterialButton, {
        id: elementId,
        colored: true
      }, 'colored'), createContainer(), () => {
        const element = document.getElementById(elementId);
        expect(element.classList.contains('mdl-button--colored')).to.be.true;
        done();
      });
    });

    it("should render as raised", (done) => {
      const elementId = Meteor.uuid();

      render(React.createElement(MaterialButton, {
        id: elementId,
        raised: true
      }, 'raised'), createContainer(), () => {
        const element = document.getElementById(elementId);
        expect(element.classList.contains('mdl-button--raised')).to.be.true;
        done();
      });
    });

    it("should render as primary", (done) => {
      const elementId = Meteor.uuid();

      render(React.createElement(MaterialButton, {
        id: elementId,
        primary: true
      }, 'primary'), createContainer(), () => {
        const element = document.getElementById(elementId);
        expect(element.classList.contains('mdl-button--primary')).to.be.true;
        done();
      });
    });

    it("should render as accent", (done) => {
      const elementId = Meteor.uuid();

      render(React.createElement(MaterialButton, {
        id: elementId,
        accent: true
      }, 'accent'), createContainer(), () => {
        const element = document.getElementById(elementId);
        expect(element.classList.contains('mdl-button--accent')).to.be.true;
        done();
      });
    });

    it("should render as fab", (done) => {
      const elementId = Meteor.uuid();

      render(React.createElement(MaterialButton, {
        id: elementId,
        fab: true
      }, 'fab'), createContainer(), () => {
        const element = document.getElementById(elementId);
        expect(element.classList.contains('mdl-button--fab')).to.be.true;
        done();
      });
    });

    it("should render as icon", (done) => {
      const elementId = Meteor.uuid();

      render(React.createElement(MaterialButton, {
        id: elementId,
        icon: true
      }, 'icon'), createContainer(), () => {
        const element = document.getElementById(elementId);
        expect(element.classList.contains('mdl-button--icon')).to.be.true;
        done();
      });
    });

  });

};