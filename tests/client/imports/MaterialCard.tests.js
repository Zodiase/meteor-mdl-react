import { Meteor } from 'meteor/meteor';
import { describe, it } from 'meteor/practicalmeteor:mocha';
import { expect } from 'meteor/practicalmeteor:chai';
import React from 'react';
import { render } from 'react-dom';
import { MDlReact } from 'meteor/zodiase:mdl-react';

export default (createContainer) => {

  describe("mdl-react/MaterialCard", () => {

    const { MaterialCard } = MDlReact;

    it("should render with empty children without error", () => {
      expect(() => {
        render(React.createElement(MaterialCard), createContainer());
      }).to.not.throw(Error);
    });

    it("should render and then find the element", (done) => {
      const elementId = Meteor.uuid();

      render(React.createElement(MaterialCard, {
        id: elementId
      }), createContainer(), () => {
        const element = document.getElementById(elementId);
        expect(element).to.not.be.null;
        done();
      });
    });

    it("should render empty correctly", (done) => {
      const elementId = Meteor.uuid();

      render(React.createElement(MaterialCard, {
        id: elementId
      }), createContainer(), () => {
        const element = document.getElementById(elementId);
        expect(element.classList.contains(MaterialCard.cssName)).to.be.true;
        done();
      });
    });

    it("should render with correct content text", (done) => {
      const elementId = Meteor.uuid(),
            randomText = Meteor.uuid();

      render(React.createElement(MaterialCard, {
        id: elementId
      }, randomText), createContainer(), () => {
        const element = document.getElementById(elementId);
        expect(element.textContent).to.equal(randomText);
        done();
      });
    });

    it("should render with correct class names", (done) => {
      const elementId = Meteor.uuid(),
            randomClassNames = [
              Meteor.uuid(),
              Meteor.uuid()
            ];

      render(React.createElement(MaterialCard, {
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

  });

};