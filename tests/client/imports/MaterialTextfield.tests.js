import { Meteor } from 'meteor/meteor';
import { describe, it } from 'meteor/practicalmeteor:mocha';
import { expect } from 'meteor/practicalmeteor:chai';
import React from 'react';
import { render } from 'react-dom';
import { MDlReact } from 'meteor/zodiase:mdl-react';

export default (createContainer) => {

  describe("mdl-react/MaterialTextfield", () => {

    const { MaterialTextfield } = MDlReact;

    it("should render empty (except with ID) without error", () => {
      expect(() => {
        const component = React.createElement(MaterialTextfield, {
          id: Meteor.uuid()
        });
        render(component, createContainer());
      }).to.not.throw(Error);
    });

    it("should render and then find the element", (done) => {
      const elementId = Meteor.uuid(),
            component = React.createElement(MaterialTextfield, {
              id: elementId
            });

      render(component, createContainer(), () => {
        const element = document.getElementById(elementId);
        expect(element).to.not.be.null;
        done();
      });
    });

    it("should render empty correctly", (done) => {
      const elementId = Meteor.uuid(),
            component = React.createElement(MaterialTextfield, {
              id: elementId
            });

      render(component, createContainer(), () => {
        const element = document.getElementById(elementId);
        expect(element.classList.contains(MaterialTextfield.cssName)).to.be.true;
        done();
      });
    });

  });

};