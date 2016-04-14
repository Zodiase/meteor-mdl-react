import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';
import { expect } from 'meteor/practicalmeteor:chai';
import React from 'react';
import { render } from 'react-dom';
import { MDlReact } from 'meteor/zodiase:mdl-react';

const components = [
  'MaterialButton',
  'MaterialLayout',
  'MaterialRipple',
  'MaterialSpinner',
  'MaterialTextfield'
];

Meteor.startup(() => {

  const $renderContainer = $('<div id="render-container">');
  $renderContainer
  .css({
    position: 'fixed',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: '2'
  })
  .appendTo(document.body);

  const $renderSwitch = $('<div id="render-switch">');
  $renderSwitch
  .css({
    position: 'fixed',
    top: '0',
    left: '0',
    width: '30px',
    height: '30px',
    borderRadius: '0 0 10px 0',
    backgroundColor: 'red',
    zIndex: '3',
    display: 'block',
    cursor: 'pointer'
  })
  .click(() => {
    if ($renderContainer.css('display') === 'block') {
      $renderContainer.css('display', 'none');
    } else {
      $renderContainer.css('display', 'block');
    }
  })
  .appendTo(document.body);

  const createContainer = () => {
    return $('<div>').appendTo($renderContainer)[0];
  };

  describe("mdl-react", () => {

    it("should export", () => {
      expect(MDlReact).to.not.be.undefined;
      for (let component of components) {
        expect(MDlReact[component]).to.not.be.undefined;
      }
    });

    it("should render `MaterialButton`", () => {
      expect(() => {
        render(
          <div>
            <MDlReact.MaterialButton>button</MDlReact.MaterialButton>
            <MDlReact.MaterialButton disabled>button</MDlReact.MaterialButton>
            <MDlReact.MaterialButton ripple>button</MDlReact.MaterialButton>
            <MDlReact.MaterialButton colored>button</MDlReact.MaterialButton>
            <MDlReact.MaterialButton raised>button</MDlReact.MaterialButton>
            <MDlReact.MaterialButton primary>button</MDlReact.MaterialButton>
            <MDlReact.MaterialButton accent>button</MDlReact.MaterialButton>
            <MDlReact.MaterialButton fab>button</MDlReact.MaterialButton>
            <MDlReact.MaterialButton icon>button</MDlReact.MaterialButton>
          </div>
        , createContainer());
      }).to.not.throw(Error);
    });

    it("should render `MaterialSpinner`", () => {
      expect(() => {
        render(
          <div>
            <MDlReact.MaterialSpinner />
            <MDlReact.MaterialSpinner active />
            <MDlReact.MaterialSpinner active singleColor/>
          </div>
        , createContainer());
      }).to.not.throw(Error);
    });

  });
});