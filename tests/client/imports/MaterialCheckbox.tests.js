import { Meteor } from 'meteor/meteor';
import { describe, it } from 'meteor/practicalmeteor:mocha';
import { expect } from 'meteor/practicalmeteor:chai';
import React from 'react';
import { render } from 'react-dom';
import { MDlReact } from 'meteor/zodiase:mdl-react';

export default (createContainer) => {

  describe("mdl-react/MaterialCheckbox", () => {

    const { MaterialCheckbox, MaterialRipple } = MDlReact;

    it("should render and then find the element", (done) => {
      const elementId = Meteor.uuid();

      render(React.createElement(MaterialCheckbox, {
        id: elementId
      }), createContainer(), () => {
        const element = document.getElementById(elementId);
        expect(element).to.not.be.null;
        done();
      });
    });

    it("should render with correct label text", (done) => {
      const elementId = Meteor.uuid(),
            randomButtonText = Meteor.uuid();

      render(React.createElement(MaterialCheckbox, {
        id: elementId
      }, randomButtonText), createContainer(), () => {
        const element = document.getElementById(elementId);
        const labelElement = element.querySelector(`.mdl-checkbox__label`);
        expect(labelElement.textContent).to.equal(randomButtonText);
        done();
      });
    });

    it("should render with correct class names", (done) => {
      const elementId = Meteor.uuid(),
            randomClassNames = [
              Meteor.uuid(),
              Meteor.uuid()
            ];

      render(React.createElement(MaterialCheckbox, {
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

    it("should render as checked", (done) => {
      const elementId = Meteor.uuid();
      const inputId = `${elementId}__input`;

      render(React.createElement(MaterialCheckbox, {
        id: elementId,
        checked: true
      }, 'checked'), createContainer(), () => {
        const element = document.getElementById(elementId);
        const inputElement = document.getElementById(inputId);
        expect(inputElement.checked).to.be.true;
        done();
      });
    });

    it("should render with ripple", (done) => {
      const elementId = Meteor.uuid();

      render(React.createElement(MaterialCheckbox, {
        id: elementId,
        ripple: true
      }, 'ripple'), createContainer(), () => {
        const element = document.getElementById(elementId);
        const rippleElement = element.querySelector(`.${MaterialRipple.prototype.CssClasses_.RIPPLE}`);
        expect(rippleElement).to.be.instanceof(HTMLElement);
        done();
      });
    });

    it("should be able to toggle checked state", (done) => {
      const elementId = Meteor.uuid();
      const inputId = `${elementId}__input`;

      render(React.createElement(MaterialCheckbox, {
        id: elementId
      }, 'toggle'), createContainer(), () => {
        const element = document.getElementById(elementId);
        const inputElement = document.getElementById(inputId);
        const oldState = inputElement.checked;

        element.click();

        expect(inputElement.checked).to.be.equal(!oldState);
        done();
      });
    });

    it("should handle onChange", (done) => {
      const elementId = Meteor.uuid();
      let changed = false;

      render(React.createElement(MaterialCheckbox, {
        id: elementId,
        onChange: () => {
          changed = true;
        }
      }, 'onChange'), createContainer(), () => {
        const element = document.getElementById(elementId);
        element.click();
        expect(changed).to.be.true;
        done();
      });
    });

    it("should be able to prevent default in onChange", (done) => {
      const elementId = Meteor.uuid();
      const inputId = `${elementId}__input`;
      let checked = false;

      render(React.createElement(MaterialCheckbox, {
        id: elementId,
        checked: checked,
        onChange: (event) => {
          event.preventDefault();
        }
      }, 'prevent default'), createContainer(), () => {
        const element = document.getElementById(elementId);
        const inputElement = document.getElementById(inputId);

        element.click();
        expect(inputElement.checked).to.be.equal(checked);
        done();
      });
    });

    it("should be able to prevent default in onChange by returning false", (done) => {
      const elementId = Meteor.uuid();
      const inputId = `${elementId}__input`;
      let checked = false;

      render(React.createElement(MaterialCheckbox, {
        id: elementId,
        checked: checked,
        onChange: (event) => {
          return false;
        }
      }, 'return false'), createContainer(), () => {
        const element = document.getElementById(elementId);
        const inputElement = document.getElementById(inputId);

        element.click();
        expect(inputElement.checked).to.be.equal(checked);
        done();
      });
    });

  });

};