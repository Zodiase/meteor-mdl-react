import { Meteor } from 'meteor/meteor';
import { describe, it } from 'meteor/practicalmeteor:mocha';
import { expect } from 'meteor/practicalmeteor:chai';
import React from 'react';
import { render } from 'react-dom';
import { MDlReact } from 'meteor/zodiase:mdl-react';

export default (createContainer) => {

  describe("mdl-react/MaterialDataTable", () => {

    const { MaterialDataTable, MaterialCheckbox, MaterialRipple } = MDlReact;

    it("should render and then find the element", (done) => {
      const elementId = Meteor.uuid();
      let component = null;

      render(React.createElement(MaterialDataTable, {
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

    it("should render empty correctly", (done) => {
      let component = null;

      render(React.createElement(MaterialDataTable, {
        id: Meteor.uuid(),
        ref: (ref) => {component = ref}
      }), createContainer(), () => {
        expect(component).to.exist;
        expect(component.element).to.be.instanceof(HTMLElement);

        expect(component.element.classList.contains(MaterialDataTable.cssName)).to.be.true;

        done();
      });
    });

    it("should render with correct class names", (done) => {
      const randomClassNames = [
              Meteor.uuid(),
              Meteor.uuid()
            ];
      let component = null;

      render(React.createElement(MaterialDataTable, {
        id: Meteor.uuid(),
        className: randomClassNames.join(' '),
        ref: (ref) => {component = ref}
      }), createContainer(), () => {
        expect(component).to.exist;
        expect(component.element).to.be.instanceof(HTMLElement);

        randomClassNames.forEach((name) => {
          expect(component.element.classList.contains(name)).to.be.true;
        });

        done();
      });
    });

  });

};