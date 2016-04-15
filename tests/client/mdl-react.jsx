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

  const $renderContainer = $('<div id="render-container">').appendTo(document.body);

  const createContainer = (title) => {
    const renderSet = $('<div class="render-set">').appendTo($renderContainer);
    if (title) {
      $('<h2>').text(title).appendTo(renderSet);
    }
    const container = $('<div>').appendTo(renderSet);
    return container[0];
  };

  render(
    <div>
      <MDlReact.MaterialButton>normal</MDlReact.MaterialButton>
      <MDlReact.MaterialButton raised>raised</MDlReact.MaterialButton>
      <MDlReact.MaterialButton disabled>disabled</MDlReact.MaterialButton>
      <MDlReact.MaterialButton raised disabled>raised disabled</MDlReact.MaterialButton>
      <MDlReact.MaterialButton ripple>ripple</MDlReact.MaterialButton>
      <MDlReact.MaterialButton raised ripple>raised ripple</MDlReact.MaterialButton>
      <MDlReact.MaterialButton colored>colored</MDlReact.MaterialButton>
      <MDlReact.MaterialButton raised colored>raised colored</MDlReact.MaterialButton>
      <MDlReact.MaterialButton primary>primary</MDlReact.MaterialButton>
      <MDlReact.MaterialButton raised primary>raised primary</MDlReact.MaterialButton>
      <MDlReact.MaterialButton accent>accent</MDlReact.MaterialButton>
      <MDlReact.MaterialButton raised accent>raised accent</MDlReact.MaterialButton>
      <MDlReact.MaterialButton fab><i className="material-icons">add</i></MDlReact.MaterialButton>
      <MDlReact.MaterialButton icon><i className="material-icons">add</i></MDlReact.MaterialButton>
      <MDlReact.MaterialButton raised icon><i className="material-icons">add</i></MDlReact.MaterialButton>
    </div>
  , createContainer('Buttons'));

  render(
    <MDlReact.MaterialTabs defaultTabId="p2" ripple>

      <MDlReact.MaterialTabs.TabBar>

        <MDlReact.MaterialTabs.Tab tabId="p1">Tab 1</MDlReact.MaterialTabs.Tab>
        <MDlReact.MaterialTabs.Tab tabId="p2">Tab 2</MDlReact.MaterialTabs.Tab>
        <MDlReact.MaterialTabs.Tab tabId="p3">Tab 3</MDlReact.MaterialTabs.Tab>

      </MDlReact.MaterialTabs.TabBar>

      <MDlReact.MaterialTabs.Panel tabId="p1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean scelerisque ipsum eu metus mattis feugiat. Aenean vulputate ex non ex fermentum, id cursus urna porttitor. Maecenas gravida lobortis est vel faucibus. Curabitur diam ligula, eleifend vitae neque eget, facilisis laoreet lacus. Ut in efficitur erat. Pellentesque bibendum orci ac nunc consequat, vel ornare sapien accumsan. Morbi ultrices massa id urna tempus efficitur. Fusce sed mi eleifend, fermentum metus in, laoreet erat. Fusce vel suscipit odio, vel tincidunt velit. Nam laoreet mauris mi, vitae scelerisque nulla ornare ac. Vivamus hendrerit felis risus, vel bibendum justo accumsan efficitur. Sed scelerisque augue sit amet nunc mattis vulputate. Phasellus eu porta dui, nec congue nisi. Cras hendrerit orci non metus placerat porta. Aenean id metus lorem.
      </MDlReact.MaterialTabs.Panel>
      <MDlReact.MaterialTabs.Panel tabId="p2">
        Donec mollis augue et porta commodo. Praesent lobortis, sapien eu posuere vehicula, nisi turpis hendrerit lacus, sed tincidunt justo magna eu augue. Morbi eu maximus tellus. Morbi iaculis justo ornare leo malesuada viverra. Fusce vulputate mauris purus, vel interdum leo tincidunt quis. Praesent id sollicitudin turpis. Proin suscipit non sapien ac sollicitudin. Vestibulum lobortis nibh quis nunc pellentesque, sit amet lobortis diam laoreet. Curabitur at leo eros. Ut id efficitur massa. Pellentesque eleifend odio iaculis dui blandit, non auctor dui tincidunt.
      </MDlReact.MaterialTabs.Panel>
      <MDlReact.MaterialTabs.Panel tabId="p3">
        Aenean vestibulum ex vitae sapien ullamcorper convallis. Donec ex elit, efficitur nec tincidunt viverra, bibendum sit amet lorem. Integer ac leo suscipit, pharetra ante id, lobortis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum dolor a felis dictum dignissim. Suspendisse potenti. Nulla in iaculis nunc. Pellentesque at suscipit odio, at euismod risus. Integer commodo, lectus quis consectetur malesuada, tellus lectus semper nulla, ut convallis ex ex et diam. Morbi sit amet accumsan ante, dapibus blandit purus. Sed placerat bibendum elementum. Integer nulla odio, dignissim in tortor ac, posuere iaculis nibh. Phasellus felis dolor, pulvinar sed aliquam lacinia, condimentum consequat odio. Duis consectetur quam eu efficitur luctus. Aliquam ac luctus lorem. Quisque suscipit, ligula ut venenatis porttitor, ante ligula feugiat nisi, id mattis purus ligula vel arcu.
      </MDlReact.MaterialTabs.Panel>

    </MDlReact.MaterialTabs>
  , createContainer('Tabs with Ripple'));

  render(
    <MDlReact.MaterialTabs defaultTabId="p2">

      <MDlReact.MaterialTabs.TabBar>

        <MDlReact.MaterialTabs.Tab tabId="p1">Tab 1</MDlReact.MaterialTabs.Tab>
        <MDlReact.MaterialTabs.Tab tabId="p2">Tab 2</MDlReact.MaterialTabs.Tab>
        <MDlReact.MaterialTabs.Tab tabId="p3">Tab 3</MDlReact.MaterialTabs.Tab>

      </MDlReact.MaterialTabs.TabBar>

      <MDlReact.MaterialTabs.Panel tabId="p1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean scelerisque ipsum eu metus mattis feugiat. Aenean vulputate ex non ex fermentum, id cursus urna porttitor. Maecenas gravida lobortis est vel faucibus. Curabitur diam ligula, eleifend vitae neque eget, facilisis laoreet lacus. Ut in efficitur erat. Pellentesque bibendum orci ac nunc consequat, vel ornare sapien accumsan. Morbi ultrices massa id urna tempus efficitur. Fusce sed mi eleifend, fermentum metus in, laoreet erat. Fusce vel suscipit odio, vel tincidunt velit. Nam laoreet mauris mi, vitae scelerisque nulla ornare ac. Vivamus hendrerit felis risus, vel bibendum justo accumsan efficitur. Sed scelerisque augue sit amet nunc mattis vulputate. Phasellus eu porta dui, nec congue nisi. Cras hendrerit orci non metus placerat porta. Aenean id metus lorem.
      </MDlReact.MaterialTabs.Panel>
      <MDlReact.MaterialTabs.Panel tabId="p2">
        Donec mollis augue et porta commodo. Praesent lobortis, sapien eu posuere vehicula, nisi turpis hendrerit lacus, sed tincidunt justo magna eu augue. Morbi eu maximus tellus. Morbi iaculis justo ornare leo malesuada viverra. Fusce vulputate mauris purus, vel interdum leo tincidunt quis. Praesent id sollicitudin turpis. Proin suscipit non sapien ac sollicitudin. Vestibulum lobortis nibh quis nunc pellentesque, sit amet lobortis diam laoreet. Curabitur at leo eros. Ut id efficitur massa. Pellentesque eleifend odio iaculis dui blandit, non auctor dui tincidunt.
      </MDlReact.MaterialTabs.Panel>
      <MDlReact.MaterialTabs.Panel tabId="p3">
        Aenean vestibulum ex vitae sapien ullamcorper convallis. Donec ex elit, efficitur nec tincidunt viverra, bibendum sit amet lorem. Integer ac leo suscipit, pharetra ante id, lobortis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum dolor a felis dictum dignissim. Suspendisse potenti. Nulla in iaculis nunc. Pellentesque at suscipit odio, at euismod risus. Integer commodo, lectus quis consectetur malesuada, tellus lectus semper nulla, ut convallis ex ex et diam. Morbi sit amet accumsan ante, dapibus blandit purus. Sed placerat bibendum elementum. Integer nulla odio, dignissim in tortor ac, posuere iaculis nibh. Phasellus felis dolor, pulvinar sed aliquam lacinia, condimentum consequat odio. Duis consectetur quam eu efficitur luctus. Aliquam ac luctus lorem. Quisque suscipit, ligula ut venenatis porttitor, ante ligula feugiat nisi, id mattis purus ligula vel arcu.
      </MDlReact.MaterialTabs.Panel>

    </MDlReact.MaterialTabs>
  , createContainer('Tabs without Ripple'));

  render(
    <MDlReact.MaterialTabs defaultTabId="p2">

      <MDlReact.MaterialTabs.TabBar>

        <span>Span</span>
        <MDlReact.MaterialTabs.Tab tabId="p1">Tab 1</MDlReact.MaterialTabs.Tab>
        <span>Span</span>
        <MDlReact.MaterialTabs.Tab tabId="p2">Tab 2</MDlReact.MaterialTabs.Tab>
        <span>Span</span>
        <MDlReact.MaterialTabs.Tab tabId="p3">Tab 3</MDlReact.MaterialTabs.Tab>
        <span>Span</span>

      </MDlReact.MaterialTabs.TabBar>

      <span>Span</span>
      <MDlReact.MaterialTabs.Panel tabId="p1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean scelerisque ipsum eu metus mattis feugiat. Aenean vulputate ex non ex fermentum, id cursus urna porttitor. Maecenas gravida lobortis est vel faucibus. Curabitur diam ligula, eleifend vitae neque eget, facilisis laoreet lacus. Ut in efficitur erat. Pellentesque bibendum orci ac nunc consequat, vel ornare sapien accumsan. Morbi ultrices massa id urna tempus efficitur. Fusce sed mi eleifend, fermentum metus in, laoreet erat. Fusce vel suscipit odio, vel tincidunt velit. Nam laoreet mauris mi, vitae scelerisque nulla ornare ac. Vivamus hendrerit felis risus, vel bibendum justo accumsan efficitur. Sed scelerisque augue sit amet nunc mattis vulputate. Phasellus eu porta dui, nec congue nisi. Cras hendrerit orci non metus placerat porta. Aenean id metus lorem.
      </MDlReact.MaterialTabs.Panel>
      <span>Span</span>
      <MDlReact.MaterialTabs.Panel tabId="p2">
        Donec mollis augue et porta commodo. Praesent lobortis, sapien eu posuere vehicula, nisi turpis hendrerit lacus, sed tincidunt justo magna eu augue. Morbi eu maximus tellus. Morbi iaculis justo ornare leo malesuada viverra. Fusce vulputate mauris purus, vel interdum leo tincidunt quis. Praesent id sollicitudin turpis. Proin suscipit non sapien ac sollicitudin. Vestibulum lobortis nibh quis nunc pellentesque, sit amet lobortis diam laoreet. Curabitur at leo eros. Ut id efficitur massa. Pellentesque eleifend odio iaculis dui blandit, non auctor dui tincidunt.
      </MDlReact.MaterialTabs.Panel>
      <span>Span</span>
      <MDlReact.MaterialTabs.Panel tabId="p3">
        Aenean vestibulum ex vitae sapien ullamcorper convallis. Donec ex elit, efficitur nec tincidunt viverra, bibendum sit amet lorem. Integer ac leo suscipit, pharetra ante id, lobortis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum dolor a felis dictum dignissim. Suspendisse potenti. Nulla in iaculis nunc. Pellentesque at suscipit odio, at euismod risus. Integer commodo, lectus quis consectetur malesuada, tellus lectus semper nulla, ut convallis ex ex et diam. Morbi sit amet accumsan ante, dapibus blandit purus. Sed placerat bibendum elementum. Integer nulla odio, dignissim in tortor ac, posuere iaculis nibh. Phasellus felis dolor, pulvinar sed aliquam lacinia, condimentum consequat odio. Duis consectetur quam eu efficitur luctus. Aliquam ac luctus lorem. Quisque suscipit, ligula ut venenatis porttitor, ante ligula feugiat nisi, id mattis purus ligula vel arcu.
      </MDlReact.MaterialTabs.Panel>
      <span>Span</span>

    </MDlReact.MaterialTabs>
  , createContainer('Tabs with Impurity'));
});