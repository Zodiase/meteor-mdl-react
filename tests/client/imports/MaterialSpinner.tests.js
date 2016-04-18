import { Meteor } from 'meteor/meteor';
import { describe, it } from 'meteor/practicalmeteor:mocha';
import { expect } from 'meteor/practicalmeteor:chai';
import React from 'react';
import { render } from 'react-dom';
import { MDlReact } from 'meteor/zodiase:mdl-react';

export default (createContainer) => {

  describe("mdl-react/MaterialSpinner", () => {

    const { MaterialSpinner } = MDlReact;

    it("should render empty without error", () => {
      expect(() => {
        render(React.createElement(MaterialSpinner), createContainer());
      }).to.not.throw(Error);
    });

    it("should render and then find the element", (done) => {
      const elementId = Meteor.uuid();

      render(React.createElement(MaterialSpinner, {
        id: elementId
      }), createContainer(), () => {
        const element = document.getElementById(elementId);
        expect(element).to.not.be.null;
        done();
      });
    });

    it("should render as active", (done) => {
      const elementId = Meteor.uuid();

      render(React.createElement(MaterialSpinner, {
        id: elementId,
        active: true
      }), createContainer(), () => {
        const element = document.getElementById(elementId);
        expect(element.classList.contains('is-active')).to.be.true;
        done();
      });
    });

    it("should render as singleColor", (done) => {
      const elementId = Meteor.uuid();

      render(React.createElement(MaterialSpinner, {
        id: elementId,
        singleColor: true
      }), createContainer(), () => {
        const element = document.getElementById(elementId);
        expect(element.classList.contains('mdl-spinner--single-color')).to.be.true;
        done();
      });
    });

  });

};