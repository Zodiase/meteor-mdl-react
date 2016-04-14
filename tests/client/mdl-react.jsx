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
  .appendTo(document.body);

  const createContainer = () => {
    return $('<div>').appendTo($renderContainer)[0];
  };

  render(
    <div>
      <MDlReact.MaterialButton ripple>button</MDlReact.MaterialButton>

      <MDlReact.MaterialTabs>

        <MDlReact.MaterialTabs.TabBar>

          <MDlReact.MaterialTabs.Tab tabId="p1">Tab 1</MDlReact.MaterialTabs.Tab>
          <MDlReact.MaterialTabs.Tab tabId="p2">Tab 2</MDlReact.MaterialTabs.Tab>
          <MDlReact.MaterialTabs.Tab tabId="p3">Tab 3</MDlReact.MaterialTabs.Tab>

        </MDlReact.MaterialTabs.TabBar>

        <MDlReact.MaterialTabs.Panel tabId="p1">Panel 1</MDlReact.MaterialTabs.Panel>
        <MDlReact.MaterialTabs.Panel tabId="p2">Panel 2</MDlReact.MaterialTabs.Panel>
        <MDlReact.MaterialTabs.Panel tabId="p3">Panel 3</MDlReact.MaterialTabs.Panel>

      </MDlReact.MaterialTabs>

    </div>
  , createContainer());
});