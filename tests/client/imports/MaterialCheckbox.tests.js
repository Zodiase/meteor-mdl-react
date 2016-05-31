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
      let component = null;

      render(React.createElement(MaterialCheckbox, {
        id: elementId,
        ref: (ref) => {component = ref}
      }), createContainer(), () => {
        expect(component).to.exist;
        expect(component.element).to.be.instanceof(HTMLElement);

        expect(component.element.id).to.equal(elementId);
        const element = document.getElementById(elementId);
        expect(element).to.equal(component.element);

        done();
      });
    });

    it("should render with correct label text", (done) => {
      const randomButtonText = Meteor.uuid();
      let component = null;

      render(React.createElement(MaterialCheckbox, {
        id: Meteor.uuid(),
        ref: (ref) => {component = ref}
      }, randomButtonText), createContainer(), () => {
        expect(component).to.exist;
        expect(component.labelElement).to.be.instanceof(HTMLElement);

        expect(component.labelElement.textContent).to.equal(randomButtonText);

        done();
      });
    });

    it("should render with correct class names", (done) => {
      const randomClassNames = [
              Meteor.uuid(),
              Meteor.uuid()
            ];
      let component = null;

      render(React.createElement(MaterialCheckbox, {
        id: Meteor.uuid(),
        className: randomClassNames.join(' '),
        ref: (ref) => {component = ref}
      }, 'class names'), createContainer(), () => {
        expect(component).to.exist;
        expect(component.element).to.be.instanceof(HTMLElement);

        randomClassNames.forEach((name) => {
          expect(component.element.classList.contains(name)).to.be.true;
        });

        done();
      });
    });

    it("should render as uncontrolled checked", (done) => {
      let component = null;
      const checked_prev = true;

      render(React.createElement(MaterialCheckbox, {
        id: Meteor.uuid(),
        defaultChecked: checked_prev,
        ref: (ref) => {component = ref}
      }, 'checked'), createContainer(), () => {
        expect(component).to.exist;
        expect(component.inputElement).to.be.instanceof(HTMLElement);

        expect(component.inputElement.checked).to.equal(checked_prev);
        component.inputElement.click();
        expect(component.inputElement.checked).to.equal(!checked_prev);

        done();
      });
    });

    it("should render as controlled checked", (done) => {
      let component = null;
      const checked_prev = true;

      render(React.createElement(MaterialCheckbox, {
        id: Meteor.uuid(),
        checked: checked_prev,
        ref: (ref) => {component = ref}
      }, 'checked'), createContainer(), () => {
        expect(component).to.exist;
        expect(component.inputElement).to.be.instanceof(HTMLElement);

        expect(component.inputElement.checked).to.equal(checked_prev);
        component.inputElement.click();
        expect(component.inputElement.checked).to.equal(checked_prev);

        done();
      });
    });

    it("should throw error when rendered as both controlled and uncontrolled", () => {
      expect(() => {
        render(React.createElement(MaterialCheckbox, {
          id: Meteor.uuid(),
          defaultChecked: true,
          checked: true
        }), createContainer());
      }).to.throw(Error);
    });

    it("should render with ripple", (done) => {
      let component = null;

      render(React.createElement(MaterialCheckbox, {
        id: Meteor.uuid(),
        ripple: true,
        ref: (ref) => {component = ref}
      }, 'ripple'), createContainer(), () => {
        expect(component).to.exist;
        expect(component.element).to.be.instanceof(HTMLElement);

        const rippleElement = component.element.querySelector(`.${MaterialRipple.prototype.CssClasses_.RIPPLE}`);
        expect(rippleElement).to.be.instanceof(HTMLElement);

        done();
      });
    });

    it("should render as disabled", (done) => {
      let component = null;

      render(React.createElement(MaterialCheckbox, {
        id: Meteor.uuid(),
        disabled: true,
        ref: (ref) => {component = ref}
      }, 'checked'), createContainer(), () => {
        expect(component).to.exist;
        expect(component.inputElement).to.be.instanceof(HTMLElement);

        const checked = component.inputElement.checked;

        component.inputElement.click();
        expect(component.inputElement.checked).to.equal(checked);

        done();
      });
    });

    it("should handle onChange", (done) => {
      let component = null;
      const checked_prev = false;
      let changed = checked_prev;

      render(React.createElement(MaterialCheckbox, {
        id: Meteor.uuid(),
        onChange: () => {
          changed = !changed;
        },
        ref: (ref) => {component = ref}
      }, 'onChange'), createContainer(), () => {
        expect(component).to.exist;
        expect(component.inputElement).to.be.instanceof(HTMLElement);

        component.inputElement.click();
        expect(changed).to.equal(!checked_prev);

        done();
      });
    });

    it("should be able to prevent default in onChange", (done) => {
      let component = null;

      render(React.createElement(MaterialCheckbox, {
        id: Meteor.uuid(),
        onChange: (event) => {
          event.preventDefault();
        },
        ref: (ref) => {component = ref}
      }, 'prevent default'), createContainer(), () => {
        expect(component).to.exist;
        expect(component.inputElement).to.be.instanceof(HTMLElement);

        const checked = component.inputElement.checked;

        component.inputElement.click();

        expect(component.inputElement.checked).to.equal(checked);

        done();
      });
    });

    it("should be able to prevent default in onChange by returning false", (done) => {
      let component = null;

      render(React.createElement(MaterialCheckbox, {
        id: Meteor.uuid(),
        onChange: (event) => {
          return false;
        },
        ref: (ref) => {component = ref}
      }, 'prevent default'), createContainer(), () => {
        expect(component).to.exist;
        expect(component.inputElement).to.be.instanceof(HTMLElement);

        const checked = component.inputElement.checked;

        component.inputElement.click();

        expect(component.inputElement.checked).to.equal(checked);

        done();
      });
    });

    it("should not trigger onChange when rendered as disabled", (done) => {
      let component = null;
      const checked_prev = false;
      let changed = checked_prev;

      render(React.createElement(MaterialCheckbox, {
        id: Meteor.uuid(),
        disabled: true,
        onChange: () => {
          changed = !changed;
        },
        ref: (ref) => {component = ref}
      }, 'onChange'), createContainer(), () => {
        expect(component).to.exist;
        expect(component.inputElement).to.be.instanceof(HTMLElement);

        component.inputElement.click();
        expect(changed).to.equal(checked_prev);

        done();
      });
    });

  });

};